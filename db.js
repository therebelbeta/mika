"use strict";
var config = require('./db.json');
var monk = require('monk');
var wrap = require('co-monk');
var dbConnect = `${config.host}/${config.database}`;
if (config.password && config.username) dbConnect = `${config.username}:${config.password}@${dbConnect}`;
var db = monk(dbConnect);

for (let x = 0; x < config.collections.length; x++) {
  let col = config.collections[x];
  module.exports[col] = wrap(db.get(col));
}
