var globalFunction=require('./public/scripts/myPrototype.js')
var express = require('express');
var fs=require('fs');
var workers=require('./workers')
var cache=require('./lib/cache');
var ip=require('./modules/ip/ip');


var path = require('path');
if(!ip.local){
    var mongoose=require('mongoose');
    var db = mongoose.connect('mongodb://localhost/gmall-stuff',{useMongoClient:true});
// Bootstrap models
    var modelsPath = path.join( __dirname, 'stuff/models' );
    fs.readdirSync( modelsPath ).forEach( function (file) {
        require( modelsPath + '/' + file );
    } );

}

var cluster = require('cluster');


if (cluster.isMaster) {
    var numCPUs = require('os').cpus().length;
    console.log (' Fork %s worker(s) from master', numCPUs);
    for (var i = 0; i < 1/*numCPUs*/; i++) {
        //http://www.acuriousanimal.com/2017/08/12/understanding-the-nodejs-cluster-module.html
        const worker = cluster.fork();
        workers.push(worker);
        worker.on('message', function(message) {
            if(message.msg =='clearCache'){
                console.log(`Master ${process.pid} recevies message '${JSON.stringify(message.msg)}' from worker ${worker.process.pid}`);
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


        var s = date + ' ' + error.stack + "\n" + 'path - ' + uri + "\n"+ "\n"+ 'subDomain - ' + ((req.store)?req.store.subDomain:'??') + "\n";
        fs.appendFile( 'errors.gmall.log', s, function (err, data) {
            if (err) throw error;
        } );
    } );
    // boots app
    server.listen( app.get( 'port' ), function () {
        console.log( 'Express server listening on port ' + app.get( 'port' ) );
    } );
} //worker









