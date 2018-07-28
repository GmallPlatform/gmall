'use strict';
var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    var Schema = mongoose.Schema;
    var cToL= require('../controllers/c-l');
/**
 * User Schema
 */


var MaterialSchema = new Schema({
    store:String,
    name: {type : String, default : '', trim : true},
    nameL: {},
    url:{type :String,index:true},
    date: { type: Date, default: Date.now },// поступил
    actived:{type:Boolean,default:true},
    index: Number,
    price:{type:Number,default:0},
    priceIncome:{type:Number,default:0},
    unitOfMeasure:{type:String,default:'шт'},
    sku:String,
    sku2:[String]

}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true }});






MaterialSchema.statics = {
    load: function (query, cb) {
        this.findOne(query)
            .exec(cb)
    },
    searchList: function (options, cb) {
        let criteria = {$and:[options.criteria,{$or:[]}]}
        let searchStr=RegExp( options.searchStr, "i" )
        let o={['nameL.'+options.lang]:searchStr};
        criteria.$and[1].$or.push(o)
        o={['name']:searchStr};
        criteria.$and[1].$or.push(o)
        this.find(criteria)
            .sort({'index': 1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .lean()
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .sort({'index': 1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .lean()
            .exec(cb)
    },


}

mongoose.model('Material', MaterialSchema);

