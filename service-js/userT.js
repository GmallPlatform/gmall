'use strict';

var globalFunction=require('./public/scripts/myPrototype.js')
var fs = require('fs');
var path = require('path');
var mongoose=require('mongoose');
var db = mongoose.connect('mongodb://localhost/gmall-user',{db: {safe: true}});
// Bootstrap models
var modelsPath = path.join( __dirname, 'user/models' );
require( modelsPath + '/user.js' );
var async = require('async');

var User=mongoose.model('User')

function actUser(newUser,store){
    //console.log(newUser)
    newUser.email=newUser.email.toLowerCase();
    return new Promise(
        function( resolve, reject ) {
            User.findOne({ email: newUser.email}, function(err, existingUser) {
                console.log('newUser form promise',newUser.email)
                var password=shuffle(7);
                var data={date:Date.now(),subscribtion:true,visits:1,list:null}
                if(existingUser){
                    var stores=[];
                    if(!existingUser.stores){existingUser.stores={}}
                    stores=Object.keys(existingUser.stores);
                    var isStore=store;
                    var isInStore=(isStore && stores && stores.indexOf(store)>-1)?true:false;
                    if(!isInStore){
                        existingUser.store.push(store)
                        if(!existingUser.data || typeof existingUser.data!='object'){
                            existingUser.data={};
                        }
                        if(!existingUser.stores || typeof existingUser.stores!='object'){
                            existingUser.stores={};
                        }

                        existingUser.data[store]=data;
                        User.hashPswd(password,function(hashPswd){
                            existingUser.stores[store]=hashPswd;
                            //console.log(existingUser)
                            User.update({_id:existingUser._id},{$set:{
                                store:existingUser.store,data:existingUser.data,
                                stores:existingUser.stores,}},function(){
                                if(err){reject(err)}else{resolve()}
                            })
                        });
                    }else{
                        resolve()
                    }
                }else{
                    if(!validateEmail(newUser.email)){
                        resolve()
                    } else{
                        var user = new User(newUser);
                        user.provider = 'local';
                        user.store=[store];
                        user.data={};
                        user.data[store]=data;
                        user.stores={};
                        User.hashPswd(password,function(hashPswd){
                            user.stores[store]=hashPswd;
                            user.save(function(err){
                                //console.log(password,user)
                                console.log(user.email)
                                if(err){reject(err)}else{resolve()}
                            })
                        });
                    }
                }

            })
        }
    )


    return new Promise(function(resolve,reject){
        console.log('newUser form promise',newUser)
        resolve()
        User.findOne({ email: newUser.email.toLowerCase() }, function(err, existingUser) {

            console.log('existingUser ',existingUser,newUser)
            var password=shuffle(7);
            var data={date:Date.now(),subscribtion:true,visits:1,list:null}
            if(existingUser){
                var stores=[];
                if(!existingUser.stores){existingUser.stores={}}
                stores=Object.keys(existingUser.stores);
                var isStore=req.store && req.store._id;
                var isInStore=(isStore && stores && stores.indexOf(req.store._id)>-1)?true:false;
                if(!isInStore){
                    existingUser.store.push(req.store._id)
                    if(!existingUser.data || typeof existingUser.data!='object'){
                        existingUser.data={};
                    }
                    if(!existingUser.stores || typeof existingUser.stores!='object'){
                        existingUser.stores={};
                    }

                    existingUser.data[req.store._id]=data;
                    User.hashPswd(password,function(hashPswd){
                        existingUser.stores[req.store._id]=hashPswd;
                        //console.log(existingUser)
                        User.update({_id:existingUser._id},{$set:{
                            store:existingUser.store,data:existingUser.data,
                            stores:existingUser.stores,}},function(){
                            if(err){reject(err)}else{resolve()}
                        })
                    });
                }else{
                    resolve()
                }
            }else{
                if(!validateEmail(newUser.email)){
                    resolve()
                } else{
                    var newUser = new User(newUser);
                    newUser.provider = 'local';
                    newUser.store=[req.store._id];
                    newUser.data={};
                    newUser.data[req.store._id]=data;
                    newUser.stores={};
                    User.hashPswd(password,function(hashPswd){
                        newUser.stores[req.store._id]=hashPswd;
                        newUser.save(function(err){
                            //console.log(password,newUser)
                            if(err){reject(err)}else{resolve()}
                        })
                    });
                }
            }
        })
    })
}

