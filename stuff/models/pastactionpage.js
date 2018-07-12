'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var PAPSchema = new Schema({
    store:{type : Schema.ObjectId, ref : 'Store'},
    action:String,
    img:String,
    actived:{type:Boolean,default:true},
    name: {type : String, default : '', trim : true},
    url:{type:String,index:true},
    desc : {type : String, default : ''},
    nameL:{},
    descL:{},
    googleGoal:String,// code from google adwords - conversion tracking tag
});

PAPSchema.statics = {
    load: function (query, cb) {
        var self=this;
        this.findOne(query)
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            //.populate('gallery.tag', 'name')
            .select('url action actived name img nameL')
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    middlewareForUpdate:function(body,arr){
        //console.log(body,arr);
        return new Promise(function(resolve){
            arr.forEach(function(name){
                if(name=='googleGoal'){
                    body.googleGoal=body.googleGoal.substring(0,1000)
                }
            })
            resolve();
        })
    }
}

mongoose.model('Paps', PAPSchema);

