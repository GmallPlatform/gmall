'use strict';
var collection = require('../controllers/collection');
/*var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({defer: true});*/

module.exports = function(router) {

    router.post('/:collectionName/fileUploadGallery', collection.fileUploadGallery);
    // delete files
    router.post('/:collectionName/deleteFolder',collection.deleteFolder);
    router.post('/:collectionName/deleteFolders',collection.deleteFolders);
    router.post('/:collectionName/deleteFiles',collection.deleteFiles)
    
    
    router.post('/:collectionName/deleteFilesFromStuff',collection.deleteFilesFromStuff)

    router.post('/:collectionName/uploadVideoFile', collection.videoUpload);
    router.post('/:collectionName/deleteSlideImage',collection.deleteSlideImage);
    router.get(' /:collectionName/fileGalleryDelete/:id/:idImage', collection.fileGalleryDelete);
    router.post('/:collectionName/fileGalleryUpdate/:id', collection.updateGallery);
    router.post('/:collectionName/fileDeleteFromImgs',collection.fileDeleteFromImgs);
    
    router.post('/:collectionName/fileUpload', collection.fileUpload);
    router.post('/:collectionName/videoUpload', collection.videoUpload);
    router.post('/:collectionName/fileUploadSticker', collection.fileUploadSticker);
    router.post('/:collectionName/fileUploadSmall', collection.fileUploadSmall);

    router.post('/:collectionName/fileUploadBig', collection.fileUploadBig);
    router.post('/:collectionName/fileUploadFullImg', collection.fileUploadFullImg);
    router.post('/:collectionName/fileUploadOrigin', collection.fileUploadOrigin);
    router.post('/:collectionName/copyfile', collection.copyfile);

};
