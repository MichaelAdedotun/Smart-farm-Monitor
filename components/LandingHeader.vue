<script setup lang="ts">

import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' }
]
</script>

<template>
  <header class="fixed top-0 w-full bg-white shadow-sm z-50">
    <div class="w-full flex justify-between items-center px-6 py-4 md:px-10 lg:px-18">
      <h1 class="text-2xl sm:text-3xl font-bold text-green-600">
        Smart<span class="text-amber-600">Farm</span>
      </h1>

      <button @click="toggleMenu" class="md:hidden text-gray-700 text-2xl">
        <span v-if="!isOpen">☰</span>
        <span v-else>✕</span>
      </button>

      <nav class="hidden md:flex items-center gap-6">
        <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="text-sm text-gray-600 hover:text-green-500 hover:underline underline-offset-4 decoration-amber-500"
            :class="{
            'text-green-500 underline underline-offset-4 decoration-amber-500': route.path === link.to
          }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="hidden md:block">
        <NuxtLink
            to="/admin/dashboard"
            class="text-sm text-white px-4 py-2 rounded bg-gradient-to-r from-green-600 to-amber-500 hover:from-green-700 hover:to-amber-600"
        >
          Login
        </NuxtLink>
      </div>
    </div>

    <div
        v-if="isOpen"
        class="md:hidden absolute right-0 w-1/2 px-6 pb-4 pt-2 flex flex-col text-end
              gap-3 border-t border-gray-200 bg-gray-100"
    >
      <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm text-gray-600 hover:text-green-500 hover:underline underline-offset-4 decoration-amber-500"
          :class="{
          'text-green-500 underline underline-offset-4 decoration-amber-500': route.path === link.to
        }"
          @click="toggleMenu"
      >
        {{ link.label }}
      </NuxtLink>
      <div class="mt-3">
        <NuxtLink
            to="/admin/dashboard"
            class="w-fit text-sm text-white px-4 py-2 rounded bg-gradient-to-r from-green-600 to-amber-500 hover:from-green-700 hover:to-amber-600"
        >
          Login
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>