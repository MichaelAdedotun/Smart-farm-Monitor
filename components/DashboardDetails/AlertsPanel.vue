<script setup lang="ts">

import { useAlerts } from '~/composables/useAlerts'
const { alerts } = await useAlerts()
</script>

<template>
  <div class="bg-white rounded-xl shadow p-4 border border-red-200">
    <h3 class="text-lg font-semibold text-red-600 mb-4">⚠️ Field Alerts</h3>
    <ul class="space-y-2 text-sm text-gray-700">
      <li v-for="(alert, index) in alerts" :key="index" class="flex items-start gap-2">
        <span class="text-red-500">🔔</span>
        <p>{{ alert.message }} <span class="text-gray-400 text-xs">({{ alert.timestamp }})</span></p>
      </li>
    </ul>
    <p v-if="!alerts.length" class="text-gray-400">No alerts currently.</p>
  </div>
</template>

<style scoped>

</style>