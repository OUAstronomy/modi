var path = require('path');

module.exports = {
  appPath: function() {
    switch (process.platform) {
      case 'darwin':
        return path.join(__dirname, '..', '.tmp', 'mac', 'Modi.app', 'Contents', 'MacOS', 'Modi');
      case 'linux':
        return path.join(__dirname, '..', '.tmp', 'linux', 'Modi');
      default:
        throw 'Unsupported platform';
    }
  }
};
