var globalFunction=require('./public/scripts/myPrototype.js')
var express = require('express');
var fs=require('fs');

var cluster = require('cluster');


if (cluster.isMaster) {
    var numCPUs = require('os').cpus().length;
    //console.log (' Fork %s worker(s) from master', numCPUs);
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('online', function(worker) {
         //console.log ('worker is running on %s pid', worker.process.pid);
    });
    cluster.on('exit', function(worker, code, signal) {
        /*console.log('worker with %s is closed', worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');*/
        cluster.fork();
    });
} else if (cluster.isWorker) {

    var app = express();

    var server = require( 'http' ).createServer( app );

    // Application Config

    //***********************************************************************************
    //*************************************** production ***********************************
    app.set('env','production')
    process.env.NODE_ENV = app.get( 'env' ) || 'development';
    var config = require( './lib/config/config' );
    app.set( 'port', process.env.PORT || 8909 );
    // Express settings
    require( './lib/config/express' )( app );
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
} //worker









