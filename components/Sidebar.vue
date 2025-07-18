<script setup lang="ts">

import { useUIStore } from '~/stores/ui'
import { useRoute } from 'vue-router'

const ui = useUIStore()
const route = useRoute()

const links = [
  { name: 'Dashboard', to: '/admin/dashboard' },
  { name: 'Alerts', to: '/admin/alerts' },
  { name: 'Settings', to: '/admin/settings' }
]
</script>

<template>
  <aside class="h-full bg-green-700 text-white px-4 py-4 w-66 z-50 md:px-7">
    <div class="mb-8 flex justify-between items-center">
      <h2 class="text-2xl md:text-3xl font-bold">Smart<span class="text-amber-400">Farm</span></h2>
      <button @click="ui.closeSidebar" class="lg:hidden p-1 bg-white/20 rounded-md cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="flex flex-col space-y-5">
      <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="py-2 px-4 rounded-lg hover:bg-white/10 hover:text-amber-200 transition"
          :class="{ 'bg-white/10 text-amber-200': route.path === link.to }"
      >
        {{ link.name }}
      </NuxtLink>
    </div>
  </aside>
</template>

<style scoped>

</style>