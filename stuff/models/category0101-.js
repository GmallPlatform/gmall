'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectID = mongoose.Types.ObjectId;
    var cToL= require('../controllers/c-l');
var myUtil=require('../controllers/myUtil.js');
/**
 * User Schema
 */
var CategorySchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    url:{type : String},

    name: {type : String, default : '', trim : true},
    desc :{type : String, default : ''},

    nameL: {},
    descL :{},

    img : String,
    smallimg:String,

    filter: {type : Schema.ObjectId, ref : 'Filter'},
    brands: [{type : Schema.ObjectId, ref : 'Brand'}],
    filters: [{type : Schema.ObjectId, ref : 'Filter'}],
    group: {type : Schema.ObjectId, ref : 'Group'},
    section:{},
    index: Number,
    notActive:Boolean,
    /*promSection:String,
    promHttp:String,*/
});




CategorySchema.statics = {
    load: function (query, cb) {
        var BrandTags=mongoose.model('BrandTags');
        var FilterTags=mongoose.model('FilterTags')
        /*var query;
        try {
            id = new ObjectID(id);
            query={ _id : id }
        } catch (err) {
            query={ url : id }
        }*/
        //console.log(query)
        this.findOne(query)
            .populate('brands','name url tags index nameL')
            .populate('filters','name url tags index type nameL')
            .exec(function(err,doc){
                if (err){return cb(err)}
                Promise.resolve()
                    .then(function(){
                        return new Promise(function(resolve,reject){
                            var categoryId = doc._id.toString();
                            BrandTags.populate(doc,{path:'brands.tags',select:'name url categories index nameL'},function(){
                                doc.brands=doc.brands.filter(function(el){return el && el._id} )
                                doc.brands.forEach(function(b){
                                    b.tags=b.tags.filter(function(el){

                                        //console.log(el.categories)
                                        el.categories=(el.categories && el.categories.length)?el.categories.map(function(tag){

                                            return (tag.toString)?tag.toString():tag;
                                        }):[];
                                        return el && el._id && el.categories.indexOf(categoryId)>-1} )
                                })
                                resolve()
                            })
                        })
                    })
                    .then(function(){
                        return new Promise(function(resolve,reject){
                            FilterTags.populate(doc,{path:'filters.tags',select:'name url index filter nameL'},function(){
                                doc.filters=doc.filters.filter(function(el){return el && el._id} ).sort(function(a,b){
                                    return a.index- b.index;
                                })
                                doc.filters.forEach(function(b){
                                    b.tags=b.tags.filter(function(el){return el && el._id} )
                                })
                                resolve()
                            })
                        })
                    })
                    .then(function(){
                       cb(null,doc)
                    })
            })
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .select('name index brands desc img smallimg filters url group nameL descL')
            .populate('group','url name nameL')
            .sort({'index': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    preDelete:function(req,category,cb){
        if(req.query && req.query.file){
            return cb();
        }
        var Stuff=mongoose.model('Stuff');
        var query={category:category._id}
        Stuff.find(query,function(err,stuffs){
            if(err) return cb(err);
            if(stuffs && stuffs.length){
                err=new Error('к категории привязанны товары')
                cb(err);
            }else{cb()}
        })
    },
}



/**
 * Methods
 */
CategorySchema.methods = {
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

mongoose.model('Category', CategorySchema);


var GroupSchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    name: {type : String, default : '', trim : true},
    nameL: {},
  url:{type : String},
  index:{type:Number,default:1},
  level:{type:Number,default:0},
    section:{},
  parent:{type:Schema.ObjectId, ref :'Group',default:null},
  child:[{type:Schema.ObjectId, ref :'Group'}],
  categories:[{type:Schema.ObjectId, ref :'Category'}],
    type:{type:String,default:'good'}
})




GroupSchema.add({type:{type:String,default:'good'}});
GroupSchema.statics = {
    load: function (id, cb) {
        var self=this;
        this.findOne({ url : id })
            /*.populate('categories', 'name url')
            .populate('child', 'name url')*/
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        var self=this;
        var async = require('async');
        var Category = mongoose.model('Category');

        function populateChildAndCategories(doc,parent){
            return new Promise(function(resolve, reject) {
                Promise.resolve()
                    .then(function(){
                        return new Promise(function(resolve1, reject1) {
                            if(doc.categories && doc.categories.length){
                                Category.populate(doc,{path:'categories',
                                    select:'name url filters section group index brands img smallimg desc nameL descL notActive'},function(){
                                    doc.categories=doc.categories.filter(function(el){return el && el._id} )
                                        .map(function(el){
                                            el=el.toObject();
                                            myUtil.setLangField(el,options.req.store.lang)
                                            el.section=parent;
                                            return el;
                                        })
                                    doc.categories.forEach(function(c,i){c.index=i})
                                    resolve1()
                                })
                            }else{
                                resolve1()
                            }

                        })
                    })
                    .then(function(){
                        //console.log(1111)
                        return new Promise(function(resolve1, reject1) {
                            if (doc.child && doc.child.length){
                                self.populate(doc,{path:'child'},function(){
                                    //console.log('populate = ',doc.name)
                                    doc.child.forEach(function(el){
                                        if(el){
                                            //console.log(el)
                                            el.parent=doc._id;
                                            el.section=parent;
                                        }

                                        //console.log(el.parent)
                                    })
                                    Promise.all(doc.child.map(function(doc){
                                        return populateChildAndCategories(doc,parent)
                                    }) ).then(function(){
                                        resolve1()
                                    })
                                })
                            } else {
                                resolve1()
                            }
                        })

                    })
                    .then(function(){
                        resolve()
                    })
            })

        }
        function fillChildren(docs,parent,cb){

            Promise.all(docs.map(function(doc){
                return populateChildAndCategories(doc,{url:doc.url})
            }) ).then(function(){
                cb()
            })

        }
        this.find(criteria)
            .sort({'index': 1}) // sort by date
            .populate('child', 'name url')
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(function(err,docs){
              if (err) return cb(err);
                docs=docs.filter(function(el){
                    //console.log(el)
                    if(el && el.child){el.child=el.child.filter(function(e){return e})}
                    return el && el.url && el.level===0} );
                //console.log('docs.length-',docs.length)

                //заполнение вложенных групп
                // сделать! не делать заполнение если хочу получить просто список для привязки дочерней группы
                fillChildren(docs,null,function(){
                    //console.log('0000')
                    cb(null,docs);
                })
                
            })
    },
    listWithCategory2222: function (query,cb) {
        var self=this;
        var async = require('async');
        var Group = mongoose.model('Group');
        var Category = mongoose.model('Category');
        function fillChildren(docs,cb){
            async.each(docs,function(doc,callback){
              if (doc.child && doc.child.length){
                    Group.populate(doc,{path:'child'},function(){
                        //console.log(doc.child)
                        doc.child.forEach(function(el){
                            el.parent=doc._id;
                            //console.log(el.parent)
                        })
                        fillChildren(doc.child,function(){
                            callback();
                        })
                    })
              } else if (doc.categories && doc.categories.length) {                    
                  Category.populate(doc,{path:'categories',select:'name url'},function(){                        
                        callback();
                    })
              } else {
                  callback();
              }
            },function(err){
                //console.log('yes');
                cb();
            })
            

        }
        query={$and:[query,{level:0}]}
        this.find(query)
            .sort({'index': 1}) // sort by date
            .populate('child', 'name url')
            .populate('category','name url')
            .exec(function(err,docs){
              if (err) return cb(err);
                //заполнение вложенных групп
                fillChildren(docs,function(){
                    //console.log(docs)
                    cb(null,docs);
                })
                
            })
    },
}

mongoose.model('Group', GroupSchema);


