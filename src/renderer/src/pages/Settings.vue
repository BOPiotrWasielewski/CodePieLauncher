<script>
import MemoryManager from '../components/MemoryManager.vue'
import router from '../router'
import JavaManager from '../components/JavaManager.vue'
import SettingsButtons from '../components/SettingsButtons.vue'
export default {
  components: { JavaManager, MemoryManager, SettingsButtons },
  methods: {
    back() {
      router.push('/panel')
    }
  }
}
</script>

<template>
  <div class="settingsPage">
    <nav>
      <span class="go-back" @click="back">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="#ffffff"
            d="m9.55 12l7.35 7.35q.375.375.363.875t-.388.875q-.375.375-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75q0-.375.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388q.375.375.375.875t-.375.875L9.55 12Z"
          />
        </svg>
      </span>
    </nav>
    <div class="settingsPage__options">
      <Suspense>
        <MemoryManager />
        <template #fallback>
          <div class="settingsPage__loading">Wczytywanie danych o pamięci RAM...</div>
        </template>
      </Suspense>
      <Suspense>
        <JavaManager />
      </Suspense>
      <SettingsButtons />
    </div>
  </div>
</template>

<style lang="scss">
@import '../assets/css/variables';
@import '../assets/css/main';

.settingsPage {
  height: calc(100vh - 50px);
  padding: 16px 32px;
  background-color: $c-gray--dark;

  nav {
    margin-bottom: 16px;
    span {
      cursor: pointer;

      svg path {
        transition: fill 0.3s ease;
      }

      &:hover svg path {
        fill: $c-green;
      }
    }
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: 64px;
  }
}
</style>
