'use strict';
var config = require('../user/config/config');
var storeAPI = require('../modules/store-api');
var userAPI = require('../modules/user-api');
var permission = require('../modules/permission-api');

module.exports = {
    getStore:storeAPI.getStore,
    getUser:userAPI.getUser,
    getStoreByIdPromise:storeAPI.getStoreByIdPromise,
    checkPermissionForSeller:permission.checkPermissionForSeller,
    onlySuperAdminCheck:permission.onlySuperAdminCheck,
};
