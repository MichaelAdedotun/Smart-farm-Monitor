// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css', 'leaflet/dist/leaflet.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    public: {
      agromonitoringKey: process.env.NUXT_PUBLIC_AGROMONITORING_API_KEY
    }
  },

  modules: ['@pinia/nuxt', '@nuxt/image'],
})