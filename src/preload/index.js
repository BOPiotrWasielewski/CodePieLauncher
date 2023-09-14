import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
console.log('%cThere is monsters in here...', 'color:red;font-size:26px')

if (!window.localStorage.getItem('allocatedRam')) {
  window.localStorage.setItem('allocatedRam', 2)
}
if (!window.localStorage.getItem('localJavaPath')) {
  window.localStorage.setItem('localJavaPath', '')
}