var promiseWhile = function(condition, action) {
    return new Promise(function(resolve,reject){
        var loop = function() {
            if (!condition()) return resolve();
            return Promise.resolve(action())
                .then(loop)
                .catch(reject);
        };
        loop()
    })
}

function sendEmail(from,toEmail,subject,content,res,req,cb){
    var mailOptions = {
        from: from,
        //The email to contact
        to: toEmail,
        //to:'email@gmail.io',
        //bcc:['igorchugurov@gmail.com','vikachugurova@gmail.com'],
        subject: subject,
        html: content
    }
    if(toEmail.length) {
        mailOptions.to = req.store.name +' <promo@'+req.store.domain+'>';
        mailOptions.bcc = toEmail;
        mailOptions.html = content + cancelSubcription( req.store.link );
    }

    var api_key, domainUrl;
    if(req.store.seller.mailgun){
        api_key = req.store.seller.mailgun.api_key||null;
        domainUrl = req.store.seller.mailgun.domain||null;
    }
    var d = new Date();
    var n = d.getMonth()+1;
    if(!api_key || !domainUrl){
        //console.log(req.store.mailData)
        if(req.store.mailData && req.store.mailData.month &&
            req.store.mailData.month==n
            && req.store.mailData.quantity>500){
            var error=new Error('Превышен лимит количества писем в месяц')
            return cb(error)
        }


        if(toEmail.length && toEmail.length>100){
            toEmail.length=100;
        }
        api_key ='key-cf6f807e996ef54aec2c8878c8fbb71b';
        domainUrl = 'gmall.io';
    }
    /*console.log(api_key,domainUrl)
    console.log('domain-',domainUrl)*/
    var mailgun = new Mailgun({apiKey: api_key,domain:domainUrl});
    var quantity=toEmail.length||1;


    if(mailOptions.bcc && mailOptions.bcc.length && mailOptions.bcc.length >999){

        var bcc=mailOptions.bcc;
        //mailOptions.bcc=bcc.splice(0,100);
        promiseWhile(function(){
            if(bcc.length){
                mailOptions.bcc=bcc.splice(0,999);
                return true;
            }else{
                return false;
            }
        },function(){
            return new Promise(function(resolve,reject){
                send(function(error, body){
                    /*console.log(error)
                    console.log(body)*/
                    if(error){reject()}else{resolve()}
                });
                /*setTimeout(function(){
                    console.log(mailOptions.bcc.length);
                    resolve();
                },500)*/
            })
        }).then(function(){
            //console.log('result');
            return res.json({msg:'ok',quantity:quantity});
        }).catch(function(err){
            return res.json({error:err});
        })
        /*while(bcc.length){
            console.log(bcc.length);
            mailOptions.bcc=bcc.splice(0,999);
        }*/
    }else{
        send(function(error, body){
            if (cb && typeof cb =='function'){
                //console.log(error,body);
                return cb(error,{quantity:quantity})
            } else {
                if(error){
                    return res.json({error:error});
                }else{
                    return res.json({msg:'ok',quantity:quantity});
                }
            }
        });
    }
    function send(callback) {
        mailgun.messages().send(mailOptions, function (error, body) {
            callback(error, body)
        });
    }

}

