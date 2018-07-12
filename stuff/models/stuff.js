'use strict';
var cache={categories:{}}
var moment = require('moment')
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var myUtil=require('../controllers/myUtil.js');
const util = require('util')
var stores={};
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
    /*mobile:{blockStyle:[], elements:{},},
    tablet:{blockStyle:[], elements:{},},*/
    mobile:{blockStyle:[], elements:{},},
    tablet:{blockStyle:[], elements:{},},
    animate:String,
    animateRepeat:Boolean,
    duration:Number,// время смены слайда в секундах
    qwslide:Number,// количество слайдов для оwl slider
    autoPlaySlider:Boolean,
    template:Boolean,// если шаблон то доступен для загрузки
    nameTemplate:String,
    link:String,
    link1:String,
    position:String,// left,right,top
    useImg:Boolean,
    useDesc:Boolean,
    videoControl:Boolean,
})

var SfuffSchema = new Schema({
    store:String,
    extCatalog:String, // если товар загружен из внещнего каталога gmall

    seller:String,

    section:{type : Schema.ObjectId, ref : 'Group'},
    subSection:{type : Schema.ObjectId, ref : 'Group'},
    category: [{type : Schema.ObjectId, ref : 'Category'}],
    tags:[ {type : Schema.ObjectId, ref : 'FilterTags'}],
    brand: {type : Schema.ObjectId, ref : 'Brand'},
    brandTag:{type : Schema.ObjectId, ref : 'BrandTags'},
    sortsOfStuff:{type:Schema.ObjectId,ref:'SortsOfStuff'},
    addInfo:{type:Schema.ObjectId,ref:'AddInfo'},


    //collection:{type : Schema.ObjectId, ref : 'Collection'},
    /*stuffGroups:[{type : Schema.ObjectId, ref : 'StuffGroups'}],// новые группы
    groupColor:{type : Schema.ObjectId, ref : 'GroupColor'},
    group:{col:{type : Schema.ObjectId, ref : 'GroupColor',default:null},rec:{type : Schema.ObjectId, ref : 'GroupColor',default:null}},
    sizeTable:{type : Schema.ObjectId, ref : 'Size'},
    addCriterion:[{type : Schema.ObjectId, ref : 'AddCriterion'}],
    available:{},// таблица доступности*/
    available:{},// таблица доступности*/


    stock:{type:{},default:{notag:{quantity:1}}},// наличие товара
    sort:String,// текущая разновидность для списка

    sale:Boolean, // if true, apply save value from store to get priceSale



    url:{type :String,index:true},
    link:String,
    name: {type : String, default : '', trim : true},
    artikul:String,
    sku:String,
    index:{type:Number,defautl:1},
    idForXML:{type:Number,defautl:1},
    desc : {type : String, default : ''},
    desc1 : {type : String, default : ''},
    desc2 : {type : String, default : ''},

    nameL: {type:{},default:{}},
    artikulL: {type:{},default:{}},
    descL: {type:{},default:{}},
    desc1L: {type:{},default:{}},
    desc2L: {type:{},default:{}},
    keywords:{},

    img:[String],
    logo:String,
    gallery:[{thumb:String,img:String,index: Number,thumbSmall:String}],


    single:{type:Boolean,default:false},
    multiple:{type:Boolean,default:false},
    maxQty:{type:Number,default:1},
    minQty:{type:Number,default:1},


    service:{type:Boolean,default:false},
    unitOfMeasure:String,
    price:{type : Number,default:0},
    priceSale:{type : Number,default:0},
    retail:{type : Number,default:0},
    retailSale:{type : Number,default:0},
    currency:String,
    driveSalePrice:{},
    driveRetailPrice:{},



    orderType:{type:Number,default:0},//undefined or 0 - cart,1-quick order,2-order for time,3-only view
    bonusType:String,
    bonusLink:String,
    imgs:[],
    bonusFile:String,


    groupColorIs:{type : Boolean, default : false},

    actived:{type : Boolean, default:true},
    archived:{type : Boolean, default:false},
    archivedDate:Date,
    date:Date,

    // seo
    seo:{title:String,description:String,keywords:String},
    prom:String, // id на проме,
    timePart:Number, // количества блоков по 15 минут для онлайн записи

    filters:{},// значения для количественных характеристик фильтров
    blocks:[blockSchema],
    grid:Number,// тип разметки страницы данного товара (50/50 или 60/40)
    templateUrl:String,// ссылка на субдомен для клонирования
    backgroundcolor:String,// цвет для расписания
    priceForFilter:[],// массив цен для фильтрации по цене из списка товаров. пересчитывается при изменении цены товара или вручную из заказов установка значений валют
    translated:{},

}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true }});


