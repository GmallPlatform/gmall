'use strict';
var mongoose = require('mongoose');
var fs= require('fs');
var path = require('path');
var domain = require('domain');
var ObjectID = mongoose.Types.ObjectId;
var Mailgun = require('mailgun-js');
//var nodemailer = require("nodemailer");
var Excel = require('exceljs');
var async=require('async')
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
function cancelSubcription(req,userId){
    let link= req.store.link;
    let text = (req.store.texts && req.store.texts.unsubscribeText &&  req.store.texts.unsubscribeText[req.store.lang])
    ?req.store.texts.unsubscribeText[req.store.lang]
        :'отписаться от рассылки можно';
    let button=(req.store.texts && req.store.texts.unsubscribeName &&  req.store.texts.unsubscribeName[req.store.lang])
        ?req.store.texts.unsubscribeName[req.store.lang]
        :'здесь';
    //console.log(req.texts)
    var s='<div style="clear: both;"></div><p><small>'+text+' <a style="color: #d58512;" href="'+link+'/unsubscribe/'+
        ((userId)?userId:'useridforunsubscribe')+'"> '+button+'</a>.<small></small></p>';
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



function sendEmailForEachUser(from,users,subject,content,res,req,cb){
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
            var error=new Error('Exceeded the limit number of emails per month')
            return cb(error)
        }
        if(users.length && users.length>100){
            users.length=100;
        }
        api_key ='key-cf6f807e996ef54aec2c8878c8fbb71b';
        domainUrl = 'gmall.io';
    }
    /*console.log(api_key,domainUrl)
    console.log('domain-',domainUrl)*/
    var mailgun = new Mailgun({apiKey: api_key,domain:domainUrl});
    var quantity=users.length||1;

    const sentEmailResponse= users.map(user => {
        //console.log(user)
        let maildata={
            from: from,
            to:user.email,
            subject: subject,
            html: content.replace('usernameforreplace',user.name) + cancelSubcription(req,user._id)
        }
        //maildata.html = maildata.html.replace('usernameforreplace',user.name)
        //console.log(maildata.html)
        return send(maildata)
    });
    var quantity=0;
    sentEmailResponse.reduce((chain, sendEmail) => {
        return chain.then(() => sendEmail)
            .then(text => text);
    }, Promise.resolve());

    return res.json({msg:'ok',quantity:quantity});



    function send(data) {
        return new Promise(function (rs,rj) {
            mailgun.messages().send(data, function (error, body) {
                return rs(body)
            });
        })

    }

}

