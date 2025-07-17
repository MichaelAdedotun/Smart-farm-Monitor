interface SummaryData {
    fields: number
    ndvi: number
    moisture: number
    sensors: number
}

interface NDVIPoint {
    dt: number
    ndvi: number
    cl: number
}

export const useSummary = async () => {
    const summary = ref<SummaryData | null>(null)

    const polygonId = '68776415e8a5760009392315'
    const config = useRuntimeConfig()
    const apiKey = config.public.agromonitoringKey

    try {
        const { data } = await useFetch<NDVIPoint[]>(
            `https://api.agromonitoring.com/agro/1.0/ndvi/history?polyid=${polygonId}&appid=${apiKey}`
        )

        const ndviValues = data.value?.map(d => d.ndvi) || []
        const avgNdvi = ndviValues.length
            ? parseFloat((ndviValues.reduce((a, b) => a + b, 0) / ndviValues.length).toFixed(2))
            : 0

        summary.value = {
            fields: 1,
            ndvi: avgNdvi,
            moisture: 22,
            sensors: 8
        }
    } catch (error) {
        console.error('Agromonitoring NDVI fetch failed:', error)
    }

    return { summary }
}
