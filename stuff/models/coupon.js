'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
/**
 * Witget Schema
 */
var CouponSchema = new Schema({
    store:String,
    seller:String,
    actived:{type:Boolean,default:false},
    index:Number,
    name:String,
    desc:String,
    nameL:{},
    descL:{},
    img:String,
    code:Boolean,// true -first coupon, second - for subscribers
    condition:{type:Boolean,default:true},//true for sum false for percent
    currency:String,
    hide:Boolean,
    val:{type:Number,default:1}, // размер скидки,
    delay: {
        type:Number,
        default:30,
       /* validate: function(v) {
            // Woops! `this` is equal to the global object!
            /!*if (this.eggs >= 4) {
                return v === 'flank';
            }*!/
            console.log('v-',v)
        }*/
    }
});





CouponSchema.statics = {
    load: function (query, cb) {
        this.findOne(query)
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .sort({'index': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    /*preUpdate:function(req,cb){
        if(req.body.index){cb()}else{
            this.find({store:req.store._id} ).sort('-index' ).limit(2).exec(function(err,res){
                if(res){
                    if(res.length && res.length>1){
                        req.body.index=res[1].index+1;
                    }else {
                        req.body.index=1;
                    }
                }
                return cb(err)
            })
        }
    },
    middlewareForUpdate:function(body,arr){
        //console.log(body,arr);
        return new Promise(function(resolve){
            arr.forEach(function(name){
                if(name=='delay'){
                    body.delay=Number(body.delay)
                    //console.log(body.delay)
                    if(!body.delay || body.delay===0 || body.delay<0 || body.delay>90){
                        body.delay=30;
                    }
                }else if(name=='val'){
                    body.val=Number(body.val)
                    //console.log(body.delay)
                    if(!body.val || body.val===0 || body.val<0){
                        body.val=1;
                    }
                }
            })
            resolve();
        })
    }*/
}


mongoose.model('Coupon', CouponSchema);

