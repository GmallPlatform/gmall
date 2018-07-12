'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectID = mongoose.Types.ObjectId;
var config=require('../config/config');
//console.log(config)
var socketHost='http://'+config.socketHost;
//console.log(socketHost)
var request=require('request');
var fs=require('fs')

var InnerCartSchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    order:{type : Schema.ObjectId, ref : 'Order'},
    status:{ type: Number, default: 1 },
    opt:{ type: Number, default: 5 },
    partner:{ type: String, default: null },
    cascade:{},
    ship:{ type: Number, default: 0 },

    cart:[{
        stuff:{type : Schema.ObjectId, ref : 'Stuff'},
        size:{type : Schema.ObjectId, ref : 'FilterTags'},
        category:{type : Schema.ObjectId, ref : 'Category'},
        name:String,

        stuffUrl:String,
        categoryUrl:String,
        brandUrl:String,
        brandName:String,
        brand:String,
        categoryName:String,
        img:String,
        quantity:Number,
        price:Number,
        cena:Number,
        sum:Number,
        priceSale:Number,
        retail:Number,
        onStock:Number,
        coupon:Boolean,
        single:Boolean,
        unitOfMeasure:String,
        idForXML:Number,
        extCatalog:String,
        link:String,

        sizeName:String,//(sortName)
        filterName:String,
        // названия для группы разновидности
        groupName:String,
        groupTagName:String,

    }]

})


var CartInOrderSchema = new Schema({
    order:{type : Schema.ObjectId, ref : 'Order'},
    stuffs:[{
        _id:String,
        name:String,
        artikul:String,
        url:String,
        category:String,
        brand:String,
        img:String,

        quantity:Number,
        price:Number,
        priceSale:Number,
        priceSaleHandle:Boolean,// ручное изменение цены
        retail:Number,
        priceCampaign:Number,


        sort:String,

        campaignId:String,
        onStock:Number, //?????

        single:Boolean,
        multiple:Boolean,
        minQty:Number,
        maxQty:Number,
        maxDiscount:Number,
        maxDiscountOver:Boolean, // превышение максимально возможной скидки



        sticker:String,
        unitOfMeasure:String,
        currency:{type:String,default:"UAH"},
        //old
        stuff:String,// тоже что и _id из старого
        cena:Number,
        sum:Number,
        idForXML:Number,
        extCatalog:String,

        link:String,
        sortName:String,
        filterName:String,
        // названия для группы разновидности
        groupName:String,
        groupTagName:String,

    }]
});



var OrderSchema = new Schema({
    store:String,
    seller:String,
    num:{type:Number,index:true},
    status:{ type: Number, default: 1 },
    user: String,
    userEntry: String,
    date: { type: Date, default: Date.now },// поступил
    date2: { type: Date},// принят статус 2
    date3 :{type: Date}, // оплачен 3
    date4 :{type: Date}, // дата отправки уведомления об отправлке
    date5 :{type: Date}, // архив5
    comment:{type:String,default:''},
    note:String,
    sum:{type:Number,default:0},
    paySum:{type:Number,default:0},// в валюте ордера
    shipCost:Number, // сумма доставки
    quantity:{type:Number,default:0},
    kurs:{type:Number,default:1}, // из данных системы
    currency:{type:String,default:'UAH'},
    currencyStore:{}, // из конфика магазина объект currency
    // сохраняем потому что адрес доставки может поменяться
    profile:{
        fio:String,
        phone:String,
        zip:String,
        countryId:String,
        city:String,
        cityId:String,
        address:String,
        transporter:String,
        transporterOffice:String
    },

    invoice:{type: Date}, //дата выставления счета на оплату
    invoiceInfo:String,// содержание счета

    statSent:Boolean, //данные в статистике гугла были отправлениы
   // промо данные
    campaign:[String],//данные по рекламной компании
    coupon:String,
    cascade:{},// из данных продавца
    opt:{}, // из данных продавца

    // содержание корзины
    cart:{type : Schema.ObjectId, ref : 'CartInOrder'},
    //cart:{type : Schema.ObjectId, ref : 'CartInOrder'},
    pay:[{date:Date,sum: Number,currency:String,info:String,transaction_id:Number}],
    shipDetail:[{stuffs:[],info:String,sum:Number,date:Date,ttn:String}],// если несколько едениц и для некоторых из них свой адрес доставки
    discount:{type:{type:Number,default:0},value:{type:Number,default:0}},// объект для информации по применяемой системе скидок
    /* type  false = не рприменяется
    1 - Принудительная оптовая цена для всех позиций включая розницу и sale.
    2 - Принудительное изменение цены на оптовую всех позиций без изменения цены sale

    3- Принудительное изменение цены на оптовую, включая SALE, и применение ко всем позициям скидки, value значение скидки в %
     4-  Принудительное изменение цены на оптовую, кроме цен SALE, и применение скидки на позиции кроме SALE
    5- Принудительное изменение цены на оптовую, кроме цен SALE, и применение ко всем позициям скидки скидки
    6- На сумму корзины, независимо от метода формирования суммы корзины. Либо процент, либо сумма
    */

    maxDiscountOver:Boolean,// хоть у удного товара в ордене было ручное изменение цены
    priceSaleHandle:Boolean,//хоть у одного товара в ордере есть превышение максимального размера скидки
});


