import { Link } from 'react-router-dom'
import { useLanguageStore } from '../store/languageStore'
import { t } from '../utils/i18n'
import type { Product } from '../types/product'
import { formatPrice, getDiscountedPrice } from '../utils/price'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { language } = useLanguageStore()
  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage)
  const hasDiscount = product.discountPercentage > 0

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-card__image-wrap">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-card__image"
          loading="lazy"
        />
        {hasDiscount && (
          <span className="product-card__badge">-{Math.round(product.discountPercentage)}%</span>
        )}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__footer">
          <div className="product-card__prices">
            {hasDiscount ? (
              <>
                <span className="product-card__price product-card__price--sale">
                  {formatPrice(discountedPrice)}
                </span>
                <span className="product-card__price product-card__price--old">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="product-card__price">{formatPrice(product.price)}</span>
            )}
          </div>
          <span className="product-card__stock">{t('in_stock', language)}: {product.stock}</span>
        </div>
      </div>
    </Link>
  )
}
