import { app, BrowserWindow } from 'electron'
import path from 'path'
import url from 'url'

import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'

const userDataPath = app.getPath('userData')
const filePath = {
  root: path.join(__dirname, '../renderer/index.html'),
  settings: path.join(userDataPath, 'Settings'),
  defaultSettings: path.join(__dirname, '../common/defaultSettings.json')
}

let mainWindow = null

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 728
  })

  mainWindow.loadURL(url.format({
    pathname: filePath.root,
    protocol: 'file:',
    slashes: true
  }))

  const devtronInstalled = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
  if (!devtronInstalled) {
    BrowserWindow.addDevToolsExtension(require('devtron').path)
  }

  installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
    .then((name) => console.log(`Added Extension: ${name}`))
    .catch((err) => console.log('An error occurred: ', err))

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
