const fs = require('fs');
const logger = require('../common/logger');
const config = require('../common/configManager');

const path = config.get('CODE_PATH', 'code.path');
if (fs.existsSync(path)) {
  logger.info(path + " found")
} else {
  logger.warn(path + " not found")
}

exports.get = (res) => {
  fs.readFile(path, function(err, file) {
    res.send(file);
  });
}
