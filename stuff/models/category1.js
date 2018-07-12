'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectID = mongoose.Types.ObjectId;
    var cToL= require('../controllers/c-l');
/**
 * User Schema
 */
var CategorySchema = new Schema({
      store:String,
      name: {type : String, default : '', trim : true},
      url:{type : String},
      img : String,
      smallimg:String,
      desc :{type : String, default : ''},

      brands: [{type : Schema.ObjectId, ref : 'Brand'}],
      filters: [{type : Schema.ObjectId, ref : 'Filter'}],
      group: {type : Schema.ObjectId, ref : 'Group'},
      section:{},
      index: Number,
      promSection:String,
      promHttp:String,
    customLink:String,
      // seo
      seo:{title:String,description:String,keywords:String}
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
            .populate('brands','name url tags index')
            .populate('filters','name url tags index type')
            .exec(function(err,doc){
                //console.log(err,doc)
                if (err){return cb(err)}
                //if(!doc){err = new Error('not found');return cb(err)}
                Promise.resolve()
                    .then(function(){
                        return new Promise(function(resolve,reject){
                            var categoryId = doc._id.toString();

                            BrandTags.populate(doc,{path:'brands.tags',select:'name url categories index'},function(){
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
                            FilterTags.populate(doc,{path:'filters.tags',select:'name url index filter'},function(){
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
            .select('name index brands desc img smallimg filters url group')
            .populate('group','url name')
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
    preUpdate2222 :function(req,cb){
        /*var body=req.body;
        // проверяем название
        if(body.group && body.group._id){
            body.group=body.group._id;
        }
        if(body.brands && body.brands.length){
            body.brands=body.brands.filter(function(el){return el} ).map(function(el){
                return el._id||el;
            })
        }
        if(body.filters && body.filters.length){
            body.filters=body.filters.filter(function(el){return el} ).map(function(el){
                return el._id||el;
            })
        }*/
        

     }
}


mongoose.model('Category', CategorySchema);


var GroupSchema = new Schema({
    store:String,
  name: {type : String, default : '', trim : true},
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
        console.log(options.criteria)
        var self=this;
        /*if (typeof criteria=='object' &&  Object.keys(criteria).length){
          criteria={$and:[{level:0},criteria]};
        } else {
          criteria={level:0}
        }*/
        var async = require('async');
        //var Group = mongoose.model('Group');
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
                                        .map(function(el){el=el.toObject();el.section=parent;return el;})
                                    doc.categories.forEach(function(c,i){c.index=i})
                                    resolve1()
                                })
                            }else{
                                resolve1()
                            }

                        })
                    })
                    .then(function(){
                        return new Promise(function(resolve1, reject1) {
                            doc.child=doc.child.filter(function (c) {
                                return c;
                            })
                            if (doc.child && doc.child.length){
                                self.populate(doc,{path:'child'},function(){
                                    //console.log('populate = ',doc.name)
                                    doc.child.forEach(function(el){
                                        el.parent=doc._id;
                                        el.section=parent;
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
                console.log(doc)
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
                console.log(docs)
              if (err) return cb(err);
                docs=docs.filter(function(el){return el.level===0} );
                console.log('docs.length-',docs.length)
                //заполнение вложенных групп
                // сделать! не делать заполнение если хочу получить просто список для привязки дочерней группы
                fillChildren(docs,null,function(){
                    //console.log('0000')
                    cb(null,docs);
                })
                
            })
    },
    listWithCategory: function (query,cb) {
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
                            console.log(el.parent)
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
    /*preUpdate :function(req,cb){
        var body=req.body;
        // проверяем название
        if(body.child && body.child.length){
            body.child=body.child.map(function(el){return el._id || el})
        }
        if(body.categories && body.categories.length){
            body.categories=body.categories.filter(function(el){return el}).map(function(el){return el._id || el})
        }


     }*/
}

mongoose.model('Group', GroupSchema);


