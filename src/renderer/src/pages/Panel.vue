<script setup>
import Sidebar from '../components/Sidebar.vue'
import Servers from '../components/Servers.vue'
</script>

<template>
  <div class="panelPage">
    <Sidebar />
    <Suspense>
      <Servers />
      <template #fallback>
        <div class="panelPage__loading">Pobieranie danych...</div>
      </template>
    </Suspense>
  </div>
</template>

<style lang="scss">
@import '../assets/css/variables';
@import '../assets/css/main';

.panelPage {
  display: grid;
  grid-template-columns: 220px 1fr;

  &__loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
