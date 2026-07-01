import axios from 'axios'
import type { Product, ProductsQuery, ProductsResponse } from '../types/product'

const API_BASE = 'https://dummyjson.com'

export const productsApi = {
  async getProducts(params: ProductsQuery): Promise<ProductsResponse> {
    const { limit, skip, sortBy, order } = params
    const query = new URLSearchParams({
      limit: String(limit),
      skip: String(skip),
    })

    if (sortBy && order) {
      query.set('sortBy', sortBy)
      query.set('order', order)
    }

    const { data } = await axios.get<ProductsResponse>(
      `${API_BASE}/products?${query.toString()}`,
    )
    return data
  },

  async getProductById(id: number): Promise<Product> {
    const { data } = await axios.get<Product>(`${API_BASE}/products/${id}`)
    return data
  },
}
