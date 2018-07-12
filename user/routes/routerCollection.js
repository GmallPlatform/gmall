'use strict';
var collection = require('../controllers/collection');
var middleware = require('../middleware')
module.exports = function(router) {
    router.get(   '/:collectionName',middleware.ensureAuthenticated,middleware.getStore,middleware.checkPermissionForSeller,collection.list)
    router.get(   '/:collectionName/:id',collection.get);
    router.post(  '/:collectionName',middleware.getStore,collection.save);
    router.post(  '/:collectionName/:ids',middleware.ensureAuthenticated,middleware.getStore,middleware.checkPermissionForUserDataChange,collection.update)
    router.delete('/:collectionName/:id',middleware.ensureAuthenticated,middleware.getStore,middleware.checkPermissionForSeller,collection.delete);
    router.delete('/:collectionName',middleware.ensureAuthenticated,middleware.getStore,middleware.checkPermissionForSeller,collection.deleteArray);
};
