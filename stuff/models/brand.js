'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectID = mongoose.Types.ObjectId;
var myUtil=require('../controllers/myUtil.js');

var BrandSchema = new Schema({
    store:[{type : Schema.ObjectId, ref : 'Store'}],
    name: {type : String, default : '', trim : true},
    idForXML:Number,
    nameL:{},
    descL:{},
    actived:{type:Boolean,default:true},
    display:{type:Boolean,default:true},
    url:{type : String,index:true},
    img : String,
    sticker:String,
    desc : {type : String, default : ''},
    tags: [{type : Schema.ObjectId, ref : 'BrandTags'}],
    index: Number,
});


BrandSchema.statics = {
    preUpdate:function(req,cb){
        let self=this;
        return new Promise(function(rs,rj){
            self.findOne({$and:[{store:req.store._id},{ idForXML:{$lt:100000} }]})
                .limit(1)
                .sort({'idForXML': -1})
                .exec(function(err,item){
                    if(err){rj(err)}
                    //console.log(item);
                    if(!item){
                        req.body.idForXML=1;
                    }else{
                        req.body.idForXML=item.idForXML+1;
                    }
                    rs();
                })
        })

    },
    load: function (query, cb) {
        this.findOne(query)
            .populate('tags')
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .sort({'index': 1})
            .limit(options.perPage)
            .populate('tags')
            .skip(options.perPage * options.page)
            .lean()
            .exec(function (err,result) {
                //console.log(result)
                cb(err,result)
            })
    }
}



mongoose.model('Brand', BrandSchema);

var BrandTagsSchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    idForXML:Number,
    name:{type : String, default : '', trim : true},
    desc:String,
    nameL:{},
    descL:{},
    url:String,
    index:Number,
    brand:{type : Schema.ObjectId, ref : 'Brand'},
    categories:[{type : Schema.ObjectId, ref : 'Category'}],
    actived:{type:Boolean,default:true},
    img:String,
});
BrandTagsSchema.statics = {
    preUpdate:function(req,cb){
        let self=this;
        return new Promise(function(rs,rj){
            self.findOne({$and:[{store:req.store._id},{ idForXML:{$lt:100000} }]})
                .limit(1)
                .sort({'idForXML': -1})
                .exec(function(err,item){
                    if(err){rj(err)}
                    //console.log(item);
                    if(!item){
                        req.body.idForXML=1;
                    }else{
                        req.body.idForXML=item.idForXML+1;
                    }
                    rs();
                })
        })

    },
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
}
mongoose.model('BrandTags', BrandTagsSchema);


exports.BrandTagsSchema=BrandTagsSchema;




