'use strict';
var domain = require('domain');
var request = require('request');
var moment = require('moment');
var config = require('../../user/config/config');
var emailService =  require('../../user/controllers/email');
var emailContent = require('../../user/controllers/emailContent');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Store = require('../../user/controllers/store');
var jwt = require('jwt-simple');




function shuffle(len) {
    var string=
        //'abcdefghijklmnopqrstuvwxyzQAZWSXEDCRFVTGBYHNUJMIKOLP1234567890';
        '12345678901234567892101234567890123456789012345678901234567890';
    var parts = string.split('');
    for (var i = parts.length; i > 0;) {
        var random = parseInt(Math.random() * i);
        var temp = parts[--i];
        parts[i] = parts[random];
        parts[random] = temp;
    }
    return parts.join('').substring(0,len);
}
/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(100, 'days').unix()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
}
/*
 |--------------------------------------------------------------------------
 | Create Email and Password Account
 |--------------------------------------------------------------------------
 */
exports.signup=function(req, res,next) {
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        //return true;
    }
    function sendEmail(email,subject,content){
        var mailGunData={
            api_key:req.store.seller.mailgun.api_key,
            domain:req.store.seller.mailgun.domain
        }
        var from = req.store.name+'<info@'+req.store.domain+'>';
        emailService.sendEmail(from,email,subject,content,mailGunData)
    }
    var d = domain.create();
    d.on('error', function(error) {
        next(error);
    });
    d.run(function() {
        var newUser,password,token;

        User.findOne({ email: req.body.email.toLowerCase() }, function(err, existingUser) {
           //console.log('existingUser ',existingUser)
            if(existingUser){
                var stores = existingUser.store.map(function(el){return el})
                if(!existingUser.stores){existingUser.stores={}}
                stores=Object.keys(existingUser.stores);
            }
            //console.log('stores, req.store._id ',stores, req.store)
            var isStore=req.store && req.store._id;
            var isInStore=(isStore && stores && stores.indexOf(req.store._id)>-1)?true:false;
            if (existingUser && isInStore) {
                // отправляем письмо с кнопкой входа
                Promise.resolve()
                    .then(function(){
                        //return Store.findById(req.store._id );
                        return req.store
                    })
                    .then(function(store){
                        if(store){
                            /*var protocol=(store.protocol)?store.protocol:'http://'
                            store.link=protocol+req.headers.host;*/
                            token=createJWT(existingUser);
                            var content=emailContent.subscription(store,existingUser,'local',token,true);// true - means that is not first subscribe
                            sendEmail(existingUser.email,'кнопка входа',content)
                        }

                        //return res.json({content:content})
                    } )
                    .then(function(){
                        return res.status(409).send({ message: 'Email уже используется. На него отправлено письмо с кнопкой для авторизации.' });
                    })
            }else{
                var data={date:Date.now(),subscribtion:true,visits:1,list:null}
                Promise.resolve()
                    .then(function(){
                        if(!validateEmail(req.body.email)){
                            var err= new Error('указанный e-mail не формате.')
                            throw err;
                        } else{
                            if(req.body.name){
                                if(req.body.name.length<3){
                                    req.body.name='';
                                }else {
                                    req.body.name=req.body.name.substring(0,30);
                                }

                            }
                            if(req.body.password){
                                if(req.body.password.length<6){
                                    req.body.password=null;
                                }else{
                                    req.body.password=req.body.password.substring(0,30)
                                }
                            }
                            if(!req.body.name){req.body.name=req.body.email.split('@' )[0]}
                            if (!req.body.password){
                                req.body.password=shuffle(7);
                            }
                            password = req.body.password;// password for email
                            if (isStore){
                                req.body.store=[req.store._id];
                            }
                            newUser = new User(req.body);
                            newUser.provider = 'local';
                            return newUser
                        }
                    })
                    .then(function(){
                        //console.log(2)
                        return new Promise(function(resolve,reject){
                            if(existingUser ){
                                //if(!isStore){return}
                                existingUser.store.push(req.store._id)
                                if(!existingUser.data || typeof existingUser.data!='object'){
                                    existingUser.data={};
                                }
                                if(!existingUser.stores || typeof existingUser.stores!='object'){
                                    existingUser.stores={};
                                }
                                existingUser.stores[req.store._id]='';
                                existingUser.data[req.store._id]=data;
                                User.update({_id:existingUser._id},{$set:{
                                    store:existingUser.store,data:existingUser.data,
                                    stores:existingUser.stores,}},function(){
                                    if(err){reject(err)}else{resolve()}
                                })
                            }else{
                                newUser.data={};
                                newUser.data[req.store._id]=data;
                                console.log(newUser)
                                newUser.save(function(err){
                                    if(err){reject(err)}else{resolve()}
                                })
                            }
                        })
                    })
                    .then(function(){
                        //console.log('newUser._id ',newUser._id)
                        if(existingUser){
                            token=createJWT(existingUser);
                        }else{
                            token=createJWT(newUser);
                        }
                        //console.log('token ',token)
                        return res.send({ token: token });

                    })
                    .then(function(){
                        //return Store.findById(req.store._id );
                        return req.store;
                    })
                    .then(function(store){
                        //console.log('store 3')
                        /*var protocol=(store.protocol)?store.protocol:'http://'
                        store.link=protocol+req.headers.host;*/
                        if(existingUser){
                            var user = existingUser.toObject()
                            delete user.password;
                        }else{
                            var user = newUser.toObject()
                            user.password=password;
                        }
                        if(isStore){
                            var content=emailContent.subscription(store,user,'local',token);
                            //console.log(content)
                            sendEmail(user.email,'подписка',content)
                        }
                    })
                    .catch(function(err){
                        //console.log(err)
                        return next(err);
                    })
            }
        });
    });
}

