const {autoUpdater} = require('electron-updater')
const {dialog, app} = require('electron')

let downloadActive = false
export const initAutoUpdater = () => {
    autoUpdater.logger = require('electron-log')
    autoUpdater.autoDownload = false
    autoUpdater.channel = 'latest'
    autoUpdater.autoInstallOnAppQuit = true

    // autoUpdater.forceDevUpdateConfig = true

    initAutoUpdaterEvents();

    autoUpdater.checkForUpdates()

  setInterval(() => {
    if(!downloadActive){
      autoUpdater.checkForUpdates()
    }
  }, 300000)
}

const initAutoUpdaterEvents = () => {
    autoUpdater.on('update-available', (info) => {
        setTimeout(() => {
          downloadActive = true
            dialog.showMessageBox({
                type: 'info',
                buttons: ['CIAAAASTKAAAA!', 'Boli mnie brzuszek...'],
                message: `Dostępna aktualizacja!`,
                detail: 'Nowy dzień nowe ciasteczka! Upieczmy je razem już teraz'
            }).then(value => {
                if (value.response === 0) {
                  autoUpdater.downloadUpdate()
                } else {
                  downloadActive = false
                }
            })
        }, 500)
    })

    autoUpdater.on('update-downloaded', (info) => {
        dialog.showMessageBox({
            type: 'info',
            buttons: ['Hura ciasteczka!', 'Meh, może potem'],
            message: `Aktualizacja pobrana!`,
            detail: 'Twoje ciasteczka są już gotowe, teraz tylko trzeba je wyciągnąć i można jeść!'
        }).then(value => {
          downloadActive = false
            if (value.response === 0) autoUpdater.quitAndInstall()
        })
    })
}
