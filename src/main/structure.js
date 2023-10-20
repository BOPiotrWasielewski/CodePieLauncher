const fs = require('fs')
const { app } = require('electron')

const execPath = `${app.getPath('userData')}`
export const rootPath = execPath
export const instancesPath = `${rootPath}\\instances`
export const downloadPath = `${rootPath}\\download`
export const javaPath = `${rootPath}\\java`

export const initializeLauncher = () => {
  if (!fs.existsSync(instancesPath)) {
    fs.mkdirSync(instancesPath, { recursive: true })
  }
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath, { recursive: true })
  }
  if (!fs.existsSync(javaPath)) {
    fs.mkdirSync(javaPath, { recursive: true })
  }
}
