var globalFunction=require('./public/scripts/myPrototype.js')
var express = require('express');
var fs=require('fs')
var workers=require('./workers')
var cache=require('./lib/cache');



//сборщик мусора
setInterval(function(){
    if(global.gc){
        global.gc();
    }
}, 1000*30);

/*
var path = require('path');
var mongoose=require('mongoose');
var db = mongoose.connect('mongodb://localhost/gmall-stuff',{useMongoClient:true});
// Bootstrap models
var modelsPath = path.join( __dirname, 'stuff/models' );
fs.readdirSync( modelsPath ).forEach( function (file) {
    require( modelsPath + '/' + file );
} );
*/

var cluster = require('cluster');


if (cluster.isMaster) {
    var numCPUs = require('os').cpus().length;
    console.log (' Fork %s worker(s) from master', numCPUs);
    for (var i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();
        workers.push(worker);
        worker.on('message', function(message) {
            if(message.msg =='clearCache'){
                console.log(`Master ${process.pid} recevies message '${JSON.stringify(message)}' from worker ${worker.process.pid}`);
                workers.forEach(function(worker) {
                    if(worker.process.pid!=message.pid){
                        worker.send({ msg: 'clearCache',store:message.store });
                    }

                })
            }

        });
    }



    cluster.on('online', function(worker) {
         console.log ('worker is running on %s pid', worker.process.pid);
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker with %s is closed', worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });

    workers.forEach(function(worker) {
        //console.log(`Master ${process.pid} sends message to worker ${worker.process.pid}...`);
        //worker.send({ msg: `Message from master ${process.pid}` });
    }, this);

} else if (cluster.isWorker) {

    process.on('message', function(message) {
        //console.log(`Worker ${process.pid} recevies message '${JSON.stringify(message)}'`);
        if(message.msg =='clearCache'){
            console.log(message.store.subDomain,cache[message.store.subDomain])
            if(cache && cache.storeList && cache.storeList[message.store.subDomain]){
                console.log('cache[message.store.subDomain] done')
                cache.storeList[message.store.subDomain]=message.store
            }
        }
    });

    //console.log(`Worker ${process.pid} sends message to master...`);
    //process.send({ msg: `Message from worker ${process.pid}` });

    var app = express();

    var server = require( 'http' ).createServer( app );
    server.keepAliveTimeout=20000;

    // Application Config

    //***********************************************************************************
    //*************************************** production ***********************************
    app.set('env','production')

    process.env.NODE_ENV = app.get( 'env' ) || 'development';
    var config = require( './lib/config/config' );
    //var middleware = require('./lib/middleware');


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
        var s = date + ' ' + error.stack + "\n" + 'path - ' + decodeURIComponent( req.url ) + "\n"+ 'subDomain - ' + ((req.store)?req.store.subDomain:'??') + "\n";
        console.log(s)
        fs.appendFile( 'errors.gmall.log', s, function (err, data) {
            if (err) throw error;
        } );
    } );
    // boots app
app.set( 'port',8909 )
    server.listen( app.get( 'port' ), function () {
        console.log( 'Express server listening on port ' + app.get( 'port' ) );
    } );
} //worker

//ERR_CONTENT_LENGTH_MISMATCH

//https://stackoverflow.com/questions/25993826/err-content-length-mismatch-on-nginx-and-proxy-on-chrome-when-loading-large-file
//https://github.com/expressjs/serve-static/issues/34









