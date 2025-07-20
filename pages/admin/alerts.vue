<script setup lang="ts">

import { useAlerts } from '~/composables/useAlerts'

const { alerts } = await useAlerts()
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-xl font-semibold text-green-700">All Alerts</h2>
    <div v-if="alerts && alerts.length" class="space-y-3 ">
      <div
          v-for="alert in alerts"
          :key="alert.id"
          class="border border-gray-100 bg-white rounded-xl shadow-sm p-4"
      >
        <h3 class="text-sm font-medium text-amber-600">{{ alert.title }}</h3>
        <p class="text-gray-700 text-sm mt-1">{{ alert.message }}</p>
        <p class="text-xs text-gray-400 mt-2">{{ new Date(alert.timestamp).toLocaleString() }}</p>
      </div>
    </div>
    <p v-else class="text-gray-400">No alerts found.</p>
  </div>
</template>

<style scoped>

</style>