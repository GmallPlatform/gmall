'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var domain = require('domain');
var ObjectID = mongoose.Types.ObjectId;
var Dialog=mongoose.model('Dialog')
var Chat=mongoose.model('Chat')
var Notification=mongoose.model('Notification')

exports.chatMessagesList=function(req,res,next){
    //console.log(req.query,req.params)
    var query,addQuery=req.params;
    if(req.params.recipient=='user'){
        query={user:req.query.user}
    }else{
        query={seller:req.query.seller};
    }
    Promise.resolve()
        .then(function(){
            return new Promise(function(resolve,reject){
                Dialog.find(query).exec(function(err,result){
                    if(err){return reject(err)}
                    resolve(result)
                })
            })
        })
        .then(function(dialogs){
            var actions=[];
            if(dialogs && dialogs.length){
                actions= dialogs.map(function(d){
                    //console.log(d)
                    return new Promise(function(resolve,reject){
                        var o = addQuery;
                        o.dialog=d._id;
                        o.$or=[{read:{ $exists: false }},{read:false}]
                        Chat.count(o).exec(function(err,result){
                            //console.log('result - ',result)
                        //Chat.count({$and:[{dialog:d._id},addQuery,{read: false }]}).exec(function(err,result){
                            if(err){return reject(err)}
                            if(d.order){
                                //console.log(d)
                                resolve({count:result,order:d.order,orderNum:d.orderNum,dialog:d._id})
                            }else{
                                if(req.params.recipient=='seller'){
                                    resolve({count:result,participant:d.userName,dialog:d._id})
                                }else{
                                    resolve({count:result,participant:d.sellerName,dialog:d._id})
                                }

                            }

                        })
                    })
                })
                return Promise.all(actions)
            }
        })
        .then(function(results){
            //console.log(results)
            if (results && results.filter){
                res.json(results.filter(function(el){return el.count}))
            }else{
                res.json([])
            }

        })
        .catch(function(err){
            return next(err)
        })
    /*Chat.unReadMessage(req,function(result){
        res.json(result)
    })*/
}
exports.notificationList=function(req,res,next){
    //console.log('notificationList')
    //console.log(req.params,req.query)
    var query={$and:[req.params,req.query,{read:{$exists:false}}]}//{read:{$exists:false}}
    //console.log(query)
    Notification.find(query).exec(function(err,results){
        if(err){return next(err)}
        if(results){
            results=results.reduce(function(o,item){
                if(!o[item.type]){o[item.type]=1}else{o[item.type]++}
                return o;
            },{})
        }
        res.json(results)
    })
}





exports.chatSetReadMessages=function(req,res,next){
    Chat.update({_id:{$in:req.body.ids}}, {read: true}, {multi: true},
        function(err, num) {
            res.json({msg:"updated "+num});
        }
    );
}
exports.getDontReadMessagesForOrder=function(req,res,next){
    /*Order.getDontReadMessagesForOrder(req,res,next)*/
}
exports.deleteOrderDialog=function(req,res,next){
    //console.log(req.params)
    if(req.params.seller && req.params.order){
        Dialog.findOne({seller:req.params.seller,order:req.params.order}).exec(function(err,dialog){
            //console.log('dialog',dialog)
            if(dialog){
                Dialog.findByIdAndRemove(dialog._id,function(err){
                    if(err) {return res.json({error:err})}
                    Chat.remove({dialog:dialog._id},function(err,result){
                        if(err) {return res.json({error:err})}
                        res.json({msg:'OK'})
                    })
                })
            }else{
                res.json({msg:'OK'})
            }
        })
    }else{
        res.json({msg:'OK'})
    }


}

exports.deleteStore=function(req,res,next) {
    if(!req.store || !req.store._id  || !req.store.seller){
        return next("can't delete " )
    }
    //console.log(req.store.seller)
    let seller = req.store.seller._id;
    if(!seller){
        return res.json({msg:'ok'})
    }
    /*if(!req.store || !req.store._id || !req.store.wantToDelete || !seller){
        return next("can't delete" )
    }*/

    deleteModels()
        .then(function () {
            res.json({msg:'ok'})
        })
        .catch(function (err) {
            next(err)
        })
    async function deleteModels () {
        const cursor = Dialog.find({seller:seller}).cursor();
        await cursor.eachAsync(async function(dialog) {
            if(dialog && dialog._id){
                await new Promise(function (rs,rj) {
                    Chat.remove({dialog: dialog._id}, function (err) {
                        if (err) {
                            return rj(err)
                        }
                        return rs()
                    })
                })
            }
        });
        await new Promise(function (rs,rj) {
            Dialog.remove({seller:seller}, function (err) {
                if (err) {
                    return rj(err)
                }
                return rs()
            })
        })
    }
}






