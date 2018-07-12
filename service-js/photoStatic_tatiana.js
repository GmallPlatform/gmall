var express = require('express');
var useragent = require('express-useragent');
var app = express();
var cors = require('cors')
var server = require('http').createServer(app);

app.set('env','production')
app.use(useragent.express());
app.get('/*',function (req, res, next) {
    res.setHeader("Cache-Control", "public, max-age=2592000");
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    next()
});
app.use(express.static(__dirname + '/public'));
app.use(cors({
    origin: true,
    credentials: true
}));

server.listen(3305,function(){
    console.log('Server running at http://127.0.0.1:3305/ for photo gmall_tatiana static');
});















