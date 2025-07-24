<script setup lang="ts">

definePageMeta({ layout: 'public' })
</script>

<template>
  <section class="relative h-screen bg-cover bg-center"
           style="background-image: url('/images/hero-smart-farm.jpg')">
    <div class="absolute inset-0 bg-black opacity-60"></div>
    <div class="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 md:px-20">
      <h1 class="text-4xl md:text-6xl text-white/90 font-bold mb-4">
        Smart Farm Monitor
      </h1>
      <p class="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
        Visualize your fields, monitor crop health, and optimize yield
        in real-time using satellite and weather data. <br>
        Real‑time weather, soil, and crop health insights for smarter farming decisions
      </p>
      <NuxtLink to="/auth/login"
                class="mt-6 px-10 py-3 bg-gradient-to-r from-green-600 to-amber-500 text-white rounded hover:from-green-700 hover:to-amber-600">
        Get Started
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>

</style>