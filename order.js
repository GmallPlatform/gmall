var globalFunction=require('./public/scripts/myPrototype.js')
var jstz = require('jstimezonedetect');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost/gmall-order',{useMongoClient:true});
// Bootstrap models
var modelsPath = path.join( __dirname, 'order/models' );
require( modelsPath + '/order.js' );
require( modelsPath + '/online.js' );
//console.log(mongoose.model('Booking'))

// Socket.io Communication
var express = require('express');
var useragent = require('express-useragent');
var app = express();
var multer  = require('multer');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var schedule = require('node-schedule');


var server = require('http').createServer(app);





app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
}));
app.use(bodyParser.json({limit: '50mb'}));
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
    //console.log(name,mongoose.model( name ))
    if(mongoose.model( name )){
        req.collection = mongoose.model( name );
        req.collectionName = name;
        next();
    }else{
        next(new Error("collection doesn't exist"));
    }
} );
require( './order/routes/routerCollection' )( routerCollection );
app.use( '/api/collections', routerCollection );
var router = express.Router();
require( './order/routes/router' )( router );
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
    fs.appendFile( './order/errors.order.log', s, function (err, data) {
        if (err) throw error;
    } );
} );






server.listen(3033,function(){
    console.log('Server running at http://127.0.0.1:3033/ for order');
});


/*
console.log(jstz.determine().name())
var d = new Date();
var n = d.getTimezoneOffset();
console.log(n)*/


