// <index.js>
// Starts the main processes for the window
// Nickalas Reynolds
// MIT License @ 2018

var electron, path, glob, json, modiJson;

path = require('path');
glob = require('glob')
json = require(path.join(__dirname, '..','..','/package.json'));
modiJson = require(path.join(__dirname,'modisetup.json'));
var electron = require('electron');
// const autoUpdator = require(path.join(__dirname, './auto-updator.js'));

// starting application
electron.app.on('ready', function(){
  loadAllModules();
  createWindow();
  // when autoUpdator finished, uncomment
  // autoUpdator.initialize();
});

electron.app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    electron.app.quit();
  }
});

electron.app.on('activate', function() {
  if (mainWindow === null) {
    loadAllModules();
    createWindow();
  };
});

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
// function makeSingleInstance () {
//   if (process.mas) return false
//   return app.makeSingleInstance( function() {
//     if (mainWindow) {
//       if (mainWindow.isMinimized()) mainWindow.restore();
//       mainWindow.focus();
//     };
//   });
// };



// // Handle Squirrel on Windows startup events
// switch (process.argv[1]) {
//   case '--squirrel-install':
//     // autoUpdater.createShortcut(() => { app.quit() });
//     break
//   case '--squirrel-uninstall':
//     // autoUpdater.removeShortcut(() => { app.quit() });
//     break
//   case '--squirrel-obsolete':
//   case '--squirrel-updated':
//     app.quit();
//     break
//   default:
//     initialize();
// };

// general function for creating window
function createWindow () {
  var mainWindow,windowOptions

  // Define some Window options
  windowOptions = {
    title: json.name,
    width: modiJson.settings.width,
    height: modiJson.settings.height,
    minWidth: modiJson.settings.minWidth,
    minHeight: modiJson.settings.minHeight
  };

  // check OS
  if (process.platform === 'linux') {
    windowOptions.icon = path.join(__dirname, '..','..','/assets/icons/linux.png');
  };
  if (process.platform === 'windows') {
    windowOptions.icon = path.join(__dirname, '..','..','/assets/icons/windows.png');
  }; 
  if (process.platform === 'darwin') {
    windowOptions.icon = path.join(__dirname, '..','..','/assets/icons/macos.png');
  };

  mainWindow = new electron.BrowserWindow(windowOptions);
  mainWindow.loadURL('file://' + path.join(__dirname, '..', '..') + '/index.html');

  mainWindow.webContents.on('did-finish-load', function(){
    mainWindow.webContents.send('loaded', {
      appName: json.name,
      exampleBkgnd: modiJson.images.example,
      modiVersion: json.version,
      electronVersion: process.versions.electron,
      nodeVersion: process.versions.node,
      chromiumVersion: process.versions.chrome
    });
  });

  mainWindow.on('closed', function(){
    mainWindow = null;
  });
};

// Require each JS file in the main-process dir in root
function loadAllModules () {
  const files = glob.sync(path.join(__dirname, '../../main-process/**/*.js'));
  files.forEach((file) => { require(file) });
  // autoUpdater.updateMenu();
};
// <index.js>