'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectID = mongoose.Types.ObjectId;

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
        sizeName:String,
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
        unitOfMeasure:String
    }]

})


var CartInOrderSchema = new Schema({
    order:{type : Schema.ObjectId, ref : 'Order'},
    stuffs:[{
        _id:{type : Schema.ObjectId, ref : 'Stuff'},
        name:String,
        artikul:String,
        sort:String,
        sortName:String,
        addCriterionName:String,
        url:String,
        category:{type : Schema.ObjectId, ref : 'Category'},
        brand:{type : Schema.ObjectId, ref : 'Brand'},
        img:String,
        quantity:Number,
        price:Number,
        priceSale:Number,
        retail:Number,
        priceCampaign:Number,
        sort:String,
        sortName:String,
        campaignId:String,
        onStock:Number, //?????
        single:Boolean,
        sticker:String,
        unitOfMeasure:String,
        currency:{type:String,default:"UAH"},
        //old
        stuff:{type : Schema.ObjectId, ref : 'Stuff'},
        cena:Number,
        sum:Number,
    }]
});



var OrderSchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    seller:{type : Schema.ObjectId, ref : 'Seller'},
    num:{type:Number,index:true},
    status:{ type: Number, default: 1 },
    user: String,
    date: { type: Date, default: Date.now },// поступил
    date2: { type: Date},// принят статус 2
    date3 :{type: Date}, // оплачен 3
    date4 :{type: Date}, // отправлен4
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


   // промо данные
    campaign:[{type : Schema.ObjectId, ref : 'Campaign'}],//данные по рекламной компании
    coupon:{type : Schema.ObjectId, ref : 'Coupon'},
    cascade:{},// из данных продавца
    opt:{}, // из данных продавца

    // содержание корзины
    cart:{type : Schema.ObjectId, ref : 'CartInOrder'},
    //cart:{type : Schema.ObjectId, ref : 'CartInOrder'},
    pay:[{date:Date,sum: Number,currency:String,info:String}],
    shipDetail:[{stuffs:[String],info:String,sum:Number,date:Date,ttn:String}],// если несколько едениц и для некоторых из них свой адрес доставки
    discount:{type:{type:Number,default:0},value:{type:Number,default:0}},// объект для информации по применяемой системе скидок
    /* type  false = не рприменяется
    1 - Принудительная оптовая цена для всех позиций включая розницу и sale.
    2 - Принудительное изменение цены на оптовую всех позиций без изменения цены sale

    3- Принудительное изменение цены на оптовую, включая SALE, и применение ко всем позициям скидки, value значение скидки в %
     4-  Принудительное изменение цены на оптовую, кроме цен SALE, и применение скидки на позиции кроме SALE
    5- Принудительное изменение цены на оптовую, кроме цен SALE, и применение ко всем позициям скидки скидки
    6- На сумму корзины, независимо от метода формирования суммы корзины. Либо процент, либо сумма
    */

    //old
    cartInner:[{
        brand:{type : Schema.ObjectId, ref : 'Brand'},
        cart:{type : Schema.ObjectId, ref : 'InnerCart'},

    }],
    vip:{type:Number,default:0}, // скидка
    optSale:{type : Boolean, default:false},// меняет цену на опт кроме селовой цены
    opt11:{type : Boolean, default:false},// меняет цену на опт  им минус 11 % для всех цен

    optQ :{type:Number,default:5}, // кол-во для опта на общей корзине
    campaigns:[{type : Schema.ObjectId, ref : 'Campaign'}],//данные по рекламной компании

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

OrderSchema.statics = {
    preUpdate:function(req,cb){
        /*console.log('!!!!!!!!!!!')
        console.log('req.body-',req.body,'req.query-',req.query);return;*/
        if(req.query && req.query.update){return cb()}

        //console.log(typeof req.user.coupons[0]);return;
        var self=this;
        //console.log(req.body);
        var Cart=mongoose.model('CartInOrder');
        var Coupon=mongoose.model('Coupon');

        var order=req.body;
        if(req.query.store){
            order.store=req.query.store;
        }
        if (!order.user) {
            var error = new Error('Нет владельца ордера!');
            return cb(error)
        }/*else{
            User.findById(order.user,function(err,user){
                var stores=user.store.map(function(c){if(c.toString){return c.toString()} else {return c}})
                console.log(stores)
                if(stores.indexOf(req.store._id.toString())<0){
                    stores.push(req.store._id.toString());
                    console.log(stores)
                    User.update({_id:user._id},{$set:{store:stores}},function(err,res){
                        console.log(err,res)
                    })
                }
            })
        }*/
        if(order.user && order.user._id){
            order.user=order.user._id;
        }
        if(order.coupon && order.coupon._id){
            order.coupon=order.coupon._id;
        }
        if(order.seller && order.seller._id){
            order.seller=order.seller._id;
        }
        if(order.campaign && order.campaign.length){
            order.campaign = order.campaign.map(function(c){return c._id});
        }
        if (order._id && order.num){
            cb()
        } else {
            // создаем корзину для нового заказа
            var cart =  new Cart({stuffs:order.cart.stuffs});
            // создаем первую доставку
            if(order.profile && order.profile.fio){
                order.shipDetail={
                    stuffs:order.cart.stuffs.reduce(function(arr,current){
                        var s= current.name+' '+current.artikul+' '+current.addCriterionName;
                        for(var i= 0,l=current.quantity;i<l;i++){
                            arr.push(s)
                        }
                        return arr;
                    },[]),
                    info:order.profile.fio+', '+order.profile.city+", "+order.profile.address+
                    ' '+order.profile.transporter+" "+order.profile.transporterOffice,
                    sum:0,
                    date:Date.now()
                }
            }

            order.cart=cart._id;

            Promise.resolve()
                .then(function(){
                    return new Promise(function(resolve, reject) {
                        cart.save(function(err){
                            if(err){
                                reject(err)
                            }else{
                                resolve()
                            }
                        })
                    })

                })
                .then(function(){
                    return new Promise(function(resolve,reject){
                        self.getLastNumberOrder(order.store,function(err,data){
                            if(err){return reject(err)}
                            //console.log(data)
                            if (data && data.num){order.num = data.num+1}else{order.num=1000}
                            resolve()
                        })
                    })
                })
                .then(function(){
                    cb();
                })
                .catch(function(err){
                    cb(err)
                })
        }

        //console.log(req.body.cart);
    },
    getLastNumberOrder: function (store, cb) {
        this.findOne({store:store})
            //.select('num')
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
    load: function(query,cb){

        this.findOne(query)

            .populate('cart','stuffs')
            .populate('coupon')
            .populate('campaign')
            /*.populate('seller','cascade opt payInfo name')
            .populate('user','coupons email name')*/

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
         .skip(options.perPage * options.page)
         .exec(cb)
    },
    postDelete:function(order,req,cb){
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
