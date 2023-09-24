<script>
import {all} from "axios";

export default {
  data(){
    const allowArchive = window.localStorage.getItem('allowArchive') === 'true';
    return {
      allowArchive
    }
  },
  methods: {
    openInstances() {
      window.electron.ipcRenderer.send('open-instances-folder')
    },
    openDownloads() {
      window.electron.ipcRenderer.send('open-downloads-folder')
    },
    changeArchiveAllow(event){
      this.allowArchive = !this.allowArchive;
      window.localStorage.setItem('allowArchive', this.allowArchive)
    }
  }
}
</script>

<template>
  <div class="settingsPage__checkbox">
    <label for="allowArchive">
      <input type="checkbox" id="allowArchive" :checked="allowArchive" @change="changeArchiveAllow">
      Zezwól na zapis archiwów
    </label>
  </div>
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
