'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var OnLineSchema = new Schema({
    store:String,
    name: {type : String, default : '', trim : true},
    //url:{type :String,index:true}, // the url of promoted page
    link:{type :String,index:true}, // the url of promoted page
    index:Number,
    actived:Boolean,
    keywords:[],
    words:[String],
   /* title:{type : String, default : ''},
    keywords:{type : String, default : ''},
    snippet : {type : String, default : ''},*/
    template: {type:Schema.ObjectId, ref : 'SeopageTemplate'},
     // seo
    seo:{title:String,description:String,keywords:String},
    desc:{type : String, default : ''},
    /*brand:[{type:Schema.ObjectId, ref : 'Brand'}],
    category:[{type:Schema.ObjectId, ref : 'Category'}],
    filterTags:[{type:Schema.ObjectId, ref : 'FilterTags'}],*/
    news:[{type:Schema.ObjectId, ref : 'News'}],

});
OnLineSchema.statics = {
    load: function (query, cb) {
        //console.log('id-',id);
        var self=this;
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
mongoose.model('OnLine', OnLineSchema);




