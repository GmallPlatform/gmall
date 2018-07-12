'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var User=mongoose.model('User')
var SubscribtionList=mongoose.model('SubscribtionList')



exports.deleteStore=function(req,res,next){
    if(!req.store || !req.store._id ){
        return next("can't delete" )
    }
    let store=req.store._id;
    deleteModels()
        .then(function () {
            res.json({msg:'ok'})
        })
        .catch(function (err) {
            next(err)
        })
    async function deleteModels () {
        await new Promise(function (rs,rj) {
            User.remove({store:store}, function (err) {
                if (err) {
                    return rj(err)
                }
                return rs()
            })
        })
        await new Promise(function (rs,rj) {
            SubscribtionList.remove({store:store}, function (err) {
                if (err) {
                    return rj(err)
                }
                return rs()
            })
        })
    }
}










