'use strict';
var collection = require('../controllers/collection');
var middleware = require('../middleware')
module.exports = function(router) {
    //console.log('routing')
    router.get(   '/:collectionName',middleware.checkPermission,collection.list)
    router.get(   '/:collectionName/:id',collection.get);
    router.post(  '/:collectionName',collection.save);
    router.post(  '/:collectionName/:ids',collection.update)
    router.delete('/:collectionName/:id', collection.delete);
    router.delete('/:collectionName', collection.deleteArray);
};