/*SfuffSchema.virtual('priceForFilter').get(function() {
    if(!this)return
    let item = this;
    return price_transform(this)
});
function price_transform(stuff) {
    if(!stores[stuff.store]){
        return;
    }
    let arr=[];
    for(let key in stuff.stock){
        if(stuff.stock[key] && stuff.stock[key].quantity && stuff.stock[key].price){
            arr.push(stuff.stock[key].price)
        }
    }
    return arr;
}*/


SfuffSchema.add({descL:{type:{}}})
SfuffSchema.add({priceForFilter:{type:[]}})
function salePrice(doc,sale){
    doc.priceSale=Math.ceil10(Number(doc.price)-sale*doc.price,1);
    for(var key in doc.stock){
        doc.stock[key].priceSale=
            Math.ceil10(Number(doc.stock[key].price)-sale*doc.stock[key].price,1);
    }

}
function retailPrice(doc,retail){
    doc.retail=
        Math.ceil10(Number(doc.price)+retail*doc.price,1);
    for(var key in doc.stock){
        doc.stock[key].retail=
            Math.ceil10(Number(doc.stock[key].price)+retail*doc.stock[key].price,1);
    }
}

SfuffSchema.statics = {
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
                    // установка индекса для товара в категории. максимальный индекс для данной категории
                    self.findOne({$and:[{store:req.store._id},{ category:req.body.category}]})
                        .sort({index:'-1'})
                        .limit(1)
                        .exec(function (err,st) {
                            if(err){rj(err)}
                            if(st && st.index){
                                req.body.index=st.index+1;
                            }
                            rs();
                        })



                })
        })

    },
    search22:function(req,cb){
        function fn(el){
            delete el.seo;
            delete el.desc;
            if (el && el.gallery && el.gallery.length && el.gallery.length>1){
                el.gallery.sort(function(a,b){return a.index- b.index});
                el.gallery.splice(1,el.gallery.length-1)
                delete el.gallery[0].img;
                delete el.gallery[0].thumbSmall;
            }
            return el;
        }
        var perPage=(req.query.perRage)?req.query.perRage:20;
        var search= new RegExp(req.query.search,'i');
        console.log(search)
        //var query={$and:[{$or:[{name:search},{artikul:search}]},{store:req.store._id},{actived:true}]}
        let field= 'keywords.'+(req.query.lang?req.query.lang:req.store.lang)
        //console.log(field)
        let query={store:req.store._id,actived:true}
        query[field]=search
        try {
            var q=JSON.parse(req.query.query);
            if(typeof  q=='object'){
                query={$and:[query,q]}
                //query.$and.push(q)
            }
        } catch (err) {

        }
        console.log(query)
        var self=this;
        this.find(query)
            .limit(perPage)
            .populate('sortsOfStuff')
            .select('name tags brandTag brand category sortsOfStuff gallery price store artikul url index  unitOfMeasure single multiple minQty maxQty seller stock extCatalog idForXML backgroundcolor')
            .exec(function(err,res){
                if (err) return cb(err);
                if (res && res.length){
                    res=res.map(fn)
                    cb(null,res)
                }else{
                    cb();
                }
            })
    },
    getNextSequence : function (cb) {
        this.findOneAndUpdate(
            {
                query: { _id: "stuffid" },
                update: { $inc: { seq: 1 } },
                new: true
            },function(res,err){
               /* console.log(res);
                console.log(err);*/
            }
        )
    },




    load: function (query, cb,req) {
        //console.log('query',query)

        var self=this;
        function fillMembersInGroup(doc,cb){
            if(doc.sortsOfStuff && doc.sortsOfStuff.nameL && doc.sortsOfStuff.nameL[req.store.lang]){
                doc.sortsOfStuff.name=doc.sortsOfStuff.nameL[req.store.lang]
                doc.sortsOfStuff.nameL[req.store.lang]=null;
            }

            var sortIncrement =function(a,b){return a.index- b.index}
            var sortDecrement =function(a,b){return b.index- a.index}

            if (doc.sortsOfStuff && doc.sortsOfStuff.stuffs && doc.sortsOfStuff.stuffs.length){
                self.populate(doc.sortsOfStuff,{path:'stuffs',
                    select:'gallery tags name price artikul url stock sortsOfStuff nameL artikulL category link currency actived archived'},function(){
                    doc.sortsOfStuff.stuffs.forEach(function(el){
                        var sortFun;
                        if(el && el.toObject){
                            el=el.toObject();
                        }

                        sortFun=sortIncrement;
                        if (el && el.gallery.length && el.gallery.length>1){
                            el.gallery.sort(sortFun);
                            el.gallery.splice(1,el.gallery.length-1)
                            delete el.gallery[0].img;
                        }
                        myUtil.setLangField(el,req.store.lang)
                    })
                    cb();
                })
            }else{cb()}
        }
        //var query=(typeof id=='object')?{_id:id}:{url:id};
        //console.log(query)
        this.findOne(query)
            .populate('sortsOfStuff addInfo')
            .populate('blocks.stuffs','name artikul nameL artikulL link gallery actived')
            .populate('category','name nameL')
            .populate('brand','name nameL')
            .lean()
            .exec(function(err,doc){
                if (err) return next(err)
                if (doc) {
                    if(doc.blocks && doc.blocks.length){
                        doc.blocks.sort(function(a,b){return a.index- b.index});
                        for(let i=0;i<doc.blocks.length;i++){
                            if(doc.blocks[i].useImg){
                                if(doc.blocks[i].img){
                                    doc.img=doc.blocks[i].img;
                                    doc.imgs=null;
                                    doc.video=null;
                                }else if(doc.blocks[i].imgs && doc.blocks[i].imgs.length){
                                    doc.imgs=doc.blocks[i].imgs;
                                    doc.img=doc.blocks[i].imgs[0].img;
                                    doc.video=null;
                                }else if(doc.blocks[i].videoLink){
                                    doc.imgs=null;
                                    doc.img=null;
                                    doc.video=doc.blocks[i].videoLink;
                                }
                            }
                        }
                    }
                    if(!doc.img && doc.gallery && doc.gallery.length){
                        doc.img=doc.gallery[0].img
                    }
                    fillMembersInGroup(doc,function(){
                        //doc=doc.toObject();
                        cb(null,doc);
                    })
                }else {
                    cb(null,doc);
                }
            })
    },


    list: function (options, cb) {

        //stores[options.req.store._id]=options.req.store
        //console.log(stores[options.req.store._id].currencyArr)
        let self=this;
        if(typeof options.criteria=='object'){
            for(var k in options.criteria){
                /*if(k=='$or'){
                    if (options.criteria.$or[0]['name']) {
                        options.criteria.$or[0]['name'] =
                            RegExp( options.criteria.$or[0]['name'], "i" )

                    }
                    if (options.criteria.$or[1]['artikul']) {
                        options.criteria.$or[1]['artikul'] =
                            RegExp( options.criteria.$or[1]['artikul'], "i" )

                    }
                }*/
                if(k.indexOf('keywords')>-1){
                    options.criteria[k]=RegExp( options.criteria[k], "i" )
                }
            }

        }

        if (options.criteria['$and']){
            for (var i= 0,l=options.criteria['$and'].length;i<l;i++){
                for (let key in options.criteria['$and'][i]){
                    //console.log(options.criteria['$and'][i],options.criteria['$and'][i][key],key,key.indexOf('keywords'))
                    if(key.indexOf('keywords')>-1){
                        options.criteria['$and'][i][key]=RegExp( options.criteria['$and'][i][key], "i" )
                        console.log(options.criteria['$and'][i][key])
                    }
                    /*if(key=='$or') {
                        if (options.criteria['$and'][i][key][0]['name']) {
                            options.criteria['$and'][i][key][0]['name'] =
                                RegExp( options.criteria['$and'][i][key][0]['name'], "i" )

                        }
                        if (options.criteria['$and'][i][key][1]['artikul']) {
                            options.criteria['$and'][i][key][1]['artikul'] =
                                RegExp( options.criteria['$and'][i][key][1]['artikul'], "i" )

                        }
                    }*/
                }
            }
        } else if (options.criteria.artikul) {
            options.criteria.artikul = RegExp(options.criteria.artikul , "i")
        }

        var criteria = options.criteria || {}
        //console.log(criteria)

        /*let where
        if(criteria && criteria.priceForFilter){
            where={priceForFilter:criteria.priceForFilter}
            delete criteria.priceForFilter;
        }

        console.log(where)
*/
        if(options.req.store.mp && options.req.store.mp.is && options.req.store.mp.stores && options.req.store.mp.stores.length && criteria.category){
            options.req.store.mp.stores.unshift(options.req.store._id)
            let acts =[];
            options.req.store.mp.stores.forEach(function (store) {
                try{
                    criteria.store=store
                    let promise = self.find(criteria)
                        .select('name tags brandTag brand category gallery price store artikul url index  unitOfMeasure single multiple minQty maxQty  seller actived stock driveSalePrice driveRetailPrice sortsOfStuff service currency orderType sort timePart imgs nameL unitOfMeasureL extCatalog idForXML archived desc descL link timePrt color blocks translated')
                        .sort({'index': -1}) // sort by date
                        .limit(options.perPage)
                        .skip(options.perPage * options.page)
                        .populate('sortsOfStuff','filter differentPrice')
                        .populate('brand','name')
                        .exec(function(err,docs){
                            if (docs && docs.length){
                                docs = docs.map(function(doc){
                                    var el = doc.toObject();
                                    if(el.blocks && el.blocks.length){
                                        for(let i=0;i<el.blocks.length;i++){
                                            if(el.blocks[i].useImg){
                                                el.img=doc.blocks[i].img;
                                            }
                                            if(el.blocks[i].useDesc){
                                                el.desc=el.blocks[i].desc;
                                                el.descL=el.blocks[i].descL;
                                            }
                                        }
                                    }
                                    //console.log(el)
                                    el.blocks=null;

                                    if (el.gallery.length && el.gallery.length>1){
                                        el.gallery.sort(function(a,b){return a.index- b.index});
                                        if(el.gallery.length>3){
                                            el.gallery.splice(3,el.gallery.length-1)
                                        }
                                    }
                                    return el;
                                })

                            }
                            //cb(err,docs)
                        })
                        acts.push(promise)
                }catch(err){console.log(err)}
            })

            Promise.all(acts).then(function(docs){
                let results=[];
                try{
                    for(let i=0;i<options.perPage;i++){
                        for(let j=0;j<options.req.store.mp.stores.length;j++){
                            //console.log(docs[j][i])
                            if(docs[j] && docs[j][i]){
                                results.push(docs[j][i])
                            }
                        }
                    }

                }catch(err){console.log(err);cb(err)}
                cb(null,results)


            });
        }else{
            //console.log(criteria)
            var query =this.find(criteria);
            query.select('name tags brandTag brand category gallery price store artikul artikulL url index  unitOfMeasure single multiple minQty maxQty  seller actived stock driveSalePrice driveRetailPrice sortsOfStuff service currency orderType sort timePart imgs nameL unitOfMeasureL extCatalog idForXML archived desc descL link timePart backgroundcolor priceForFilter blocks translated')
            query.sort({'index': -1}) // sort by date
            query.limit(options.perPage)
            query.skip(options.perPage * options.page)
            query.populate('sortsOfStuff','filter differentPrice')
            query.populate('brand','name')
            query.exec(function(err,docs){
                if (docs && docs.length){
                    docs = docs.map(function(doc){
                        var el = doc.toObject();
                        if(el.blocks && el.blocks.length){
                            for(let i=0;i<el.blocks.length;i++){
                                if(el.blocks[i].useImg){
                                    el.img=doc.blocks[i].img;
                                }
                                if(el.blocks[i].useDesc){
                                    el.desc=el.blocks[i].desc;
                                    el.descL=el.blocks[i].descL;
                                }
                            }
                        }
                        el.blocks=null;
                        if (el.gallery.length && el.gallery.length>1){
                            el.gallery.sort(function(a,b){return a.index- b.index});
                            if(el.gallery.length>3){
                                el.gallery.splice(3,el.gallery.length-1)
                            }
                            el.img=el.gallery[0].img;
                        }
                        return el;
                    })

                }
                cb(err,docs)
            })
        }



    },
    searchList: function (options, cb) {
        let self=this;
        let Group = mongoose.model('Group')
        //console.log("options.criteria['$and']-",options.criteria['$and'])
        let criteria = {$and:[options.criteria,{$or:[]},{actived:true}]}
        let searchStr=RegExp( options.searchStr, "i" )

        let field= 'keywords.'+(options.lang?options.lang:options.req.store.lang)
        //console.log(field)
        let o={store:options.req.store._id,actived:true}
        o[field]=searchStr

        /*let o={['nameL.'+options.lang]:searchStr};
        criteria.$and[1].$or.push(o)
        o={['artikulL.'+options.lang]:searchStr};
        criteria.$and[1].$or.push(o)
        o={['name']:searchStr};
        criteria.$and[1].$or.push(o)
        o={['artikul']:searchStr};
        criteria.$and[1].$or.push(o)*/
        /*o={['desc']:searchStr};
        criteria.$and[1].$or.push(o)*/
        Promise.resolve()
            .then(function () {
                return;
                if(cache.categories[options.req.store._id] && cache.categories[options.req.store._id].exp && moment().unix()< cache.categories[options.req.store._id].exp){
                    //console.log('from cache')
                    return cache.categories[options.req.store._id].data
                }else{
                    return new Promise(function (rs,rj) {
                        let categories={};
                        Group.find({store:options.req.store._id,level:0}).populate('child').lean().exec(function (err,groups) {
                            //console.log(err)
                            if(err){return rj(err)}
                            groups.forEach(function(group) {
                                //console.log(group)
                                group.categories.forEach(function (c) {
                                    categories[c]=group.url;
                                })
                                group.child.forEach(function (g) {
                                    if(g && g.categories){
                                        g.categories.forEach(function (c) {
                                            categories[c]=group.url;
                                        })
                                    }
                                    //console.log(g)

                                })
                            })


                            let seconds = 100;
                            if(!cache.categories[options.req.store._id]){
                                cache.categories[options.req.store._id]={}
                            }
                            cache.categories[options.req.store._id].exp=moment().add(seconds, 'seconds').unix()
                            cache.categories[options.req.store._id].data=categories;
                            rs(categories)
                        })
                    })

                }
            })
            .then(function (categories) {
                //console.log(categories)

                //console.log('stuff criteria-',criteria)
               // console.log(util.inspect(criteria, false, null))
                //console.log(o)
                var query =self.find(o);
                query.select('name tags brandTag brand category gallery price store artikul url index  unitOfMeasure single multiple minQty maxQty  seller actived stock driveSalePrice driveRetailPrice sortsOfStuff service currency orderType sort timePart imgs nameL unitOfMeasureL desc descL artikulL archived link')
                .sort({'index': -1})
                .limit(options.perPage)
                .skip(options.perPage * options.page)
                .populate('category','url')
                .populate('sortsOfStuff','filter differentPrice')
                .lean()
                .exec(function(err,docs){
                    if (docs && docs.length){
                        docs = docs.map(function(el){
                            //var el = doc.toObject();
                            if (el.gallery.length){
                                if(el.gallery.length>1){
                                    el.gallery.sort(function(a,b){return a.index- b.index});
                                    el.gallery.splice(1,el.gallery.length-1)
                                    delete el.gallery[0].img;
                                }

                                el.img=(el.gallery[0].thumbSmall)?el.gallery[0].thumbSmall:el.gallery[0].thumb;
                                el.imgThumb=el.gallery[0].thumb;

                            }
                            //delete el.gallery
                            /*if(el.category._id && categories[el.category._id]){
                                el.category.section=categories[el.category._id]
                            }
*/
                            return el;
                        })

                    }
                    cb(err,docs)
                })
            })
            .catch(cb)



    },

    postDelete:function(stuff){
        // удадение товара из групп товаров удаление комментариев к товару
        return;


        if(stuff && stuff.stuffsGroups && stuff.stuffsGroups.lenght){
            var id =(stuff._id.toString)?stuff._id.toString():stuff._id;
            var SG=mongoose.model('StuffsGroups');
            var actions = items.map(function(group){
                return new Promise(function(resolve){
                    SG.findOne({_id:group},function(err,g){
                        if(g){
                            g= g.toObject();
                            if(g.stuffs && g.stuffs.length){
                                g.stuffs=g.stuffs.map(function(s){return (s.toString)?s.toString():s;})
                                g.stuffs.splice(g.stuffs.indexOf(id),1);
                                SG.update({_id: g._id},{$set:{stuffs:g.stuffs}},function(){
                                    resolve();
                                })
                            }else{
                                resolve();
                            }
                        }else{
                            resolve();
                        }
                    })
                })
            });
            var results = Promise.all(actions);
            results.then(function(data){
                console.log('ok')
            });
        }

    }

}

