'use strict';
    /**
 * Custom middleware used by the application
 */

var request=require('request')
var jwt = require( 'jwt-simple' );
var moment = require( 'moment' );
var mongoose=require('mongoose');
var User = mongoose.model( 'User' );
var ObjectID = mongoose.Types.ObjectId;
var config = require('../user/config/config');
var storeAPI = require('../modules/store-api');
var permission = require('../modules/permission-api');
var i=1;

module.exports = {
    ensureAuthenticated:function (req, res, next) {
        //console.log(req.url)
    //console.log(req.header('Authorization'))
        //console.log(req.url,req.header( 'Authorization' ))
        if (!req.header( 'Authorization' )) {
            //return next();
            return res.status( 401 ).send( {message: 'Please make sure your request has an Authorization header'} );
        }
        var token = req.header( 'Authorization' ).split( ' ' )[1];

        var payload = null;
        try {
            payload = jwt.decode( token, config.TOKEN_SECRET );
        }
        catch (err) {
            return res.status( 401 ).send( {message: err.message} );
        }

        if (payload.exp <= moment().unix()) {
            return res.status( 401 ).send( {message: 'Token has expired'} );
        }
        //req.user = payload.sub;
        //console.log('payload.sub ',payload.sub)
        var id= ObjectID(payload.sub);
        /*User.findOne({_id:id},function (err,user) {
            console.log('user ',user)
        })*/
        User.findById(id, function (err, user) {
            if(err){return next(err)}
            if(!user){return new Error('нет такого user')}
            /*console.log(err)
            req.user = user;*/

            req.user = user.toObject();
            if (req.user.email=='igorchugurov@gmail.com'||
                req.user.email=='vikachugurova@gmail.com' ||
                req.user.email=='ihorchugurov@gmail.com'){
                req.user.admin=true;
            }
            next();
        } );

    },
    getStore:storeAPI.getStore,
    checkPermissionForSeller:permission.checkPermissionForSeller,
    checkPermissionOrder:permission.checkPermissionOrder,
    checkPermissionMaster:permission.checkPermissionMaster,
    checkPermissionTranslator:permission.checkPermissionTranslator,
    checkPermissionForUserDataChange:permission.checkPermissionForUserDataChange,
    onlySuperAdminCheck:permission.onlySuperAdminCheck,
};
