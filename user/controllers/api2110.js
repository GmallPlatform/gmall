'use strict';
var mongoose = require('mongoose');
var domain = require('domain');
var ObjectID = mongoose.Types.ObjectId;
var Mailgun = require('mailgun-js');
//var nodemailer = require("nodemailer");
var Excel = require('exceljs');
var User=mongoose.model('User')
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
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    //return true;
}
var validation = {
    isEmailAddress:function(str) {
        var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);  // returns a boolean
    },
    isNotEmpty:function (str) {
        var pattern =/\S+/;
        return pattern.test(str);  // returns a boolean
    },
    isNumber:function(str) {
        var pattern = /^\d+$/;
        return pattern.test(str);  // returns a boolean
    },
    isSame:function(str1,str2){
        return str1 === str2;
    }
};
function cancelSubcription(link){
    var s='<div style="clear: both;"></div><p><small>отписаться от рассылки можно <a style="color: #d58512;" href="'+link+'/unsubscription"> здесь</a>.<small></small></p>';
    return s;
}
function actUser(newUser,store){
    //console.log(newUser)
    return new Promise(
        function( resolve, reject ) {
            newUser.email=newUser.email.toLowerCase();
            User.findOne({$and:[{ email: newUser.email},{store:store}]}, function(err, existingUser) {
                console.log('newUser form promise',newUser.email)
                if(existingUser){
                    resolve()
                }else{
                    if(!validateEmail(newUser.email)){
                        resolve()
                    } else{
                        var user = new User(newUser);
                        user.password=shuffle(7);
                        user.provider = 'local';
                        user.store=store;
                        user.save(function(err){
                            //console.log(password,user)
                            console.log(user.email)
                            if(err){reject(err)}else{resolve()}
                        })
                    }
                }

            })
        }
    )



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
    //console.log(req.body)
    Promise.resolve()
        .then(function(){
            var query={store:req.store._id}
            return new Promise(function(resolve,reject){
                User.find(query).select('email subscription list').exec(function(err,users){
                    if(err){return reject(err)}
                    users=users.filter(function(user){
                        //console.log(user)
                        if(!user.subscription){return false;}
                        if(req.body.lists && req.body.lists.length){
                            if(!user.list){return false;}
                            if(user.list.length){
                                for(var i=0,l=user.list.length;i<l;i++){
                                    var j=user.list[i];
                                    if(req.body.lists.indexOf(j)>-1){
                                        return true;
                                    }
                                }
                            }else{
                                return false
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
            if(!users.length){throw 'список рассылки пуст'}
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
exports.unsubscription=function(req,res,next){
    //console.log(req.params);
    Promise.resolve()
        .then(function(){
            return new Promise(function(resolve,reject){
                if(!req.query.store){return reject('не задан магазин')}
                User.findOne({$and:[{store:req.query.store},{_id:req.params.id}]}).exec(function(err,user){
                    if(err){return reject(err)};
                    if(!user){return reject('нет такого аккаунта')}
                    //console.log(user.data[req.query.store])
                    if(user.subscription){
                        user.subscription=false;
                        //console.log(user.data[req.query.store])
                        User.update({_id:user._id},{$set:{data:user.subscription}},function(err,result){
                            //console.log(result)
                            if(err){return reject(err)};
                            res.json({})
                        })
                    }else{
                        res.json({})
                    }
                })
            })
        })
        .catch(function(err){
            return next(err)
        })

}
exports.createUser=function(req,res,next){
    //console.log(req.body);
    if(req.body.profile.fio){
        req.body.profile.fio=req.body.profile.fio.substring(0,70)
    }
    if(req.body.profile.phone){
        req.body.profile.phone=req.body.profile.phone.substring(0,20)
    }
    actUser(req.body,req.store._id)
        .then(function(result){
            res.json({})
        })
        .catch(function(err){
            next(err)
        })


}
exports.usersFileUpload=function(req,res,next){
    //http://stackoverflow.com/questions/28983424/make-angular-foreach-wait-for-promise-after-going-to-next-object
    //console.log(req.file);
    var permissionCountUsers=5000;
    var countUsers;
    var promises=[];
    if(req.file && req.file.filename){
        var workbook = new Excel.Workbook();
        Promise.resolve()
            .then(function(){
                return new Promise(function(resolve,reject){
                    User.count({store:req.query.store},function(err,c){
                        if(err){return reject(err)}
                        resolve(c)
                    })
                })

            })
            .then(function(c){
                console.log(c)
                countUsers=c;
                if(c>permissionCountUsers){
                    throw 'Очень много клиентов!!!'+permissionCountUsers+'+';
                }else{
                    return workbook.xlsx.readFile(req.file.path)
                }
            })
            .then(function(data) {
                // use workbook
                //console.log(data)
                var worksheet = workbook.getWorksheet(1);
                /*console.log('worksheet -',worksheet)
                console.log('worksheet.getRowsCount-',worksheet.getRowsCount());*/
                worksheet.eachRow(function(row, rowNumber) {
                    //if(rowNumber>50){return}
                    if(rowNumber!=1 && permissionCountUsers>(rowNumber+countUsers)){
                        var data ={profile:{}};
                        row.eachCell(function(cell, colNumber) {
                            var field,d;
                            if(typeof cell =='object'){
                                d=cell.text;
                            }else{
                                d=cell
                            }
                            if(colNumber==1){
                                data['email']=d.toLowerCase().trim();
                                var login=d.split('@')[0];
                                data.name=login;
                            }else if(colNumber==2){
                                data.profile.fio=d.trim().substring(0,70);
                            }else if(colNumber==3){
                                let ph = d.trim().substring(0,20);
                                try{
                                    if(ph && ph.length==12 && validation.isNumber(ph)){
                                        data.profile.phone=ph;
                                    }
                                }catch(err){}

                            }else if(colNumber==4){
                                data.profile.city=d.substring(0,100);
                            }/*else if(colNumber==5){
                                data.name=d.substring(0,20);
                            }*/

                            //console.log('Cell ' + colNumber + ' = ' + cell.value);
                        });

                        promises.push(data)
                        /*var promise=actUser(data,req.store._id)
                        promises.push(promise)*/
                    }


                    /*console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
                    row.eachCell(function(cell, colNumber) {
                        console.log('Cell ' + colNumber + ' = ' + cell.value);
                    });*/
                });
                return promises;
            })
            .then(function(data){
                //console.log(data)
                return new Promise(function(resolve,reject){
                    data.reduce(function(p, val) {
                        return p.then(function() {
                            return actUser(val,req.store._id)
                        });
                    }, Promise.resolve()).then(function(finalResult) {
                        resolve(data.length)
                    }, function(err) {
                        reject(err)
                    });
                })

                //return Promise.all(promises)
            })
            .then(function(results){
                res.json({count:results})
            })
            .catch(function(err){
                next(err)
            })
    }else{
        next(new Error('нечего загружать'))
    }

}

exports.getEntryUser=function (req,res,next) {

}

// domain error hendler enable  !!!!!!!!!!!!!!

exports.confirmEmail=function (req,res,next) {
    //console.log(req.params);
    if(!req.params.store || !req.params.user){return res.json({status:'error'})}

    try {
        var store = new ObjectID(req.params.store);
        var user = new ObjectID(req.params.user);
    } catch (err) {
        //console.log(err)
        return res.json({status:'error'})
    }

    User.findOne({$and:[{_id:req.params.user},{store:req.params.store}]},function(err,user){
        if(err){return res.json({status:'error'})};
        //console.log('user.confirmEmail-',user.confirmEmail)
        if(user.confirmEmail){
            return res.json({status:'ok'})
        }
        User.update({_id:user._id},{$set:{confirmEmail:true}},function(){
            if(err){
                res.json({status:'error'})
            }else{
                res.json({status:'ok'})
            }
        })
    })

}

exports.changePswd=function (req,res,next){
    User.findById(req.body._id,function(err,user){
        if(err){return next(err)}
        Promise.resolve()
            .then(function () {
                return user.newPswd(req.body.password)
            })
            .then(function () {
                User.update({_id:user.id},{$set:{password:user.password}},function(err,result){
                    if(err){return next(err)}
                    res.json({msg:'ok'})
                })
            })
            .catch(function (err) {
                return next(err)
            })

    })
}
exports.deleteUsersFromStore=function (req,res,next){
    console.log(req.params);
    User.remove({store:req.params.store},function(err,result){
        if(err){return next(err)};
        res.json({msg:'ok'})
    })
}