mongoose.model('Stuff', SfuffSchema);




var SortsOfStuffSchema = new Schema({
    store:String,
    idForXML:{type:Number,defailt:1},
    name:String,
    nameL:{},
    filter:{type : Schema.ObjectId, ref : 'Filter'},//характеристика без фото
    filterGroup:{type : Schema.ObjectId, ref : 'Filter'},//характеристика с фото
    stuffs:[{type : Schema.ObjectId, ref : 'Stuff'}],
    differentPrice:{type:Boolean,default:false},
    addInfo:{type : Schema.ObjectId, ref : 'AddInfo'}// table of size
});


SortsOfStuffSchema.statics = {
    load: function (query, cb) {
        this.findOne(query)
            .populate('stuffs', 'gallery tags name artikul url stock driveSalePrice driveRetailPrice sortsOfStuff actived archived')
            //.populate('tagsOne.tag', 'name')
            .exec(function(err,doc){
                if(doc && doc.staffs && doc.staffs.length){
                    doc.staffs.forEach(function(el){
                        if(el.gallery && el.gallery.length){
                            el.gallery.sort(function(a,b){return a.index- b.index})
                        }
                    })
                }

                cb(err,doc)
            })
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            //.populate('gallery.tag', 'name')
            //.select('name img tags brandTag brand category price priceSale')
            //.sort({'index': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    preUpdate:function(req,cb){
        let self=this;
        return new Promise(function(rs,rj){
            self.findOne({$and:[{store:req.store._id},{ idForXML:{$lt:100000} }]})
                .limit(1)
                .sort({'idForXML': -1})
                .exec(function(err,item){
                    if(err){rj(err)}
                    //console.log(item);
                    if(!item){
                        req.body.idForXML=1;
                    }else{
                        req.body.idForXML=item.idForXML+1;
                    }
                    rs();
                })
        })

    },

}

