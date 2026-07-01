import PaginationContent from './PaginationContent'

interface PaginationProps {
  total: number
  currentPage: number
  onPageChange: (page: number) => void
}

export function Pagination({ total, currentPage, onPageChange }: PaginationProps) {
  return <PaginationContent total={total} currentPage={currentPage} onPageChange={onPageChange} />
}
