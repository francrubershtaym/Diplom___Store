import { create } from 'zustand'
import { productsApi } from '../api/products'
import type { Product, SortField, SortOrder } from '../types/product'

const PAGE_SIZE = 12

interface ProductsState {
  products: Product[]
  total: number
  currentPage: number
  sortBy: SortField
  sortOrder: SortOrder
  loading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  setPage: (page: number) => void
  setSort: (sortBy: SortField, sortOrder: SortOrder) => void
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  total: 0,
  currentPage: 0,
  sortBy: 'title',
  sortOrder: 'asc',
  loading: false,
  error: null,

  fetchProducts: async () => {
    const { currentPage, sortBy, sortOrder } = get()
    set({ loading: true, error: null })

    try {
      const data = await productsApi.getProducts({
        limit: PAGE_SIZE,
        skip: currentPage * PAGE_SIZE,
        sortBy,
        order: sortOrder,
      })
      set({
        products: data.products,
        total: data.total,
        loading: false,
      })
    } catch {
      set({
        loading: false,
        error: 'Не удалось загрузить товары. Проверьте подключение к интернету и попробуйте снова.',
      })
    }
  },

  setPage: (page: number) => {
    set({ currentPage: page })
    get().fetchProducts()
  },

  setSort: (sortBy: SortField, sortOrder: SortOrder) => {
    set({ sortBy, sortOrder, currentPage: 0 })
    get().fetchProducts()
  },
}))

export { PAGE_SIZE }
