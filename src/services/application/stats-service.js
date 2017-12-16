const orm = require('../../common/orm');
const ms = require('../../common/modelService');
const randomWords = require('random-words');
const randomCountry = require('random-country');
const logger = require('../../common/logger');

function genRandom(low, high) {
  return Math.round(Math.random() * (high - low) + low);
}

function dateFormatter(date) {
  return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate();
}

function _generateDataVisitorsWebsite(idWebsite, date, nbVisitor) {
  orm.create(ms.VISITORS_WEBSITE.model, null, {
    ID_WEBSITE: idWebsite,
    DATE_EVENT: dateFormatter(date),
    NB_VISITOR: nbVisitor,
    NB_MINER: genRandom(0, 100) % nbVisitor,
    AVERAGE_TIME: genRandom(0, 10)
  });
}

function _generateCryptoMoney(idWebsite, date) {
  orm.create(ms.CRYPTO_MONEY.model, null, {
    ID_WEBSITE: idWebsite,
    DATE_EVENT: dateFormatter(date),
    CRYPTO: 'BITCOIN',
    AMOUNT: genRandom(0, 3)
  });
}

function _generateDataMostViewedPage(idWebsite, date, nbVisitor) {
  let page = '/' + randomWords({min: 2, max: 6, join: '-' });
  orm.create(ms.MOST_VIEWED_PAGES.model, null, {
    ID_WEBSITE: idWebsite,
    DATE_EVENT: dateFormatter(date),
    URL: page,
    NB_VISITOR: genRandom(0, 100) % nbVisitor   
  });
}

function _generateCountryRanking(idWebsite, date, nbVisitor) {
  let country = randomCountry({ full: true });
  let newNbVisitor = genRandom(0, 100) % nbVisitor;
  if (newNbVisitor != 0) {
    orm.create(ms.COUNTRY_RANKING.model, null, {
      ID_WEBSITE: idWebsite,
      DATE_EVENT: date,
      COUNTRY: country,
      NB_VISITOR: newNbVisitor
    });
  }
  return nbVisitor - newNbVisitor;
}

function generateData(nbDays, idWebsite) {
  if (nbDays < 0)
    return
  
  date = new Date();
  date.setDate(date.getDate() - nbDays);
  nbVisitor = genRandom(1, 100);

  _generateDataVisitorsWebsite(idWebsite, date, nbVisitor);
  _generateCryptoMoney(idWebsite, date);

  var cumul = nbVisitor;
  for (let index = 0; index < 100; ++index) {
    _generateDataMostViewedPage(idWebsite, date, nbVisitor);
    cumul = _generateCountryRanking(idWebsite, date, cumul);
  }

  return generateData(nbDays - 1, idWebsite);
}

exports.get = (idWebsite, nbDays, user, res) => {
  oldDate = new Date()
  oldDate.setDate(oldDate.getDate() - nbDays);
  oldDate = dateFormatter(oldDate);
  var attributes = {
    where: {
      ID_WEBSITE: idWebsite
    },
    attributes: ms.WEBSITE.attributes,
    include: [
      ms.VISITORS_WEBSITE.include(idWebsite, oldDate),
      ms.MOST_VIEWED_PAGES.include(idWebsite, oldDate),
      ms.CRYPTO_MONEY.include(idWebsite, oldDate),
      ms.COUNTRY_RANKING.include(idWebsite, oldDate),
    ]
  };
  return orm.find(ms.WEBSITE.model, res, attributes);
}

exports.generateData = (idWebsite, req, res) => {
  generateData(30, idWebsite);
  res.sendStatus(200);
}