/*
 |--------------------------------------------------------------------------
 | Create Email and Password Account from order
 |--------------------------------------------------------------------------
 */
exports.signupOrder=function(req, res,next) {
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        //return true;
    }
    function sendEmail(email,subject,content){
        if(req.store.seller.mailgun && req.store.seller.mailgun.api_key && req.store.seller.mailgun.domain){
            var mailGunData={
                api_key:req.store.seller.mailgun.api_key,
                domain:req.store.seller.mailgun.domain
            }
            var from = req.store.name+'<info@'+req.store.domain+'>';
            emailService.sendEmail(from,email,subject,content,mailGunData)
        }
    }
    var d = domain.create();
    d.on('error', function(error) {
        next(error);
    });
    d.run(function() {
        var newUser,password,token;

        User.findOne({ email: req.body.email.toLowerCase() }, function(err, existingUser) {
            if(existingUser){
                var stores = existingUser.store.map(function(el){return el.toString()})
            }
            //console.log(stores, req.store._id)
            if (existingUser && stores.indexOf(req.store._id)>-1) {
                return res.send({ _id : existingUser._id });
            }else{
                var data={date:Date.now(),subscribtion:true,visits:1,list:null}
                Promise.resolve()
                    .then(function(){
                        if(existingUser){return}
                        if(!validateEmail(req.body.email)){
                            var err= new Error('указанный e-mail не формате.')
                            throw err;
                        } else{
                            if(req.body.name){
                                if(req.body.name.length<3){
                                    req.body.name='';
                                }else {
                                    req.body.name=req.body.name.substring(0,30);
                                }

                            }
                            if(req.body.password){
                                if(req.body.password.length<6){
                                    req.body.password=null;
                                }else{
                                    req.body.password=req.body.password.substring(0,30)
                                }
                            }
                            if(!req.body.name){req.body.name=req.body.email.split('@' )[0]}
                            if (!req.body.password){
                                req.body.password=shuffle(7);
                            }
                            password = req.body.password;// password for email
                            req.body.store=[req.store._id];
                            newUser = new User(req.body);
                            newUser.provider = 'local';
                            return newUser
                        }
                    })
                    .then(function(){
                        return new Promise(function(resolve,reject){
                            if(existingUser){
                                existingUser.store.push(req.store._id)
                                if(!existingUser.data || typeof existingUser.data!='object'){
                                    existingUser.data={};
                                }
                                existingUser.data[req.store._id]=data;
                                User.update({_id:existingUser._id},{$set:{
                                    store:existingUser.store,data:existingUser.data}},function(){
                                    if(err){reject(err)}else{resolve()}
                                })
                            }else{
                                newUser.data={};
                                newUser.data[req.store._id]=data;
                                newUser.save(function(err){
                                    if(err){reject(err)}else{resolve()}
                                })
                            }
                        })
                    })
                    .then(function(){
                        token=createJWT(newUser);
                        return res.send({ token: token });

                    })
                    .then(function(){
                        return Store.findById(req.store._id );
                    })
                    .then(function(store){
                        /*var protocol=(store.protocol)?store.protocol:'http://'
                        store.link=protocol+req.headers.host;*/
                        if(existingUser){
                            var user = existingUser.toObject()
                            delete user.password;
                        }else{
                            var user = newUser.toObject()
                            user.password=password;
                        }
                        var content=emailContent.subscription(store,user,'local',token);
                        sendEmail(user.email,'подписка',content)
                    })
                    .catch(function(err){
                        //console.log(err)
                        return next(err);
                    })
            }
        });
    });
}

