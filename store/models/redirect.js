'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectID = mongoose.Types.ObjectId;



/*var tags={
    name:{ua:String,en:Str,ru:String,de:String,desc:String}

}*/

var RedirectSchema;
RedirectSchema = new Schema({
    store: {type: Schema.ObjectId, ref: 'Store'},
    urls:[]
});

RedirectSchema.statics = {
    load: function (id, cb) {
        this.findById(id)
            .exec(cb)
    },
    list: function (options, cb) {
        var criteria = options.criteria || {}
        this.find(criteria)
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    }
}
mongoose.model('Redirect', RedirectSchema);
