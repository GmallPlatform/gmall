'use strict';
var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    var Schema = mongoose.Schema;
/**
 * User Schema
 */


var PnSchema = new Schema({
    store:String,
    num:Number,
    name: {type : String, default : '', trim : true},
    url:{type :String,index:true},
    date: { type: Date, default: Date.now },// поступил
    actived:{type:Boolean,default:true},
    index: Number,
    supplier:{type : Schema.ObjectId, ref : 'Supplier'},
    materials:[{
        material:{type : Schema.ObjectId, ref : 'Material'},
        price:Number,
    }],
    currency:String,
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true }});






PnSchema.statics = {
    load: function (query, cb) {
        this.findOne(query)
            .populate('supplier')
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
            .populate('supplier','name')
            .sort({'date': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .lean()
            .exec(cb)
    },


}

mongoose.model('Pn', PnSchema);

