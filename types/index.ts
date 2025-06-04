export interface Category {
  id: number
  name: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  categoryId: number
}

export interface ApiResponse {
  categories: Category[]
  products: Product[]
}

export type SortOption = 'none' | 'price-asc' | 'price-desc' 