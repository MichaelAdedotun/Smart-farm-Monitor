<script setup lang="ts">

definePageMeta({ layout: 'public' })
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <section class="flex-1 flex flex-col items-center justify-center text-center px-4">
      <h2 class="text-4xl font-bold text-green-600">🌾 Smart Farm Monitor</h2>
      <p class="mt-4 text-lg text-gray-600 max-w-xl">
        Visualize your fields, monitor crop health, and optimize yield
        in real-time using satellite and weather data.
      </p>
      <NuxtLink to="/admin/dashboard" class="mt-6 px-10 py-3 bg-gradient-to-r from-green-600 to-amber-500 text-white rounded hover:from-green-700 hover:to-amber-600">
        Enter Dashboard
      </NuxtLink>
    </section>
  </div>
</template>

<style scoped>

</style>