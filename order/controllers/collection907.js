'use strict';
var mongoose = require('mongoose');
var domain = require('domain');
var ObjectID = mongoose.Types.ObjectId;
var config=require('../config/config')
var request=require('request')
function getPromise(host) {
    return new Promise(function(resolve,reject){
        request.get( {url: host}, function (err, response) {
            if (err) {return next( err )}
            try {
                //console.log(host)
                //console.log(response.body)
                var result = JSON.parse( response.body );
                resolve(result)
            } catch (err) {
                reject(err)
            }
        } )
    })
}

function save(req, res, next) {
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        Promise.resolve()
            .then(function () {
                return new Promise(function(resolve,reject){
                    if (req.collection.preUpdate && typeof req.collection.preUpdate === 'function'){
                        req.collection.preUpdate(req,function(err,res){
                            if (err) return reject(err);
                            resolve();
                        });
                    } else {
                        resolve();
                    }
                })
            })
            .then(function () {
                var stuff,upsertData;
                //console.log(req.body)
                stuff = new req.collection(req.body);
                //console.log('stuff ',stuff)
                upsertData = stuff.toObject();
                //console.log('ldlldld!')
                delete upsertData._id;
                upsertData.store=req.store._id;
                /*if(!upsertData.store){
                 upsertData.store=req.store._id;
                 }*/
                //console.log('ldlldld!')
                //console.log('upsertData-',upsertData);
                req.collection.update({_id: stuff.id}, upsertData, {upsert: true}, function (err,result) {
                    if (err) return  next(err)
                    //если комментарий то вставляем ссылку на id thread parent-а
                    if (req.collection.postUpdate && typeof req.collection.postUpdate === 'function'){
                        req.collection.postUpdate(stuff);
                    }
                    //console.log(stuff)
                    var o={id:stuff.id};
                    // console.log(stuff)
                    if(stuff.num){o.num=stuff.num};
                    if(stuff.date){o.date=stuff.date};
                    if(stuff.url){o.url=stuff.url};
                    if(stuff._id){o._id=stuff._id};

                    res.json(o);
                })
            })
            .catch(function(err){
                next(err)
            })
    })
}


