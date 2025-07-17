<script setup lang="ts">

import { useUIStore } from '~/stores/ui'
import { computed } from 'vue'

const ui = useUIStore()

const sidebarOpen = computed(() => ui.sidebarOpen)
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <aside
        :class="[
        'fixed z-40 top-0 left-0 h-full bg-white shadow transition-transform duration-300 ease-in-out lg:static lg:translate-x-0',
        sidebarOpen ? 'translate-x-0 w-60' : '-translate-x-full w-66'
      ]"
    >
      <Sidebar />
    </aside>

    <div class="flex-1 flex flex-col w-full">
      <Header />
      <main class="flex-1 p-6 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>