<script setup lang="ts">

import { ref, onMounted, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {Chart as ChartJS,
  Filler, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale
} from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'

ChartJS.register(Filler, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const ndviChart = ref<{ label: string; value: number }[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const config = useRuntimeConfig()
    const apiKey = config.public.agromonitoringKey
    const polygonId = '6877718ac2d63ea32338cbc2'

    const response = await $fetch<any>(`https://api.agromonitoring.com/agro/1.0/polygons/${polygonId}?appid=${apiKey}`)
    const props = response?.geo_json?.properties

    if (props?.ndvi_ts && props?.ndvi_dt) {
      const ndviValues = props.ndvi_ts.split(',').map((val: string) => parseFloat(val))
      const ndviDates = props.ndvi_dt.split(',').map((ts: string) =>
          new Date(Number(ts) * 1000).toDateString()
      )

      ndviChart.value = ndviDates.map((label: string, i: number) => ({
        label,
        value: ndviValues[i] || 0
      }))
    } else {
      error.value = 'No NDVI data found.'
    }
  } catch (err) {
    error.value = 'Failed to fetch NDVI data.'
  } finally {
    loading.value = false
  }
})

const chartData = computed<ChartData<'line'>>(() => ({
  labels: ndviChart.value.map(d => d.label),
  datasets: [
    {
      label: 'NDVI',
      data: ndviChart.value.map(d => d.value),
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
      ticks: { stepSize: 0.1 }
    }
  }
}))
</script>

<template>
  <div class="bg-white rounded-xl shadow p-4 border border-sky-100">
    <h3 class="text-lg font-semibold mb-4 text-green-700">📈 NDVI Trend</h3>

    <div v-if="loading" class="text-sm text-gray-400">Loading NDVI data...</div>
    <div v-else-if="error" class="text-sm text-red-500">{{ error }}</div>

    <div v-else class="relative w-full h-[300px]">
      <client-only>
        <Line
            v-if="ndviChart.length"
            :data="chartData"
            :options="chartOptions"
        />
      </client-only>
    </div>
  </div>
</template>

<style scoped>

</style>