/*
 |--------------------------------------------------------------------------
 | Log in with Email
 |--------------------------------------------------------------------------
 */
exports.login=function(req, res) {
    //console.log(req.body)
    if(req.body.email){
        req.body.email=req.body.email.toLowerCase();
    }
    User.findOne({ email: req.body.email }, '+password', function(err, user) {
        if (!user) {
            return res.status(401).send({ message: 'Неверный email и/или пароль' });
        }
        //console.log(user)
        user.storeId=req.store._id;
        if(!user.stores || !user.stores[user.storeId]){
            // нет подписки для этого магазина
            return res.status(401).send({ message: 'Неверный email и/или пароль' });
        }
        user.comparePassword(req.body.password,function(err, isMatch) {
            if (!isMatch) {
                return res.status(401).send({ message: 'Неверный email и/или пароль' });
            }
            res.send({ token: createJWT(user) });
        });
    });
}
/*
 |--------------------------------------------------------------------------
 | Login with Facebook
 |--------------------------------------------------------------------------
 */
exports.fb=function(req,res){
    //console.log('/auth/facebook')
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.FACEBOOK_SECRET,
        redirect_uri: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
        if (response.statusCode !== 200) {
            return res.status(500).send({ message: accessToken.error.message });
        }

        // Step 2. Retrieve profile information about the current user.
        request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
            if (response.statusCode !== 200) {
                return res.status(500).send({ message: profile.error.message });
            }
            //console.log("req.header('Authorization') ",req.header('Authorization'))
            //return;
            if (req.header('Authorization')) {

                User.findOne({ facebook: profile.id }, function(err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.TOKEN_SECRET);
                    User.findById(payload.sub, function(err, user) {
                        if (!user) {
                            return res.status(400).send({ message: 'User not found' });
                        }
                        user.facebook = profile.id;
                        user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
                        user.displayName = user.displayName || profile.name;
                        user.save(function() {
                            var token = createJWT(user);
                            res.send({ token: token });
                        });
                    });
                });
            } else {
                // Step 3. Create a new user account or return an existing one.
                //console.log('profile ',profile)
                User.findOne({ facebook: profile.id }, function(err, existingUser) {
                    if (existingUser) {
                        var token = createJWT(existingUser);
                        return res.send({ token: token });
                    }
                    //console.log('existingUser-',existingUser)
                    var user = new User({store:[req.store._id],name:profile.name,email:profile.email});
                    user.facebook = profile.id;
                    user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                    user.displayName = profile.name;
                    //console.log('user ',user)
                    user.save(function(err,result) {
                        //console.log(err,result)
                        var token = createJWT(user);
                        res.send({ token: token });
                    });
                });
            }
        });
    });
}
/*
 |--------------------------------------------------------------------------
 | GET /api/me
 |--------------------------------------------------------------------------
 */
