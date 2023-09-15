const { autoUpdater, AppUpdater } = require('electron-updater')
const { dialog, app } = require('electron')

export const initAutoUpdater = () => {
  autoUpdater.autoDownload = false
  autoUpdater.channel = 'latest'
  autoUpdater.autoInstallOnAppQuit = true
  // autoUpdater.forceDevUpdateConfig = true

  initAutoUpdaterEvents();

  autoUpdater.checkForUpdates()
}

const initAutoUpdaterEvents = () => {
  autoUpdater.on('update-available', (info) => {
    setTimeout(() => {
        dialog.showMessageBox({
            type: 'info',
            buttons: [ 'CIAAAASTKAAAA!', 'Boli mnie brzuszek...' ],
            message: `Dostępna aktualizacja!`,
            detail: 'Nowy dzień nowe ciasteczka! Upieczmy je razem już teraz'
        }).then(value => {
            if(value.response === 0) autoUpdater.downloadUpdate()
        })
    }, 500)
  })

  autoUpdater.on('update-downloaded', (info) => {
        dialog.showMessageBox({
            type: 'info',
            buttons: [ 'Hura ciasteczka!', 'Meh, może potem' ],
            message: `Aktualizacja pobrana!`,
            detail: 'Twoje ciasteczka są już gotowe, teraz tylko trzeba je wyciągnąć i można jeść!'
        }).then(value => {
            if(value.response === 0) autoUpdater.quitAndInstall()
        })
  })
}
