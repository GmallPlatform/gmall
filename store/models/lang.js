'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectID = mongoose.Types.ObjectId;

var tagSchema = new Schema({ name: 'string' });

/*var tags={
    name:{ua:String,en:Str,ru:String,de:String,desc:String}

}*/

var LangSchema;
LangSchema = new Schema({
    //store:String,
    name: {type: String, default: '', trim: true},
    index:{type:Number,default:1},
    tags:{}

});

LangSchema.statics = {
    load: function (id, cb) {
        this.findById(id)
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        if (criteria['name']){
            criteria['name']=new RegExp(criteria['name'],'i');
        }
        //console.log(criteria)
        this.find(criteria)
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    }
}
mongoose.model('Lang', LangSchema);
