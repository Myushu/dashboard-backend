// const jwt = require('jsonwebtoken');
// const config = require('../../common/configManager');
const orm = require('../../common/orm');
const ms = require('../../common/modelService');
// const errorManager = require('../../common/errors');
// const validation = require('./validation-service');
// const website = require('./website-service')
const logger = require('../../common/logger');

function genRandom(low, high) {
  return Math.round(Math.random() * (high - low) + low);
}

function generateData(nbDays, idWebsite) {
  if (nbDays < 0)
    return
  else {
    date = new Date();
    date.setDate(date.getDate() - nbDays);

    nbVisitor = genRandom(1, 100);
    orm.create(ms.VISITORS_WEBSITE.model, null, { ID_WEBSITE: idWebsite,
                                                  DATE: date,
                                                  NB_VISITOR: nbVisitor,
                                                  NB_MINER: genRandom(0, 100) % nbVisitor,
                                                  AVERAGE_TIME: genRandom(0, 10)
                                                });
    generateData(nbDays - 1, idWebsite);
  }
}

exports.get = (idWebsite, nbDays, user, res) => {
  date = new Date();
  oldDate = new Date();
  oldDate.setDate(oldDate.getDate() - nbDays);
  var attributes = {
    where : {
      ID_WEBSITE: idWebsite,
      DATE: {
        $gt: oldDate
      }
    }
  }
  return orm.findAll(ms.VISITORS_WEBSITE.model, res, attributes);
}

exports.generateData = (idWebsite, req, res) => {
  generateData(30, idWebsite);
  res.sendStatus(200);
}
