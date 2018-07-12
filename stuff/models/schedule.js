'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;


var EntrySchema = new Schema({
    master:{type : Schema.ObjectId, ref : 'Master'},
    stuff:{type : Schema.ObjectId, ref : 'Stuff'},
    start:Number,
    qty:Number,
    desc:String,
});

var ScheduleSchema = new Schema({
    store:String,
    date:{type : String,index:true},
    entries:[EntrySchema],
});
ScheduleSchema.statics = {
    load: function (query, cb) {
        var self=this;
        this.findOne(query)
            .populate('entries.stuff','name artikul url  nameL  artikulL')
            .populate('entries.master','name img url nameL')
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .populate('entries.stuff','name artikul url  nameL  artikulL')
            .populate('entries.master','name img url nameL')
            .sort({'index': 1})
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    }
}
mongoose.model('Schedule', ScheduleSchema);
