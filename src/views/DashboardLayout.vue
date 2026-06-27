<script setup lang="ts">
import DashSidebar from '@/components/dashboard/DashSidebar.vue'
</script>

<template>
  <div class="dash-root">
    <DashSidebar />
    <div class="dash-main">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.dash-root {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}
.dash-main {
  flex: 1;
  min-width: 0;
  padding: 28px 32px 48px;
  overflow-y: auto;
}
@media (max-width: 900px) {
  .dash-root { flex-direction: column; }
  .dash-main { padding: 20px 16px 40px; }
}
</style>
