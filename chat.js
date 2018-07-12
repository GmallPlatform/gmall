var globalFunction=require('./public/scripts/myPrototype.js')
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://localhost/gmall-chat',{useMongoClient:true});
// Bootstrap models
var modelsPath = path.join( __dirname, 'chat/models' );
require( modelsPath + '/chat.js' );
require( modelsPath + '/notification.js' );
// Socket.io Communication
//var compression = require('compression');
var express = require('express');
var app = express();

/*app.get('/', function(req, res,next){
    console.log('ddd!')
    next()
});*/
//app.use(compression());
var cors = require('cors');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var chatRoom=[];


var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
//app.use(express.static(__dirname + '/public'));
app.use(cors());

app.get('/', function(req, res,next){
    console.log('ddd')
    next()
});
app.get('/newRecordOnSite/:store', function(req, res,next){
    console.log('/newRecordOnSite/:store')
    var sockets =chatRoom;
    if(!sockets || !sockets.length){return}
    for(let i=0,l=sockets.length;i<l;i++){
        //console.log(sockets[i].user,sockets[i].seller,sockets[i].store)
        if (sockets[i].user=='seller' && sockets[i].store && sockets[i].store==req.params.store){
            sockets[i].emit('newRecordOnSite');
            console.log('newRecordOnSite from  /newRecordOnSite/:store')
        }
    }
    res.json({})
});
// Routing
var routerCollection = express.Router();
routerCollection.param( 'collectionName', function (req, res, next, name) {
    //console.log('name - ',name)
    req.chatRoom=chatRoom;
    if(mongoose.model( name )){
        req.collection = mongoose.model( name );
        req.collectionName = name;
        next();
    }else{
        next(new Error("collection doesn't exist"));
    }
} );
require( './chat/routes/routerCollection' )( routerCollection );
app.use( '/api/collections', routerCollection );
var router = express.Router();
require( './chat/routes/router' )( router );

app.use( '/newRecordOnSite', router );

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
    fs.appendFile( './chat/errors.chat.log', s, function (err, data) {
        if (err) throw error;
    } );
} );





server.listen(3200,function(){
    console.log('Server running at http://127.0.0.1:3200/');
});
//var io = require( 'socket.io' ).listen(serverIO);
//io.set('log level', 1);

io.sockets.countSocket = [];
Socket = require( './chat/controllers/socket' );

socket = new Socket( chatRoom, io.sockets );
io.sockets.on( 'connection', socket.connect );





/*io.sockets.on('connection',function(socket){
    //console.log('???')
    console.log(socket.handshake.headers.referer)
});*/














