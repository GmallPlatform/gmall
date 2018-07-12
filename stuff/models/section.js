'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectID = mongoose.Types.ObjectId;
var cToL= require('../controllers/c-l');
/**
 * User Schema
 */
var SectionSchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
  name: {type : String, default : '', trim : true},
  url:String,
  img : String,
  desc : {type : String, default : ''},
    //tags:[String],
  tags: [{type : Schema.ObjectId, ref : 'SectionTags'}],
  categories: [{type : Schema.ObjectId, ref : 'Category'}],
  index: Number,
    // seo
    seo:{title:String,description:String,keywords:String}
});

SectionSchema.statics = {

    load: function (id, cb) {
        this.findOne({ _id : id })
            .populate('categories', 'name')
            .populate('tags')
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .sort({'index': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    preUpdate :function(req,cb){
        if(cb && typeof cb=="function"){
            return cb()
        }
        return new Promise(function(resolve,reject){
            resolve()
        })
    },
    postUpdate:function(item){
        return new Promise(function(resolve,reject){
            resolve()
        })
    }
}

/**
 * Methods
 */
SectionSchema.methods = {
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

mongoose.model('Section', SectionSchema);

var SectionTagsSchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    name:{type : String, default : '', trim : true},
    index:Number,
    section:{type : Schema.ObjectId, ref : 'Section'}
});
SectionTagsSchema.statics = {
    load: function (id, cb) {
        this.findOne({ _id : id })
            .exec(cb)
    },

    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .sort({'index': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    preUpdate :function(req,cb){
        var body=req.body;
        // проверяем название
        
        var self=this;
        if (!body.url){
            body.url=cToL.cyrill_to_latin(body.name.substring(0,50).split(" ").join("-").toLowerCase());
        }
        function getQuery(){
          var query;
            if (body._id){
                query={$and:[{url:body.url},{_id:{$ne:body._id}}]};
            }else{
                query={url:body.url};
            }
            return query;  
        }
        
        //console.log(body.url); return;
        self.findOne(getQuery(),function(error,result){

            if (result){
                body.url+='-01';
                self.findOne(getQuery(),function(error,result){
                    if (result){
                        body.url+='-02';
                        self.findOne(getQuery(),function(error,result){
                            if (result){
                                body.url+='-03';
                                self.findOne(getQuery(),function(error,result){
                                    if (result){
                                        var err= new Error('Страница с таким названием уже существует!');
                                        cb(err);
                                    } else {cb()}
                                })
                            } else {cb()}
                        })
                    } else {cb()}
                })
            } else {
                cb()
            }
        })

     }
    /*postDelete : function(tag){
        var fs = require('fs');
        var file='./public/images/Section/'+tag._id+'.zip';
        fs.exists(file, function (exists) {
            fs.unlinkSync(file)
        })
    }*/
}
mongoose.model('SectionTags', SectionTagsSchema);




