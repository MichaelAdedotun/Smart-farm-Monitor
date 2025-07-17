
interface AlertItem {
    message: string
    timestamp: string
}

export const useAlerts = async () => {
    const alerts = ref<AlertItem[]>([])

    try {
        // Simulate dynamic fetch (replace with real API when available)
        alerts.value = [
            {
                message: 'NDVI dropped below 0.5 in Field A',
                timestamp: '2025-07-13'
            },
            {
                message: 'Soil moisture critical in Field B',
                timestamp: '2025-07-12'
            },
            {
                message: 'Sensor #12 not responding',
                timestamp: '2025-07-11'
            }
        ]
    }
    catch (error) {
        console.error('Failed to fetch alerts:', error)
    }

    return { alerts }
}
