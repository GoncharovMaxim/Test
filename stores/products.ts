import { defineStore } from 'pinia'
import type { Product, Category, SortOption } from '~/types'

interface ProductsState {
  products: Product[]
  categories: Category[]
  favorites: Set<number>
  searchQuery: string
  selectedCategories: number[]
  sortBy: SortOption
  loading: boolean
  error: string | null
}

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    products: [],
    categories: [],
    favorites: new Set(),
    searchQuery: '',
    selectedCategories: [],
    sortBy: 'none',
    loading: false,
    error: null
  }),

  getters: {
    filteredProducts: (state): Product[] => {
      let filtered = [...state.products]

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        )
      }

      if (state.selectedCategories.length > 0) {
        filtered = filtered.filter(product =>
          state.selectedCategories.includes(product.categoryId)
        )
      }

      switch (state.sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price)
          break
        default:
          break
      }

      return filtered
    },

    favoriteProducts: (state): Product[] => {
      return state.products.filter(product => state.favorites.has(product.id))
    },

    getProductById: (state) => {
      return (id: number): Product | undefined => {
        return state.products.find(product => product.id === id)
      }
    },

    getCategoryById: (state) => {
      return (id: number): Category | undefined => {
        return state.categories.find(category => category.id === id)
      }
    },

    isFavorite: (state) => {
      return (productId: number): boolean => {
        return state.favorites.has(productId)
      }
    }
  },

  actions: {
    async fetchData() {
      this.loading = true
      this.error = null

      try {
        const response = await $fetch<{ categories: Category[], products: Product[] }>('http://localhost:3001/db')
        this.categories = response.categories
        this.products = response.products
        this.loadFavoritesFromStorage()
      } catch (error) {
        this.error = 'Failed to fetch data'
        console.error('Error fetching data:', error)
      } finally {
        this.loading = false
      }
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
    },

    setSelectedCategories(categories: number[]) {
      this.selectedCategories = categories
    },

    setSortBy(sortBy: SortOption) {
      this.sortBy = sortBy
    },

    toggleFavorite(productId: number) {
      if (this.favorites.has(productId)) {
        this.favorites.delete(productId)
      } else {
        this.favorites.add(productId)
      }
      this.saveFavoritesToStorage()
    },

    loadFavoritesFromStorage() {
      if (process.client) {
        const stored = localStorage.getItem('product-favorites')
        if (stored) {
          try {
            const favoriteIds = JSON.parse(stored) as number[]
            this.favorites = new Set(favoriteIds)
          } catch (error) {
            console.error('Error loading favorites from storage:', error)
          }
        }
      }
    },

    saveFavoritesToStorage() {
      if (process.client) {
        const favoriteIds = Array.from(this.favorites)
        localStorage.setItem('product-favorites', JSON.stringify(favoriteIds))
      }
    },

    clearFilters() {
      this.searchQuery = ''
      this.selectedCategories = []
      this.sortBy = 'none'
    }
  }
}) 