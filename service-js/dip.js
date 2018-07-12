var fs=require('fs');
var path = require('path')
var app = express();
var server = require( 'http' ).createServer( app );
app.set('env','production')
app.set( 'port', process.env.PORT || 8000 );
// Express settings
app.use(statick(path.join(__dirname + '/app')));
var router = express.Router();

/*app.use(express.static(__dirname + '/app'));         // set the static files location
app.use(express.logger('dev'));                         // log every request to the console
app.use(express.favicon(__dirname + '/app/img/favicon.ico'));
app.listen(8000);*/
app.get('/*', function(req, res) {
    res.sendfile('./app/index.html');
});

router.get('/', function(req, res) {
    res.sendfile('./app/index.html');
});
router.get('/*', function(req, res) {
    res.sendfile('./app/index.html');
});
app.use( '/', router );

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
    fs.appendFile( 'errors.log', s, function (err, data) {
        if (err) throw error;
    } );
} );
// boots app
server.listen( app.get( 'port' ), function () {
    console.log( 'Express server listening on port ' + app.get( 'port' ) );
} );
