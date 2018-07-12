var request=require('request')
var jwt = require( 'jwt-simple' );
var moment = require( 'moment' );
var config = require('../lib/config/config');
const ipHost=require('../modules/ip/ip' );
const ports=require('../modules/ports' );
const urlForUsers = 'http://'+ipHost.ip+':'+ports.userPort;
const urlForUsersForLocal = (ipHost && ipHost.local)?'http://'+ipHost.remote_ip+':'+ports.userPort:'http://'+ipHost.ip+':'+ports.userPort;

module.exports = {
    getUser: function (req, res, next) {
        if (!req.header( 'Authorization' )) {
            return next();
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
        var id= payload.sub;

        //
        //127.0.0.1:3002
        let urll=urlForUsers + "/api/collections/User/" + id+'?store='+req.query.store;

        if(req.onPhotoHost && ipHost && ipHost.local){
            urll = urlForUsersForLocal + "/api/collections/User/" + id+'?store='+req.query.store;
        }
        /*if(req.onPhotoHost){
            var urll = "http://" + config.userHost + "/api/collections/User/" + id+'?store='+req.query.store;
        }else{
            var urll = "http://127.0.0.1:3001/api/collections/User/" + id+'?store='+req.query.store;
        }*/



        //console.log('urll',urll)
        request.get( {url: urll}, function (err, response) {
            //console.log(err,response.body)
            if (err) {
                return next( err )
            }
            try {
                req.user = JSON.parse( response.body );
                //console.log(req.user)
                //console.log( 'req.user.email -', req.user.email)
                next();
            } catch (err) {
                return next( err )
            }
        } )
    },
    getUserById:function (id,store) {
        return new Promise(function (rs,rj) {
            //var urll = "http://" + config.userHost + "/api/collections/User/" + id+'?store='+store;
            var urll = "http://127.0.0.1:3001/api/collections/User/" + id+'?store='+store;
            //console.log(urll)
            request.get( {url: urll,json:true}, function (err, response,body) {
                //console.log(err,response.body)
                if (err) {
                    rj( err )
                }
                rs(body)
                /*try {
                    req.user = JSON.parse( response.body );
                    //console.log()
                    //console.log( 'req.user.email -', req.user.email)
                    next();
                } catch (err) {
                    return next( err )
                }*/
            })
        })

    }

}