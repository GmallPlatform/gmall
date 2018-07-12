'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var getUrl=require('../../stuff/controllers/getUniqueUrl.js');
var co=require('co')
/**
 * Witget Schema
 */
var ExternalCatalogSchema = new Schema({
    store:String,
    name:String,
    url:String,
    link:String,
});


ExternalCatalogSchema.statics = {
    load: function (id, cb) {
        this.findOne({ _id : id })
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        /*if (criteria){
            if (criteria['$and']){
                if (criteria['$and']['store']){
                    delete criteria['$and']['store']
                }
            }else{
                if (criteria['store']){
                    delete criteria['store']
                }
            }
        }*/
        console.log(criteria)
        this.find(criteria)
            .sort({'index': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    preUpdate:function(req,cb){
        //req.body.actions=req.body.actionSubscribe;
        co(function*() {
            if(req.body.name){
                req.body.url = yield getUrl.create(req.collection,req.query.store,req.body.name)
            }
            cb()
        }).catch(function(err){
            console.log('error in catch - ',err)
            return  cb()(err)
        })
    }
}
mongoose.model('ExternalCatalog', ExternalCatalogSchema);