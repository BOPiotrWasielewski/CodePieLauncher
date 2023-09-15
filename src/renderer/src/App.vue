<script>
export default {
  data(){
    return {
      version: null
    }
  },
  async mounted() {
    window.electron.ipcRenderer.invoke('get-version').then(res => {
      if(res) this.version = res

      console.log(this.version)
    }).catch(err => console.error(err))
  },
  methods: {
    minimizeWindow() {
      window.electron.ipcRenderer.send('minimize-app')
    },
    closeWindow() {
      window.electron.ipcRenderer.send('close-app')
    }
  }
}
</script>
<template>
  <header class="header">
    <svg class="header__icon" viewBox="0 0 48 48" width="24" height="24">
      <use xlink:href="./assets/icons.svg#icon" />
    </svg>
    <p>
      Pie Launcher v{{ version }}
    </p>
    <span class="header__minimize" @click="minimizeWindow">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <use xlink:href="./assets/icons.svg#minimize" />
      </svg>
    </span>
    <span class="header__close" @click="closeWindow">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <use xlink:href="./assets/icons.svg#close" />
      </svg>
    </span>
  </header>
  <router-view />
</template>
<style scoped lang="scss">
@import './assets/css/variables';
.header {
  width: 100%;
  height: 50px;
  padding-left: 16px;
  -webkit-app-region: drag;
  display: flex;
  align-items: center;

  p {
    margin-bottom: 0;
    margin-left: 12px;
    margin-right: auto;
  }
  &__close,
  &__minimize {
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-app-region: no-drag;
    padding: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  &__minimize {
    width: 50px;
    height: 100%;

    &:hover {
      background-color: $c-yellow;
    }
  }

  &__close {
    width: 60px;
    height: 100%;

    &:hover {
      background-color: $c-red;
    }
  }
}
</style>
