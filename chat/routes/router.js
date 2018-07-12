'use strict';
var api = require('../controllers/api');
var middleware = require('../middleware')
module.exports = function(router) {
    router.get('/api/chatMessagesList/:recipient',api.chatMessagesList);
    router.get('/api/notificationList/:addressee',api.notificationList);

    router.get('/', function(req, res,next) {
        res.send('!!!')
    });
    router.get('/api/deleteOrderDialog/:seller/:order',api.deleteOrderDialog);
    router.get('/api/deleteStore/:store',middleware.getStore,middleware.getUser,middleware.onlySuperAdminCheck,api.deleteStore)
};
