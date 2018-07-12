'use strict';
var api = require('../controllers/api');
var apiStore = require('../controllers/apiStore');
var authCtrl=require('../controllers/authCtrl' );
var middleware = require('../middleware')
module.exports = function(router) {
    //signup
    router.post('/auth/signup',middleware.getStore,authCtrl.signup);
    router.post('/auth/signupOrder',middleware.getStore,authCtrl.signupOrder);
    //login
    router.post('/auth/login',middleware.getStore,authCtrl.login);
    router.post('/auth/facebook',middleware.getStore,authCtrl.fb);
    router.post('/auth/google',middleware.getStore,authCtrl.google);
    router.post('/auth/vkontakte',middleware.getStore,authCtrl.vkontakte);

    router.get('/api/me/:store',middleware.ensureAuthenticated,middleware.getStore,authCtrl.me);
    //router.get('/api/me',middleware.ensureAuthenticated,middleware.getStore,authCtrl.me);


    router.get('/api/permission/:store',middleware.ensureAuthenticated,middleware.getStore,middleware.checkPermissionForSeller,authCtrl.me);
    router.get('/api/permissionOrder/:store',middleware.ensureAuthenticated,middleware.getStore,middleware.checkPermissionOrder,authCtrl.me);
    router.get('/api/permissionMaster/:store/:master',middleware.ensureAuthenticated,middleware.getStore,middleware.checkPermissionMaster,authCtrl.me);
    router.get('/api/permissionTranslator/:store',middleware.ensureAuthenticated,middleware.getStore,middleware.checkPermissionTranslator,authCtrl.me);
    router.post('/api/getEnterButton',middleware.getStore,authCtrl.getEnterButton);
    router.post('/api/changePswd',middleware.ensureAuthenticated,middleware.getStore,middleware.checkPermissionForUserDataChange,api.changePswd);

    router.get('/api/users/checkemail/:email',middleware.ensureAuthenticated,middleware.getStore,api.checkEmail);
    router.get('/api/users/checkphone/:phone',middleware.getStore,api.checkPhone);
    router.get('/api/users/useCoupon/:id',middleware.ensureAuthenticated,middleware.getStore,api.useCoupon);
    router.get('/api/users/cancelCoupon/:id',middleware.ensureAuthenticated,middleware.getStore,api.cancelCoupon);
    router.get('/api/users/repeatMailForConfirm',middleware.ensureAuthenticated,middleware.getStore,authCtrl.repeatMailForConfirm);

    router.post('/api/sendEmail',middleware.getStore,api.sendEmail);
    router.post('/api/sendEmails',middleware.getStore,api.sendEmails);
    router.post('/api/users/sendSMS',middleware.getStore,api.sendSMS);
    router.post('/api/users/verifySMScode',middleware.getStore,api.verifySMScode);
    router.post('/api/users/sendMessageAboutDeal',middleware.getStore,middleware.ensureAuthenticated,api.sendMessageAboutDeal);
    router.post('/api/users/sendMessageAboutDealFromServer',middleware.getStore,api.sendMessageAboutDealFromServer);



    router.get('/api/unsubscribe/:store/:user',middleware.getStore,api.unsubscribe);
    router.get('/api/deleteUsersFromStore/:store',middleware.ensureAuthenticated,middleware.getStore,middleware.checkPermissionForSeller,api.deleteUsersFromStore);

    router.get('/api/getEntryUser/:id',middleware.getStore,api.getEntryUser);
    router.get('/api/confirmemail/:store/:user',api.confirmEmail);

    router.get('/api/deleteStore/:store',middleware.ensureAuthenticated,middleware.getStore,middleware.onlySuperAdminCheck,apiStore.deleteStore);




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
