'use strict';
var collection = require('../controllers/collection');
var config = require('../config/config');
const permission = require('../../modules/permission-api');
const  storeHost=config.storeHost.split(':')[0]
const  photoUpload=config.photoUpload.split(':')[0]
/*console.log(storeHost)
console.log(photoUpload)*/
var api = require('../controllers/api');
var middleware = require('../middleware')
module.exports = function(router) {
    /*router.post(   '/:collectionName/!*',function (req,res,next) {
        console.log(req.url,req.body)
    })*/
    router.get(   '/:collectionName',checkCollection,collection.list)
    router.get(   '/:collectionName/:id',checkIP,collection.get);
    router.post(  '/:collectionName',collection.save);

    router.post('/:collectionName/cloneStore', api.cloneStore);
    router.post('/:collectionName/fileUpload', collection.fileUpload);
    router.post('/:collectionName/fileUploadSticker', collection.fileUploadSticker);
    router.post('/:collectionName/fileUploadGallery', collection.fileUploadGallery);
    router.post('/:collectionName/fileUploadBig', collection.fileUploadBig);
    router.post('/:collectionName/fileUploadFullImg', collection.fileUploadFullImg);


    router.post(  '/:collectionName/:ids',checkPermissionForUpdate,collection.update)
    router.delete('/:collectionName/:id', collection.delete);
    router.delete('/:collectionName', collection.deleteArray);



    
    router.post('/:collectionName/fileUpload', collection.fileUpload);
    router.post('/:collectionName/fileUploadSticker', collection.fileUploadSticker);
    router.post('/:collectionName/fileUploadGallery', collection.fileUploadGallery);
    router.post('/:collectionName/fileUploadBig', collection.fileUploadBig);
    router.post('/:collectionName/fileUploadFullImg', collection.fileUploadFullImg);

};

async function checkCollection(req,res,next) {
    //console.log(req.connection.remoteAddress)
    if(req.connection.remoteAddress && (req.connection.remoteAddress.indexOf(storeHost)>-1 || req.connection.remoteAddress.indexOf(photoUpload)>-1
        || req.connection.remoteAddress.indexOf('127.0.0.1')>-1 || req.connection.remoteAddress.indexOf('37.57.5.247')>-1)){
        return next()
    }
    if(req.collectionName=='Store'){
        let q;
        if(req.query && req.query.query){
            try {
                q =JSON.parse(req.query.query);
            } catch (err) {
                q={}
            }
        }
        if(q.subDomain){
            return next()
        }
        await new Promise(function (resolve,relect) {
            middleware.getUser(req,res,function(err){
                if(err){return next(err)}
                resolve(middleware.onlySuperAdminCheck(req,res,next))
                
            })
        })
         
    }else{
        next()
    }
}
async function checkIP(req,res,next) {
    //console.log(req.connection.remoteAddress,req.url)
    if(req.collectionName=='Store'){

        if(req.connection.remoteAddress && (req.connection.remoteAddress.indexOf(storeHost)>-1 || req.connection.remoteAddress.indexOf(photoUpload)>-1 || req.connection.remoteAddress.indexOf('127.0.0.1')>-1
            || req.connection.remoteAddress.indexOf('37.57.5.247')>-1)){
            next()
        }else{
            let permission = await new Promise(function (resolve,reject) {
                middleware.getUser(req,res, async function(err){
                    if(err){return next(err)}
                    //console.log(req.user)
                    if(!req.user){return resolve(false)}
                    req.checkPermission=true;
                    resolve(true)

                    //resolve(middleware.onlySuperAdminCheck(req,res,next))

                })
            })
            let err=null;
            if(!permission){
                err  = new Error('not permission')
            }
            next(err)
        }
        
        /*let q;
        if(req.query && req.query.query){
            try {
                q =JSON.parse(req.query.query);
            } catch (err) {
                q={}
            }
        }
        if(q.subDomain){
            return next()
        }
        await middleware.getUser(req,res,function(err){
            if(err){return next(err)}
            middleware.onlySuperAdminCheck(req,res,next)
        })*/

    }else{
        next()
    }
}
async function checkPermissionForUpdate(req,res,next) {
    //console.log('checkPermissionForUpdate')
    if(req.connection.remoteAddress && (req.connection.remoteAddress.indexOf(storeHost)>1 || req.connection.remoteAddress.indexOf(photoUpload)>1 || req.connection.remoteAddress.indexOf('127.0.0.1')>1)){
        next()
    }else{
        let storeGetError = await new Promise(function (resolve,reject) {
            middleware.getStore(req,res, function(err){
                //console.log(req.store.subDomain)
                if(err){return reject(err)}
                resolve()
            })
        })
        if(storeGetError){return next(storeGetError)}
        let permission = await new Promise(function (resolve,reject) {
            middleware.getUser(req,res, async function(err){
                if(err){return next(err)}
                if(!req.user){return resolve(false)}
                req.checkPermission=true;
                resolve(true)
            })
        })
        let err=null;
        // не авторизированный пользователь
        if(!permission){
            err  = new Error('not permission for update')
            next(err)
        }else{
            let translator = await middleware.checkPermissionTranslator(req,res)
            if(translator){
                //console.log('translator',translator);
                next()
            }else{
                err  = new Error('not permission for update')
                next(err)
            }
        }

    }
}