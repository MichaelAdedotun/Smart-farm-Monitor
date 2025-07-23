
import { ref, computed, watchEffect } from 'vue'
import { useFilterStore } from '~/composables/useFilterStore'

interface SummaryData {
    fields: number
    ndvi: number
    moisture: number
    sensors: number
}

export const useSummary = () => {
    const summary = ref<SummaryData | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const filter = useFilterStore()
    const config = useRuntimeConfig()
    const apiKey = config.public.agromonitoringKey

    // Fixed demo polygon ID (same as NDVI source)
    const polygonId = '6877718ac2d63ea32338cbc2'

    const fetchSummary = async () => {
        isLoading.value = true
        error.value = null

        try {
            const data = await $fetch<any>(
                `https://api.agromonitoring.com/agro/1.0/polygons/${polygonId}?appid=${apiKey}`
            )

            const props = data?.geo_json?.properties

            if (!props?.ndvi_ts || !props?.ndvi_dt) {
                console.warn('NDVI data missing in polygon properties')
                summary.value = null
                return
            }

            const ndviValues: number[] = props.ndvi_ts.split(',').map((val: string) => parseFloat(val))
            const avgNdvi = ndviValues.length
                ? parseFloat((ndviValues.reduce((a, b) => a + b, 0) / ndviValues.length).toFixed(2))
                : 0

            summary.value = {
                fields: 1,
                ndvi: avgNdvi,
                moisture: 22,
                sensors: 8
            }
        } catch (err: any) {
            console.error('Agromonitoring polygon NDVI fetch failed:', err)
            error.value = err.message || 'Summary fetch error'
        } finally {
            isLoading.value = false
        }
    }

    watchEffect(() => {
        if (filter.location) fetchSummary()
    })

    return {
        summary,
        isLoading,
        error
    }
}
