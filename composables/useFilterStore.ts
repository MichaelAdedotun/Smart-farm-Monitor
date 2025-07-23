import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilterStore = defineStore('filter', () => {
    const range = ref<'today' | '7d' | '30d'>('today')
    const location = ref<string>('')

    const setRange = (value: 'today' | '7d' | '30d') => {
        range.value = value
    }

    const setLocation = (value: string) => {
        location.value = value
    }

    return {
        range,
        location,
        setRange,
        setLocation
    }
})