'use strict';
var mongoose=require('mongoose');
var Template=mongoose.model('Template');
var Config=mongoose.model('Config');
var Store=mongoose.model('Store');
var Seller=mongoose.model('Seller');
module.exports = {
    init:function(){
        //console.log('init')
        Promise.resolve()
            .then(function(){
                return new Promise(function(resolve,reject){
                    Config.find().exec(function(err,res){
                        //console.log(err,res)
                        if(err){return reject(err)}
                        if(!res || !res.length){
                            var config = new Config({
                                '_id': "565d784e2c91192c1ca41d1d",
                                'name': "основной",
                                'actionSubscribe':[
                                    {subscribe: "subscribe"},
                                    {resetPassword: "resetPassword"},
                                    {order: "order"},
                                    {updateOrder: "updateOrder"},
                                    {invoice: "invoice"}
                                ],
                                "actions":[
                                    {subscribe: "subscribe"},
                                    {resetPassword: "resetPassword"},
                                    {order: "order"},
                                    {updateOrder: "updateOrder"},
                                    {invoice: "invoice"},
                                    {feedback: "feedback"}
                                ],
                                'currency':["UAH", "RUB", "USD", "EUR"],
                                'notification':["order", "pay", "feedback", "comment", "confirmationOrder", "invoice", "subscribtion", "accepted","shipDetail","call"],
                                roles:["admin", "user"],
                                "unitOfMeasure":["шт."]
                            })
                            //console.log(config)
                            config.save(function(err,res){
                                if(err){return reject(err)}
                                resolve()
                            })
                        }else{
                            resolve()
                        }
                    })

                })
            })
            .then(function(){
                return new Promise(function(resolve,reject){
                    Template.findOne({name:'gmall'}).exec(function(err,res){
                        //console.log('init 2',err,res)
                        if(err){return reject(err)}
                        if(!res){
                            var template = new Template({
                                name:'gmall',
                                folder:'gmall'
                            })
                            template.save(function(err,res){
                                console.log(err,res)
                                if(err){return reject(err)}
                                resolve()
                            })
                        }else{
                            resolve()
                        }
                    })

                })
            })
            .then(function(){
                return new Promise(function(resolve,reject){
                    Template.find().exec(function(err,templates){
                        //console.log(templates)
                        Store.findOne({domain:'gmall.io'}).exec(function(err,res){
                            if(err){return reject(err)}
                            //console.log(res)
                            if(!res){
                                var template=templates[0];
                                var store=new Store({
                                    name:'Gmall',
                                    subDomain:'gmall',
                                    domain:'gmall.io',
                                    type:'main',
                                    template:template._id,
                                    currencyArr:['UAH'],
                                    mainCurrency:'UAH',
                                    currency:{UAH:[1,'UAH','грн.']},
                                    owner:[]
                                })
                                //console.log('store ' ,store)
                                var seller=new Seller({
                                    store:store._id,
                                    user:null,
                                    admins:[],
                                    main:true,
                                    name:'gmall',
                                })
                                store.seller=seller._id;
                                store.save(function(){
                                    console.log('saved 1')
                                })
                                seller.save(function(){
                                    console.log('saved 2')
                                })
                                resolve()
                            }else{
                                resolve()
                            }
                        })
                    })
                })
            })
            .catch(function(err){
                console.log(err)
            })



    },
    /*setTemplate:function(){
        var act=[];
        Store.find()
            .populate('template')
            .exec(function(stores){
                stores.forEach(function(store){
                    var template=store.template.toObject()
                    delete template._id;
                    delete
                    Store.update({_id:store._id},{$set:{template:template}})
                })
            })
    }*/

};