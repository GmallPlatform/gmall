'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectID = mongoose.Types.ObjectId;

var customListsSchema=new Schema({
    store: {type: Schema.ObjectId, ref: 'Store'},
    name:String,
    nameL:{},
    link:String,
    url:{type :String,index:true},
    actived:{type:Boolean,default:true},
    index: Number,
    blockStyle:[],
    elements:{},
    stuffListCart:{},
    blocks:[],
    button:{nameL:{},link:String},
    stuffListCart:{},
    filtersInModal:Boolean,
    filtersForAll:Boolean,
    hideList:Boolean,
    unsetSort:Boolean,
    perPage:Number,
    rows:Number

});
customListsSchema.statics = {
    load: function (query, cb) {

        this.findOne(query)
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .sort({'index': 1})
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    }

}

mongoose.model('CustomLists', customListsSchema);