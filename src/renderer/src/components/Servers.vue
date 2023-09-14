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
      :description="server.data.description"
      :icon="server.data.icon"
      :maxPlayers="server.data.players.max"
      :nowPlayers="server.data.players.now"
      :title="server.data.name"
      :online="server.data.online"
      :modpackVersion="server.data.modpackVersion"
    />
    <DownloadBar />
  </div>
</template>

<style scoped lang="scss">
.serverList {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px 32px 16px;
  position: relative;
}
</style>
