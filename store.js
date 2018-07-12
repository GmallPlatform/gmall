/*process.env.TRACE_SERVICE_NAME='store';
process.env.TRACE_API_KEY=
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4OTM5OTY4ZDgyNzM3MDAwMTAwYmE1NiIsImlhdCI6MTQ4NjA2ODA3Mn0.I0VBBy-VwRzJDbcmPlx7r6VHB8JT-EBtw6tCZfotsBk.eyJpZCI6IjU4OTM5OTY4ZDgyNzM3MDAwMTAwYmE1NiIsImlhdCI6MTQ4NjA2ODA3Mn0.I0VBBy-VwRzJDbcmPlx7r6VHB8JT-EBtw6tCZfotsBk.eyJpZCI6IjU4OTM5OTY4ZDgyNzM3MDAwMTAwYmE1NiIsImlhdCI6MTQ4NjA2ODA3Mn0.I0VBBy-VwRzJDbcmPlx7r6VHB8JT-EBtw6tCZfotsBk.eyJpZCI6IjU4OTM5OTY4ZDgyNzM3MDAwMTAwYmE1NiIsImlhdCI6MTQ4NjA2ODA3Mn0.I0VBBy-VwRzJDbcmPlx7r6VHB8JT-EBtw6tCZfotsBk';
require('@risingstack/trace');*/
var globalFunction=require('./public/scripts/myPrototype.js')
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost/gmall-store',{useMongoClient:true});
// Bootstrap models
var modelsPath = path.join( __dirname, 'store/models' );
require( modelsPath + '/store.js' );
require( modelsPath + '/config.js' );
require( modelsPath + '/lang.js' );
require( modelsPath + '/redirect.js' );
require( modelsPath + '/customLists.js' );
require( modelsPath + '/blocksConfig.js' );
require( modelsPath + '/externalCatalog.js' );
//console.log(mongoose.model('ExternalCatalog'))

// Socket.io Communication
var express = require('express');
var useragent = require('express-useragent');
var app = express();
var multer  = require('multer');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


var server = require('http').createServer(app);


//require('./store/config/init').init();


app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(multer({dest:'./public/videos'}).single('file'));
app.use(cookieParser());
app.use(useragent.express());


app.use(express.static(__dirname + '/public'));
//CORS on ExpressJS
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/


//http://stackoverflow.com/questions/24433099/how-to-disable-withcredentials-in-http-header-with-node-js-and-request-package
// How to disable 'withcredentials' in HTTP header with node.js and Request package?
//http://stackoverflow.com/questions/36267171/cors-node-js-issue
//CORS node js issue

app.use(cors({
    origin: true,
    credentials: true
}));











//user
//app.use( )



// Routing
var routerCollection = express.Router();
routerCollection.param( 'collectionName', function (req, res, next, name) {
    //console.log(req.url)
    if(mongoose.model( name )){
        req.collection = mongoose.model( name );
        req.collectionName = name;
        next();
    }else{
        next(new Error("collection doesn't exist"));
    }
} );
require( './store/routes/routerCollection' )( routerCollection );
app.use( '/api/collections', routerCollection );
var router = express.Router();
require( './store/routes/router' )( router );
app.use(function(req,res,next){
    //console.log(req.url);
    next();
})
app.use( '/', router );
/**
 * error handler
 */
app.use( function (error, req, res, next) {
    // send back a 500 with a generic message
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
    fs.appendFile( './store/errors.store.log', s, function (err, data) {
        if (err) throw error;
    } );
} );





server.listen(3002,function(){
    console.log('Server running at http://127.0.0.1:3002/ for Store');
});
//var io = require( 'socket.io' ).listen(serverIO);
//io.set('log level', 1);














