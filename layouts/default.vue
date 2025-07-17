<script setup lang="ts">

</script>

<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main class="flex-1 overflow-auto px-6 py-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>