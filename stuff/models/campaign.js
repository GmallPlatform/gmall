'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var CampaignSchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    index:Number,
    name: {type : String, default : '', trim : true},
    url:String,
    actived:{type:Boolean,default:false},
    dateStart: { type: Date, default: Date.now },// начала
    dateEnd: { type: Date, default: Date.now },// окончания
    discount:Number,// размер скидки в процентах
    // данные для работы с группами товаров как для условия акции так и для акционных товаров
    useBase:Boolean,
    //forGroupBase:{type:Boolean,default:false},// акция действует для группы товаров а не из общего списка
    //forGroupStuff:{type:Boolean,default:false},// акционные товары из группы товаров а не из общего списка
    //groupTypeBase:{type:Number,default:null},// 0- tags,1 - collection
    //groupTypeStuff:{type:Number,default:null},// 0- tags,1 - collection
    //groupBaseTag:[{type : Schema.ObjectId, ref : 'FilterTags'}], // ссылка на группу товары из которой являются условием для применения акции
    //groupBaseCollection:[{type : Schema.ObjectId, ref : 'BrandTags'}],// ссылка на коллекцию товары из которой являются условием для применения акции
    //groupStuffTag:[{type : Schema.ObjectId, ref : 'FilterTags'}], // ссылка на группу товары из которой являются акционными
    //groupStuffCollection:[{type : Schema.ObjectId, ref : 'BrandTags'}],// ссылка на коллекцию товары из которой являются акционными



    //baseStuffs:[{type : Schema.ObjectId, ref : 'Stuff'}],// перечень товаров при наличии которых дейтвует акция - в случае если forAll = false



    desc : {type : String, default : ''},
    nameL:{},
    descL:{},


    img:String,

    sticker:String,

    tags:[{type : Schema.ObjectId, ref : 'FilterTags'}], // ссылка на группу товары из которой являются акционными
    brandTags:[{type : Schema.ObjectId, ref : 'BrandTags'}],// ссылка на коллекцию товары из которой являются акционными
    brands:[{type : Schema.ObjectId, ref : 'Brand'}],// ссылка на бренд товары из которой являются акционными
    stuffs:[{type : Schema.ObjectId, ref : 'Stuff'}],
    categories:[{type : Schema.ObjectId, ref : 'Category'}],
    conditionTags:[{type : Schema.ObjectId, ref : 'FilterTags'}], // ссылка на группу товары из которой являются условием для применения акции
    conditionBrandTags:[{type : Schema.ObjectId, ref : 'BrandTags'}],// ссылка на коллекцию товары из которой являются условием для применения акции
    conditionBrands:[{type : Schema.ObjectId, ref : 'Brand'}],// ссылка на бренд товары из которой являются условием для применения акции
    conditionStuffs:[{type : Schema.ObjectId, ref : 'Stuff'}],
    conditionCategories:[{type : Schema.ObjectId, ref : 'Category'}],
    revers:{ type: Boolean, default: false },// акция на все товары из каталога за исключением tags,brandTags,stuffs conditions при этом не учитывается
    forAll:{ type: Boolean, default: true },// количество не акционных товаров считается из  всего  коталога
    ratio:{type:Number,default:1},
    condition:{type:String,default:'percent'},//or sum
    percent:{type:Number,default:10},
    sum:{type:Number,default:10},

    // seo
    seo:{title:String,description:String,keywords:String},
    cartType:String,// тип карточки для списка товаров
    cartTypeCondition:String,// тип карточки для списка товаров
});
CampaignSchema.statics = {
    load: function (query, cb) {

        /*var query=(typeof id=='object')?{_id:id}:{url:id};
        console.log(query)*/
        this.findOne(query)
            .sort({'index': -1})
            .populate('tags','name nameL')
            .populate('categories','name nameL')
            .populate('conditionCategories','name nameL')
            .populate('brandTags','name nameL')
            .populate('brands','name nameL')
            .populate('conditionTags','name nameL')
            .populate('conditionBrands','name nameL')
            .populate('conditionBrandTags','name nameL')
            .populate('conditionStuffs','name nameL artikul artikulL gallery')
            .populate('stuffs','name nameL artikul artikulL gallery')
            .exec(cb)


    },
    list: function (options, cb) {

        if (options.criteria && options.criteria['$and']){
            for (var i= 0,l=options.criteria['$and'].length;i<l;i++){
                for (var key in options.criteria['$and'][i]){
                    if (options.criteria['$and'][i]['name']) {
                        options.criteria['$and'][i]['name'] =
                            RegExp( options.criteria['$and'][i]['name'], "i" )
                    }
                }
            }
        }
        var criteria = options.criteria || {}
        //console.log(options.criteria)
        //*****************************************************
        var d= Date.now();
        //var d=now.toISOString();
        //console.log(d)
        if ((options.criteria &&  options.criteria['$and'])&& (options.criteria['$and'][0]['dateEnd']||options.criteria['$and'][1]['dateEnd'])){
            if(options.criteria['$and'][0]){
                options.criteria['$and'][0]['dateEnd']={
                    "$qte":d
                }
            }
            if(options.criteria['$and'][1]){
                options.criteria['$and'][1]['dateEnd']={
                    "$qte":d
                }
            }

            options.criteria['$and'].unshift({
                dateStart : {"$lt": d}
            })

            criteria={'$and':[{dateStart : {"$lt": d}},{"dateEnd": { "$gte": d }},{store:options.req.query.store},{actived:true}]}

            this.find(criteria)
                .sort({'index': 1})
                .exec(cb)
        } else {
            this.find(criteria)
                .sort({'index': -1})
                .limit(options.perPage)
                .skip(options.perPage * options.page)
                .exec(cb)
        } 
    },
    /*preUpdate :function(req,cb){
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
    },*/
}
mongoose.model('Campaign', CampaignSchema);