//OrderSchema.add({discount:{type:{type:Number,default:0},value:{type:Number,default:0}}});

/**
 * Virtuals
 */

/**
 * Pre-save hook
 */
//middle ware in serial
OrderSchema.pre('update', function preSave(next){
    /*console.log('date1-'+order.date1);
    var order = this;
    if (order.status==2 && !order.date1){
        order.date1(Date.now());
    }*/
    //console.log('order.num-');
    next();
});
/**
 * Methods
 */
CartInOrderSchema.statics = {
    load: function(id,cb){
        this.findById(id).exec(cb)
    }
}
OrderSchema.statics = {
    preUpdate:function(req,cb){
        //console.log('!!!!!!!!!!!')

        //console.log('req.body-',req.body,'req.query-',req.query)
        if(req.query && req.query.update){return cb()}
        //console.log(typeof req.user.coupons[0]);return;
        var self=this;
        //console.log(req.body);
        var Cart=mongoose.model('CartInOrder');
        /*var Coupon=mongoose.model('Coupon');
        var User=mongoose.model('User');*/
        var order=req.body;
        if (!order.user &&  !order.userEntry) {
            var error = new Error('Нет владельца ордера!');
            return cb(error)
        }
        try{
            if(order.user && order.user._id){
                order.user=order.user._id;
            }
            if(order.userEntry && order.userEntry._id){
                order.userEntry=order.userEntry._id;
            }
            if(order.coupon && order.coupon._id){
                order.coupon=order.coupon._id;
            }
            if(order.seller && order.seller._id){
                order.seller=order.seller._id;
            }
            if(order.campaign && order.campaign.length){
                order.campaign = order.campaign.map(function(c){
                    if(c._id){return c._id}else{return c}

                });
            }
        }catch(err){
            console.log('err in catch ',err)
        }



        //console.log('req.body-',req.body,'req.query-',req.query);
        //console.log(order.campaign)
        if (order._id && order.num){
            cb()
        } else {

            // создаем корзину для нового заказа
            var cart =  new Cart({stuffs:order.cart.stuffs});
            // создаем первую доставку
            if(order.profile && order.profile.fio){
                order.shipDetail={
                    stuffs:order.cart.stuffs.reduce(function(arr,current){
                        let s= current.name+' '+(current.artikul||'')+' '+(current.sortName||'');
                        let o = {name:s,qty:current.quantity}
                        if(current.unitOfMeasure){o.unitOfMeasure=current.unitOfMeasure}
                        arr.push(o)
                        return arr;
                    },[]),
                    info:(order.profile.fio||'')+', '+(order.profile.city||'')+", "+(order.profile.transporter||''),
                    sum:0,
                    date:Date.now()
                }
            }
            //console.log(order.shipDetail)
            order.cart=cart._id;
            // проверка купона. если есть купон в ордере.
            // если его нет у пользователя. получаем его, если купон активен и не просрочен, то
            //записываем его в использованные купоны у пользователя.
            // при удалении ордера купон у пользователя аннулируется.
            /*var checkCoupon = new Promise(function(resolve,reject){
                if (order.coupon){
                    User.findOne({_id:order.user},function(err,user){
                        if (!user.coupons){user.coupons=[]}
                        user.coupons=[]
                        user.coupons=user.coupons.map(function(c){if(c.toString){return c.toString()} else {return c}})
                        if (user.coupons.indexOf(order.coupon)>-1){
                            // купон уже был использован
                            order.coupon=null;
                            resolve(1);
                        }else{
                            var now= Date.now();
                            Coupon.findOne({_id:order.coupon},function(err,coupon){
                                //console.log(coupon)
                                if (coupon){
                                    // добавляем купон в список использованных
                                    user.coupons.push(coupon._id);
                                    // убираем купон из списка готовых к использованию
                                    req.user.coupons=user.coupons;
                                    User.update({_id:user._id},{$set:{coupons:user.coupons}},function(err,res){
                                        /!*console.log('user=',user);
                                        console.log('req.user=',req.user)
                                        console.log('res',res)*!/
                                    });
                                    resolve(3);
                                }else{
                                    // купон просрочен или не активен
                                    order.coupon=null;
                                    resolve(2);
                                }
                            })
                        }
                    })
                }else{
                    resolve();
                }
            })*/
            //checkCoupon
            /*console.log(cart)
            return;*/
            Promise.resolve().then(function(){
                return new Promise(function(resolve, reject) {
                    cart.save(function(err){
                        if(err){
                            reject(err)
                            reject(err)
                        }else{
                            resolve()
                        }
                    })
                })
            }).then(function(){
                self.getLastNumberOrder({store:req.store._id},function(err,data){
                    if (data && data.num){order.num = data.num+1}else{order.num=1000}
                    cb();
                })
            },function(err){
                cb(err)
            })
        }

        //console.log(req.body.cart);
    },
    getLastNumberOrder: function (query, cb) {
        this.findOne(query)
            //.select('num')
            .limit(1)
            .sort('-num')
            .exec(cb)
    },
    deleteCouponFromOrder:function(req,cb){
        var Seller = mongoose.model('Seller');
        var User = mongoose.model('User');
        var self=this,id=req.params.id;
        this.findOne({_id:id},function(err,order){
            if(err)return cb(err);
            if (!order){return cb()}
            if(req.user._id.toString()!=order.user.toString()){
                var query={$and:[{_id:order.seller},{$or:[{user:req.user._id},{admins:req.user._id}]}]}
                //console.log(query)
                Seller.findOne(query,function(err,seller){
                    //console.log(seller)
                    if (!seller) {
                        var error = new Error('нет прав')
                        return cb(error)
                    }
                })
            }

            self.postDelete(order,null,cb)
        })

    },


    getNum :function (name, callback) {
        //console.log('dddddd');
        return this.findOne({ _id: name },function(err,res){
            console.log(err)
            console.log(res);
        });
        return this.findOneAndUpdate({ _id: "num" }, { $inc: { seq: 1 } }, callback);
    },
    load: function(id,cb){
        //console.log(id)
        this.findById(id)
            .populate('cart','stuffs')


            /*.populate('coupon')
            .populate('campaign')
            .populate('seller','cascade opt payInfo name')
            .populate('user','coupon coupons email name')*/


            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        if (criteria['$and']){
            criteria['$and'].forEach(function(item){
                for(var key in item){
                    if (key=='profile.fio'){
                        item[key]=RegExp(item[key] , "i");
                    }
                }
            })
        }
        //console.log(criteria);
        this.find(criteria)
         .sort({'date': -1}) // sort by date
         .limit(options.perPage)
            //.populate('coupon')
         .skip(options.perPage * options.page)
         .exec(cb)
    },
    postDelete:function(order,req){
        var orderId = (order._id.toString)?order._id.toString():order._id;
        var seller = order.seller;
        var url = socketHost+'/api/deleteOrderDialog/'+seller+'/'+orderId;
        var r = request.get( {url: url});
        try{
            r.on('error',function (error) {
                //console.log(error)
                if(error){
                    var date = new Date().toISOString().replace( /T/, ' ' ).replace( /\..+/, '' );
                    //var collection = (error.collectionName) ? error.collectionName : '';
                    try{
                        var uri=decodeURIComponent(req.url);
                    }catch(err){
                        var uri=req.url;
                    }
                    var s = date + ' ' + JSON.stringify(error) + "\n" + 'path - ' + uri + "\n";
                    fs.appendFile( './order/errors.order.log', s, function (err, data) {
                        if (err) console.log(error) ;
                    } );
                }
                //console.log(error)
            })
            r.on('response',function (response) {
                //console.log(response.statusCode,url)
                if(response.statusCode!=200){
                    var date = new Date().toISOString().replace( /T/, ' ' ).replace( /\..+/, '' );
                    //var collection = (error.collectionName) ? error.collectionName : '';
                    var uri = url;
                    var s = date + ' ' + JSON.stringify(response.statusCode) + "\n" + 'path - ' + uri + "\n";
                    fs.appendFile( './order/errors.order.log', s, function (err, data) {
                        if (err) console.log(error) ;
                    } );
                }
            })
        }catch(err){}

    },
    postDelete22:function(order,req,cb){
        var User=mongoose.model('User');
        var Chat=mongoose.model('Chat');
        // удаление всех сообщений связвнныз с этим ордером
        // если вызов функции произошел после удаления ордера
        if(req){
            Chat.remove({order:order._id},function(err,res){
                if(err){console.log(err)}
                console.log(res);
            })
        }

        if(order.coupon){
            var coupon;
            if(order.coupon && order.coupon.toString){
                coupon=order.coupon.toString();
            } else{
                coupon=order.coupon;
            }
            User.findOne({_id:order.user},function(err,user){
                if (user && user.coupons && user.coupons.length){
                    user.coupons= user.coupons.map(function(c){if(c.toString){return c.toString()} else {return c}})
                    user.coupons.splice(user.coupons.indexOf(coupon),1);
                    user.coupon.push(coupon)
                    console.log('user.coupon-',user.coupon)
                    User.update({_id:user._id},{$set:{coupons:user.coupons,coupon:user.coupon}},function(err,res){
                        if(err){
                            if(cb && typeof cb =='function'){
                                cb(err);
                            }
                        }else{
                            if(cb && typeof cb =='function'){
                                cb(null,user.coupon);
                            }
                        }
                    })
                }else{
                    if(cb && typeof cb =='function'){
                        cb(null,user.coupon);
                    }
                }
            })
        }
    },
}

OrderSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    test: function(plainText) {
        return plainText;
    }

};
mongoose.model('CartInOrder', CartInOrderSchema);
mongoose.model('Order', OrderSchema);
mongoose.model('OrderArch', OrderSchema);

mongoose.model('InnerCart', InnerCartSchema);
