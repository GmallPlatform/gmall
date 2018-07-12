'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectID = mongoose.Types.ObjectId;
var cToL= require('../controllers/c-l');
/**
 * Helper Schema
 */
var HelperSchema;
HelperSchema = new Schema({
    name:String,//название states
    url:String,
    popover:{},
    intro:{},
    presentation:String,
    youtube:String,
    desc:String // осовная справка
});
HelperSchema.add({popover:{},
    intro:{}});
HelperSchema.statics = {
    load: function (query, cb) {
        //console.log(id)
        //var query=(typeof id=='object')?{_id:id}:{url:id};
        console.log(query)
        this.findOne(query)
            .exec(function(err,res){
                console.log(err,res);
                cb(err,res)
            })
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        if (criteria){
            if (criteria['$and']){
               if (criteria['$and']['store']){
                   delete criteria['$and']['store']
               }
            }else{
                if (criteria['store']){
                    delete criteria['store']
                }
            }
        }
        //console.log(criteria)
        this.find(criteria)
            .sort({'name': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    preUpdate :function(req,cb){
        var body=req.body;
        //console.log('helper body-',body)
        var self=this;
        cToL.getUrl(req).then(function(url){
            //console.log(url)
            body.url=url;
            cb();
        },function(errUrl){cb(errUrl)});
    }
}

mongoose.model('Helper', HelperSchema);


