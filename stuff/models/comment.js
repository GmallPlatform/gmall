'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;


var CommentSchema = new Schema({
    store:String,
    user:String,
    stuff:{type : Schema.ObjectId, ref : 'Stuff'},
    date: { type: Date, default: Date.now },
    text:String,
    response:String
});

CommentSchema.statics = {
    preUpdate :function(req){
        return new Promise(function(resolve,reject){
            if (req.body && req.body.text){
                req.body.text=req.body.text.substring(0,500);
            }
            resolve()
        })
    },
    list: function (options, cb) {

        var criteria = options.criteria || {}
        //console.log(criteria)
        this.find(criteria)
            .populate('stuff','name nameL artikul artikulL gallery')
            .sort({'date': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(function (err,items) {
                //console.log(items)
                cb(err,items)
            })
    }

}

mongoose.model('Comment', CommentSchema);

