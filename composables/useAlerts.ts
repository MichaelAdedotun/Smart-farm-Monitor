import { ref, watchEffect } from 'vue'
import { useFilterStore } from '~/composables/useFilterStore'
import { locationMap } from '~/constants/locationMap'

interface AlertItem {
    title: string
    message: string
    timestamp: string
}

export const useAlerts = () => {
    const alerts = ref<AlertItem[]>([])
    const filter = useFilterStore()

    const fetchAlerts = async () => {
        const location = filter.location
        if (!locationMap[location]) return

        try {
            alerts.value = [
                {
                    title: 'NDVI Warning',
                    message: `NDVI dropped below 0.5 in ${location}.`,
                    timestamp: '2025-07-13'
                },
                {
                    title: 'Soil Alert',
                    message: `Soil moisture critical in ${location}`,
                    timestamp: '2025-07-12'
                },
                {
                    title: 'Sensor Error',
                    message: `Sensor #12 not responding in ${location}`,
                    timestamp: '2025-07-11'
                }
            ]
        } catch (error) {
            console.error('Failed to fetch alerts:', error)
        }
    }

    watchEffect(() => {
        if (filter.location) fetchAlerts()
    })

    return { alerts }
}
