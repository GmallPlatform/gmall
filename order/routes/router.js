'use strict';
var api = require('../controllers/api');
var middleware = require('../middleware')
module.exports = function(router) {
    router.post('/api/orders/checkoutLiqpay',middleware.getStore,api.checkoutLiqpay);
    router.post('/api/orders/checkoutLiqpayInvoice',middleware.getStore,api.checkoutLiqpayInvoice);
    router.post('/api/orders/checkoutLiqpayEntry',middleware.getStore,api.checkoutLiqpayEntry);
    router.post('/api/orders/checkoutLiqpayComplite/:store',middleware.getStore,api.checkoutLiqpayComplite);
    router.post('/api/orders/checkoutLiqpayCompliteEntry/:user/:store',middleware.getStore,api.checkoutLiqpayCompliteEntry);
    router.get('/api/deleteStore/:store',middleware.getStore,middleware.getUser,middleware.onlySuperAdminCheck,api.deleteStore)
};




