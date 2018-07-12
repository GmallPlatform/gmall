'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectID = mongoose.Types.ObjectId;
    var cToL= require('../controllers/c-l');
var myUtil=require('../controllers/myUtil.js');
/**
 * User Schema
 */
var blockSchema = new Schema({
    type:String, // text,missia,info,news,campaign,map,banner,slider,video,categories,brandTags,brands,filterTags,stuffs
    index:{type:Number,default:0},
    is:Boolean,
    name:String,
    name1:String,
    nameAnimate:String,
    name1Animate:String,
    nameAnimateDelay:Number,
    animateSlider:String,
    animateDelay:Number,
    nameL:{},
    name1L:{},
    desc:String,
    descL:{},
    desc1:String,
    desc1L:{},
    map:String,
    calendar:String,
    img:String,
    video:String,
    videoOgg:String,
    videoLink:String,
    videoCover:String,
    audio:Boolean,
    button:{is:Boolean,text:String,link:String,textL:{},animate:String},
    button1:{is:Boolean,text:String,link:String,textL:{},animate:String},
    imgs:[{
        name: {type : String, default : '', trim : true},
        nameL:{},
        img : String,
        desc : {type : String, default : ''},
        descL:{},
        link: {type : String, default : '', trim : true},
        actived:{type:Boolean,default:true},
        index:Number,
        button:{}
    }], // slides
    filterTags:[{type : Schema.ObjectId, ref : 'FilterTags'}],
    brandTags:[{type : Schema.ObjectId, ref : 'BrandTags'}],
    categories:[{type : Schema.ObjectId, ref : 'Category'}],
    brands:[{type : Schema.ObjectId, ref : 'Brand'}],
    stuffs:[{type : Schema.ObjectId, ref : 'Stuff'}],
    news:[{type : Schema.ObjectId, ref : 'News'}],
    campaign:[{type : Schema.ObjectId, ref : 'Campaign'}],
    info:[{type : Schema.ObjectId, ref : 'Info'}],

    templ:Number,
    style:Number,
    /*color:{type:String,default:'#fff'},
     backgroundColor:{type:String,default:'#000'},
     fontSize:{type:String,default:'1em'},*/
    blockStyle:[],
    elements:{},
    mobile:{blockStyle:[], elements:{},},
    tablet:{blockStyle:[], elements:{},},
    animate:String,
    animateRepeat:Boolean,
    duration:Number,// время смены слайда в секундах
    template:Boolean,// если шаблон то доступен для загрузки
    nameTemplate:String,
    link:String,
    link1:String,
    position:String,// left,right,top
    useImg:Boolean,
    useDesc:Boolean,
    videoControl:Boolean,
})
var CategorySchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    url:{type : String},

    name: {type : String, default : '', trim : true},
    desc :{type : String, default : ''},

    nameL: {},
    descL :{},

    img : String,
    smallimg:String,
    banner:String,
    idForXML:Number,

    filter: {type : Schema.ObjectId, ref : 'Filter'},
    brands: [{type : Schema.ObjectId, ref : 'Brand'}],
    filters: [{type : Schema.ObjectId, ref : 'Filter'}],
    group: {type : Schema.ObjectId, ref : 'Group'},
    section:{},
    index: Number,
    notActive:Boolean,
    customLink:String,
    mp:{},// данные по маркетплейсу
    blocks:[blockSchema],
    /*promSection:String,
    promHttp:String,*/
});




