'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
    var cToL= require('../controllers/c-l');

var SeopageSchema = new Schema({
    store:String,
    name: {type : String, default : '', trim : true},
    //url:{type :String,index:true}, // the url of promoted page
    link:{type :String,index:true}, // the url of promoted page
    index:Number,
    actived:Boolean,
    keywords:[{type:Schema.ObjectId, ref : 'Keywords'}],
    words:[String],
    seo:{title:String,description:String,keywords:String},
    desc:{type : String, default : ''},
    descL:{},
    news:[{type:Schema.ObjectId, ref : 'News'}],

});
//SeopageSchema.add({keywords:[{type:Schema.ObjectId, ref : 'Keywords'}]})

SeopageSchema.statics = {
    load: function (query, cb) {
        //console.log('id-',id);
        var self=this;
        this.findOne(query)
            .populate('keywords')
            .exec(cb)
    },

    /**
     * List articles
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */

    list: function (options, cb) {
        var criteria = options.criteria || {}
        if(criteria && criteria['$and']){
            if (criteria['$and'][0]['name']){
                criteria['$and'][0]['name']=new RegExp(criteria['$and'][0]['name'],'i');
            }
            if (criteria['$and'][1]['name']){
                criteria['$and'][1]['name']=new RegExp(criteria['$and'][1]['name'],'i');
            }

        }

        this.find(criteria)
            //.populate('gallery.tag', 'name')
            .select('link name actived')
            .sort({'index': 1})
            .limit(options.perPage)
            //.populate('news','name url desc gallery')
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    listAlldata:function (options, cb) {
        var criteria = options.criteria || {}
        if(criteria && criteria['$and']){
            if (criteria['$and'][0]['name']){
                criteria['$and'][0]['name']=new RegExp(criteria['$and'][0]['name'],'i');
            }
            if (criteria['$and'][1]['name']){
                criteria['$and'][1]['name']=new RegExp(criteria['$and'][1]['name'],'i');
            }

        }

        this.find(criteria)
            //.populate('gallery.tag', 'name')
            .sort({'index': 1})
            .limit(options.perPage)
            //.populate('news','name url desc gallery')
            .skip(options.perPage * options.page)
            .exec(cb)
    },

}

SeopageSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    test: function(plainText) {
        return plainText;
    }

};

mongoose.model('Seopage', SeopageSchema);

var SeopageTemplateSchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    name: {type : String, default : '', trim : true},
    index:Number,
    keywords:{type : String, default : ''}
});
SeopageTemplateSchema.statics = {
    load: function (id, cb) {
        //console.log('id-',id);
        var self=this;
        this.findOne({_id:id})

            .exec(function(err,doc){
                if (err) return cb(err);
                cb(null,doc);
            })
    },
    listAlldata:function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    }

}
mongoose.model('SeopageTemplate', SeopageTemplateSchema);


var KeywordsSchema = new Schema({
    store:String,
    word:{type : String, default : ''},
    f:Number,
    c:Number,
    index:Number,
    /*keywords:[{
        word:{type : String, default : ''},
        f:Number,
        c:Number,
        index:Number
    }]*/
    //f-частотночть,c- конкурентность
});
KeywordsSchema.statics = {
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
        //query.sort({'index': -1})
            .exec(cb)
    }/*,
    preDelete:function(req,item,cb){
        console.log(item)
        //cb()
    }*/

}
mongoose.model('Keywords', KeywordsSchema);





