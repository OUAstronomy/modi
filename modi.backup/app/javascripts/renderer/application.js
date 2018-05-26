require('electron').ipcRenderer.on('loaded' , function(event, data, modiData) {
  document.getElementById('title').innerHTML = data.appName + ' App...v'+ data.modiVersion;
  document.getElementById('details').innerHTML = 'built with Electron v' + data.electronVersion;
  document.getElementById('versions').innerHTML = 'running on Node v' + data.nodeVersion + ' and Chromium v' + data.chromiumVersion;
});
