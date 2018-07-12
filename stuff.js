/*require('@risingstack/trace');*/
// your application's code
var globalFunction=require('./public/scripts/myPrototype.js')

var fs = require('fs');
var path = require('path');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://localhost/gmall-stuff',{useMongoClient:true});
// Bootstrap models
var modelsPath = path.join( __dirname, 'stuff/models' );
fs.readdirSync( modelsPath ).forEach( function (file) {
    require( modelsPath + '/' + file );
} );

// Socket.io Communication
var express = require('express');
var useragent = require('express-useragent');
var multer  = require('multer');
var cookieParser = require('cookie-parser');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


var server = require('http').createServer(app);


//require('./stuff/config/init').init();

app.set('env','production')
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(methodOverride());
app.use(multer({dest:'./public/videos',limits: { fileSize: 20 * 1024 * 1024 }}).single('file'));
app.use(cookieParser());
app.use(useragent.express());

var downloadCatalog=require('./stuff/controllers/api/downloadCatalog.js')
app.get('/downloads/:subDomain/:lang/:currency/:brand/:file',downloadCatalog.downloadCatalog)
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.static(__dirname + '/public'));
//CORS on ExpressJS
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/






/*
app.use(function(req, res, next){
    //console.log(req.url)
    next();
} )
*/



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
require( './stuff/routes/routerCollection' )( routerCollection );
app.use( '/api/collections', routerCollection );
var router = express.Router();
require( './stuff/routes/router' )( router );
app.use( '/', router );
/**
 * error handler
 */
app.use( function (error, req, res, next) {
    //console.log(error)
    // send back a 500 with a generic message
    res.status( 500 );
    res.send( {'message': error.message || error} );
    var date = new Date().toISOString().replace( /T/, ' ' ).replace( /\..+/, '' );
    var collection = (req.collectionName) ? req.collectionName : '';
    var s = collection +" " +date + ' ' + error.stack + "\n" + 'path - ' + decodeURIComponent( req.url ) + "\n";
    fs.appendFile( './stuff/errors.stuff.log', s, function (err, data) {
        if (err) throw error;
    } );
} );
//console.log=function(){};





server.listen(8933,function(){
    console.log('Server running at http://127.0.0.1:8933/ for stuff');
});















