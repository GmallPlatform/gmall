'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectID = mongoose.Types.ObjectId;
/**
 * Notification Schema
 */
var NotificationSchema = new Schema({
    date: { type: Date, default: Date.now },
    type:String,// order,subscribe and ect.
    addressee:String,// как user в chat или seller или id user
    seller:String,
    content: String,
    note:String,
    order:String,
    read:Boolean,
    dateNote: Date
});
NotificationSchema.statics = {
    list: function (options, cb) {
        var criteria = options.criteria || {}
        //console.log('criteria-',criteria)
        this.find(criteria)
            .sort({'date': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    },
    preUpdate :function(req,cb){
        var body=req.body;
        //console.log(body)
        if(body._id){return cb()}
        if(req.chatRoom && req.chatRoom.length){
            req.chatRoom.forEach(function(socket){
                if (socket.user && socket.user==body.addressee){
                    if (body.addressee=='seller'){
                        if(req.body.seller
                            && socket.seller && req.body.seller == socket.seller){
                            socket.emit('newNotification',{type:req.body.type});
                        }
                    }else{
                        socket.emit('newNotification',{type:req.body.type});
                    }
                }
            })
        }
        cb()
    }
}
mongoose.model('Notification', NotificationSchema);






