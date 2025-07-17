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

export const useWeather = async () => {
    const weather = ref<WeatherData | null>(null)

    try {
        const { data } = await useFetch<OpenMeteoResponse>(
            'https://api.open-meteo.com/v1/forecast?latitude=6.52&longitude=3.37&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,uv_index'
        )
        if (data.value?.current) {
            const extracted: WeatherData = {
                temperature: data.value.current.temperature_2m,
                humidity: data.value.current.relative_humidity_2m,
                wind_speed: data.value.current.wind_speed_10m,
                precipitation: data.value.current.precipitation,
                uv_index: data.value.current.uv_index
            }
            weather.value = extracted
        }
    }
    catch (err) {
        console.error('Failed to fetch Open-Meteo data:', err)
    }
    return { weather }
}