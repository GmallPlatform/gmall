'use strict';
var Mailgun = require('mailgun-js');
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.sendEmails=function(req,res,next){
    Promise.resolve()
        .then(function(){
            if(req.body.role){
                var query={$and:[{subscribe:true},{store:req.store._id},{role:req.body.role}]}
            }else{
                var query={$and:[{subscribe:true},{store:req.store._id}]}
            }
            return User.find(query ).select('email').exec()
        })
        .then(function(users){
            if(!users || !users.length){
                throw 'нет подписчиков'
            }else{


                if(!req.store.seller.mailgun || !req.store.seller.mailgun.api_key || !req.store.seller.mailgun.domain){
                    var error = new Error('не удалось отправить письмо на email. Воспользуйтесь другим видом связи(телефон, чат)');
                    return next(error)
                }
                var api_key =req.store.seller.mailgun.api_key;
                var domain = req.store.seller.mailgun.domain;
                var form=req.store.name;
                var mailgun = new Mailgun({apiKey: api_key, domain: domain});
                var data = {
                    from: form+'<promo@'+domain+'>',
                    to:'igorchugurov@gmail.com',
                    bcc:['ihorchugurov@gmail.com','vikachugurova@gmail.com'],
                    //Subject and text data
                    subject: req.body.subject,
                    html: req.body.content}
                /*data.to=users.unshift();
                if(users.length){data.bcc=users;}*/
                //Invokes the method to send emails given the above data with the helper library
                mailgun.messages().send(data, function (error, body) {
                    if(error){
                        return next(error);
                    }else{
                        res.json({msg:'ok',body:body});
                    }
                });
            }
        })
        .catch(function(err){
            next(err)
        })





   // return res.json({})
}


exports.sendEmail=function(from,toEmail,subject,content,mailGunData,cb){
    //console.log(from,toEmail,subject,content,mailGunData)
    var api_key =mailGunData.api_key;
    var domain = mailGunData.domain;
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});
    var data = {
        from: from,
        to:toEmail,
        subject: subject,
        html: content}
    mailgun.messages().send(data, function (error, body) {
        //console.log(error,body)
        if(cb && typeof cb=='function'){
            cb(error,body)
        }
    });
}

function sendEmail(from,toEmail,subject,content,res,req,cb){
    //var  config = require(pathC);
    //if(!req.store.seller.mail)
    if(!req.store.seller.mailgun || !req.store.seller.mailgun.api_key || !req.store.seller.mailgun.domain){
        var error = new Error('не удалось отправить письмо на email. Воспользуйтесь другим видом связи(телефон, чат)');
        if(cb){return cb(error)}else{ return res.json({})}
    }
    var api_key =req.store.seller.mailgun.api_key;
    var domain = req.store.seller.mailgun.domain;
    /*var api_key='key-cf6f807e996ef54aec2c8878c8fbb71b';
    var domain='gmall.io';*/
    var mailgun = new Mailgun({apiKey: api_key,domain:domain});
    var data = {//Specify email data
        from: from,
        //The email to contact
        to: toEmail,
        //Subject and text data
        subject: subject,
        html: content}
    mailgun.messages().send(data, function (error, body) {
        //If there is an error, render the error page
        if (cb && typeof cb =='function'){
            //console.log(error,body);
            return cb(error,body)
        } else {
            if(error){
                //console.log(error);
                return next(error);
            }else{
                //console.log("Message sent: " + body);
                return res.json({msg:'ok'});
            }
        }

    });
}
