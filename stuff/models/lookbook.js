'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
    var cToL= require('../controllers/c-l');
/**
 * User Schema
 */
var LookBookSchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    type:Number,
    name: {type : String, default : '', trim : true},
    url:{type :String,index:true},
    date: { type: Date, default: Date.now },// поступил
    actived:{type:Boolean,default:true},
    link:String,
    imgs:[],
    desc : {type : String, default : ''},
    nameL:{},
    descL:{},
    index: Number,
    // seo
    seo:{title:String,description:String,keywords:String},
    translated:{},// булевые значения для языков. закончен перевод данного объекта на язык или нет
});

LookBookSchema.statics = {
    load: function (query, cb) {
        this.findOne(query)
            .exec(cb)
    },
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
            .sort({'date': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    /*preUpdate :function(req,cb){
     }*/

}
mongoose.model('Lookbook', LookBookSchema);

