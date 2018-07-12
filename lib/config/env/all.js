'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 8909,
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};