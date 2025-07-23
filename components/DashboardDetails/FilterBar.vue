<script setup lang="ts">

import { ref, onMounted, computed } from 'vue'
import { useFilterStore } from '~/composables/useFilterStore'
import { locationMap } from '~/constants/locationMap'

const filter = useFilterStore()
const selectedRange = ref(filter.range || 'today')
const location = ref(filter.location || '')

const locations = computed(() => Object.keys(locationMap))

onMounted(() => {
  if (!filter.location) {
    location.value = 'Lagos'
    filter.setLocation('Lagos')
  }
})

const applyFilter = () => {
  filter.setRange(selectedRange.value)
  filter.setLocation(location.value)
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-6 bg-slate-50 shadow p-4 rounded-lg mb-4">
    <label class="text-sm text-gray-600">
      Range:
      <select v-model="selectedRange" class="w-30 rounded px-2 py-2 bg-white/90 outline-none">
        <option value="today">Today</option>
        <option value="7d">Last 7 Days</option>
        <option value="30d">Last 30 Days</option>
      </select>
    </label>
    <label class="text-sm text-gray-600">
      Location:
      <select v-model="location" class="w-30 rounded px-4 py-2 bg-white/90 outline-none">
        <option value="">Select</option>
        <option v-for="loc in locations" :key="loc" :value="loc">
          {{ loc }}
        </option>
      </select>
    </label>
    <button @click="applyFilter" class="bg-green-600 text-white px-4 py-1 rounded">
      Apply
    </button>
  </div>
</template>

<style scoped>

</style>