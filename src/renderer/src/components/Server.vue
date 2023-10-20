<script>
import Minecraft from '../assets/js/Minecraft'
import router from "../router";
export default {
  props: ['sid', 'ip', 'modpackName', 'port', 'type', 'version', 'gameVersion', 'description', 'icon', 'maxPlayers', 'nowPlayers', 'title', 'online', 'modpackVersion'],
  setup() {
    const types = ['Vanilla', 'Forge', 'Fabric']

    return {
      types
    }
  },
  data() {
    let isExist = !!window.localStorage.getItem(`${this.sid}-modpack`);
    return {
      active: true,
      isExist
    }
  },
  mounted() {
    window.electron.ipcRenderer.on('progress-update', (event, _title) => {
      this.active = !(_title.length || _title.length > 0)
    })
  },
  methods: {
    async play(e) {
      e.preventDefault()

      if (!window.localStorage.getItem('localJavaPath')) {
        if (confirm('Nie zdefiniowano pliku wykonywalnego JAVA. Przejść do ustawień?')) {
          router.push('/settings')
        }
        return
      }

      if (!this.active) {
        alert('W trakcie łączenia z serwerem. Zakończ poprzednią grę zanim dołączysz do tego serwera')
        return
      }
      try {
        const total = this.type === 0 ? 3 : 6
        const launcher = new Minecraft()
        window.electron.ipcRenderer.send('update-download', 'Przygotowywanie środowiska', 1, total)

        await launcher.create(this.sid, this.version)

        window.electron.ipcRenderer.send('update-download', 'Instalacja minecraft', 2, total)

        switch (this.type) {
          default:
          case 0:
            await launcher.installVanilla()
            break
          case 1:
            await launcher.installVanilla()
            window.electron.ipcRenderer.send('update-download', 'Pobieranie Forge', 2, total)
            await launcher.installForge(this.gameVersion)
            window.electron.ipcRenderer.send('update-download', 'Pobieranie zależności', 3, total)
            await launcher.installDependencies()
            window.electron.ipcRenderer.send('update-download', 'Pobieranie modyfikacji', 4, total)
            launcher.setModpackVersion(this.modpackVersion)
            await launcher.installModpack(this.ip)
            window.electron.ipcRenderer.send(
              'update-download',
              'Rozpakowywanie modyfikacji',
              5,
              total
            )
            await launcher.extractModpack()
            break
          case 2:
            await launcher.installVanilla()
            window.electron.ipcRenderer.send('update-download', 'Pobieranie Fabric', 2, total)
            await launcher.installFabric(this.gameVersion)
            window.electron.ipcRenderer.send('update-download', 'Pobieranie zależności', 3, total)
            await launcher.installDependencies()
            window.electron.ipcRenderer.send('update-download', 'Pobieranie modyfikacji', 4, total)
            launcher.setModpackVersion(this.modpackVersion)
            await launcher.installModpack(this.ip)
            window.electron.ipcRenderer.send(
              'update-download',
              'Rozpakowywanie modyfikacji',
              5,
              total
            )
            await launcher.extractModpack()
            break
        }
        launcher.setServer(this.ip, this.port)
        window.electron.ipcRenderer.send('update-download', 'Łączenie z serwerem', total, total)
        await launcher.launch()
      } catch (err) {
        alert(err)
      }
      this.active = true
    },
    async remove(e){
      e.preventDefault()
      const launcher = new Minecraft()
      await launcher.create(this.sid, this.version);
      launcher.setModpackVersion(this.modpackVersion)
      launcher.removeInstance()
      alert(`Instancja ${this.modpackName} została usunięta`);
      location.reload(true);
    }
  }
}
</script>

<template>
  <div :class="isExist ? 'singleServer singleServer--removable' : 'singleServer'">
    <div class="singleServer__icon">
      <img :src="icon ?? 'https://mc.codepie.pl/placeholder.webp'" :alt="title" />
    </div>
    <div class="singleServer__title">
      <p>Nazwa: {{modpackName}}</p>
      <p>ID: {{ sid }} (v{{ modpackVersion }})</p>
      <p>IP: {{ ip }}</p>
    </div>
    <div class="singleServer__type">
      <p>{{ types[type] }}</p>
      <p>{{ version }}</p>
    </div>
    <div class="singleServer__players">
      {{ nowPlayers }} / {{ maxPlayers }}
    </div>
    <div class="singleServer__status">
      <span :class="online ? 'online' : 'offline'" :title="online ? 'Online' : 'Offline'"></span>
    </div>
    <div class="singleServer__play" title="Połącz" @click="play">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <path
          fill="#ffffff"
          d="M9.525 18.025q-.5.325-1.012.038T8 17.175V6.825q0-.6.513-.888t1.012.038l8.15 5.175q.45.3.45.85t-.45.85l-8.15 5.175Z"
        />
      </svg>
    </div>
    <div v-if="isExist" class="singleServer__play" title="Usuń" @click="remove">
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="#ffffff" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"/></svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/css/variables';
.singleServer {
  display: grid;
  grid-template-columns: 70px 260px 1fr 1fr 20px 32px;
  gap: 6px;
  align-items: center;
  padding: 8px;
  background-color: rgba($c-gray--dark, 0.4);
  transition: background-color 0.3s ease;

  &--removable{
    grid-template-columns: 70px 260px 1fr 1fr 20px 32px 32px;
  }

  &:hover {
    background-color: rgba($c-gray--dark, 0.5);
  }
  &__icon {
    img {
      width: 70px;
      height: auto;
      aspect-ratio: 1/1;
      object-fit: cover;
      border: 2px solid $c-gray--dark;
      border-radius: 8px;
    }
  }

  &__title {
    p {
      margin-bottom: 8px;
    }
    span {
      font-size: 8px;
    }
  }

  &__players {
    font-size: 12px;
  }

  &__status {
    span {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 50%;

      &.online {
        background-color: $c-green;
      }

      &.offline {
        background-color: $c-red;
      }
    }
  }

  &__play {
    cursor: pointer;

    svg path {
      transition: fill 0.3s ease;
    }

    &:hover svg path {
      fill: $c-green;
    }
  }
}
</style>
