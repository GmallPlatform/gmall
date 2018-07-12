'use strict';
var domain = require('domain');
var request = require('request');
var moment = require('moment');
var config = require('../../user/config/config');
var emailService =  require('../../user/controllers/email');
var emailContent = require('../../user/controllers/emailContent');
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;

var User = mongoose.model('User');
var Store = require('../../user/controllers/store');
var jwt = require('jwt-simple');

var lang={
    subscription:{ru:'подписка',uk:'подписка',en:'sub',de:'subscription'},
    subscriptionIs:{ru:'На такой Email уже оформлена подписка.',uk:'На такой Email уже оформлена подписка.',
        en:'This email is already in use',de:'Diese E-Mail ist bereits im Einsatz'},
    repeatMailForConfirm:{ru:'Перейдите по ссылке в письме для подтверждения email.',uk:'Перездите по ссылке в письме для подтверждения email.',
        en:'Follow the link to confirm your e-mail',de:'Use link in mail for confirm email'},
    letterWithButton:{ru:'На него отправлено письмо с кнопкой для авторизации.',uk:'На него отправлено письмо с кнопкой для авторизации.',
        en:'this email was sent a letter with a button to login.',de:'Diese E-Mail wurde ein Brief mit einem Knopf zum Login gesendet.'},
    enterButton:{ru:'кнопка входа',uk:'кнопка входа',en:'enter button',de:'Login-Taste'},
    letterSent:{ru:'На указанный адрес отправлено письмо.',uk:'На указанный адрес отправлено письмо.',
        en:'sent a letter to the email',de:'einen Brief an die E-Mail gesendet'},
    wrongEmail:{ru:'Неверный email и/или пароль!!!',uk:'Неверный email и/или пароль',
        en:'Invalid email and / or password',de:'Ungültige E-Mail und / oder Passwort'},
}



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

exports.createJWT=createJWT;

exports.repeatMailForConfirm=function (req,res,next) {
    var d = domain.create();
    d.on('error', function(error) {
        next(error);
    });
    d.run(function() {
        var content=emailContent.repeatMailForConfirm(req.store,req.user);
        Promise.resolve()
            .then(function () {
                return sendEmail(req,req.user.email,lang.repeatMailForConfirm[req.store.lang],content)

            })
            .then(function () {
                var msg=lang.repeatMailForConfirm[req.store.lang];

                return res.status(200).send({ message: msg });
            })
            .catch(function (err) {
                next(err)
            })


    })




}

