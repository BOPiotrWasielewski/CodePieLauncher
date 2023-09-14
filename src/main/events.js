import { ipcMain } from 'electron'
import { v4 as uuidv4 } from 'uuid'
import { downloadPath, instancesPath, rootPath } from './structure'
const { YggdrasilClient } = require('@xmcl/user')

const getMicrosoftToken = async () => {
  const { Auth } = require('msmc')
  const authManager = new Auth('select_account')
  const xboxManager = await authManager.launch('electron')
  const token = await xboxManager.getMinecraft()

  console.log(token.mclc())
  console.log()

  return {
    logged_in: token.profile.name.length > 0,
    nickname: token.profile.name,
    token: token.mclc().access_token,
    uuid: token.profile.id,
    skins: token.profile.skins
  }
}

const getMojangToken = async (username, password) => {
  const client = new YggdrasilClient('https://authserver.mojang.com')
  let uuid = uuidv4()
  const auth = await client.login({ username, password, uuid })
  const valid = await client.validate(auth.accessToken, uuid)

  return {
    logged_in: valid,
    nickname: auth.selectedProfile.name,
    token: auth.accessToken,
    uuid: auth.selectedProfile.id
  }
}

export const events = (app, win) => {
  ipcMain.on('close-app', () => {
    app.quit()
  })
  ipcMain.on('minimize-app', () => {
    win.isMinimized() ? win.restore() : win.minimize()
  })
  ipcMain.on('ms-account', async (event) => {
    const user = await getMicrosoftToken()
    event.reply('ms-account-reply', user)
  })
  ipcMain.on('mojang-account', async (event, email, pass) => {
    const user = await getMojangToken(email, pass)
    event.reply('mojang-account-reply', user)
  })
  ipcMain.on('update-download', async (event, title, current, total) => {
    event.reply('progress-update', title, current, total)
  })
  ipcMain.handle('getRootPath', async (event, type) => {
    switch (type) {
      case 'root':
      default:
        return rootPath
      case 'instance':
        return instancesPath
      case 'download':
        return downloadPath
    }
  })
}
