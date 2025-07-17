<script setup lang="ts">

import { onMounted } from 'vue'

onMounted(async () => {
  const L = await import('leaflet') // ✅ lazy import, only in client

  const map = L.map('map').setView([6.52, 3.37], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  L.circleMarker([6.52, 3.37], {
    radius: 8,
    color: '#16a34a',
    fillColor: '#86efac',
    fillOpacity: 0.7
  }).addTo(map).bindPopup('Sample Field')
})
</script>

<template>
    <div class="bg-white overflow-hidden">
      <h3 class="text-xl font-semibold mb-5 text-green-700 px-2">🗺️ Field Map</h3>
      <div id="map" class="w-full h-[400px]"></div>
    </div>
</template>

<style scoped>

</style>