exports.sendEmail=function(req,res,next){
    //console.log(req.body)

    sendEmail(req.body.from,req.body.email,req.body.subject,req.body.content,res,req,function(error,body){
        if(error){
            console.log(error);
            return next(error);
        }else{
            console.log("Message sent: " + body);
            res.json({msg:'ok'});
        }
    });
}
exports.sendEmails=function(req,res,next){
    //console.log(req.body.lists)
    Promise.resolve()
        .then(function(){
            var query={store:req.store._id}
            return new Promise(function(resolve,reject){
                User.find(query).select('email data').exec(function(err,users){
                    if(err){return reject(err)}
                    users=users.filter(function(user){
                        if(!user.data[req.store._id].subscribtion){return false;}
                        if(req.body.lists && req.body.lists.length){
                            if(!user.data[req.store._id].list){return false;}
                            if(user.data[req.store._id].list.length){
                                for(var i=0,l=user.data[req.store._id].list.length;i<l;i++){
                                    var j=user.data[req.store._id].list[i];
                                    if(req.body.lists.indexOf(j)>-1){
                                        return true;
                                    }
                                }
                            }
                        } else {
                            return true
                        }
                    })

                    users=users.map(function(e){return e.email})
                    resolve(users)
                })
            })
        })
        .then(function(users){
            //console.log(users)
            var from= '<promo@'+req.store.domain+'>';
            //console.log(from)
            sendEmail(from,users,req.body.subject,req.body.content,res,req,function(error,body){
                if(error){
                    //console.log(error);
                    return next(error);
                }else{
                    //console.log("Message sent: " + JSON.stringify(body));
                    res.json({msg:'ok',quantity:body.quantity});
                }
            });


        })
        .catch(function(err){
            return next(err)
        })

}
function transform(){
    function saveUser(user,newUser) {
        return new Promise(function(resolve,reject){
            //return resolve()
            if(newUser){
                user.save(function(err){
                    if(err){reject(err)}else{resolve()}
                })
            }else{
                var o ={date:user.date,subscroption:user.subscription,visits:user.visits,list:user.list,store:user.store}
                User.update({_id:user._id},{$set:o},function(err){
                    if(err){reject(err)}else{resolve()}
                })
            }

        })
    }
    /*function saveUpdate(user,data) {
        return new Promise(function(resolve,reject){
            User.update(function(err){
                if(err){reject(err)}else{resolve()}
            })
        })
    }*/
    User.find(function(err,users) {
        async.eachSeries(users, function(user, cb) {
            //if(user.email!='igorchugurov@gmail.com'){return cb()}
            /*console.log(Object.keys(user.data));
            var keys = Object.keys(user.data);*/
            var actions=[];
            var i=0;
            var uu=user.toObject()
           /* console.log(uu.data,uu.stores)
            return;*/
            for (var key in uu.data){
                if(!uu.data[key]){
                    uu.data[key]={date:Date.now(),visits:1,subscription:true,list:null}
                }
                if(!uu.stores || !uu.stores[key]){
                    console.log('not ',key)
                    continue;
                }
                var u=uu.data[key]

                var ps=uu.stores[key];
                //console.log(user.data[key])
                if(!i){
                    i++;
                    //первый
                    uu.store=key;
                    uu.date=u.date;
                    uu.visits=u.visits;
                    uu.list=u.list;
                    uu.subscription=u.subscribtion;
                    uu.password=ps;
                    uu.transform=true;
                    console.log(i,uu.email,key,uu.store)
                    actions.push(saveUser(uu))
                }else{
                    //continue;

                    i++;
                    var userN={};
                    userN.store=key;
                    userN.profile=user.profile;
                    userN.email=user.email;
                    userN.name=user.name;
                    userN.seller=user.seller;
                    userN.order=user.order;
                    userN.role=user.role;
                    userN.coupons=user.coupons;

                    userN.date=u.date;
                    userN.visits=u.visits;
                    userN.list=u.list;
                    userN.subscription=u.subscribtion;
                    userN.password=ps;
                    userN.provider = 'local';
                    userN.transform=true;
                    var newUser = new User(userN);
                    newUser.password=ps;
                    console.log(i,newUser.email,key,newUser.store)
                    actions.push(saveUser(newUser,true))
                }

            }
            //return cb(i)
            Promise.all(actions).then(function(){
                console.log('in all then i- ',i)
                cb(null,i)
            }).catch(function (err) {

                console.log(' all catch error ',user.email,err)
                cb()
            })

        }, function(err,res){
            console.log('after all ',err,res)
        });
    })

}

transform()