mongoose.model('SortsOfStuff', SortsOfStuffSchema);

var AddInfoSchema=new Schema({
    store:String,
    filter:{type : Schema.ObjectId, ref : 'Filter'},
    name:String,
    nameL:{},
    table:{},
    headerTable:{}
});
AddInfoSchema.statics = {
    load: function (query, cb) {
        this.findOne(query)
            .exec(function (err,res) {
                //console.log(res)
                cb(err,res)
            })
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    }

}

mongoose.model('AddInfo', AddInfoSchema);



var groupStuffsSchema=new Schema({
    store:String,
    name:String,
    nameL:{},
    desc:String,
    descL:{},
    stuffs:[{type : Schema.ObjectId, ref : 'Stuff'}],
    category:{type : Schema.ObjectId, ref : 'Category'},
    url:{type :String,index:true},
    actived:{type:Boolean,default:true},
    index: Number,
    img:String,
});
groupStuffsSchema.statics = {
    load: function (query, cb) {
        this.findOne(query)
            .populate('stuffs','name nameL desc descL price currency gallery')
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .sort({'index': 1})
            .limit(options.perPage)
            .populate('stuffs','name nameL desc descL price currency gallery')
            .skip(options.perPage * options.page)
            .exec(cb)
    }

}

mongoose.model('GroupStuffs', groupStuffsSchema);


