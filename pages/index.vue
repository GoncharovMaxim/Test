<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Product Explorer</h1>
      <p class="text-gray-600">Discover amazing products across different categories</p>
    </div>

    <div v-if="productsStore.loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="productsStore.error" class="text-center py-12">
      <div class="text-red-600 mb-4">{{ productsStore.error }}</div>
      <button @click="productsStore.fetchData()" class="btn-primary">
        Try Again
      </button>
    </div>

    <div v-else>
      <ProductFilters 
        :categories="productsStore.categories"
        :filtered-count="productsStore.filteredProducts.length"
      />

      <div v-if="productsStore.filteredProducts.length === 0" class="text-center py-12">
        <div class="text-gray-500 mb-4">No products found matching your criteria</div>
        <button @click="productsStore.clearFilters()" class="btn-secondary">
          Clear Filters
        </button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in productsStore.filteredProducts" 
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from 'nuxt/app'
import { useProductsStore } from '../stores/products'

const productsStore = useProductsStore()

onMounted(async () => {
  if (productsStore.products.length === 0) {
    await productsStore.fetchData()
  }
})

useHead({
  title: 'Product Explorer - Discover Amazing Products',
  meta: [
    {
      name: 'description',
      content: 'Explore and discover amazing products across different categories. Search, filter, and find your favorites.'
    }
  ]
})
</script> 