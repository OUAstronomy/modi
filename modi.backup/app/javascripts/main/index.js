var electron, path, json;

path = require('path');
json = require('../../package.json');
var modiJson = require(path.join(__dirname,'modisetup.json'));


electron = require('electron');

electron.app.on('ready', function() {
  var window;

  // Define some Window options
  windowOptions = {
    title: json.name,
    width: modiJson.settings.width,
    height: modiJson.settings.height,
    minWidth: modiJson.settings.minWidth,
    minHeight: modiJson.settings.minHeight
  };

  window = new electron.BrowserWindow(windowOptions);

  window.loadURL('file://' + path.join(__dirname, '..', '..') + '/index.html');

  window.webContents.on('did-finish-load', function(){
    window.webContents.send('loaded', {
      appName: json.name,
      modiVersion: json.version,
      electronVersion: process.versions.electron,
      nodeVersion: process.versions.node,
      chromiumVersion: process.versions.chrome
    },modiJson);
  });

  window.on('closed', function() {
    window = null;
  });

});
