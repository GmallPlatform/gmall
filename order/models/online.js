'use strict';
var config=require('../config/config')
var request=require('request')

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var OnLineSchema = new Schema({
    store:String,
    year:Number,
    month:Number,
    day:Number,
    masters:[{
        master:String,
        entries:[{
            start:Number,
            qty:Number,
            service:{},
            user:{},
            used:{type:Boolean,default:false},
            remind:String,
            timeRemind:Number
        }]
    }]
});
OnLineSchema.statics = {
    load: function (query, cb) {
        //console.log('id-',id);
        var self=this;
        this.findOne(query)
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .sort({'year': 1,month:1,day:1})
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    }
}
mongoose.model('Online', OnLineSchema);
var moment = require('moment');
var cache={}
var arr = Array.apply(null, Array(96));


var BookingSchema = new Schema({
    store:{type:String,index:true},
    date:{type:String,index:true},
    master:String,
    masters:[String],
    masterNameL:{},
    masterName:{},
    masterUrl:String,
    start:Number,
    qty:Number,
    service:{},
    stuffNameL:{},
    stuffName:String,
    stuffLink:String,
    user:{},
    users:[],
    confirm:Date,
    used:{type:Boolean,default:false},
    remind:Boolean,
    timeRemind:Number,
    move:Boolean,
    comment:String,
    num:String,
    status:Number,//0-поступил, 1-оплачен, 2-выполнена
    paySum:Number,
    currency:String,
    tz:Number,// timezone,
    pay:{},// данные по оплате с liqPay
    pays:[],
    workplace:String,
    workplaceNameL:{},
    workplaceName:String,
    backgroundcolor:String
    //schedule:Boolean,// запись в расписание
});

BookingSchema.statics = {
    preUpdate:async function(req,cb){
        //console.log(req.body)
        let entry = req.body;
        let allowSave=true;
        let key = req.body.master+req.body.date;
        if(!cache[key]){
            cache[key]={exp:moment().add(10, 'seconds').unix(),data:arr.map(function (x, i) { return false })}
        }else{
            let nowTime =moment().unix()
            if(cache[key].exp && nowTime>cache[key].exp){
                // просрочен 10 секунд
                cache[key]={exp:moment().add(10, 'seconds').unix(),data:arr.map(function (x, i) { return false })}
            }else{
                // проверяем блокировку
                for(let i=entry.start;i<entry.start+entry.qty;i++){
                    if(cache[key].data[i]){
                        allowSave=false;
                        break;
                    }
                }
            }
        }
        if(allowSave){
            for(let i=entry.start;i<entry.start+entry.qty;i++){
                cache[key].data[i]=true;
            }
        }
        // проверям наличие свободных блоков
        //let entries = await this.find({date:entry.date,master:entry.master,start: { $gte: entry.start } }).lean()
        let entries = await this.find({date:entry.date,master:entry.master}).lean()
        entry.end=entry.start+entry.qty
        if(entries && entries.length){
            for(let i =0;i<entries.length;i++){
                let e = entries[i];
                e.end=entries[i].start+entries[i].qty;
                //if(entry.start<e.start && entry.)
            }
        }
        entry.num = Date.now();
        //console.log(entry)
        /*console.log(entries)
        console.log(allowSave)
        console.log(cache[key])*/
        cb()
    },
    postUpdate: function(entry,store){
        console.log('store.onlineReservation',store.onlineReservation)
        let ModelBooking=this;
        let minute=60;
        if(store && store.onlineReservation){
            try{
                let onlineReservation=Number(store.onlineReservation)
                let firstMsgTimer=store.onlineReservation-5;
                if(firstMsgTimer>0&& firstMsgTimer<115){
                    console.log('set first timeout')
                    setTimeout(function(){
                        ModelBooking.findById(entry._id, function (err, doc) {
                            if(!doc){return}
                            if(!doc.status || doc.status!=1){
                                console.log("заказ не оплачен. бронь будет отменена через 5 минут.")
                                //заказ не оплачен. бронь будет отменена через 5 минут.
                                let o={}
                                o.text=doc.service.name+' '+'не оплачен.Бронь будет снята.'
                                o.phone=doc.user.phone;
                                o.onlyText=true;
                                o.fromServer=true;
                                var urll = "http://" + config.userHost + "/api/users/sendMessageAboutDealFromServer?store="+store._id;
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

                    },firstMsgTimer*1000*minute)
                }
                if(onlineReservation>0&& onlineReservation<120){
                    console.log('set second timeout')
                    setTimeout(function(){
                        ModelBooking.findById(entry._id, function (err, doc) {
                            if(!doc){return}
                            if(!doc.status || doc.status!=1){
                                doc.remove(function (err,result) {
                                    console.log('ModelBooking remove',err)
                                    let url = 'http://'+config.socketHost+'/newRecordOnSite/'+store._id
                                    request.get( {url: url}, function (err, response) {
                                        //console.log('err',err)
                                        if (err) {console.log(err)}else{
                                            //console.log('response',response)
                                        }
                                    } )
                                })
                            }
                        })

                    },onlineReservation*1000*minute)
                }

            }catch(err){console.log(err)}
        }

    },
    load: function (query, cb) {
        if(typeof query !='object'){
            query ={_id:query}
        }
        var self=this;
        this.findOne(query)
            .exec(cb)
    },
    list: function (options, cb) {
        //console.log(options.criteria)
        var criteria = options.criteria || {}
        //console.time('find')
        this.find(criteria)
            .limit(options.perPage)
            .sort({'date':-1})
            .skip(options.perPage * options.page)
            .exec((err,res)=>{
            //console.timeEnd('find');
            cb(err,res)
            })
    }
}
mongoose.model('Booking', BookingSchema);