CategorySchema.statics = {
    preUpdate:function(req,cb){
        let self=this;
        return new Promise(function(rs,rj){
            self.findOne({$and:[{store:req.store._id},{ idForXML:{$lt:100000} }]})
                .limit(1)
                .sort({'idForXML': -1})
                .exec(function(err,item){
                    if(err){rj(err)}
                    if(!item){
                        req.body.idForXML=1;
                    }else{
                        req.body.idForXML=item.idForXML+1;
                    }
                    rs();
                })
        })

    },
    load: function (query, cb) {
        var BrandTags=mongoose.model('BrandTags');
        var FilterTags=mongoose.model('FilterTags')
        this.findOne(query)
            .populate('brands')
            .populate('filters','name url tags index type nameL desc descL count min max')
            .populate('group','name url')
            .populate('blocks.stuffs','name artikul nameL artikulL link gallery actived')
            .exec(function(err,doc){
                if (err){return cb(err)}
                Promise.resolve()
                    .then(function(){
                        return new Promise(function(resolve,reject){
                            var categoryId = doc._id.toString();
                            BrandTags.populate(doc,{path:'brands.tags',select:'name url categories index nameL'},function(){
                                doc.brands=doc.brands.filter(function(el){return el && el._id} )
                                doc.brands.forEach(function(b){
                                    b.tags=b.tags.filter(function(t){return t}).filter(function(el){
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
                        //console.log(doc.blocks)
                        if(doc && doc.blocks){
                            for(let i=0;i<doc.blocks.length;i++){

                                let block = doc.blocks[i];
                                if(block.type=='stuffs'){
                                    if(block.stuffs && block.stuffs.length){
                                        block.stuffs.forEach(s=>{
                                            s.img=(s.gallery && s.gallery[0])?s.gallery[0].thumb:''
                                            //console.log(s.img)
                                        })
                                    }
                                    break;
                                }
                            }
                        }
                       cb(null,doc)
                    })
            })
    },
    list: function (options, cb) {
        //console.log('options',options)
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
    idForXML:Number,
    url:{type : String},
    index:{type:Number,default:1},
    level:{type:Number,default:0},
    section:{},
    parent:{type:Schema.ObjectId, ref :'Group',default:null},
    child:[{type:Schema.ObjectId, ref :'Group'}],
    categories:[{type:Schema.ObjectId, ref :'Category'}],
    type:{type:String,default:'good'},
    openCatalog:Boolean,// при загрузке страницы открывать вложения каталога
    saleLink:Boolean,// ссыдки на новинки и распродажу
    newLink:Boolean,
    groupStuffs:Boolean,// раздел для групп товароа
    hideSection:Boolean,// прятать в каталоге
    mask:[], // маска для титлов товаров

})




GroupSchema.add({type:{type:String,default:'good'}});
GroupSchema.statics = {
    preUpdate:function(req,cb){
        let self=this;
        return new Promise(function(rs,rj){
            self.findOne({$and:[{store:req.store._id},{ idForXML:{$lt:100000} }]})
                .limit(1)
                .sort({'idForXML': -1})
                .exec(function(err,item){
                    if(err){rj(err)}
                    if(!item){
                        req.body.idForXML=1000;
                    }else{
                        req.body.idForXML=item.idForXML+1;
                    }
                    rs();
                })
        })

    },
    load: function (query, cb) {
        var self=this;
        this.findOne(query)
            .populate('categories')
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
                                    select:'name url filters section group index brands img smallimg desc nameL descL notActive idForXML banner customLink'},function(){
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
                        return new Promise(function(resolve1, reject1) {
                            if (doc.child && doc.child.length){
                                self.populate(doc,{path:'child'},function(){
                                    doc.child.forEach(function(el){
                                        if(el){
                                            el.parent=doc._id;
                                            el.section=parent;
                                        }
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
            .sort({'index': 1})
            .populate('categories','name url filters section group index brands img smallimg desc nameL descL notActive idForXML banner customLink blocks')
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(function(err,docs){
                //console.log(docs)
              if (err) return cb(err);
                let sections=[];
                docs.forEach(function(sec,ii){
                    docs[ii]=sec.toObject()
                    docs[ii].categories=sec.categories.filter(function(el){return el && el._id} )
                        .map(function(el){
                            el=el.toObject();
                            myUtil.setLangField(el,options.req.store.lang)
                            el.section=sec.url;
                            return el;
                        })
                    docs[ii].categories.forEach(function(c,i){c.index=i})
                    if(docs[ii].level===0){

                        //docs[ii].child = docs[ii].child.filter(function(el){return el})

                        docs[ii].child.filter(function(el){return el}).forEach(function (subsec,j) {
                            if(subsec){

                                for(let i=0;i<docs.length;i++){
                                    if(docs[i]._id.toString()==subsec.toString()){
                                        docs[ii].child[j]=(docs[i].toObject)?docs[i].toObject():docs[i];
                                        docs[ii].child[j].parent=sec._id;
                                        docs[ii].child[j].section=sec.url;
                                        myUtil.setLangField(docs[ii].child[j],options.req.store.lang)
                                        docs[ii].child[j].categories=docs[ii].child[j].categories.filter(function(el){return el && el._id} )
                                            .map(function(el){
                                                //el=el.toObject();
                                                myUtil.setLangField(el,options.req.store.lang)
                                                el.section=sec.url;
                                                return el;
                                            })

                                        break;
                                    }
                                }
                            }

                        })
                        docs[ii].child = docs[ii].child.filter(function(el){return el && el.parent})
                        sections.push(docs[ii])
                    }


                })
                return cb(null,sections);
                
            })
        return;

    },

}

mongoose.model('Group', GroupSchema);


