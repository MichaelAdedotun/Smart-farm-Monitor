<script setup lang="ts">

import { onMounted, watchEffect } from 'vue'
import { useFilterStore } from '~/composables/useFilterStore'
import { locationMap } from '~/constants/locationMap'

let map: any
let L: any

const filter = useFilterStore()

onMounted(async () => {
  L = await import('leaflet')

  const coords = locationMap[filter.location] || { lat: 6.52, lon: 3.37 }

  map = L.map('map').setView([coords.lat, coords.lon], 8)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  addCircle(coords)
})

const addCircle = (coords: { lat: number; lon: number }) => {
  if (!map || !L) return
  L.circleMarker([coords.lat, coords.lon], {
    radius: 8,
    color: '#16a34a',
    fillColor: '#86efac',
    fillOpacity: 0.7
  })
      .addTo(map)
      .bindPopup(`${filter.location || 'Sample'} Field`)
}

watchEffect(() => {
  const coords = locationMap[filter.location]
  if (coords && map) {
    map.setView([coords.lat, coords.lon], 8)
    addCircle(coords)
  }
})
</script>

<template>
  <div class="bg-white overflow-hidden">
    <h3 class="text-xl font-semibold mb-5 text-green-700 px-2">🗺️ Field Map</h3>
    <div id="map" class="w-full h-[400px] z-20"></div>
  </div>
</template>

<style scoped>

</style>