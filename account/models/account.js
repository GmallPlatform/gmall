'use strict';
var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    store:String,
    name: {type : String, default : '', trim : true},
    url:{type :String,index:true},
    date: { type: Date, default: Date.now },// created
    actived:{type:Boolean,default:true},
    index: Number,
    num:String,
    desc:String,
    virtual:{type:Boolean,default:false},
    root:{type : Schema.ObjectId, ref : 'Account',default:null},
    accEntries:[]

}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true }});







AccountSchema.statics = {
    load: function (query, cb) {
        this.findOne(query)
            .exec(cb)
    },
    searchList: function (options, cb) {
        let criteria = {$and:[options.criteria,{$or:[]}]}
        let searchStr=RegExp( options.searchStr, "i" )
        let o={['nameL.'+options.lang]:searchStr};
        criteria.$and[1].$or.push(o)
        o={['blocks.descL.'+options.lang]:searchStr};
        criteria.$and[1].$or.push(o)
        o={['name']:searchStr};
        criteria.$and[1].$or.push(o)
        o={['desc']:searchStr};
        criteria.$and[1].$or.push(o)
        this.find(criteria)
            .sort({'num': -1})
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .lean()
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .sort({'num': -1})
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .lean()
            .exec(cb)
    },


}

mongoose.model('Account', AccountSchema);

