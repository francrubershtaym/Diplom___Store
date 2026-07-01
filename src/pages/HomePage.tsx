import { useEffect } from 'react'
import { ProductCard } from '../components/ProductCard'
import { Pagination } from '../components/Pagination'
import { SortSelect } from '../components/SortSelect'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'
import { ThemeToggle } from '../components/ThemeToggle'
import { LanguageToggle } from '../components/LanguageToggle'
import { useProductsStore } from '../store/productsStore'
import { useLanguageStore } from '../store/languageStore'
import { t } from '../utils/i18n'

export function HomePage() {
  const {
    products,
    total,
    currentPage,
    sortBy,
    sortOrder,
    loading,
    error,
    fetchProducts,
    setPage,
    setSort,
  } = useProductsStore()

  const { language } = useLanguageStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div className="page">
      <header className="page__header">
        <div className="page__header-top">
          <div>
            <h1 className="page__title">{t('title', language)}</h1>
            <p className="page__subtitle">
              {t('subtitle', language)} — {total} {t('positions', language)}
            </p>
          </div>
          <div className="page__toggles">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="page__controls">
        <SortSelect sortBy={sortBy} sortOrder={sortOrder} onChange={setSort} />
      </div>

      {loading && <Loader />}

      {error && !loading && (
        <ErrorMessage message={error} onRetry={fetchProducts} />
      )}

      {!loading && !error && (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            total={total}
            currentPage={currentPage}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  )
}
