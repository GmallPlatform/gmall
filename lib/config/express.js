'use strict';

var path = require('path'),
    config = require('./config'),
    //flash 	 = require('connect-flash'),
    useragent = require('express-useragent');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var session= require('express-session');
var favicon= require('serve-favicon');
var statick= require('serve-static');
//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}


var cors = require('cors');



/**
 * Express configuration
 */
module.exports = function(app) {
    // view engine setup
    //app.use(logger('dev'));

    app.set('view engine', 'pug')
    app.use(bodyParser.json({limit: '5mb'}));
    app.use(bodyParser.urlencoded({
        limit: '5mb',
        extended: true
    }));
    //app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(useragent.express());
    app.use(statick(path.join(config.root, 'public')));
    app.set('views', config.root + '/public/views');
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
       // app.set('views', config.root + '/public/views');
    };

    if (app.get('env') === 'production') {
        //console.log('production');
        //console.log=function(){};
        //console.log('production1');
        //app.set('views', config.root + '/views');
    };
    app.set('trust proxy', true);
    app.use(allowCrossDomain);
    app.use(cors({
        origin: true,
        credentials: true
    }));





};