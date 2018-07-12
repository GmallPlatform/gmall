'use strict';

var _ = require('lodash');

/**
 * Load environment configuration
 */
module.exports = _.extend(
    require('./env/host.js'),
    require('./env/auth.js'),
    require('./env/all.js'),
    require('./env/development.js') || {}
);