import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ImageSwiper } from '../components/ImageSwiper'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'
import { useProductDetailStore } from '../store/productDetailStore'
import { useLanguageStore } from '../store/languageStore'
import { t } from '../utils/i18n'
import { formatPrice, getDiscountedPrice } from '../utils/price'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { product, loading, error, fetchProduct, reset } = useProductDetailStore()
  const { language } = useLanguageStore()

  useEffect(() => {
    const productId = Number(id)
    if (!Number.isNaN(productId)) {
      fetchProduct(productId)
    }
    return () => reset()
  }, [id, fetchProduct, reset])

  const discountedPrice = product
    ? getDiscountedPrice(product.price, product.discountPercentage)
    : 0
  const hasDiscount = product ? product.discountPercentage > 0 : false

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← {t('back_to_list', language)}
      </Link>

      {loading && <Loader message={t('loading_product', language)} />}

      {error && !loading && (
        <ErrorMessage
          message={error}
          onRetry={() => {
            const productId = Number(id)
            if (!Number.isNaN(productId)) fetchProduct(productId)
          }}
        />
      )}

      {!loading && !error && product && (
        <article className="product-detail">
          <div className="product-detail__gallery">
            <ImageSwiper images={product.images} title={product.title} />
          </div>

          <div className="product-detail__info">
            <span className="product-detail__category">{product.category}</span>
            <h1 className="product-detail__title">{product.title}</h1>
            <p className="product-detail__brand">{product.brand}</p>

            <div className="product-detail__prices">
              {hasDiscount ? (
                <>
                  <span className="product-detail__price product-detail__price--sale">
                    {formatPrice(discountedPrice)}
                  </span>
                  <span className="product-detail__price product-detail__price--old">
                    {formatPrice(product.price)}
                  </span>
                  <span className="product-detail__discount">
                    {t('discount_percent', language)} {Math.round(product.discountPercentage)}%
                  </span>
                </>
              ) : (
                <span className="product-detail__price">{formatPrice(product.price)}</span>
              )}
            </div>

            <p className="product-detail__stock">
              {t('in_stock', language)}: <strong>{product.stock}</strong> {t('pcs', language)}
            </p>

            <p className="product-detail__rating">
              {t('rating', language)}: {product.rating} ★
            </p>

            <p className="product-detail__description">{product.description}</p>
          </div>
        </article>
      )}
    </div>
  )
}
