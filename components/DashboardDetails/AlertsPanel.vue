<script setup lang="ts">

import { useAlerts } from '~/composables/useAlerts'

const { alerts } = await useAlerts()
const latestAlerts = computed(() => alerts.value.slice(0, 5))
</script>

<template>
  <div class="bg-white rounded-xl shadow p-4 border border-red-200">
    <h3 class="text-lg font-semibold text-gray-500 mb-4">Recent Alerts</h3>
    <ul class="space-y-2 text-sm text-gray-700">
      <li v-for="(alert, index) in latestAlerts" :key="index" class="flex items-start gap-2">
        <span class="text-red-500">🔔</span>
        <div class="truncate w-full max-w-xs">
          {{ alert.message }}
          <span class="text-gray-400 text-xs">({{ alert.timestamp }})</span>
        </div>
      </li>
    </ul>
    <p v-if="!alerts.length" class="text-gray-400">No alerts currently.</p>
  </div>
</template>

<style scoped>

</style>