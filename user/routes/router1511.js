'use strict';
var api = require('../controllers/api');
var authCtrl=require('../controllers/authCtrl' );
var middleware = require('../middleware')
module.exports = function(router) {
    //signup
    router.post('/auth/signup',middleware.getStore,authCtrl.signup);
    router.post('/auth/signupOrder',middleware.getStore,authCtrl.signupOrder);
    //login
    router.post('/auth/login',middleware.getStore,authCtrl.login);
    router.post('/auth/facebook',middleware.getStore,authCtrl.fb);

    router.get('/api/me/:store',middleware.ensureAuthenticated,middleware.getStore,authCtrl.me);
    //router.get('/api/me',middleware.ensureAuthenticated,middleware.getStore,authCtrl.me);
    router.get('/api/permission/:store',middleware.ensureAuthenticated,middleware.getStore,middleware.checkPermissionForSeller,authCtrl.me);
    router.get('/api/permissionOrder/:store',middleware.ensureAuthenticated,middleware.getStore,middleware.checkPermissionOrder,authCtrl.me);

    router.post('/api/getEnterButton',middleware.getStore,authCtrl.getEnterButton);


    router.post('/api/changePswd',middleware.ensureAuthenticated,middleware.getStore,middleware.checkPermissionForSeller,api.changePswd);

    router.post('/api/sendEmail',middleware.getStore,api.sendEmail);
    router.post('/api/sendEmails',middleware.getStore,api.sendEmails);



    router.get('/api/unsubscribe/:store/:user',middleware.getStore,api.unsubscribe);
    router.get('/api/deleteUsersFromStore/:store',middleware.ensureAuthenticated,middleware.getStore,middleware.checkPermissionForSeller,api.deleteUsersFromStore);

    router.get('/api/getEntryUser/:id',middleware.getStore,api.getEntryUser);
    router.get('/api/confirmemail/:store/:user',api.confirmEmail);


    router.post('/api/download/subscribersList',
        middleware.getStore,
        middleware.ensureAuthenticated,
        middleware.checkPermissionForSeller,
        api.downloadSubscribersList);


    router.post('/api/usersFileUpload',
        middleware.getStore,
        middleware.ensureAuthenticated,
        middleware.checkPermissionForSeller,
        api.usersFileUpload);
    router.post('/api/createUser',
        middleware.getStore,
        middleware.ensureAuthenticated,
        middleware.checkPermissionForSeller,
        api.createUser);



};
