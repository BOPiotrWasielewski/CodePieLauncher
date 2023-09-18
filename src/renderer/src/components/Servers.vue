<script>
import axios from 'axios'
import Server from './Server.vue'
import DownloadBar from './DownloadBar.vue'

export default {
  components: {
    DownloadBar,
    Server
  },
  async setup() {
    /* server.server_type
     * 0 - Vanilla
     * 1 - Forge
     * 2 - Fabric
     * */
    const manifest = await axios.get('https://mc.codepie.pl/servers.json')
    const servers = manifest.data.serverList
    for (let server of servers) {
      let res = await axios.get(
          `https://mcapi.xdefcon.com/server/${server.server_ip}:${server.server_port}/full/json`
      )
      server['data'] = {
        id: server.id,
        description: res.data.serverStatus === 'online' ? res.data.motd.text : null,
        icon: res.data.serverStatus === 'online' ? res.data.icon : null,
        players: {
          max: res.data.serverStatus === 'online' ? res.data.maxplayers : 0,
          now: res.data.serverStatus === 'online' ? res.data.players : 0
        },
        name: server.server_ip,
        online: res.data.serverStatus === 'online',
        modpackVersion: server.modpack_version ?? 0
      }
    }

    return {
      servers
    }
  },
  data() {
    return {
      onWait: true
    }
  },
  mounted() {
    window.electron.ipcRenderer.on('progress-update', (event, _title) => {
      this.onWait = !(_title.length || _title.length > 0)
    })
  },
  methods: {
    updateServerList() {
      if(!this.onWait) return;
      location.reload(true)
    }
  }
}
</script>

<template>
  <div class="serverList">
    <Server
      v-for="server in servers"
      :key="server.id"
      :sid="server.id"
      :ip="server.server_ip"
      :port="server.server_port"
      :type="server.server_type"
      :version="server.server_version"
      :gameVersion="server.game_version ?? null"
      :description="server.data.description"
      :icon="server.data.icon"
      :maxPlayers="server.data.players.max"
      :nowPlayers="server.data.players.now"
      :title="server.data.name"
      :online="server.data.online"
      :modpackVersion="server.data.modpackVersion"
    />
    <div class="serverList__update">
      <button class="button" @click="updateServerList">
        Odśwież
      </button>
    </div>
    <DownloadBar />
  </div>
</template>

<style scoped lang="scss">
@import './../assets/css/variables';
@import './../assets/css/buttons';
.serverList {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px 32px 16px;
  position: relative;

  &__update{
    text-align: center;

    button{
      width: 100%;
      background-color: $c-gray;
    }
  }
}
</style>
