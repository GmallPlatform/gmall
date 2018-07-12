'use strict';

var Template =mongoose.model('Template');
var User=mongoose.model('User');
var Config=mongoose.model('Config');
module.exports = function(app) {
    var user;
    var template;
    Promise.resolve()
        .then(function(){
            return new Promise(function(resolve,reject){
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
                config.save(function(err,res){
                    if(err){return reject(err)}
                    resolve()
                })
            })
        })
        .then(function(){
            return new Promise(function(resolve,reject){
                user = new User({email:'igorchugurov@gmail.com',name:'Igor',password:'1234567igor',role:'admin'})
                user.save(function(err){
                    if(err){return reject(err)}
                    resolve()
                })
            })
        })
        .then(function(){
            return new Promise(function(resolve,reject){
                template = new Template({
                    name:'gmall',
                    folder:'gmall'
                })
                template.save(function(err,res){
                    if(err){return reject(err)}
                    resolve()
                })
            })
        })
        .then(function(){
            User.find().exec(function(err,users){
                var user=users[0]._id;
                Template.find().exec(function(err,templates){
                    var template=templates[0]._id;
                    var store=new Store({
                        name:'Gmall',
                        subDomain:'gmall',
                        damain:'gmall.io',
                        type:'main',
                        template:template._id,
                        owner:[user]
                    })
                    var seller=new Seller({
                        store:store._id,
                        user:user,
                        admins:[user],
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
                })
            })
        })
        .catch(function (err) {
            console.log(err)
        })
};