import { ref, watchEffect } from 'vue'
import { useFilterStore } from '~/composables/useFilterStore'

interface NDVIPoint {
    label: string
    value: number
}

export const useNDVI = () => {
    const ndviChart = ref<NDVIPoint[]>([])
    const filter = useFilterStore()
    const config = useRuntimeConfig()
    const apiKey = config.public.agromonitoringKey

    // Hardcoded polygon ID (e.g., demo over Lagos)
    const polygonId = '6877718ac2d63ea32338cbc2'

    const fetchNDVI = async () => {
        try {
            const data = await $fetch<any>(
                `https://api.agromonitoring.com/agro/1.0/polygons/${polygonId}?appid=${apiKey}`
            )

            const props = data?.geo_json?.properties

            if (!props?.ndvi_ts || !props?.ndvi_dt) {
                console.warn('NDVI time-series not available in polygon properties')
                ndviChart.value = []
                return
            }

            const ndviValues = props.ndvi_ts.split(',').map((val: string) => parseFloat(val))
            const ndviDates = props.ndvi_dt.split(',').map((ts: string) =>
                new Date(Number(ts) * 1000).toDateString()
            )

            ndviChart.value = ndviDates.map((label: string, i: number) => ({
                label,
                value: ndviValues[i] || 0
            }))
        } catch (error) {
            console.error('Failed to fetch NDVI chart data:', error)
            ndviChart.value = []
        }
    }

    watchEffect(() => {
        if (filter.location) fetchNDVI()
    })

    return { ndviChart }
}
