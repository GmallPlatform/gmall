'use strict';
var storeAPI = require('../modules/store-api');
var userAPI = require('../modules/user-api');
var permission = require('../modules/permission-api');

module.exports = {
    getStore:storeAPI.getStore,
    getUser:userAPI.getUser,
    checkPermissionForSeller:permission.checkPermissionForSeller,
    onlySuperAdminCheck:permission.onlySuperAdminCheck,
    checkPermissionTranslator:permission.checkPermissionTranslator,
};
