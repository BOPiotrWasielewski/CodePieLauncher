import { is } from '@electron-toolkit/utils'
import path from 'path'
const fs = require('fs')
const { app } = require('electron')

const execPath = `${app.getPath('userData')}\\com.pielauncher.app`
export const rootPath = is.dev ? `${execPath}\\test` : `${execPath}\\..`
export const instancesPath = `${rootPath}/instances`
export const downloadPath = `${rootPath}/download`

export const initializeLauncher = () => {
  if (!fs.existsSync(instancesPath)) {
    fs.mkdirSync(instancesPath, { recursive: true })
  }
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath, { recursive: true })
  }
}
