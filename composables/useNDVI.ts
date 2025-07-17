interface NDVIPoint {
    label: string
    value: number
}

export const useNDVI = async () => {
    const ndviChart = ref<NDVIPoint[]>([])
    const config = useRuntimeConfig()
    const apiKey = config.public.agromonitoringKey
    const polygonId = '6877718ac2d63ea32338cbc2'

    try {
        const { data } = await useFetch<any>(
            `https://api.agromonitoring.com/agro/1.0/polygons/${polygonId}?appid=${apiKey}`
        )

        const props = data.value?.geo_json?.properties

        if (props?.ndvi_ts && props?.ndvi_dt) {
            const ndviValues = props.ndvi_ts.split(',').map((val: string) => parseFloat(val))
            const ndviDates = props.ndvi_dt.split(',').map((ts: string) =>
                new Date(Number(ts) * 1000).toDateString()
            )

            ndviChart.value = ndviDates.map((label: string, i: number) => ({
                label,
                value: ndviValues[i] || 0
            }))
        }
    } catch (error) {
        console.error('Failed to fetch NDVI chart data:', error)
    }

    return { ndviChart }
}
