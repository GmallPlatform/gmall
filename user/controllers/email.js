'use strict';
var Mailgun = require('mailgun-js');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var User = mongoose.model('User');
exports.sendEmail=function(from,toEmail,subject,content,store,cb){
    var mailOptions = {
        from: from,
        //The email to contact
        to: toEmail,
        //to:'email@gmail.io',
        //bcc:['igorchugurov@gmail.com','vikachugurova@gmail.com'],
        subject: subject,
        html: content
    }
    /*if(toEmail.length) {
        mailOptions.to = //toEmail[0]
            'promo@'+store.domain;
        mailOptions.bcc = toEmail;
        mailOptions.html = content + cancelSubcription( store.link );
    }*/
    var api_key, domainUrl;
    if(store.seller.mailgun){
        api_key = store.seller.mailgun.api_key||null;
        domainUrl = store.seller.mailgun.domain||null;
    }
    /*console.log('api_key-',domainUrl)
    console.log('domain-',domainUrl)*/
    var d = new Date();
    var n = d.getMonth()+1;
    if(!api_key || !domainUrl){
        //console.log(store.mailData)
        /*if(store.mailData && store.mailData.month &&
            store.mailData.month==n
            && store.mailData.quantity>500){
            var error=new Error('Превышен лимит количества писем в месяц')

            return cb(error)
        }


        if(toEmail.length && toEmail.length>100){
            toEmail.length=100;
        }*/
        api_key ='key-cf6f807e996ef54aec2c8878c8fbb71b';
        domainUrl = 'gmall.io';
    }
    /*console.log('api_key-',domainUrl)
     console.log('domain-',domainUrl)*/
    var mailgun = new Mailgun({apiKey: api_key,domain:domainUrl});
    var quantity=toEmail.length||1;
    return new Promise(function (rs,rj) {
        mailgun.messages().send(mailOptions, function (error, body) {
            if(error){rj(error)}else{rs()}
        });
    })

}

