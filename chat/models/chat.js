'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectID = mongoose.Types.ObjectId;

var DialogSchema;
DialogSchema = new Schema({
    date: { type: Date, default: Date.now },
    seller:String,
    user:String,
    sellerName:String,
    userName:String,
    order:String,
    orderNum:String
});
DialogSchema.statics={
    load: function (id, cb) {
        this.findById(id)
            .exec(cb)
    },
    list: function (options, cb) {
        //console.log('options ',options)
        var criteria = options.criteria || {};
        this.find(criteria)
            .sort({'date': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    /*preUpdate:function(req,cb){
        //console.log(req.body);return;
        this.findOne({seller:req.body.seller,user:req.body.user} ).exec(function(err,res){
            if (err){return cb(err)};
            if (res){var err=new Error('такой диалог существует');return cb(err)};
            return cb();
        })
    },*/
    postDelete:function(dialog){
        if(!dialog || !dialog._id){return}
        var Chat=mongoose.model('Chat');
        Chat.remove({dialog:dialog._id},function(err,res){
            //console.log(err,'res ',res)
            if(err){console.log(err)}
        })
        // удаление всех сообщений связвнныз с этой парой
    }
}
mongoose.model('Dialog', DialogSchema);

/**
 * Chat Schema
 */
var ChatSchema;
ChatSchema = new Schema({
    date: { type: Date, default: Date.now },
    recipient:String,// or 'user'  or 'seller'
    dialog:{type : Schema.ObjectId, ref : 'Dialog'},
    message: String,
    read:{type:Boolean,default:false},
    //read:Boolean
});


ChatSchema.statics = {
    list: function (options, cb) {
        if(!options.criteria || typeof options.criteria!='object' ||
         !options.criteria.dialog){
            return cb(new Error('the query is null'))
        }
        var criteria = options.criteria;
        this.find(criteria)
            .sort({'date': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    }
}
mongoose.model('Chat', ChatSchema);






