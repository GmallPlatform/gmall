'use strict';
var api = require('../controllers/api');
var middleware = require('../middleware')

module.exports = function(router) {
    router.get('/api/checkArchImages',function (req,res,next) {
        res.json({})
        console.log('lflf')
    })
    router.post('/api/copyPhotos',api.copyPhotos)
    router.post('/api/copyPhotosFromBrowser',api.copyPhotosFromBrowser)
    router.post('/api/uploadPhotosToStuffs',api.uploadPhotosToStuffs)
};

