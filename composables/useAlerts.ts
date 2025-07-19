interface AlertItem {
    title: string
    message: string
    timestamp: string
}

export const useAlerts = async () => {
    const alerts = ref<AlertItem[]>([])

    try {
        alerts.value = [
            {
                title: 'NDVI Warning',
                message: 'NDVI dropped below 0.5 in Field A. Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                         'Cupiditate eveniet iste officia possimus reprehenderit, tempore.',
                timestamp: '2025-07-13'
            },
            {
                title: 'Soil Alert',
                message: 'Soil moisture critical in Field B',
                timestamp: '2025-07-12'
            },
            {
                title: 'Soil Alert',
                message: 'Soil moisture critical in Field B',
                timestamp: '2025-07-12'
            },
            {
                title: 'Sensor Error',
                message: 'Sensor #12 not responding',
                timestamp: '2025-07-11'
            },
            {
                title: 'Sensor Error',
                message: 'Sensor #12 not responding',
                timestamp: '2025-07-11'
            },
            {
                title: 'Sensor Error',
                message: 'Sensor #12 not responding',
                timestamp: '2025-07-11'
            },
            {
                title: 'Sensor Error',
                message: 'Sensor #12 not responding',
                timestamp: '2025-07-11'
            },
            {
                title: 'Sensor Error',
                message: 'Sensor #12 not responding',
                timestamp: '2025-07-11'
            },
            {
                title: 'Soil Alert',
                message: 'Soil moisture critical in Field B',
                timestamp: '2025-07-12'
            },
        ]
    }
    catch (error) {
        console.error('Failed to fetch alerts:', error)
    }

    return { alerts }
}

