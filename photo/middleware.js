'use strict';
var storeAPI = require('../modules/store-api');
var userAPI = require('../modules/user-api');
module.exports = {
    getStore:storeAPI.getStore,
    getUser:userAPI.getUser
};
