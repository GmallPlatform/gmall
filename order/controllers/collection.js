'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var domain = require('domain');
var ObjectID = mongoose.Types.ObjectId;
var config=require('../config/config')
var request=require('request')

const ports = require('../../modules/ports')
console.log(ports)

function getPromise(host,query) {
    var qyeryString='';
    if(query && typeof query == "object"){
        for(var key in query){
            if(!qyeryString){qyeryString='?'};
            qyeryString+=key+'='+query[key];
        }
    }
    return new Promise(function(resolve,reject){
        //console.log(host)
        request.get( {url: host+qyeryString}, function (err, response) {
            //console.log('err',err)
            if (err) {return reject(err)}
            try {
                //console.log(host)
                //console.log(response.body)
                var result = JSON.parse( response.body );
                //console.log(result)
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
        //console.log('order error ',error)
        return next(error)
    });
    d.run(function () {
        //console.log('req.body',req.body)
        Promise.resolve()
            .then(function () {
                return new Promise(function(resolve,reject){
                    if (req.collection.preUpdate && typeof req.collection.preUpdate === 'function'){
                        req.collection.preUpdate(req,function(err,res){
                            if (err) return reject(err);
                            //console.log('req.body after preUpdate',req.body)
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
                    if (req.collection.postUpdate && typeof req.collection.postUpdate === 'function'){
                        req.collection.postUpdate(stuff,req.store);
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
    var stuffHost = 'http://'+ports.stuffHost;
    var userHost = 'http://'+ports.userHost;
    var storeHost = 'http://'+ports.storeHost;

    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        if (!req.params.id) return next();
        req.collection.load(req.params.id, function(e, result){
            if (e) return next(e)
            //console.log(result)
            if (result){
                if(req.collectionName=='Order'){
                    var order=result.toObject();
                    //console.log(order)
                    var actions=[];
                    if(order.user){

                        var host= userHost+'/api/collections/User/'+order.user;
                        //console.log(host)
                        actions.push(getPromise(host,{store:req.store._id}))
                    }else if(order.userEntry){

                        var host= userHost+'/api/collections/UserEntry/'+order.userEntry;
                        //console.log(host)
                        actions.push(getPromise(host,{store:req.store._id}))
                    }
                    if(order.seller){
                        var host= storeHost+'/api/collections/Seller/'+order.seller;
                        //console.log(host)
                        actions.push(getPromise(host))
                    }
                    if(order.coupon){
                        //console.log('order.coupon',order.coupon)
                        var host= stuffHost+'/api/collections/Coupon/'+order.coupon;
                       // console.log(host)
                        actions.push(getPromise(host,{store:req.store._id}))
                    }else{
                        var p=Promise.resolve()
                        actions.push(p)
                    }
                    order.campaign=order.campaign.filter(function (el) {
                        return el;
                    })
                    //console.log('order.campaign',order.campaign)
                    if(order.campaign && order.campaign.length){
                        //console.log(ids)
                        var query='?query={"_id":{"$in":'+JSON.stringify(order.campaign)+'}}'+
                                '&store='+req.store._id;
                        //console.log(query)
                        var host= stuffHost+'/api/collections/Campaign'+query;
                        //console.log(host)
                        actions.push(getPromise(host))
                        //"Cast to ObjectId failed for value "578f5d1598238914569a1d39?store=578f5d1598238914569a1d39" at path "store""

                    }
                    //console.log(actions)

                    Promise.all(actions).then(function(results){
                        //console.log(results)
                        if(results && results.length){
                            if(order.user){
                                order.user={
                                    _id:results[0]._id,
                                    coupons :results[0].coupons,
                                    email :results[0].email,
                                    name:results[0].name,
                                    profile:results[0].profile
                                }
                            }else if(order.userEntry){
                                //console.log(results[0])
                                order.user={
                                    _id:results[0]._id,
                                    coupons :[],
                                    email :(results[0].email)?results[0].email:null,
                                    name:results[0].name,
                                    profile:{fio:results[0].name,phone:results[0].phone}
                                }
                                order.profile={fio:results[0].name,phone:results[0].phone}
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
                            //console.log(results[3])
                            if(order.campaign && order.campaign.length){
                                if(results[3] && results[3].length){
                                    results[3].shift()
                                }
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
    //console.log(req.query)
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
    console.log(req.body)
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
    if(typeof req.body._id=='string'){
        var query={_id:req.body._id};
    }else{
        var query={_id:{$in:req.body._id}}
    }


    if(req.query.embeddedName && req.query.embeddedVal){
        //http://stackoverflow.com/questions/8955910/mongoose-updating-embedded-document-in-array
        query[req.query.embeddedName+'._id']=req.query.embeddedVal;
        Object.keys(newVal).forEach(function(key){
            var newKey=req.query.embeddedName+'.$.'+key;
            newVal[newKey]=newVal[key];
            delete newVal[key];
        })
    }
    var setData={$set:newVal};
    if (req.query.embeddedName && req.query.embeddedPush){
        setData={$push:{}};
        setData.$push[req.query.embeddedName]=newVal;
        //setData.$push[req.query.embeddedName]["$position"]=0;
    }
    if (req.query.embeddedName && req.query.embeddedPull){
        setData={$pull:{}};
        // name of field = $ for array consist from literal elements not objects with fields
        setData.$pull[req.query.embeddedName]=(newVal.$)?newVal.$:newVal;
    }
    console.log(req.collectionName,query,setData,newVal)
    //return;
    req.collection.update(query,setData,{ multi: true }, function (err,result) {
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
                req.collection. findByIdAndRemove(result._id, function(e, resultDelete){
                    //console.log('!!!!',e,resultDelete)
                    if (e) return next(e)

                    if (req.collection.postDelete && typeof req.collection.postDelete === 'function'){
                        req.collection.postDelete(result,req);
                    }
                    res.json( {msg:'success'})
                })
            }
            if (err) return next(err)
            if(!result){return res.json( {msg:'success'})}
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
    var arr=req.query.ids.split('_');
    /*for(var i in req.query){
        arr.push(req.query[i]);
    }*/
    var d = domain.create();
    d.on('error', function(error) {
        error.collectionName=req.collectionName;
        return next(error)
    });
    d.run(function () {
        //console.log(arr);
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
            //console.log(err)
            if (err) return next(err);
            /*if (req.collection.postDelete && typeof req.collection.postDelete === 'function'){
                req.collection.postDelete(result,req);
            }*/
            res.json( {msg:'success'})
        });

    })

}