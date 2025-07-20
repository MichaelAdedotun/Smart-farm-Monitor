<script setup lang="ts">

import { computed } from 'vue'
import { useNDVI } from '~/composables/useNDVI'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Filler, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale
} from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'

ChartJS.register(Filler, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const rawNDVI = await useNDVI()

const chartData = computed<ChartData<'line'>>(() => ({
  labels: rawNDVI.ndviChart.value.map((d) => d.label),
  datasets: [
    {
      label: 'NDVI',
      data: rawNDVI.ndviChart.value.map((d) => d.value),
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      fill: true,
      tension: 0.4
    }
  ]
}))

const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      suggestedMin: 0.3,
      suggestedMax: 1,
      ticks: {
        stepSize: 0.1
      }
    }
  }
}))
</script>

<template>
  <div class="bg-white rounded-xl shadow p-4 border border-sky-100">
    <h3 class="text-lg font-semibold mb-4 text-green-700">📈 NDVI Trend</h3>
    <div class="relative w-full h-[300px]">
      <client-only>
        <Line :data="chartData" :options="chartOptions" class="h-[300px]" />
      </client-only>
    </div>
  </div>
</template>

<style scoped>

</style>