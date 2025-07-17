<script setup lang="ts">


</script>

<template>
  <div class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <DashboardDetailsWeatherPanel />
      <DashboardDetailsSummaryCards />
      <DashboardDetailsAlertsPanel class="md:col-span-2 xl:col-span-1"  />
    </div>

    <DashboardDetailsFieldMap class="w-full  bg-gray-100 rounded-lg shadow" />

    <DashboardDetailsFieldChart />
  </div>
</template>

<style scoped>

</style>