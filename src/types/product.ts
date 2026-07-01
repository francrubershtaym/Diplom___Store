export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type SortField = 'title' | 'price' | 'stock'
export type SortOrder = 'asc' | 'desc'

export interface ProductsQuery {
  limit: number
  skip: number
  sortBy?: SortField
  order?: SortOrder
}
