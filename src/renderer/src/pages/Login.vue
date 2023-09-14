<script setup>
import Tabs from '../components/Tabs.vue'
import Tab from '../components/Tab.vue'
import OfflineLogin from '../components/OfflineLogin.vue'
import MojangLogin from '../components/MojangLogin.vue'
import MicrosoftLogin from '../components/MicrosoftLogin.vue'
import router from '../router'

if(window.localStorage.getItem('logged_in')) router.push('panel')
</script>

<template>
  <div class="loginPage">
    <Tabs class="loginPage__tabs">
      <Tab title="Bez konta">
        <OfflineLogin />
      </Tab>
      <Tab title="Mojang">
        <MojangLogin />
      </Tab>
      <Tab title="Microsoft">
        <MicrosoftLogin />
      </Tab>
    </Tabs>
  </div>
</template>

<style lang="scss">
@import '../assets/css/variables';
@import '../assets/css/main';

.loginPage {
  height: calc(100vh - 50px);
  &__tabs {
    height: calc(100% - 54px);
  }
}
</style>
