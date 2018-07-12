'use strict';

var path = require('path'),
    config = require('./config'),
    passport = require('passport'),
    //flash 	 = require('connect-flash'),
    useragent = require('express-useragent');
var logger = require('morgan');
//var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var session= require('express-session');
var favicon= require('serve-favicon');
var statick= require('serve-static');
var multer  = require('multer');
   var mongoStore = require('connect-mongo')(session);

var url=require('url')
//var multipart = require('connect-multiparty');

/**
 * Express configuration
 */
module.exports = function(app) {
    // view engine setup
    //app.use(logger('dev'));
    app.set('view engine', 'jade');
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, 'public/'+folder);
        },
        filename: function (req, file, callback) {
            callback(null, suffix + '-' + file.fieldname+'.' + mime.extension(file.mimetype));
        }
    });

    app.use(multer({dest:'./public/videos'}).single('file'));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(useragent.express());
    app.use(statick(path.join(config.root, 'public')));
    if (app.get('env') === 'development') {
        // Disable caching of scripts for easier testing
        app.use(function noCache(req, res, next) {
          if (req.url.indexOf('/scripts/') === 0) {
            //res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.header('Pragma', 'no-cache');
            res.header('Expires', 0);
          }
          next();
        });
        app.use(errorHandler());
        app.set('views', config.root + '/public/views');
    };

    if (app.get('env') === 'production') {
        console.log('production');
        console.log=function(){};
        console.log('production1');
        app.set('views', config.root + '/views');
    };

    app.set('trust proxy', true);


    // Persist sessions with mongoStore
    app.use(session({
        secret: 'greatMall',
        //name: cookie_name,
        store: new mongoStore({
            url: config.mongo.uri,
            collection: 'sessions'
        }),
        proxy: true,
        resave: true,
        saveUninitialized: true
    }));


    //use passport session
    app.use(passport.initialize());
    app.use(passport.session());
   // app.use(flash()); // use connect-flash for flash messages stored in session


};