'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
/**
 * Witget Schema
 */
var ConfigSchema = new Schema({
    name:String, // имя для вывода в списке
    currency:[String],//список кодов валют
    langs:[String],//список кодов валют
    tagsValue:[{}], // коды для тегов.
    roles:[String],// роли пользователчя системы
    unitOfMeasure:[String],// единицы измерения
    actionSubscribe:[{}], // соответсвие кодов действия служебным письмам
    actions:[{}],
    notification:[String],// виды уведомлений

});


ConfigSchema.statics = {
    load: function (id, cb) {
        this.findOne({ _id : id })
            .exec(cb)
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
        this.find(criteria)
            .sort({'index': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    preUpdate:function(req,cb){
        //req.body.actions=req.body.actionSubscribe;
        cb()
    }
}
mongoose.model('Config', ConfigSchema);



var ConfigDataSchema = new Schema({
    type:String, // имя для вывода в списке
    lang:String,
    data:[]
    /*unitOfMeasure:[String],// единицы измерения
    actionSubscribe:[{}], // соответсвие кодов действия служебным письмам
    actions:[{}],
    notification:[String],// виды уведомлений*/

});


ConfigDataSchema.statics = {
    load: function (id, cb) {
        this.findOne({ _id : id })
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .exec(cb)
    }
}
mongoose.model('ConfigData', ConfigDataSchema);

