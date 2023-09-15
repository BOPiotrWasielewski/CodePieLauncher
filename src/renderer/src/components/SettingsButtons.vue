<script>
export default {
  methods: {
    openInstances() {
      window.electron.ipcRenderer.send('open-instances-folder')
    },
    openDownloads() {
      window.electron.ipcRenderer.send('open-downloads-folder')
    }
  }
}
</script>

<template>
  <div class="settingsPage__buttons">
    <button class="button" @click="openInstances">Folder instancji</button>
    <button class="button" @click="openDownloads">Folder pobierania</button>
  </div>
</template>

<style scoped lang="scss">
@import './../assets/css/variables';
@import './../assets/css/buttons';

.settingsPage__buttons{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  button{
    font-size: 16px;
  }
}
</style>
