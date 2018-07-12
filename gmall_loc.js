var globalFunction=require('./public/scripts/myPrototype.js')
var express = require('express');
var fs=require('fs')

/*var path = require('path');
var mongoose=require('mongoose');
var db = mongoose.connect('mongodb://localhost/gmall-user',{db: {safe: true}});
// Bootstrap models
var modelsPath = path.join( __dirname, 'user/models' );
require( modelsPath + '/Group.js' );
require( modelsPath + '/Category.js' );
require( modelsPath + '/Brand.js' );
require( modelsPath + '/BrandTag.js' );
require( modelsPath + '/Filter.js' );
require( modelsPath + '/FilterTags.js' );
require( modelsPath + '/HomePage.js' );
require( modelsPath + '/Stuff.js' );
require( modelsPath + '/News.js' );
require( modelsPath + '/Stat.js' );
require( modelsPath + '/Master.js' );
require( modelsPath + '/Campaign.js' );
require( modelsPath + '/Info.js' );
require( modelsPath + '/Paps.js' );
require( modelsPath + '/Coupon.js' );
require( modelsPath + '/Witget.js' );
require( modelsPath + '/Keywords.js' );
require( modelsPath + '/Seopage.js' );*/


var cluster = require('cluster');


/*
if (cluster.isMaster) {
    var numCPUs = require('os').cpus().length;
    console.log (' Fork %s worker(s) from master', numCPUs);
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('online', function(worker) {
         console.log ('worker is running on %s pid', worker.process.pid);
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker with %s is closed', worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else if (cluster.isWorker) {
*/

    var app = express();

    var server = require( 'http' ).createServer( app );

    // Application Config

    //***********************************************************************************
    //*************************************** production ***********************************
    //app.set('env','production')

    //console.log(app.get('env'));
    process.env.NODE_ENV = app.get( 'env' ) || 'development';
    var config = require( './lib/config/config' );
    //var middleware = require('./lib/middleware');
    //var db = mongoose.connect( config.mongo.uri, config.mongo.options );
    app.set( 'port', process.env.PORT || 8909 );

    // Bootstrap models
    /*var modelsPath = path.join( __dirname, 'lib/models' );
    fs.readdirSync( modelsPath ).forEach( function (file) {
        require( modelsPath + '/' + file );
    } );
    var Seller = mongoose.model( 'Seller' );
    var OrderModel = mongoose.model( 'Order' );*/

    // Express settings
    require( './lib/config/express' )( app );

    //var Store = mongoose.model( 'Store' );
    //init script
    //require('./lib/config/init')();


    /*var lengthDomain;
    var query;

    var jwt = require( 'jwt-simple' );
    var moment = require( 'moment' );
    var User = mongoose.model( 'User' )*/
    //user
    /*app.use( function ensureAuthenticated(req, res, next) {
        //console.log(req.header('Authorization'))
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
        //req.user = payload.sub;
        //console.log(payload)
        User.findById( payload.sub, function (err, user) {
            //console.log(err)
            req.user = user;
            //console.log(req.user)
            next();
        } );

    } )*/
    /*//store
    app.use( function (req, res, next) {
        //console.log(req.url)
        //console.log(req.hostname);
        //req.chatRoom=chatRoom;
        if (req.query.subDomain) {
            query = {subDomain: req.query.subDomain};
            req.crawler = true;
            //console.log(query)
        } else {
            var subDomain = req.headers.host.split( '.' );
            if (subDomain[subDomain.length - 1] == 'localhost:8909') {
                subDomain[subDomain.length - 1] = 'gmall';
                subDomain[subDomain.length] = 'io';
            }
            //var protocol=(store.protocol)?store.protocol:'http://'
            //console.log(subDomain)
            if (subDomain.length == 2) {
                query = {domain: subDomain.join( '.' )}
            } else {
                query = {subDomain: subDomain[0]}
            }
            //console.log(query)
        }

        Store.findOne( query )
            .populate( 'template' )
            .populate( 'newTag', 'name url' )
            .populate( 'saleTag', 'name url' )
            .populate( 'seller' )
            .exec( function (err, store) {
                if (!store) {
                    Store.findOne( {type: "main"} )
                        .populate( 'template' )
                        .populate( 'newTag', 'name url' )
                        .populate( 'saleTag', 'name url' )
                        .populate( 'seller' )
                        .exec( function (err, store) {
                            //console.log(store)
                            req.store = store.toObject();
                            if (!req.store.domain) {
                                req.store.domain = req.store.subDomain + '.gmall.io'
                            }
                            req.store.protocol=req.protocol;
                            var protocol = (req.store.protocol) ? req.store.protocol : 'http://'
                            req.store.link = protocol + req.headers.host;
                            next();
                        } )
                } else {
                    req.store = store.toObject();
                    if (!req.store.domain) {
                        req.store.domain = req.store.subDomain + '.gmall.io'
                    }
                    req.store.protocol=req.protocol;
                    var protocol = (req.store.protocol) ? req.store.protocol : 'http://'
                    req.store.link = protocol + req.headers.host;
                    //console.log(req.store._id)
                    next();
                }
            } )
    })*/
    //robots
    //app.use(middleware.getStore)
    /*app.use( function (req, res, next) {
        if (req.url == '/robots.txt') {
            res.type( 'text/plain' )
            var text = 'User-agent: *\nDisallow: /\nDisallow: /admin123\nDisallow: /seo\nDisallow: /manage\nDisallow: /setting\nDisallow: /content\nDisallow: /promo\n' +
                'Sitemap: /' + req.store.subDomain + '.xml'
            res.send( text )
        } else {
            next()
        }
    })*/
    // mobile
    /*app.use( function (req, res, next) {
        var ua;
        try {
            ua = req.headers['user-agent'].toLowerCase();
        } catch (err) {
            ua = req.headers['user-agent'];
        }
        isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test( ua ) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test( ua.substr( 0, 4 ) );
        next();
    } );*/




    var router = express.Router();
    require( './lib/routes/index' )( router );
    app.use( '/', router );



    /**
     * error handler
     */
    app.use( function (error, req, res, next) {
        res.status( 500 );
        res.send( {'message': error.message || error} );
        var date = new Date().toISOString().replace( /T/, ' ' ).replace( /\..+/, '' );
        //var collection = (error.collectionName) ? error.collectionName : '';
        try{
            var uri=decodeURIComponent(req.url);
        }catch(err){
            var uri=req.url;
        }


        var s = date + ' ' + error.stack + "\n" + 'path - ' + uri + "\n";
        fs.appendFile( 'errors.gmall.log', s, function (err, data) {
            if (err) throw error;
        } );
    } );
    // boots app
    server.listen( app.get( 'port' ), function () {
        console.log( 'Express server listening on port ' + app.get( 'port' ) );
    } );
//} //worker









