'use strict';
var collection = require('../controllers/collection');
var middleware = require('../middleware')
module.exports = function(router) {
    router.get(   '/:collectionName',middleware.getStore,middleware.getUser,collection.list)
    router.get(   '/:collectionName/:id',middleware.getStore,middleware.getUser,collection.get);
    router.post(  '/:collectionName',middleware.getStore,middleware.getUser,collection.save);
    router.post(  '/:collectionName/:ids',middleware.getStore,middleware.getUser,collection.update)
    router.delete('/:collectionName/:id', collection.delete);
    router.delete('/:collectionName', collection.deleteArray);
};
