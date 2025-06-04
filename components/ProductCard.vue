<template>
  <div class="card">
    <div class="relative">
      <img 
        :src="product.image" 
        :alt="product.name"
        class="w-full h-48 object-cover"
        loading="lazy"
      >
      <button
        @click="toggleFavorite"
        :class="['heart-button absolute top-2 right-2 bg-white/80 backdrop-blur-sm', { favorite: isFavorite }]"
        :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path 
            fill-rule="evenodd" 
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {{ product.name }}
      </h3>
      
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">
        {{ product.description }}
      </p>
      
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-blue-600">
          ${{ product.price.toFixed(2) }}
        </span>
        
        <NuxtLink 
          :to="`/product/${product.id}`"
          class="btn-primary text-sm"
        >
          View Details
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '../types'
import { useProductsStore } from '../stores/products'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const productsStore = useProductsStore()

const isFavorite = computed(() => productsStore.isFavorite(props.product.id))

const toggleFavorite = () => {
  productsStore.toggleFavorite(props.product.id)
}
</script>