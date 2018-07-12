var fs = require('fs');
var path = require('path');


var express = require('express');
var useragent = require('express-useragent');
var multer  = require('multer');
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
app.use(multer({dest:'./public/videos'}).single('file'));
app.use(useragent.express());


app.use(express.static(__dirname + '/public'));
app.use(cors({
    origin: true,
    credentials: true
}));


var middleware = require('./photo/middleware')
app.use(function (req,res,next) {
    req.onPhotoHost=true;
    next()
});
app.use(middleware.getStore);
app.use(middleware.getUser);
/*app.use(function(req,res,next){
    console.log(req.user)
    console.log(req.store)
})*/
// Routing
var routerCollection = express.Router();
routerCollection.param( 'collectionName', function (req, res, next, name) {
    req.collectionName = name;
    next();
    /*if(mongoose.model( name )){
        req.collection = mongoose.model( name );
        req.collectionName = name;
        next();
    }else{
        next(new Error("collection doesn't exist"));
    }*/
} );
require( './photo/routes/routerCollection' )( routerCollection );
app.use( '/api/collections', routerCollection );
var router = express.Router();
require( './photo/routes/router' )( router );
app.use( '/', router );
/**
 * error handler
 */
app.use( function (error, req, res, next) {
    // send back a 500 with a generic message
    res.status( 500 );
    res.send( {'message': error.message || error} );
    var date = new Date().toISOString().replace( /T/, ' ' ).replace( /\..+/, '' );
    var collection = (req.collectionName) ? req.collectionName : '';
    var s = collection +" " +date + ' ' + error.stack + "\n" + 'path - ' + decodeURIComponent( req.url ) + "\n";
    fs.appendFile( './photo/errors.photo.log', s, function (err, data) {
        if (err) throw error;
    } );
} );
//console.log=function(){};





server.listen(3304,function(){
    console.log('Server running at http://127.0.0.1:3304/ for photo_tatiana');
});

//сборщик мусора
setInterval(function(){
    if(global.gc){
        console.log('gc')
        global.gc();
    }
}, 1000*30);















