<script>
export default {
  data() {
    const localJavaPath = window.localStorage.getItem('localJavaPath')

    return {
      localJavaPath,
      value: localJavaPath
    }
  },
  methods: {
    update(event) {
      if (event.target.files.length > 0) {
        window.localStorage.setItem('localJavaPath', event.target.files[0].path)
        this.localJavaPath = event.target.files[0].path
      }
    },
    changePath() {
      document.querySelector('#javapath').click()
    }
  }
}
</script>

<template>
  <div class="javaManager">
    <label>Ścieżka JAVA</label>
    <div class="javaManager__input">
      <span>
        {{ localJavaPath.length > 0 ? localJavaPath : 'Ścieżka do pliku javaw.exe' }}
      </span>
      <button class="button" @click="changePath">Zmień</button>
      <input id="javapath" type="file" accept=".exe" @change="update($event)" />
    </div>
    <p>Do działania wymagana jest JAVA w wersji <a href="https://download.oracle.com/java/17/archive/jdk-17.0.9_windows-x64_bin.exe">JDE 17</a> (w zależności od systemu). Zainstaluj i wybierz plik javaw.exe</p>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/css/variables';
@import './../assets/css/buttons';
.javaManager {
  p {
    font-size: 12px;

    a{
      transition: color .3s ease;
      &:hover{
        color: $c-green;
      }
    }
  }
  &__input {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 16px;

    span {
      display: block;
      width: 100%;
      background-color: $c-gray;
      padding: 12px;
      border-radius: 8px;
      overflow-y: hidden;
      white-space: nowrap;

      &::-webkit-scrollbar {
        position: absolute;
        bottom: -10px;
        height: 10px;
        width: 10px;
        background-color: $c-gray;
        border-radius: 8px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: $c-green;
        border-radius: 4px;
      }
    }

    button.button {
      padding: 8px 12px;
      font-size: 16px;
      height: 100%;
    }

    input[type='file'] {
      display: none;
    }
  }
}
</style>
