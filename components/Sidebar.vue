<script setup lang="ts">

</script>

<template>
  <aside class="w-10 h-full bg-green-700 text-white px-7 py-4 md:w-50 xl:w-60">
    <div class="mb-8">
      <h2 class="text-3xl font-bold">Smart<span class="text-amber-400">Farm</span></h2>
    </div>
    <div class="flex flex-col space-y-5">
      <NuxtLink to="/dashboard" class="hover:text-amber-300">Dashboard</NuxtLink>
      <NuxtLink to="/" class="hover:text-amber-300">Alerts</NuxtLink>
      <NuxtLink to="/" class="hover:text-amber-300">Settings</NuxtLink>
    </div>
  </aside>
</template>

<style scoped>

</style>