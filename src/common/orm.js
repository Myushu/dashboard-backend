const sequelize = require('sequelize');
const logger = require('./logger');
const config = require('../common/configManager');
const errorManager  = require('./errors');

var databasesName = config.get('SQL_DATABASE', 'sql.databases', ['DASHBOARD', 'ADMINISTRATION']);
var dbs = [];

for (var db in databasesName) {
  logger.info('use database :', databasesName[db])
  dbs[databasesName[db]] = new sequelize({
    username : config.get('SQL_USERNAME', 'sql.credentials.username', 'root'),
    password : config.get('SQL_PASSWORD', 'sql.credentials.password', 'root'),
    database : databasesName[db],
    host : config.get('SQL_HOSTNAME', 'sql.hostname', 'localhost'),
    port : config.get('SQL_PORT', 'sql.port', 3306),
    logging : logger.info,
    options : {
      retry : {
        max : config.get('SQL_MAX_RETRIES', 'sql.maxRetries', 3),
        },
      },
    dialect: 'mysql',
  });
}

exports.initConnection = () => {
  for (db in dbs) {
    dbs[db].sync().catch(function(err) {
      logger.error(err.message);
      process.exit();
    });
  }
}

exports.getTable = (database, table) => {
  return dbs[database].import("../models/" + database + "/" + table + ".js")
}

function setResult(result, res) {
  if (res && !result)
    res.status(404).send();
  else if (res && result.error != undefined)
    errorManager.handle(result.error, res);
  else
    return false;
  return true;
}

function sequelizeCall (request)  {
  return request.then(function (result) {
    return result;
  }).catch(function(err) {
     logger.error(err.message);
     return {error : err};
  });
}

exports.transaction = (model, res, callback) => {
  return model.sequelize.transaction(callback)
  .then(function (result) {
    res.sendStatus(200);
  }).catch(function(err) {
    errorManager.handle(err, res);
    return {error : err};
  });
}

exports.findAll = (model, res, attributes, sendIt) => {
  return sequelizeCall(model.findAll(attributes)).then(function (result) {
    setResult(result, res)
    if (sendIt === undefined && res != undefined)
      res.send(result);
    return result;
  })
}

exports.findAllAndCount = (model, res, attributes) => {
  return this.findAll(model, res, attributes, false).then(function (result) {
    sequelizeCall(model.count({where : attributes.where})).then(function (resultCount) {
      var json = {};
      json['count'] = resultCount  == undefined ? 0 : resultCount;
      json['rows'] = result;
      if (res)
        res.send(json);
      return json;
    })
  });
}

exports.find = (model, res, attributes) => {
  return sequelizeCall(model.find(attributes)).then(function (result) {
    if (setResult(result, res))
      return result;
    if (res)
      res.json(result);
    return result;
  })
}

exports.create = (model, res, attributes, transaction) => {
  if (transaction == undefined) {
    return sequelizeCall(model.create(attributes)).then(function (result) {
      if (setResult(result, res, transaction))
        return result;
      if (res)
        res.status(201).send();
      return result;
    });
  } else {
    return model.create(attributes, {transaction : transaction});
  }
}

exports.update = (model, newContent, res, attributes) => {
  if (attributes.transaction == undefined) {
    return sequelizeCall(model.update(newContent, attributes)).then(function (result) {
      if (setResult(result, res))
        return result;
      if (res)
        res.status(200).send();
      return result;
    });
  } else {
    return model.update(newContent, attributes);
  }
}

exports.delete = (model, res, attributes) => {
  return sequelizeCall(model.destroy(attributes)).then(function (result) {
    if (setResult(result, res))
      return result;
    if (res)
      res.status(200).send();
    return result;
  })
}

exports.count = (model, res, attributes) => {
  return sequelizeCall(model.count(attributes)).then(function (result) {
    if (setResult(result, res))
      return result;
    if (res)
      res.status(200).send();
    return result;
  })
}
