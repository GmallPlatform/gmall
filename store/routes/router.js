'use strict';
var api = require('../controllers/api');
var middleware = require('../middleware')
var config = require('../config/config');
const  stuffHost=config.stuffHost.split(':')[0]

module.exports = function(router) {
    router.post('/api/getstore',checkIP,api.getStore);
    router.get('/api/upload/:id',api.uploadStore);
    router.get('/api/readStoreStore/:id',api.readStore); //id магазин В который клолнируем
    router.get('/api/getSubDomains',api.getSubDomains); //id магазин В который клолнируем
    router.get('/api/getTemplates',api.getTemplates); // список магазинов с типом template

    router.get('/api/deleteStore/:store',middleware.getStore,middleware.getUser,middleware.onlySuperAdminCheck,api.deleteStore)
};
function checkIP(req,res,next) {
    //console.log(req.connection.remoteAddress,stuffHost)
    //console.log(req.connection.remoteAddress && (req.connection.remoteAddress.indexOf(stuffHost)>-1|| req.connection.remoteAddress.indexOf('37.57.5.247')>-1  || req.connection.remoteAddress.indexOf('127.0.0.1')>-1))
    if(req.connection.remoteAddress && (req.connection.remoteAddress.indexOf(stuffHost)>-1|| req.connection.remoteAddress.indexOf('37.57.5.247')>-1  || req.connection.remoteAddress.indexOf('127.0.0.1')>-1)){
        next()
    }else{
        let err  = new Error('not permission')
        next(err)
    }
}
