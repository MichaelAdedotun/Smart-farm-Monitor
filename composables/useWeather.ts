import { ref, computed, watchEffect } from 'vue'
import { useFilterStore } from '~/composables/useFilterStore'
import { locationMap } from '~/constants/locationMap'

interface WeatherData {
    temperature: number
    humidity: number
    wind_speed: number
    precipitation: number
    uv_index: number
}

interface OpenMeteoResponse {
    current: {
        temperature_2m: number
        relative_humidity_2m: number
        wind_speed_10m: number
        precipitation: number
        uv_index: number
    }
}

export const useWeather = () => {
    const weather = ref<WeatherData | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const filter = useFilterStore()
    const coords = computed(() => locationMap[filter.location] ?? null)

    const getDateRange = (): string => {
        const today = new Date()
        const past = new Date()

        switch (filter.range) {
            case '7d':
                past.setDate(today.getDate() - 7)
                break
            case '30d':
                past.setDate(today.getDate() - 30)
                break
            default:
                return ''
        }

        const format = (d: Date) => d.toISOString().split('T')[0]
        return `&start_date=${format(past)}&end_date=${format(today)}`
    }

    const fetchWeather = async () => {
        if (!coords.value) return
        isLoading.value = true
        error.value = null

        try {
            const rangeQuery = getDateRange()
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.value.lat}&longitude=${coords.value.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,uv_index${rangeQuery}`
            const { data } = await useFetch<OpenMeteoResponse>(url)

            if (data.value?.current) {
                weather.value = {
                    temperature: data.value.current.temperature_2m,
                    humidity: data.value.current.relative_humidity_2m,
                    wind_speed: data.value.current.wind_speed_10m,
                    precipitation: data.value.current.precipitation,
                    uv_index: data.value.current.uv_index
                }
            }
        } catch (err: any) {
            console.error('Failed to fetch Open-Meteo data:', err)
            error.value = err.message || 'Weather fetch error'
        } finally {
            isLoading.value = false
        }
    }

    watchEffect(() => {
        if (filter.location) fetchWeather()
    })

    return { weather, isLoading, error }
}
