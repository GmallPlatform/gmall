'use strict';
var collection = require('../controllers/collection');
var middleware = require('../middleware')
/*var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({defer: true});*/

module.exports = function(router) {
    router.get('/:collectionName',middleware.getStore, collection.list)
    router.get('/:collectionName/:id',middleware.getStore,collection.get);
    router.post('/:collectionName',middleware.getStore,middleware.getUser,middleware.checkPermissionForSeller,collection.save)
    router.post('/:collectionName/:id', middleware.getStore,middleware.getUser,middleware.checkPermissionForSeller,collection.save);
    router.delete('/:collectionName/:id',middleware.getStore,middleware.getUser,middleware.checkPermissionForSeller, collection.delete);
    router.delete('/:collectionName', middleware.getStore,middleware.getUser,middleware.checkPermissionForSeller,collection.deleteArray);

    /*
     // delete files

     router.get('/:collectionName/fileGalleryDelete/:id/:idImage', collection.fileGalleryDelete);
     router.post('/:collectionName/fileGalleryUpdate/:id', collection.updateGallery);
     router.post('/:collectionName/fileDeleteFromImgs',collection.fileDeleteFromImgs);
     router.post('/:collectionName/deleteFilesFromStuff',collection.deleteFilesFromStuff)
     router.post('/:collectionName/deleteSlideImage',collection.deleteSlideImage);
     router.post('/:collectionName/uploadVideoFile', collection.videoUpload);
    router.post('/:collectionName/fileUpload', collection.fileUpload);
    router.post('/:collectionName/videoUpload', collection.videoUpload);
    router.post('/:collectionName/fileUploadSticker', collection.fileUploadSticker);
    router.post('/:collectionName/fileUploadGallery', collection.fileUploadGallery);
    router.post('/:collectionName/fileUploadBig', collection.fileUploadBig);
    router.post('/:collectionName/fileUploadFullImg', collection.fileUploadFullImg);
    router.post('/:collectionName/copyfile', collection.copyfile);*/

};
