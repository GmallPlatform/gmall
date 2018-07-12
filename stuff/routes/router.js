'use strict';
var api = require('../controllers/api');
var apiStore = require('../controllers/apiStore');
var apiTranslate = require('../controllers/apiTranslate');
var recalcApi = require('../controllers/api/recalculatePrice');
var middleware = require('../middleware')

module.exports = function(router) {
    router.get('/api/getAllDataForIndex',api.getAllDataForIndex)
    router.get('/apiStore/createSitemap',middleware.getStore,api.createSitemap)
    router.post('/api/downloadPrice',middleware.getStore,api.downloadPrice)
    router.get('/api/downloadPriceFromFile/:file',middleware.getStore,api.downloadPriceFromFile)
    router.post('/api/downloadPriceXML',middleware.getStore,api.downloadPriceXML)
    router.get('/api/downloadPriceFromFileXML/:file',middleware.getStore,api.downloadPriceFromFileXML)
    router.post('/api/setTemplate',middleware.getStore,api.setTemplate)
    router.post('/api/translate',middleware.getStore,middleware.getUser,middleware.onlySuperAdminCheck,apiTranslate.translate)

    router.get('/api/uploadStore/:store',middleware.getStore,apiStore.uploadStore)
    router.get('/api/readStoreStuff/:store',middleware.getStore,apiStore.readStore)

    router.get('/api/deleteStore/:store',middleware.getStore,middleware.getUser,middleware.onlySuperAdminCheck,apiStore.deleteStore)

    router.get('/api/getSearchData/:store',middleware.getStore,api.getSearchData)
    router.get('/api/getBlocksHP/:type',api.getBlocksHP)
    router.get('/api/getBlocksForAll/:type',api.getBlocksForAll)
    router.get('/api/recalculatePrice',middleware.getStore,middleware.getUser,middleware.checkPermissionForSeller,recalcApi.recalculatePrice)

    router.post('/api/photoUploadResults/:store/:catalog',middleware.getStore,api.photoUploadResults)

    router.post('/api/fixedDB/:model',middleware.getStore,api.fixedDB)
    router.get('/api/reNewKeyWords',middleware.getStore,api.reNewKeyWords)
    router.post('/api/downLoadExternalCatalog',middleware.getStore,api.downLoadExternalCatalog)
    router.post('/api/alignmentIndex',middleware.getStore,api.alignmentIndex)
    router.post('/api/changeTaskSchedule',middleware.getStore,api.changeTaskSchedule)
    router.post('/api/stuffs/changeMPCategory',middleware.getStore,middleware.getUser,middleware.checkPermissionForSeller,api.changeMPCategory)

};

