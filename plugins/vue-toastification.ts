import type {PluginOptions} from 'vue-toastification'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
    const options: PluginOptions = {
        position: 'top-right' as any,
        timeout: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        hideProgressBar: false,
        closeButton: 'button'
    }

    nuxtApp.vueApp.use(Toast, options)
})