exports.get = function(req, res, next) {
    //console.log(req.store);
    var stuffHost = req.store.protocol + '://'+config.stuffHost;
    var userHost = req.store.protocol + '://'+config.userHost;
    var storeHost = req.store.protocol + '://'+config.storeHost;

    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        if (!req.params.id) return next();
        var id;
        try {
            id = new ObjectID(id);
        } catch (err) {
            id=req.params.id;
        }
        
        req.collection.load(id, function(e, result){
            console.log('11111')
            if (e) return next(e)
            //console.log(result)
            if (result){
                if(req.collectionName=='Order'){
                    var order=result.toObject();
                    //console.log(order)
                    console.log('11111')
                    var actions=[];
                    if(order.user){

                        var host= userHost+'/api/collections/User/'+order.user;
                        //console.log(host)
                        actions.push(getPromise(host))
                    }
                    if(order.seller){
                        var host= storeHost+'/api/collections/Seller/'+order.seller;
                        //console.log(host)
                        actions.push(getPromise(host))
                    }
                    if(order.coupon){
                        var host= stuffHost+'/api/collections/Coupon/'+order.coupon;
                       // console.log(host)
                        actions.push(getPromise(host))
                    }
                    if(order.campaign && order.campaign.length){
                        var query='?query={_id:{$in:'+JSON.stringify(order.campaign)+'}}'+
                                '&store='+req.store._id;
                        var host= stuffHost+'/api/collections/Campaign'+query;
                        //console.log(host)
                        actions.push(getPromise(host))
                    }
                    //console.log(actions)

                    Promise.all(actions).then(function(results){
                        //console.log(results)
                        if(results && results.length){
                            order.user={
                                _id:results[0]._id,
                                coupons :results[0].coupons,
                                email :results[0].email,
                                name:results[0].name,
                                profile:results[0].profile
                            }
                            order.seller={
                                _id:results[1]._id,
                                cascade :results[1].cascade,
                                opt :results[1].opt,
                                payInfo :results[1].payInfo,
                                name:results[1].name
                            }
                            if(order.coupon){
                                order.coupon=results[2] ;
                            }
                            if(order.campaign && order.campaign.length){
                                order.campaign=results[3] ;
                            }
                        }
                        return res.send(order);
                    }).catch(function(err){next(err)})
                } else{
                    return res.send(result);
                }
            } else {
                return res.sendStatus(404)
            }
        })
    })
}
exports.list = function(req, res, next) {
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        next(error)
    });
    d.run(function () {
        //console.log('req.query-',req.query)
        var page = (req.query['page'] > 0 ? req.query['page'] : 0);
        var perPage = (req.query.perPage && parseInt(req.query.perPage)>0)?parseInt(req.query.perPage):100;
        var options = {
            perPage: perPage,
            page: page,
            criteria:null
        }
        if (req.query.query && req.query.query!='{}') {
            try {
                options.criteria=JSON.parse(req.query.query);
            } catch (err) {
                //console.log(err)
                options.criteria=req.query.query;
            }
        }
        if(!req.query.store){
            return next(new Error('не указан магазин'))
        }else{
            if(options.criteria && typeof options.criteria==='object'){
                var keys = Object.keys(options.criteria);
                if(keys.length==0){
                    options.criteria={store:req.query.store};
                }else if(keys.length==1){
                    if(keys[0]=='$and'){
                        options.criteria.$and.push({store:req.query.store});
                    }else{
                        options.criteria={$and:[{store:req.query.store},options.criteria]}
                    }
                }else{
                    options.criteria={$and:[{store:req.query.store},options.criteria]}
                }
            }else{
                options.criteria={store:req.query.store};
            }
        }
        //console.log('options.criteria ',options.criteria.$and)
        //console.log('req.collectionName ',req.collectionName)
        req.collection.list(options,function(e, results){
            if (e) return next(e)
            if (page==0){
                req.collection.count(options.criteria).exec(function (err, count) {
                    if (results.length>0){
                        results.unshift({'index':count});
                    }
                    return res.json(results)
                })
            } else {
                return res.json(results)
            }
        })

    })
}
exports.save=save;
exports.update = function(req, res, next) {
    if(!req.query.update){
        return save(req, res, next)
    }
    //console.log(req.body)
    var arr = req.query.update.split(' ');
    var newVal ={};
    for (var i= 0,l=arr.length;i<l;i++){
        if (req.body[arr[i]]!='undefined'){
            if(arr[i]=='name'){
                if (!req.body[arr[i]]){
                    var error = new Error('название не может быть пустым')
                    return next(error)
                }
                req.body[arr[i]]=req.body[arr[i]].substring(0,100);
            }
            if(arr[i]=='desc'){
                req.body[arr[i]]=req.body[arr[i]].substring(0,2000);
            }
            newVal[arr[i]]= req.body[arr[i]];
        } else {console.log('нет - ',arr[i])}
    }
    req.collection.update({_id:{$in:req.body._id}},{$set:newVal},{ multi: true }, function (err,result) {
        if (err) return next(err)
        res.json({id:req.body._id});
    });
}
exports.delete = function(req, res, next) {
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {

        req.collection.findById(req.params.id,function(err,result){
            function deleteItem(){
                try {
                    var id = new ObjectID(req.params.id);
                } catch (err) {
                    var error = new Error('не верный id')
                    return next(id)
                }
                req.collection.remove({_id: id}, function(e, resultDelete){
                    //console.log('!!!!',e,resultDelete)
                    if (e) return next(e)

                    if (req.collection.postDelete && typeof req.collection.postDelete === 'function'){
                        req.collection.postDelete(result,req);
                    }
                    //console.log('ggvv')
                    res.json( {msg:'success'})
                })
            }
            if (err) return next(err)
            if (req.collection.preDelete && typeof req.collection.preDelete === 'function'){
                req.collection.preDelete(req,result,function(err){
                    if (err) return next(err);
                    deleteItem();
                });
            } else {
                deleteItem();
            }









        });

    })

}
exports.deleteArray = function(req, res, next) {

    if (!req.query){res.json( {msg:'нечего удалить'})}
    var arr=[];
    for(var i in req.query){
        arr.push(req.query[i]);
    }
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        console.log(arr);
        arr=arr.map(function(id){
            try {
                id = new ObjectID(id);
            } catch (err) {
                console.log('err-',err)
                id=id;
            }
            return id;
        })
        req.collection.remove({_id: {$in: arr}},function(err,result){
            console.log(err)
            if (err) return next(err);
            if (req.collection.postDelete && typeof req.collection.postDelete === 'function'){
                req.collection.postDelete(result,req);
            }
            res.json( {msg:'success'})
        });

    })

}