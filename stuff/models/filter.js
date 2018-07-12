'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;


var FilterSchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    name:{type : String, default : '', trim : true},
    nameL:{},
    type : Number,// если 1 единичный если два и более то множественный
    index: Number,
    sticker:{type:Boolean,default:false}, // может быть только одна группа тегов в которой применяются стикеры
    dontshow:{type:Boolean,default:false}, // отображение фильтра в общем списке с странице списка товаров
    actived:Boolean,
    tags:[{type : Schema.ObjectId, ref : 'FilterTags'}],
    count:{type:Boolean,default:false},// количественная характеристика
    min:{type:Number,default:0},// минимальное значение количемтвенной характеристики
    max:{type:Number,default:0},// максимальное значение количемтвенной характеристикиб
    price:Boolean,// количественный фильтр для цены
    desc:String, // единица измерения количественной характеристики
    descL:{},
    comment:String// дополнительное служебное описание характеристики

});

var FilterTagsSchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    url:String,
    name:{type : String, default : '', trim : true},
    desc:String,
    nameL:{},
    descL:{},
    filter:{type : Schema.ObjectId, ref : 'Filter'},
    img:String,
    index: Number,
    type:String, // new,sale,main nostore

    sticker:String


});
FilterTagsSchema.statics = {
    load: function (query, cb) {
        this.findOne(query)
           .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .sort('index')
            .select("name index filter img desc sticker url nameL descL")
            .exec(cb)
    },
}


FilterSchema.statics = {
    load: function (query, cb) {
        this.findOne(query)
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .sort('index')
            .populate('tags')
            //.select("name index type categories sticker dontshow tags actived nameL count min max")
            .exec(cb)
    },
}


mongoose.model('Filter', FilterSchema);
mongoose.model('FilterTags', FilterTagsSchema);








