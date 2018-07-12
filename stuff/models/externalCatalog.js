'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
/**
 * Witget Schema
 */
var ExternalCatalogSchema = new Schema({
    store:String,
    name:String,
    url:String,
    link:String,
    index:Number,
    lastUpdate:Date,
    group:String,
    brand:String,
    actived:{type:Boolean,default:true},
    autoUpdate:Boolean,
    period:String,
    state:{},
    qty:Boolean,
    nameUpdate:Boolean,
    price:Boolean,
    desc:Boolean,
    tags:Boolean,
    artikul:Boolean,
    smallPhoto:Boolean,
    timezoneOffset:Number,
});


ExternalCatalogSchema.statics = {
    preUpdate:function(req,cb){
        let self=this;
        return new Promise(function(rs,rj){
            self.findOne({store:req.store._id})
                .limit(1)
                .sort({'index': -1})
                .exec(function(err,item){
                    if(err){rj(err)}
                    //console.log(item);
                    if(!item){
                        req.body.index=1;
                    }else{
                        req.body.index=item.index+1;
                    }
                    rs();
                })
        })

    },
    load: function (id, cb) {
        this.findOne({ _id : id })
            .sort({'index':1})
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        /*if (criteria){
            if (criteria['$and']){
                if (criteria['$and']['store']){
                    delete criteria['$and']['store']
                }
            }else{
                if (criteria['store']){
                    delete criteria['store']
                }
            }
        }*/

        this.find(criteria)
            .sort({'index': 1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    }
}
mongoose.model('ExternalCatalog', ExternalCatalogSchema);