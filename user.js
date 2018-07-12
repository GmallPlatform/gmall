var globalFunction=require('./public/scripts/myPrototype.js')
var fs = require('fs');
var path = require('path');
var mongoose=require('mongoose');

mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost/gmall-user',{useMongoClient:true});
// Bootstrap models
var modelsPath = path.join( __dirname, 'user/models' );
require( modelsPath + '/user.js' );

// Socket.io Communication
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var multer  = require('multer');

//require('./user/config/init').init();


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(multer({dest:'./public/videos'}).single('file'));

app.use(express.static(__dirname + '/public'));
app.use(cors({
    origin: true,
    credentials: true
}));
//CORS on ExpressJS
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/





//user
var chatRoom={};
app.use(function(req, res, next){
    //console.log(chatRoom)
    req.sockets=chatRoom;
    next();
} )



// Routing
var routerCollection = express.Router();
routerCollection.param( 'collectionName', function (req, res, next, name) {
    if(mongoose.model( name )){
        req.collection = mongoose.model( name );
        req.collectionName = name;
        next();
    }else{
        next(new Error("collection doesn't exist"));
    }
} );
require( './user/routes/routerCollection' )( routerCollection );
app.use( '/api/collections', routerCollection );
var router = express.Router();
require( './user/routes/router' )( router );
app.use( '/', router );
/**
 * error handler
 */
app.use( function (error, req, res, next) {
    // send back a 500 with a generic message
    res.status( 500 );
    res.send( {'message': error.message || error} );
} );




/*var User=mongoose.model('User');
User.find(function (err,users) {
   var actions=[];
    function nUser(user){
        return new Promise(function (resolve,reject) {
            user.stores={}
            if (user.store && user.store.length){
                user.store.forEach(function(store){
                    user.stores[store]=user.password;
                })
            }
            User.update({_id:user._id},{$set:{stores:user.stores}},function(err){
                if(err){reject(err)}
                console.log(user.stores)
                resolve()
            })
        })
    }
    users.forEach(function(user){
        actions.push(nUser(user))
    })
    Promise.all(actions).then(function(){
        console.log('!!!!!!!')
    }).catch(function(err){console.log(err)})
})*/
server.listen(3001,function(){
    console.log('Server running at http://127.0.0.1:3001/');
});






io.sockets.countSocket = [];
Socket = require( './user/controllers/socket' );
socket = new Socket( chatRoom, io.sockets );
io.sockets.on( 'connection', socket.connect );



//var io = require( 'socket.io' ).listen(serverIO);
//io.set('log level', 1);