exports.me= function(req, res) {
    //console.log(req.url)
    var user=req.user || null;
    //console.log(user.email)
    if(user){
        delete user.password;
        delete user.visits;
        delete user.order;
        delete user.date;
        delete user.subscribe;
        delete user.role;
    }
    //console.log('req.store._id in exports.me -',req.store)
    if(user){
        if(!user.data || typeof user.data!='object'){
            user.data={}
        }
        if(!user.data[req.store._id]){
            user.data[req.store._id]={date:Date.now(),subscribtion:true,visits:1,list:null};
        }else{
            user.data[req.store._id].visits++;
        }
        //console.log(user)
        mongoose.model('User').update({_id:user._id},{$set:{data:user.data}},function(err,result){
            //console.log(err,result)
        })
    }
    res.send(user);

};
/*
 |--------------------------------------------------------------------------
 | get permission for admin-------------------------------------------------
 */
exports.permission=function(req, res) {
    //console.log('dd');
    res.send({user: req.user });
    /*User.findOne({ email: req.body.email }, 'password', function(err, user) {
        if (!user) {
            return res.status(401).send({ message: 'Неверный email и/или пароль' });
        }
        //console.log(user)
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (!isMatch) {
                return res.status(401).send({ message: 'Неверный email и/или пароль' });
            }
            res.send({ token: createJWT(user) });
        });
    });*/
}

exports.getEnterButton=function(req, res) {
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        //return true;
    }
    function sendEmail(email,subject,content){
        var mailGunData={
            //api_key:'key-cf6f807e996ef54aec2c8878c8fbb71b',
            //domain:'gmall.io'
            api_key:req.store.seller.mailgun.api_key,
            domain:req.store.seller.mailgun.domain
        }
        var from = req.store.name+'<info@'+req.store.domain+'>';
        emailService.sendEmail(from,email,subject,content,mailGunData)
    }
    var d = domain.create();
    d.on('error', function(error) {
        next(error);
    });
    d.run(function() {
        var user,newPswd;
        Promise.resolve()
            .then(function(){
                if(!validateEmail(req.body.email)){
                    throw 'указанный e-mail не формате.';
                }
            })
            .then(function(){
                return User.findOne({ email: req.body.email } )

            })
            .then(function(res){
                //console.log('user',res)
                if (res) {
                    user=res;
                    newPswd=shuffle(7);
                    user.password=newPswd;
                    return user.newPswd()
                }else{
                    throw 'Такой email не зарегестрирован.';
                }
            })
            .then(function(){
                console.log('newPswd ',newPswd)
                return User.update({_id:user._id},{$set:{password:user.password}})
            })
            .then(function(){
                user.password=newPswd;
            })
            .then(function(){
                return req.store;
            })
            .then(function(store){
                if(store && user){
                    /*var protocol=(store.protocol)?store.protocol:'http://'
                    store.link=protocol+req.headers.host;*/
                    user.frame=req.body.frame;
                    // отправляем письмо с кнопкой входа
                    var token=createJWT(user);
                    //console.log('????')
                    var content=emailContent.subscription(store,user,'local',token,true);// true - means that is not first subscribe
                    //console.log('отправляем письмо с кнопкой входа')
                    sendEmail(user.email,'кнопка входа',content)
                    return res.json({message:'На указанный адрес отправлено письмо.'})
                } else{
                    throw 'Что-то пошло не так.'
                }

            })
            .catch(function(err){
                console.log(err)
                return res.status(409).send({ message:err});
            })
    });
}