function sendEmail(from,toEmail,subject,content,res,req,cb){
    var mailOptions = {
        from: from,
        to: toEmail,
        subject: subject,
        html: content
    }
    /*console.log(mailOptions)
    return;*/
    /*if(toEmail.length) {
        mailOptions.to = req.store.name +' <promo@'+req.store.domain+'>';
        mailOptions.bcc = toEmail;
        mailOptions.html = content + cancelSubcription(req);
    }*/

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
    mailgun.messages().send(mailOptions, function (error, body) {
        cb(error, body)
    });
    return;


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
    //console.log(req.store.texts)

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
                User.find(query).select('email subscription list profile').exec(function(err,users){
                    if(err){return reject(err)}
                    users=users.filter(function(user){
                        //console.log(user)
                        if(!user.subscription){return false;}
                        if(req.body.lists && req.body.lists.length){
                            if(!user.list){return false;}
                            //console.log(user.list)
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

                    users=users.map(function(e){return {email:e.email,_id:e._id,name:(e.profile.fio)?e.profile.fio:''}})
                    //console.log(users)
                    resolve(users)
                })
            })
        })
        .then(function(users){
            //console.log(users)
            if(!users.length){throw 'emails list is empty'}
            var from= '<'+req.store.name+'@'+req.store.domain+'>';
            //console.log(from)
            sendEmailForEachUser(from,users,req.body.subject,req.body.content,res,req,function(error,body){
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
exports.unsubscribe=function (req,res,next) {
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
        if(!user.subscription){
            return res.json({status:'ok'})
        }
        User.update({_id:user._id},{$set:{subscription:false}},function(){
            if(err){
                res.json({status:'error'})
            }else{
                res.json({status:'ok'})
            }
        })
    })

}


exports.unsubscription1=function(req,res,next){
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
                    throw 'Too meny users!!!'+permissionCountUsers+'+';
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
        next(new Error('nothing to uoload'))
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
//http://codewinds.com/blog/2013-08-20-nodejs-transform-streams.html
//http://codewinds.com/blog/2013-08-19-nodejs-writable-streams.html
exports.downloadSubscribersList=function (req,res,next){
    let q={store:req.query.store};
    if(req.body.dateStart && req.body.dateEnd){
        let start = Date.parse(req.body.dateStart)
        let end = Date.parse(req.body.dateEnd)
        q={$and:[{store:req.query.store},{date:{$gte:new Date(req.body.dateStart),$lt:new Date(req.body.dateEnd)}}]};
    }
    //console.log(q)
    var total;
    let i=0;
    let id=(req.user._id.toString)?req.user._id.toString():req.user._id;
    User.find(q).count(function (err,c) {
        total = c;
        //console.log('total -',total)
    });
    var rs = User.find(q).stream();
    let fName=req.store.subDomain+'/'+Date.now()+'.xlsx';
    let file='public/'+fName
    let fileName=path.join(__dirname, '../../'+file);
    var options = {
        filename: './'+file,
        useStyles: true,
        useSharedStrings: true
    };
    let folder = './public/'+req.store.subDomain;
    try {
        fs.accessSync(folder, fs.F_OK);
    } catch (e) {
        fs.mkdirSync(folder);
    }


    var Transform = require('stream').Transform;
    var util = require('util');
    var Transform;
    var ExcelTransform = function(options) {
        Transform.call(this, {
            writableObjectMode: true,
            readableObjectMode: true
        });
    }
    util.inherits(ExcelTransform, Transform);
    ExcelTransform.prototype._transform = function(doc, encoding, callback) {
        let progress = i++
        let fio=(doc.profile && doc.profile.fio)?doc.profile.fio:''
        let phone=(doc.profile && doc.profile.phone)?doc.profile.phone:''
        let addInfo='';
        if(doc.addInfo && typeof doc.addInfo=='object'){
            for(let k in doc.addInfo){
                addInfo+=k+'-'+doc.addInfo[k]+"\n"
            }
        }
        let o ={
            num:i,
            email:doc.email,
            fio:fio,
            phone:phone,
            addInfo:addInfo
        }
        //console.log(o)
        this.push(o)
        callback();
    };



    function Upper(options) {
        Transform.call(this, {
            writableObjectMode: true,
            readableObjectMode: true
        });
    }
    util.inherits(Upper, Transform);
    Upper.prototype._transform = function (chunk, enc, cb) {
        //console.log('chunk' ,chunk)
        var upperChunk = JSON.stringify(chunk.email)//chunk.toString().toUpperCase();
        this.push(upperChunk);
        cb();
    };
    Upper.prototype._flush = function(callback) {
        console.log('all done')
        callback()
    }
    var workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    var worksheet = workbook.addWorksheet('subscribers');
    worksheet.columns = [
        { header: '№', key: 'num', width: 10 },
        { header: 'email', key: 'email', width: 30 },
        { header: 'ФИО', key: 'fio', width: 30 },
        { header: 'ТЕЛЕФОН', key: 'phone', width: 15},
        { header: 'доп.инф.', key: 'addInfo', width: 65}
    ];

    var upper = new Upper()
    rs.pipe(new ExcelTransform()).pipe(workbook)
        //.pipe(upper).pipe(process.stdout);

    /*upper.on('finish', function () {
        console.log('file has been written');
    })*/
   /* workbook.on('finish', function () {
     console.log('file has been written');
     })*/


    /*ExcelTransform.prototype._flush = function(callback) {
        this.worksheet.commit();
        this.workbook.commit();
        console.log(fName)
        return res.json({fileName:fName}); // final commit
    };*/




        //.pipe(process.stdout);

        /*.pipe(upper)
        .pipe(process.stdout);*/


    /*workbook.on('finish', function () {
        console.log('file has been written');
    });*/




}