var Booking= mongoose.model('Booking');
var middleware = require('./order/middleware')
var config= require('./order/config/config')
var request= require('request');
var moment = require('moment');
var storeAPI = require('./modules/store-api');
init()
function init() {
    let taskSchedule = new schedule.RecurrenceRule();
    //taskSchedule.minute=[0,1,2,4,5,6,8,9,10,12,13,14,15,16,18,19,20,21,22,25,26,28,29,30,31,32,33,35,40,41,42,43,45,47,49,50,53,55,58,59];
    taskSchedule.minute=[0,15,30,45];
    schedule.scheduleJob(taskSchedule,async function(){
        let date = new Date();
        let x=date;

        let y = x.getUTCFullYear();
        let m = x.getUTCMonth();
        let d = x.getUTCDate();
        let h = x.getUTCHours();
        let mm= x.getUTCMinutes()
        let UTSdate= new Date(y,m,d,h,mm)
        var currentPart = Math.trunc(mm/15)+h*4
        //console.log('currentPart',currentPart,date)
        

        var month = date.getMonth() //+ 1; //months from 1-12
        var day = date.getDate();
        var year = date.getFullYear();
        if(month<10){month='0'+month}
        if(day<10){day='0'+day};
        let td ='date'+year+month+day
        var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var monthtomorrow = tomorrow.getMonth() //+ 1; //months from 1-12
        var daytomorrow = tomorrow.getDate();
        var yeartomorrow = tomorrow.getFullYear();
        if(monthtomorrow<10){monthtomorrow='0'+monthtomorrow}
        if(daytomorrow<10){daytomorrow='0'+daytomorrow};
        let tdtomorrow ='date'+yeartomorrow+monthtomorrow+daytomorrow


        let query={date:{$in:[td,tdtomorrow]},remind:true};
        let res = await Booking.find(query).lean();

        if(res && res.length){
            res.forEach(async function (entry) {
                /*console.log(entry)
                console.log('entry.tz',entry.tz)*/
                let currentDate;
                if(!entry.tz &&  entry.tz!==0){
                    entry.tz = -3;
                }
                let sdvig = entry.tz*4;
                //console.log('sdvig',sdvig)

                if(entry.timeRemind){
                    let partRemind;
                    if(entry.date == td){
                        partRemind=entry.start-entry.timeRemind + sdvig
                    }else if(entry.date == tdtomorrow){
                        partRemind=entry.start+96-entry.timeRemind + sdvig;
                    }
                    //console.log('partRemind',partRemind,currentPart)
                    if(partRemind===currentPart){
                        //console.log("equals!!");
                        let dataForSend={}
                        let hour = Math.floor(entry.start/4)
                        let minutes = (entry.start%4)*15
                        let year = entry.date.substring(4,8)
                        let month = entry.date.substring(8,10)
                        let day = entry.date.substring(10)
                        try{
                            let date = new Date(year,month,day,hour,minutes)
                            date= moment(date).format('LLL')
                            dataForSend.name=entry.user.name
                            dataForSend.userId=entry.user._id
                            dataForSend.phone=entry.user.phone
                            dataForSend.text=entry.service.name
                            dataForSend.date=date;
                            dataForSend.store=entry.store;
                            dataForSend.fromServer=true;
                        }catch(err){console.log(err)}

                        //console.log(dataForSend)
                        //return;
                        var urll = "http://" + config.userHost + "/api/users/sendMessageAboutDealFromServer?store="+entry.store;
                        request.post({
                            headers: {'content-type':'application/json'},
                            url:urll,
                            form: dataForSend
                        }, function(error, response, body){
                            //console.log(error,body);
                        });
                        Booking.update({_id:entry._id},{$set:{remind:false}},function(err,result){
                            if(err){
                                console.log(err,result)
                            }
                        })
                    }
                }
            })

        }
    });
    cancelReservation()
    async function cancelReservation(){
        let num = Date.now()-30*60*1000
        let query={num:{$gt:num},status: { $exists: false }};
        let stores={};
        try{
            let res = await Booking.find(query).lean();
            if(res && res.length){
                res.forEach(async function (entry) {
                    let store;
                    if(stores[entry.store]){
                        store=stores[entry.store]
                    }
                    if(!store){
                        store = await storeAPI.getStoreByIdPromise(entry.store)
                    }
                    if(!store || !store.onlineReservation){return}

                    let delta = Math.ceil(((entry.num-num)/1000)/60)
                    console.log('store.onlineReservation',store.onlineReservation,'delta',delta)
                    //console.log(delta)
                    if(delta>0&& delta>5){
                        console.log('set first timeout')
                        setTimeout(function(){
                            Booking.findById(entry._id, function (err, doc) {
                                if(!doc){return}
                                if(!doc.status || doc.status!=1){
                                    console.log("заказ не оплачен. бронь будет отменена через 5 минут.")
                                    //заказ не оплачен. бронь будет отменена через 5 минут.
                                    let o={}
                                    o.text=doc.service.name+' '+'не оплачен.Бронь будет снята.'
                                    o.phone=doc.user.phone;
                                    o.onlyText=true;
                                    o.fromServer=true;
                                    var urll = "http://" + config.userHost + "/api/users/sendMessageAboutDealFromServer?store="+doc.store;
                                    request.post({
                                        headers: {'content-type':'application/json'},
                                        url:urll,
                                        form: o
                                    }, function(error, response, body){
                                        //console.log(error,body);
                                    });
                                    //sendSMS(o)
                                }
                            })

                        },(delta-5)*60000)
                    }
                    if(delta>0&& delta<=30){
                        console.log('set second timeout')
                        setTimeout(function(){
                            Booking.findById(entry._id, function (err, doc) {
                                if(!doc){return}
                                if(!doc.status || doc.status!=1){
                                    doc.remove(function (err,result) {
                                        console.log('ModelBooking remove',err,result)
                                        let url = 'http://'+config.socketHost+'/newRecordOnSite/'+doc.store
                                        request.get( {url: url}, function (err, response) {
                                            //console.log('err',err)
                                            if (err) {console.log(err)}else{
                                                //console.log('response',response)
                                            }
                                        } )
                                    })
                                }
                            })

                        },delta*60000)
                    }
                })
            }
        }catch(err){
            console.log(err)
        }



    }


}











