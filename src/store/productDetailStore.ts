import { create } from 'zustand'
import { productsApi } from '../api/products'
import type { Product } from '../types/product'

interface ProductDetailState {
  product: Product | null
  loading: boolean
  error: string | null
  fetchProduct: (id: number) => Promise<void>
  reset: () => void
}

export const useProductDetailStore = create<ProductDetailState>((set) => ({
  product: null,
  loading: false,
  error: null,

  fetchProduct: async (id: number) => {
    set({ loading: true, error: null, product: null })

    try {
      const product = await productsApi.getProductById(id)
      set({ product, loading: false })
    } catch {
      set({
        loading: false,
        error: 'Не удалось загрузить товар. Возможно, он не существует.',
      })
    }
  },

  reset: () => set({ product: null, loading: false, error: null }),
}))
