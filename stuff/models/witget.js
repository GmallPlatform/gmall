'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
/**
 * Witget Schema
 */
var WitgetSchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    seller:String,
    index:Number,
    actived:{type:Boolean,default:false},
    name:String,
    desc:String,
    nameL:{},
    descL:{},
    img:String,
    forAll:Boolean,// true for all user authrizates too
    type:String,// only CALL
    delay: {
        type:Number,
        default:30,
    },
    showOnes:Boolean
});





WitgetSchema.statics = {
    load: function (query, cb) {
        this.findOne(query)
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
    middlewareForUpdate:function(body,arr){
        //console.log(body,arr);
        return new Promise(function(resolve){
            arr.forEach(function(name){
                if(name=='delay'){
                    body.delay=Number(body.delay)
                    //console.log(body.delay)
                    if(!body.delay || body.delay===0 || body.delay<0 || body.delay>90){
                        body.delay=30;
                    }
                }
            })
            resolve();
        })
    }
}


mongoose.model('Witget', WitgetSchema);

