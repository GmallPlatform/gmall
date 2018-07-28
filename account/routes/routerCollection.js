'use strict';
var collection = require('../controllers/collection');
var middleware = require('../middleware')
module.exports = function(router) {
    router.get('/:collectionName',middleware.getStore,middleware.getUser, middleware.checkPermissionAccount,collection.list)
    router.get('/:collectionName/:id',middleware.getStore,middleware.getUser,middleware.checkPermissionAccount,collection.get);
    router.post('/:collectionName',middleware.getStore,middleware.getUser,middleware.checkPermissionAccount,collection.save)
    router.post('/:collectionName/:id', middleware.getStore,middleware.getUser,middleware.checkPermissionAccount,collection.save);
    router.delete('/:collectionName/:id',middleware.getStore,middleware.getUser,middleware.checkPermissionAccount, collection.delete);
    router.delete('/:collectionName', middleware.getStore,middleware.getUser,middleware.checkPermissionAccount,collection.deleteArray);
};
