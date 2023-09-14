import router from '../../router'

const {
  getVersionList,
  getLoaderArtifactListFor,
  installTask,
  installFabric,
  installDependenciesTask
} = require('@xmcl/installer')
const { MinecraftFolder, launch, Version } = require('@xmcl/core')
const { download: getModpack } = require('@xmcl/file-transfer')
const decompress = require('decompress')
const fs = require('fs')

class Minecraft {
  async create(sid, version) {
    this.sid = sid
    this.version = version
    this.instancePath = await window.electron.ipcRenderer.invoke('getRootPath', 'instance')
    this.downloadPath = await window.electron.ipcRenderer.invoke('getRootPath', 'download')
    this.instance = new MinecraftFolder(`${this.instancePath}/${this.sid}`)
    this.javaPath = window.localStorage.getItem('localJavaPath')
    this.token = window.localStorage.getItem('token')
    this.allocatedRam = window.localStorage.getItem('allocatedRam')
    this.uuid = window.localStorage.getItem('uuid')
    this.nickname = window.localStorage.getItem('nickname')
    this.server = null
  }
  getOptions() {
    return {
      gameProfile: {
        name: this.nickname,
        id: this.uuid,
        skins: [
          {
            state: 'ACTIVE',
            url: 'https://www.minecraftskins.com/uploads/skins/2023/08/26/----calling-me-home---te-----21927620.png',
            variant: 'CLASSIC'
          }
        ]
      },
      accessToken: this.token,
      launcherName: 'Pie Launcher',
      resolution: {
        width: 900,
        height: 670
      },
      gamePath: this.instance.root,
      javaPath: this.javaPath,
      minMemory: 2048,
      maxMemory: parseInt(this.allocatedRam) * 1024,
      version: this.version,
      extraExecOption: {detached: true},
      server: this.server ?? null,
      prechecks: null
    }
  }
  setServer(ip, port) {
    this.server = {
      ip,
      port
    }
  }
  setModpackVersion(version) {
    this.modpackVersion = version
  }
  async installVanilla() {
    const list = (await getVersionList()).versions
    const _index = list.findIndex((item) => item.id === this.version)
    const _version = list[_index]

    const installMinecraft = installTask(_version, this.instance)
    let failed = 0
    do {
      failed = 0
      try {
        await installMinecraft.startAndWait({
          onFailed() {
            failed = 1
          }
        })
      } catch (err) {
        /* empty */
      }
    } while (failed)
  }

  async installFabric() {
    const _version = (await getLoaderArtifactListFor(this.version))[0]

    await installFabric(_version, this.instance)
    this.version = `${_version.intermediary.version}-fabric${_version.loader.version}`
  }
  async installDependencies() {
    const _version = await Version.parse(this.instance, this.version)
    const installDependenciesLib = installDependenciesTask(_version, this.instance)
    let failed = 0
    do {
      failed = 0
      try {
        await installDependenciesLib.startAndWait({
          onFailed() {
            failed = 1
          }
        })
      } catch (err) {
        /* empty */
      }
    } while (failed)
  }
  async installModpack(ip) {
    if (!fs.existsSync(`${this.downloadPath}/${this.sid}-${this.modpackVersion}.zip`)) {
      await getModpack({
        url: `https://${ip}/clients/${this.sid}-latest.zip`,
        destination: `${this.downloadPath}/${this.sid}-${this.modpackVersion}.zip`
      })
    }
  }
  async extractModpack() {
    try {
      await decompress(
        `${this.downloadPath}/${this.sid}-${this.modpackVersion}.zip`,
        `${this.instance.root}`
      )
    } catch (err) {
      console.error(err)
    }
  }
  async launch() {
    try {
      const proc = launch(this.getOptions())
      proc.then((res) => {
        console.log(res)
        router.go('/panel')
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export default Minecraft
