<template>
  <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
          Search Products
        </label>
        <input
          id="search"
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or description..."
          class="input-field"
        >
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Categories
        </label>
        <div class="space-y-2 max-h-32 overflow-y-auto">
          <label 
            v-for="category in categories" 
            :key="category.id"
            class="flex items-center"
          >
            <input
              v-model="selectedCategories"
              :value="category.id"
              type="checkbox"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <span class="ml-2 text-sm text-gray-700">{{ category.name }}</span>
          </label>
        </div>
      </div>
      
      <div>
        <label for="sort" class="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          id="sort"
          v-model="sortBy"
          class="input-field"
        >
          <option value="none">No Sorting</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>
      </div>
    </div>
    
    <div class="mt-4 flex justify-between items-center">
      <span class="text-sm text-gray-600">
        {{ filteredCount }} products found
      </span>
      
      <button
        @click="clearFilters"
        class="btn-secondary text-sm"
      >
        Clear Filters
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Category, SortOption } from '../types'
import { useProductsStore } from '../stores/products'

interface Props {
  categories: Category[]
  filteredCount: number
}

defineProps<Props>()

const productsStore = useProductsStore()

const searchQuery = computed({
  get: () => productsStore.searchQuery,
  set: (value: string) => productsStore.setSearchQuery(value)
})

const selectedCategories = computed({
  get: () => productsStore.selectedCategories,
  set: (value: number[]) => productsStore.setSelectedCategories(value)
})

const sortBy = computed({
  get: () => productsStore.sortBy,
  set: (value: SortOption) => productsStore.setSortBy(value)
})

const clearFilters = () => {
  productsStore.clearFilters()
}
</script> 