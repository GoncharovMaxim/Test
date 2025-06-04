<template>
  <div>
    <div v-if="productsStore.loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="!product" class="text-center py-12">
      <div class="text-gray-500 mb-4">Product not found</div>
      <NuxtLink to="/" class="btn-primary">
        Back to Products
      </NuxtLink>
    </div>

    <div v-else>
      <nav class="mb-6">
        <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </NuxtLink>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img 
            :src="product.image" 
            :alt="product.name"
            class="w-full h-96 object-cover rounded-lg shadow-lg"
          >
        </div>

        <div>
          <div class="flex items-start justify-between mb-4">
            <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
            <button
              @click="toggleFavorite"
              :class="['heart-button', { favorite: isFavorite }]"
              :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path 
                  fill-rule="evenodd" 
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div class="mb-4">
            <span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {{ categoryName }}
            </span>
          </div>

          <div class="mb-6">
            <span class="text-3xl font-bold text-blue-600">
              ${{ product.price.toFixed(2) }}
            </span>
          </div>

          <div class="mb-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-2">Description</h2>
            <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
          </div>

          <div class="flex space-x-4">
            <button
              @click="toggleFavorite"
              :class="[
                'flex items-center px-6 py-3 rounded-md font-medium transition-colors duration-200',
                isFavorite 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path 
                  fill-rule="evenodd" 
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                  clip-rule="evenodd"
                />
              </svg>
              {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useHead } from 'nuxt/app'
import { useProductsStore } from '../../stores/products'

const route = useRoute()
const productsStore = useProductsStore()

const productId = computed(() => parseInt(route.params.id as string))

const product = computed(() => {
  if (productId.value) {
    return productsStore.getProductById(productId.value)
  }
  return null
})

const categoryName = computed(() => {
  if (product.value) {
    const category = productsStore.getCategoryById(product.value.categoryId)
    return category?.name || 'Unknown Category'
  }
  return ''
})

const isFavorite = computed(() => {
  if (product.value) {
    return productsStore.isFavorite(product.value.id)
  }
  return false
})

const toggleFavorite = () => {
  if (product.value) {
    productsStore.toggleFavorite(product.value.id)
  }
}

onMounted(async () => {
  if (productsStore.products.length === 0) {
    await productsStore.fetchData()
  }
})

useHead(() => ({
  title: product.value ? `${product.value.name} - Product Explorer` : 'Product Not Found',
  meta: [
    {
      name: 'description',
      content: product.value ? product.value.description : 'Product not found'
    }
  ]
}))
</script> 