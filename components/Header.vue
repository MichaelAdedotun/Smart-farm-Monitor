<script setup lang="ts">

import { useUIStore } from '~/stores/ui'

const ui = useUIStore()
</script>

<template>
  <header class="w-full bg-white border-b border-b-green-300 p-4 flex justify-between items-center md:px-6">
    <div class="flex justify-center items-center gap-2 md:gap-4">
      <!-- Mobile menu button -->
      <button @click="ui.toggleSidebar" class="lg:hidden cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-green-700">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h1 class="text-xl font-semibold text-green-700">Dashboard</h1>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-sm md:text-md text-gray-500 font-semibold">Michael Adedotun</span>
      <img src="https://i.pravatar.cc/40" alt="Avatar" class="w-8 h-8 rounded-full border" />
    </div>
  </header>
</template>

<style scoped>

</style>