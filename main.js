const {
    app,
    BrowserWindow
} = require('electron');
const url = require('url');
const path = require('path');
const data = require('./app');
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    // mainWindow.loadURL(url.format({
    //   pathname: path.join(__dirname, 'static/index.html'),
    //   protocol: 'file',
    //   slashes: true
    // }));

    mainWindow.loadURL('http://localhost:4000');

    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})