exports.signup=function(req, res,next) {
    var d = domain.create();
    d.on('error', function(error) {
        next(error);
    });
    d.run(function() {
        var newUser,password,token;
        if(!req.store){
            var error = new Error('не задан магазин')
            return next(error)
        }

        User.findOne({$and:[{ email: req.body.email.toLowerCase() },{store:req.store._id}]}, function(err, existingUser) {
            /*console.log('existingUser ',existingUser)
            console.log(req.store.bonusForm)*/
            var stores=[];
            if (existingUser) {
                //обновляем дополнительную информацию
                //console.log(req.body);
                let added;
                if(req.body.addInfo && typeof req.body.addInfo=='object'){
                    if(!existingUser.addInfo){existingUser.addInfo={}}
                    for(let key in req.body.addInfo){
                        if(req.store.bonusForm && req.store.bonusForm.fields && req.store.bonusForm.fields.length){
                            let d = req.store.bonusForm.fields.getOFA('name',key)
                            if(d){
                                if(!existingUser.addInfo[key]){
                                    added=true;
                                    existingUser.addInfo[key]=req.body.addInfo[key]
                                }else{
                                   if(d.multiple){
                                       added=true;
                                       existingUser.addInfo[key] +=','+req.body.addInfo[key]
                                   }
                                }
                            }
                        }
                    }

                }
                if(added){
                    //console.log(existingUser.addInfo);
                    User.update({_id:existingUser},{$set:{addInfo:existingUser.addInfo}},function (err,result) {
                        if(err){return next(err)}
                        res.status(200).send({ token: 'update' ,message: 'данные обновлены'})
                    })
                    return;

                }
                // отправляем письмо с кнопкой входа
                token=createJWT(existingUser);
                existingUser=existingUser.toObject()
                delete existingUser.password
                //console.log('existingUser.password',existingUser.password)
                var content=emailContent.subscription(req.store,existingUser,'local',token,true);// true - means that is not first subscribe
                //console.log('content')

                Promise.resolve()
                    .then(function () {

                        return sendEmail(req,existingUser.email,lang.subscriptionIs[req.store.lang],content)

                    })
                    .then(function () {
                        var msg=lang.subscriptionIs[req.store.lang];
                        if(!req.store.cabinetNot){
                            msg+=lang.letterWithButton[req.store.lang];
                        }
                        return res.status(200).send({ message: msg });
                    })

            }else{
                signupUser(req,res,next)
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
    var d = domain.create();
    d.on('error', function(error) {
        next(error);
    });
    d.run(function() {
        User.findOne({$and:[{ email: req.body.email.toLowerCase() },{store:req.store._id}]}, function(err, existingUser) {
            if (existingUser) {
                return res.send({ _id : existingUser._id });
            }else{
                signupUser(req,res,next)
            }
        });
    });
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    //return true;
}



function sendEmail(req,email,subject,content){
    let name= req.store.name||req.store.domain;
    var from = name+'<info@'+req.store.domain+'>';
    return emailService.sendEmail(from,email,subject,content,req.store)
}
function signupUser(req,res,next){
    var newUser,password,token;
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
                req.body.store=req.store._id;
                req.body.date=Date.now();
                req.body.subscription=true;
                req.body.visits=1;
                req.body.list=null;
                if(req.body.profile && typeof  req.body.profile == 'string'){
                    try{
                        req.body.profile=JSON.parse(req.body.profile)
                    }catch(err){}
                }
                newUser = new User(req.body);
                newUser.provider = 'local';
                //console.log(req.body)


                return new Promise(function(resolve,reject){
                    newUser.save(function(err){
                        if(err){reject(err)}else{resolve()}
                        token=createJWT(newUser);
                        return res.send({ token: token });
                    })
                })

            }
        })
        .then(function(){
            var user = newUser.toObject()
            user.password=password;
            var content=emailContent.subscription(req.store,user,'local',token);
            return sendEmail(req,user.email,lang.subscription[req.store.lang],content)
        })

        .catch(function(err){
            //console.log(err)
            return next(err);
        })
}

/*
 |--------------------------------------------------------------------------
 | Log in with Email
 |--------------------------------------------------------------------------
 */
exports.login=function(req, res,next) {
    //console.log(req.body)
    if(req.body.email){
        req.body.email=req.body.email.toLowerCase();
    }
    if(!req.store){
        var error = new Error('не задан магазин')
        return next(error)
    }
    var q={ email: req.body.email,store:req.store._id }
    //console.log(q)
    User.findOne(q, function(err, user) {
        //console.log(user)
        if (!user) {
            return res.status(401).send({ message: lang.wrongEmail[req.store.lang] });
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
            //console.log(req.body.password,isMatch)
            if (!isMatch) {
                return res.status(401).send({ message: lang.wrongEmail[req.store.lang] });
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
    console.log('/auth/facebook')
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: req.store.fb.secret,
        redirect_uri: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {

        //console.log(accessToken.error)
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
            //console.log('!!!!',profile)
            //return;
            //console.log(req.header('Authorization'))
            if(profile.email){
                profile.email=profile.email.toLowerCase()
            }


            User.findOne({$and:[{store:req.store._id},{ facebook: profile.id }]}, function(err, existingUser) {
                //console.log('existingUser',existingUser)
                if (existingUser) {
                    var token = createJWT(existingUser);
                    return res.send({ token: token });
                }else{
                    User.findOne({$and:[{store:req.store._id},{ email:  profile.email}]}, function(err, existingUser) {
                        if (existingUser) {
                            var token = createJWT(existingUser);
                            existingUser.facebook=profile.id;
                            existingUser.confirmEmail=true;
                            existingUser.save();
                            return res.send({ token: token });
                        }else{
                            let newUser = {store:req.store._id,profile:{fio:profile.name},name:profile.first_name,email:profile.email,
                                facebook :profile.id,
                                confirmEmail:true,
                                img : 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                            };
                            //console.log('newUser',newUser)
                            var user = new User(newUser);
                            user.save(function(err,result) {
                                //console.log(err,result)
                                var token = createJWT(user);
                                res.send({ token: token });
                            });
                        }
                    })
                }
            });


            return;

            if (req.header('Authorization')) {
                //console.log('!!!!',profile)

                User.findOne({$and:[{store:req.store._id},{ facebook: profile.id }]}, function(err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, req.store.fb.secret);
                    User.findById(payload.sub, function(err, user) {
                        if (!user) {
                            return res.status(400).send({ message: 'User not found' });
                        }
                        user.facebook = profile.id;
                        user.img = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
                        user.profile.fio = user.profile.fio || profile.name;
                        user.save(function() {
                            var token = createJWT(user);
                            res.send({ token: token });
                        });
                    });
                });
            } else {
                // Step 3. Create a new user account or return an existing one.
                console.log('step 3')
                User.findOne({$and:[{store:req.store._id},{ facebook: profile.id }]}, function(err, existingUser) {
                    console.log('existingUser',existingUser)
                    if (existingUser) {
                        var token = createJWT(existingUser);
                        return res.send({ token: token });
                    }else{
                        User.findOne({$and:[{store:req.store._id},{ email:  profile.email}]}, function(err, existingUser) {
                            if (existingUser) {
                                var token = createJWT(existingUser);
                                existingUser.facebook=profile.id;
                                existingUser.save();
                                return res.send({ token: token });
                            }else{
                                let newUser = {store:req.store._id,profile:{fio:profile.name},name:profile.first_name,email:profile.email,
                                    facebook :profile.id,
                                    img : 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                                };
                                console.log('newUser',newUser)
                                var user = new User(newUser);
                                user.save(function(err,result) {
                                    //console.log(err,result)
                                    var token = createJWT(user);
                                    res.send({ token: token });
                                });
                            }
                        })
                    }
                });
            }
        });
    });
}
/*
 |--------------------------------------------------------------------------
 | Login with Google
 |--------------------------------------------------------------------------
 */
exports.google=function(req,res){
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: req.store.gl.secret,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };


    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
        //console.log(token)
        var accessToken = token.access_token;
        var headers = { Authorization: 'Bearer ' + accessToken };


        // Step 2. Retrieve profile information about the current user.
        request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {

            if (profile.error) {
                return res.status(500).send({message: profile.error.message});
            }

            if(profile.email){
                profile.email=profile.email.toLowerCase()
            }
            User.findOne({$and:[{store:req.store._id},{ google: profile.sub }]}, function(err, existingUser) {
                //console.log('existingUser',existingUser)
                if (existingUser) {
                    var token = createJWT(existingUser);
                    return res.send({ token: token });
                }else{
                    User.findOne({$and:[{store:req.store._id},{ email:  profile.email}]}, function(err, existingUser) {
                        //console.log('existingUser 434' .existingUser)
                        if (existingUser) {
                            var token = createJWT(existingUser);
                            existingUser.google = profile.sub;
                            existingUser.confirmEmail = true;
                            existingUser.save();
                            return res.send({ token: token });
                        }else{
                            let newUser = {store:req.store._id,profile:{fio:profile.name},name:profile.name,email:profile.email,
                                google : profile.sub,
                                confirmEmail:true,
                                img : profile.picture.replace('sz=50', 'sz=200')
                            };
                            //console.log('newUser',newUser)
                            var user = new User(newUser);
                            user.save(function(err,result) {
                                //console.log(err,result)
                                var token = createJWT(user);
                                res.send({ token: token });
                            });
                        }
                    })
                }
            });
            return;


            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                //console.log('!!!!',profile)



                User.findOne({$and:[{store:req.store._id},{ google: profile.sub }]}, function(err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, req.store.gl.secret);
                    User.findById(payload.sub, function(err, user) {
                        if (!user) {
                            return res.status(400).send({ message: 'User not found' });
                        }
                        user.google = profile.sub;
                        user.img = user.picture || profile.picture.replace('sz=50', 'sz=200');
                        user.displayName =  profile.name;
                        user.save(function() {
                            var token = createJWT(user);
                            res.send({ token: token });
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({$and:[{store:req.store._id},{ google: profile.sub }]}, function(err, existingUser) {
                    if (existingUser) {
                        return res.send({ token: createJWT(existingUser) });
                    }
                    let newUser = {store:req.store._id,profile:{fio:profile.name},name:profile.name,email:profile.email,
                            google : profile.sub,
                        img : profile.picture.replace('sz=50', 'sz=200')
                    };
                    console.log(newUser)
                    var user = new User(newUser);
                    user.save(function(err) {
                        var token = createJWT(user);
                        res.send({ token: token });
                    });
                });
            }
        });
    });
};

/*
 |--------------------------------------------------------------------------
 | Login with VK
 |--------------------------------------------------------------------------
 */
exports.vkontakte=function(req,res){
    //console.log(req.body)
    var accessTokenUrl = 'https://oauth.vk.com/access_token';

    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: req.store.vk.secret,
        redirect_uri: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {

        //console.log(accessToken)
        //var accessToken = token.access_token;
        var headers = { Authorization: 'Bearer ' + accessToken.access_token };
        var graphApiUrl = 'https://api.vk.com/method/users.get?user_id=' + accessToken.user_id +'&access_token=' + accessToken.access_token;
        // Step 2. Retrieve profile information about the current user.
        request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
            profile=profile.response
            profile=(profile.length && profile[0])?profile[0]:profile
            if(!profile.uid){
                return res.status(400).send({ message: 'User not found' });
            }
            //console.log(response,profile)
            //console.log("req.header('Authorization')",req.header('Authorization'))
            /*console.log(profile)
            return;*/
            if (profile.error) {
                return res.status(500).send({message: profile.error.message});
            }
            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                //console.log('!!!!',profile)



                User.findOne({$and:[{store:req.store._id},{ vk: profile.uid }]}, function(err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({ message: 'There is already a vk account that belongs to you' });
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, req.store.gl.secret);
                    User.findById(payload.sub, function(err, user) {
                        if (!user) {
                            return res.status(400).send({ message: 'User not found' });
                        }
                        user.vk = profile.uid;
                        user.name =  user.name|| profile.first_name;
                        user.save(function() {
                            var token = createJWT(user);
                            res.send({ token: token });
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                //console.log('profile.uid',profile.uid)
                User.findOne({$and:[{store:req.store._id},{ vk: profile.uid}]}, function(err, existingUser) {
                    //console.log('existingUser',existingUser)
                    if (existingUser) {
                        return res.send({ token: createJWT(existingUser) });
                    }
                    let newUser = {store:req.store._id,
                        profile:{fio:profile.first_name+((profile.last_name)?profile.last_name:' '+profile.last_name)},
                        name:profile.first_name,
                        email:accessToken.email,
                        vk : profile.uid,
                    };
                    console.log(newUser)
                    var user = new User(newUser);
                    user.save(function(err) {
                        var token = createJWT(user);
                        res.send({ token: token });
                    });
                });
            }
        });
    });
};


/*
 |--------------------------------------------------------------------------
 | GET /api/me
 |--------------------------------------------------------------------------
 */
exports.me= function(req, res) {
    //console.log(req.url)
    var user=req.user || null;
    //console.log(user.email)

    if(!user.visits){
        user.visits=1;
    }else{
        user.visits++;
    }
    mongoose.model('User').update({_id:user._id},{$set:{visits:user.visits}},function(err,result){
        //console.log(err,result)
    })
    delete user.password;
    delete user.visits;
    delete user.order;
    delete user.date;
    //delete user.subscription;
    delete user.role;
    if(!user.profile){user.profile={}}
    res.send(user);

};
/*
 |--------------------------------------------------------------------------
 | get permission for admin-------------------------------------------------
 */
exports.permission=function(req, res) {
    res.send({user: req.user});
}

exports.getEnterButton=function(req, res) {
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
                return User.findOne({$and:[{ email: req.body.email.toLowerCase() },{store:req.store._id}]})

            })
            .then(function(locUser){
                if (locUser) {
                    user=locUser;
                    newPswd=shuffle(7);
                    user.password=newPswd;
                    return user.newPswd(newPswd)
                }else{
                    throw 'Такой email не зарегестрирован.';
                }
            })
            .then(function(){
                console.log('newPswd ',newPswd)
                //user.stores[req.store._id]=user.password;
                return User.update({_id:user._id},{$set:{password:user.password}})
            })
            .then(function(){
                // для письма не хешированный пароль
                user.password=newPswd;
            })
            .then(function(){
                return req.store;
            })
            .then(function(store){
                if(store && user){
                    user.frame=req.body.frame;
                    // отправляем письмо с кнопкой входа
                    var token=createJWT(user);
                    //console.log('????')
                    var content=emailContent.subscription(store,user,'local',token,true);// true - means that is not first subscribe
                    //console.log('отправляем письмо с кнопкой входа')
                    return sendEmail(req,user.email,lang.enterButton[req.store.lang],content)
                } else{
                    throw 'Что-то пошло не так.'
                }

            })
            .then(function () {
                return res.json({message:lang.letterSent[req.store.lang]})
            })
            .catch(function(err){
                console.log(err)
                return res.status(409).send({ message:err});
            })
    });
}


