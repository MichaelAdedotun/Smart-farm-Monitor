<script setup lang="ts">

import {useSummary} from "~/composables/useSummary";

const { summary, isLoading, error } = useSummary()
</script>

<template>
  <div>
    <div v-if="isLoading" class="text-gray-400 text-sm">Loading summary data...</div>
    <div v-else-if="error" class="text-red-500 text-sm">{{ error }}</div>

    <div v-else-if="summary" class="h-full grid grid-cols-2 gap-3">
      <div class="bg-white rounded-xl shadow p-4 border border-gray-100">
        <h4 class="text-sm text-gray-500 mb-2">Active Fields</h4>
        <p class="text-3xl font-bold text-green-700">{{ summary.fields }}</p>
      </div>
      <div class="bg-white rounded-xl shadow p-4 border border-gray-100">
        <h4 class="text-sm text-gray-500 mb-2">Avg NDVI</h4>
        <p class="text-3xl font-bold text-green-700">{{ summary.ndvi }}</p>
      </div>
      <div class="bg-white rounded-xl shadow p-4 border border-gray-100">
        <h4 class="text-sm text-gray-500 mb-2">Soil Moisture</h4>
        <p class="text-3xl font-bold text-green-700">{{ summary.moisture }}%</p>
      </div>
      <div class="bg-white rounded-xl shadow p-4 border border-gray-100">
        <h4 class="text-sm text-gray-500 mb-2">Sensors Online</h4>
        <p class="text-3xl font-bold text-green-700">{{ summary.sensors }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>