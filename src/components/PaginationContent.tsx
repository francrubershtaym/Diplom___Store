import { PAGE_SIZE } from '../store/productsStore'

interface PaginationContentProps {
  total: number
  currentPage: number
  onPageChange: (page: number) => void
}

export default function PaginationContent({
  total,
  currentPage,
  onPageChange,
}: PaginationContentProps) {
  const pageCount = Math.ceil(total / PAGE_SIZE)

  if (pageCount <= 1) return null

  const pages = []
  const maxVisible = 5
  let startPage = Math.max(0, currentPage - Math.floor(maxVisible / 2))
  let endPage = Math.min(pageCount - 1, startPage + maxVisible - 1)

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(0, endPage - maxVisible + 1)
  }

  return (
    <div className="pagination">
      <button
        className="pagination__link pagination__prev"
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
      >
        ← Назад
      </button>

      {startPage > 0 && (
        <>
          <button
            className="pagination__link"
            onClick={() => onPageChange(0)}
          >
            1
          </button>
          {startPage > 1 && <span className="pagination__break">...</span>}
        </>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
        <button
          key={page}
          className={`pagination__link ${page === currentPage ? 'pagination__page--active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </button>
      ))}

      {endPage < pageCount - 1 && (
        <>
          {endPage < pageCount - 2 && <span className="pagination__break">...</span>}
          <button
            className="pagination__link"
            onClick={() => onPageChange(pageCount - 1)}
          >
            {pageCount}
          </button>
        </>
      )}

      <button
        className="pagination__link pagination__next"
        onClick={() => onPageChange(Math.min(pageCount - 1, currentPage + 1))}
        disabled={currentPage === pageCount - 1}
      >
        Вперёд →
      </button>
    </div>
  )
}
