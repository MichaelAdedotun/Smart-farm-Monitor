<script setup lang="ts">

import { useWeather } from "~/composables/useWeather";

const { weather, isLoading, error } =  useWeather()
</script>

<template>
  <div class="bg-gradient-to-br from-white to-green-50 p-4 rounded-xl shadow border border-green-100 h-full">
    <h3 class="text-lg font-semibold mb-4 flex items-center gap-2 text-green-700">
      <span>🌤️</span>
      <span>Current Weather Conditions</span>
    </h3>

    <div v-if="isLoading" class="text-gray-400 text-sm">Loading weather data...</div>
    <div v-else-if="error" class="text-red-500 text-sm">{{ error }}</div>

    <div v-else-if="weather" class="space-y-1 text-sm text-gray-700">
      <div class="flex items-center gap-2">
        <span class="text-lg">🌡️</span>
        <p>Temperature: <strong>{{ weather.temperature }}°C</strong></p>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-lg">💧</span>
        <p>Humidity: <strong>{{ weather.humidity }}%</strong></p>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-lg">💨</span>
        <p>Wind Speed: <strong>{{ weather.wind_speed }} m/s</strong></p>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-lg">☔</span>
        <p>Precipitation: <strong>{{ weather.precipitation }} mm</strong></p>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-lg">🔆</span>
        <p>UV Index: <strong>{{ weather.uv_index }}</strong></p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>