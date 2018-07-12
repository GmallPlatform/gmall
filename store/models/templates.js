'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
/**
 *  Schema
 */
var BlocksConfigSchema = new Schema({
    page:String,
    block:String,
    name:String,
    temp:Number,
    style:Number,
    desc:String,
    img:String
});


BlocksConfigSchema.statics = {
    load: function (id, cb) {
        this.findOne({ _id : id })
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
        /*.limit(options.perPage)
            .skip(options.perPage * options.page)*/
            .exec(cb)
    },
    preUpdate:function(req,cb){
        //req.body.actions=req.body.actionSubscribe;
        cb()
    }
}
mongoose.model('BlocksConfig', BlocksConfigSchema);
