'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var fs= require('fs');
var path = require('path');
var mime =require('mime');
var xml2js = require('xml2js');

var domain = require('domain');
var ObjectID = mongoose.Types.ObjectId;
var Mailgun = require('mailgun-js');
//var nodemailer = require("nodemailer");
var Excel = require('exceljs');
var async=require('async')
var User=mongoose.model('User')
var moment = require('moment');

var soap = require('soap'),
    Cookie = require('soap-cookie');
var authCtrl=require('../controllers/authCtrl')
var cripto=require('../../md5')

var xmlbuilder = require('xmlbuilder');
var http=require('http')
var request = require('request')


function getPromiseForSaveInDB(arr) {
    return new Promise(function (rs,rj) {
        async.eachSeries(arr, function(item,cb) {
            item.save(function(err){
                cb(err)
            })
        }, function(err, result) {
            if(err){rj(err)}else{rs()}
        });
    })
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
        :'Вы получили это письмо, потому что подписались на рассылку от интернет-магазина ZEFIR.BIZ. Если Вы не хотите получать рассылку, то нажмите';
    let button=(req.store.texts && req.store.texts.unsubscribeName &&  req.store.texts.unsubscribeName[req.store.lang])
        ?req.store.texts.unsubscribeName[req.store.lang]
        :'здесь';
    var s='<div style="clear: both;"></div><p>'+text+' <a style="color: #7a99f7; font-size: 20px; font-weight: 700;" href="'+link+'/unsubscribe/'+
        ((userId)?userId:'useridforunsubscribe')+'"> '+button+'</a>.</p>';
    return s;
}
function actUser(newUser,store){
    return new Promise(
        function( resolve, reject ) {
            newUser.email=newUser.email.toLowerCase();
            User.findOne({$and:[{ email: newUser.email},{store:store}]}, function(err, existingUser) {
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
    var mailgun = new Mailgun({apiKey: api_key,domain:domainUrl});
    var quantity=users.length||1;

    const sentEmailResponse= users.map(user => {
        let userName=''
        if(user.name){
            userName =(req.store.texts && req.store.texts.mailName && req.store.texts.mailName[req.store.lang])?req.store.texts.mailName[req.store.lang]+' ':''
            userName+=user.name
        }

        let maildata={
            from: from,
            to:user.email,
            subject: subject,
            html: content.replace('usernameforreplace',userName) + cancelSubcription(req,user._id)
        }
        return send(maildata)
    });
    var quantity=0;
    return sentEmailResponse.reduce((chain, sendEmail) => {
        return chain.then(() => sendEmail)
            .then(text => text);
    }, Promise.resolve());





    function send(data) {
        return new Promise(function (rs,rj) {
            mailgun.messages().send(data, function (error, body) {
                //console.log(body)
                if(error){console.log('ERROR IN SEND ',error,data.email);return rs(error)}
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
    //console.log(mailOptions.from)
    var api_key, domainUrl;
    if(req.store.seller.mailgun){
        api_key = req.store.seller.mailgun.api_key||null;
        domainUrl = req.store.seller.mailgun.domain||null;
    }
    var d = new Date();
    var n = d.getMonth()+1;
    if(!api_key || !domainUrl){
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
                    if(error){reject()}else{resolve()}
                });
            })
        }).then(function(){
            return res.json({msg:'ok',quantity:quantity});
        }).catch(function(err){
            return res.json({error:err});
        })
    }else{
        send(function(error, body){
            if (cb && typeof cb =='function'){
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

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    //return true;
}
exports.sendEmail=function(req,res,next){
    /*console.log(req.body.from)
    console.log(req.body.email)
    console.log(req.body.subject)*/

    sendEmail(req.body.from,req.body.email,req.body.subject,req.body.content,res,req,function(error,body){
        if(error){
            //console.log(error);
            return next(error);
        }else{
            //console.log("Message sent: " + body);
            res.json({msg:'ok'});
        }
    });
}
exports.sendEmails=function(req,res,next){
    Promise.resolve()
        .then(function(){
            var query={store:req.store._id}
            return new Promise(function(resolve,reject){
                User.find(query).select('email subscription list profile').exec(function(err,users){
                    if(err){return reject(err)}
                    users=users.filter(function(user){
                        if(!user.subscription){return false;}
                        if(!validateEmail(user.email)){console.log(user.email);return false;}
                        if(req.body.lists && req.body.lists.length){
                            if(req.body.except){
                                if(!user.list){return true;}
                                if(user.list.length){
                                    for(var i=0,l=user.list.length;i<l;i++){
                                        var j=user.list[i];
                                        if(req.body.lists.indexOf(j)>-1){
                                            return false;
                                        }
                                    }
                                    return true;
                                }else{
                                    return true;
                                }
                            }else{
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
                            }
                        } else {
                            return true
                        }
                    })

                    users=users.map(function(e){return {email:e.email,_id:e._id,name:(e.profile.fio)?e.profile.fio:''}})
                    resolve(users)
                })
            })
        })
        .then(async function(users){
            if(!users.length){throw 'emails list is empty'}
            var from= req.store.name+'<'+req.store.subDomain+'@'+req.store.domain+'>';
            //console.log(users);return
            let chunk = 2000, arr2=[];
            for (let i=0,j=users.length; i<j; i+=chunk) {
                let temparray = users.slice(i,i+chunk);
                arr2.push(temparray)
            }
            // что бы не было переполнения памяти
            for(const chunkOfUsers of arr2){
                await sendEmailForEachUser(from,chunkOfUsers,req.body.subject,req.body.content,res,req);
            }

            return users.length
        })
        .then(function (quantity) {
            //console.log('all done')
            return res.json({msg:'ok',quantity:quantity});
        })
        .catch(function(err){
            return next(err)
        })

}
exports.unsubscribe=function (req,res,next) {
    if(!req.params.store || !req.params.user){return res.json({status:'error'})}

    try {
        var store = new ObjectID(req.params.store);
        var user = new ObjectID(req.params.user);
    } catch (err) {
        return res.json({status:'error'})
    }

    User.findOne({$and:[{_id:req.params.user},{store:req.params.store}]},function(err,user){
        if(err){return res.json({status:'error'})};
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
    Promise.resolve()
        .then(function(){
            return new Promise(function(resolve,reject){
                if(!req.query.store){return reject('не задан магазин')}
                User.findOne({$and:[{store:req.query.store},{_id:req.params.id}]}).exec(function(err,user){
                    if(err){return reject(err)};
                    if(!user){return reject('нет такого аккаунта')}
                    if(user.subscription){
                        user.subscription=false;
                        User.update({_id:user._id},{$set:{data:user.subscription}},function(err,result){
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

exports.getEntryUser=function (req,res,next) {

}

// domain error hendler enable  !!!!!!!!!!!!!!

exports.confirmEmail=function (req,res,next) {
    if(!req.params.store || !req.params.user){return res.json({status:'error'})}

    try {
        var store = new ObjectID(req.params.store);
        var user = new ObjectID(req.params.user);
    } catch (err) {
        return res.json({status:'error'})
    }

    User.findOne({$and:[{_id:req.params.user},{store:req.params.store}]},function(err,user){
        if(err){return res.json({status:'error'})};
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
exports.checkEmail=function (req,res,next){
    //console.log(req.params.email);return
    User.findOne({email:req.params.email,store:req.store._id},function(err,user){
        if(err){return next(err)}
        /*console.log(user)
        console.log(req.query)*/
        if(user){
            if(req.query && req.query._id){
                if(user._id.toString()==req.query._id){
                    res.json({exist:false})
                }else{
                    res.json({exist:true})
                }
            }else{
                res.json({exist:true})
            }

        }else{
            res.json({exist:false})
        }
    })
}

exports.checkPhone=function (req,res,next){
    User.findOne({'profile.phone':req.params.phone,store:req.store._id},function(err,user){
        if(err){return next(err)}
        /*console.log(user)
        console.log(req.query)*/
        if(user){
            if(req.query && req.query._id){
                if(user._id.toString()==req.query._id){
                    res.json({exist:false})
                }else{
                    res.json({exist:true})
                }
            }else{
                res.json({exist:true})
            }

        }else{
            res.json({exist:false})
        }
    })



}


exports.deleteUsersFromStore=function (req,res,next){
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
    User.find(q).count(function (err,c) {
        total = c;
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



    //+++++ этот поток только для тестирования pipe
    var stream = require('stream');
    var util = require('util');
    var Transform = stream.Transform ||
        require('readable-stream').Transform;
    function Upper(options) {
        // allow use without new
        if (!(this instanceof Upper)) {
            return new Upper(options);
        }

        // init Transform
        Transform.call(this, {
            writableObjectMode: true,
            readableObjectMode: true
        });
    }
    util.inherits(Upper, Transform);
    Upper.prototype._transform = function (chunk, enc, cb) {
        var upperChunk = JSON.stringify(chunk.email)//chunk.toString().toUpperCase();
        this.push(upperChunk);
        cb();
    };
    Upper.prototype._flush = function(callback) {
        callback()
    }


    var upper = new Upper();
    //=========================================================================
    /*rs.pipe(upper).pipe(process.stdout)
     return;*/
    //upper.pipe(process.stdout); // output to stdout
    /*upper.write('hello world\n'); // input line 1
    upper.write('another line');  // input line 2
    upper.end();  // finish*/








    var arrUsers=[];

    var Transform = require('stream').Transform;
    var util = require('util');
    var total;
    var ExcelTransform = function(options) {
        Transform.call(this, {
            writableObjectMode: true,
            readableObjectMode: true
        });
        this.workbook = options.workbook;
        this.worksheet = options.worksheet;
    }
    util.inherits(ExcelTransform, Transform);
    let i=0;
    let id=(req.user._id.toString)?req.user._id.toString():req.user._id;
    let prevPerc=0;
    ExcelTransform.prototype._transform = function(doc, encoding, callback) {
        let progress = i++
        let fio=(doc.profile && doc.profile.fio)?doc.profile.fio:''
        let phone=(doc.profile && doc.profile.phone)?doc.profile.phone:''
        //phone=phone.split('-').join('').split('(').join('').split(')').join('')
        phone=phone.replace(/-|(| |) /g, '');
        //phone=phone.replace(/-|(|\s|) /g, ''); https://stackoverflow.com/questions/6507056/replace-all-whitespace-characters
        if(phone){
            phone= phone.split(',')[0]
            if(phone[0]!='+'){
                if(phone[0]=='3' || phone[0]=='7'){
                    phone='+'+phone
                }else if(phone[0]=='0'){
                    phone='+38'+phone
                }else if(phone[0]=='8'){
                    if(phone[1]=='0'){
                        phone='+3'+phone;
                    }else if(phone[1]=='9'){
                        //console.log(phone)
                        phone=phone.substring(1);
                        phone='+7'+phone;
                    }else if( phone[1]=='-'){
                        if(phone[2]=='9'){
                            phone=phone.substring(1);
                            phone='+7'+phone;
                        }else if(phone[2]=='0'){
                            phone='+3'+phone;
                        }
                    }
                }else if(phone[0]=='9'){
                    phone='+7'+phone;
                }
            }
        }
        let addInfo='';
        if(doc.addInfo && typeof doc.addInfo=='object'){
            for(let k in doc.addInfo){
                addInfo+=k+'-'+doc.addInfo[k]+"\n"
            }
        }
        let o ={
            /*num:i,*/
            email:doc.email,
            fio:fio,
            phone:phone,
            /*addInfo:addInfo*/
        }
        let o1 ={
            /*num:i,*/
            email:doc.email,
            phone:phone,
            fn:fio,

            /*addInfo:addInfo*/
        }
        if(o1.email){
            arrUsers.push(o1)
        }
        this.worksheet.addRow(o).commit();
        var perc = parseInt((progress / total) * 100);

        if(prevPerc!=perc){
            prevPerc=perc;
            setTimeout(function(){


                if(req.sockets[id]){
                    req.sockets[id].emit('userslistCreating',{perc:perc})
                }

                callback();
            },5)
        }else{
            setTimeout(function(){
                callback();
            },5)
        }
    };
    ExcelTransform.prototype._flush = function(callback) {
        this.worksheet.commit();
        this.workbook.commit();

        var json2csv = require('json2csv');

        var fields = ['email', 'phone', 'fn'];

        var csv = json2csv({ data: arrUsers, fields: fields });

        fs.writeFile(folder+'/users.csv', csv, 'utf8',function(err) {
            if (err) console.log(err);
            console.log('file saved2');
        });



        return res.json({fileName:fName}); // final commit
    };
    var workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    var worksheet = workbook.addWorksheet('subscribers');
    worksheet.columns = [
       /* { header: '№', key: 'num', width: 10 },*/
        { header: 'email', key: 'email', width: 30 },
        { header: 'phone', key: 'phone', width: 15},
        { header: 'fn', key: 'fio', width: 30 },

        /*{ header: 'доп.инф.', key: 'addInfo', width: 65}*/
    ];

    rs.pipe(new ExcelTransform({
        workbook: workbook,
        worksheet: worksheet
    }))

}


exports.usersFileUpload=function(req,res,next){
    //http://stackoverflow.com/questions/28983424/make-angular-foreach-wait-for-promise-after-going-to-next-object
    let typeLog=req.store.subDomain+'_users';
    var date = new Date().toISOString().replace( /T/, ' ' ).replace( /\..+/, '' );
    var stringToFile = "\r" +
        "*************************upload users************************************\r"+
        date + "\r";
    let usersNew=[];
    var permissionCountUsers=5000;
    var countUsers=0,userCountFromFile=0;
    var promises=[];
    if(req.file && req.file.filename){
        req.permissionCountUsers=permissionCountUsers;
        let mimetype;
        mimetype=mime.extension(mime.lookup(req.file.originalname))
        let jobDone=false;
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
                countUsers=c;
                if(c>req.permissionCountUsers){
                    throw 'Too meny users!!!'+req.permissionCountUsers+'+';
                }
            })
            .then(function(){
                if(mimetype=='xml'){
                    return parseXML(req,countUsers)
                }else if(mimetype=='xlsx'){
                    return parseXLSX(req,countUsers)
                }else{
                    throw 'wrong format file'
                }
            })

            .then(function(data){
                userCountFromFile=Object.keys(data).length;
                return new Promise(function(resolve,reject){
                    User.find({store:req.query.store},function(err,users){
                        if(err){return reject(err)}
                        users.forEach(function (u) {
                            if(data[u.email]){
                                delete data[u.email];
                            }
                        })
                        resolve(data)
                    })
                })


            })
            .then(function(data) {
                for(let key in data){
                    data[key].store=req.store._id;
                    let u = new User(data[key])
                    usersNew.push(u)

                }
                jobDone=true;
                res.json({countInDb:countUsers,countPermission:permissionCountUsers,countFfomFile:userCountFromFile,countToDb:usersNew.length})
                return getPromiseForSaveInDB(usersNew);

            })
            .then(function(){
                stringToFile +=
                        "count users in DB - "+countUsers+"\r"+
                        "count users from file - "+userCountFromFile+"\r"+
                        "count unique users to DB - "+usersNew.length+"\r";
                saveInLogFile(typeLog,stringToFile)
                if(req.sockets[req.user._id.toString()]){
                    req.sockets[req.user._id.toString()].emit('endUploadUsers')
                }

            })
            .catch(function(err){
                stringToFile += "error - "+err.stack+"\r";
                saveInLogFile(typeLog,stringToFile)
                //ошибка во время парсинга
                if(!jobDone){
                    next(err)
                }
            })


    }else{
        next(new Error('nothing to uoload'))
    }

}

function parseXML(req,countUsers) {
    return new Promise(function (rs,rj) {
        Promise.resolve()
            .then(function(){
                return new Promise(function (resolve, reject) {
                    fs.readFile(req.file.path, function read(err, data) {
                        if (err) {
                            reject(err);
                        }
                        resolve(data)
                    });
                });
            })
            .then(function(data){
                var parser = new xml2js.Parser({cdata:true});
                return new Promise(function (resolve,reject) {
                    parser.parseString(data, function (err, result) {
                        if(result){
                            resolve(result)
                        }else{
                            reject(null)
                        }
                    });

                })
            })
            .then(function (data) {
                var users={};
                if(data && data.gmall_user && data.gmall_user.users && data.gmall_user.users[0] && data.gmall_user.users[0].user && data.gmall_user.users[0].user.length){
                    data.gmall_user.users[0].user.forEach(function (u) {
                        if(!u.email){return}
                        let user={email:u.email[0].toLowerCase().trim(),profile:{},order:{count:0,sum:0}}
                        if(u.name){
                            user.name=u.name[0];
                        }else{
                            user.name=u.email[0].split('@')[0];
                        }
                        if(u.hashedPassword){
                            user.password=u.hashedPassword[0]
                        }
                        if(u.salt){
                            user.salt=u.salt[0]
                        }
                        if(u.date){
                            user.date=new Date(u.date[0])
                        }
                        if(u.fio){
                            user.profile.fio=u.fio[0]
                        }
                        if(u.city){
                            user.profile.city=u.city[0]
                        }
                        if(u.cityId){
                            user.profile.cityId=u.cityId[0]
                        }
                        if(u.address){
                            user.profile.address=u.address[0]
                        }
                        if(u.phone){
                            user.profile.phone=u.phone[0]
                        }
                        if(u.subscription){
                            user.subscription=u.subscription[0]
                        }
                        if(u.visits){
                            user.visits=u.visits[0]
                        }
                        if(u.ordercount){
                            user.order.count=u.ordercount[0]
                        }
                        if(u.ordersum){
                            user.order.sum=u.ordersum[0]
                        }
                        users[user.email]=user;
                    })
                    
                }
                rs(users);
            })
            .catch(function(err){
                rj(err)
            })
    })

}

function parseXLSX(req,countUsers) {
    var workbook = new Excel.Workbook();
    return new Promise(function (rs,rj) {
        Promise.resolve()
            .then(function(){
                return workbook.xlsx.readFile(req.file.path)
            })
            .then(function () {
                var users={};
                var worksheet = workbook.getWorksheet(1);
                worksheet.eachRow(function(row, rowNumber) {
                    //if(rowNumber>50){return}
                    if(rowNumber!=1 && req.permissionCountUsers>(rowNumber+countUsers)){
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
                                if(ph.charAt(0)=='+'){
                                    ph = ph.substr(1);
                                }
                                try{
                                    if(ph && ph.length==12 && validation.isNumber(ph)){
                                        data.profile.phone=ph;
                                    }
                                }catch(err){}

                            }else if(colNumber==4){
                                data.profile.city=d.substring(0,100);
                            }
                        });
                        users[user.email]=user;
                    }
                });
                rs(users);

            })
            .catch(function(err){
                rj(err)
            })
    })

}

function saveInLogFile(typeLog,s){
    var filePath = './public/log/'+typeLog+'.log'
    try {


        fs.readFile(filePath,function(err,data) {
            if(err){
                console.log(err)
            }
            if(err || !data || ! data.length){
                fs.appendFile( filePath, s, function (err, data) {
                    if (err) console.log(err) ;
                } );

            }else{
                fs.open(filePath, 'w+',function (err,fd) {
                    var buffer = new Buffer(s);
                    var newBuffer = Buffer.concat([buffer, data]);
                    fs.write(fd, newBuffer, 0, newBuffer.length, 0,function(){
                        fs.close(fd);
                        /*fs.write(fd, data, 0, buffer.length, data.length,function () {
                         fs.close(fd);
                         })*/
                    });

                })
            }
        })
    } catch (err) {
        console.error(err);

    }
}

exports.cancelCoupon=function(req,res,next){
    if(!req.query || !req.query.lists){
        return next('there is no list of users')
    }else if(!req.query.store){
        return next('there is no selected store')
    }
    let lists;
    let query={store:req.query.store}
    try{
        lists =JSON.parse(req.query.lists);
        if(lists && lists.length){
            query.list={'$in':lists}
        }else{
            return next('there is no list of users')
        }
    }catch(err){
        return next(err)
    }
    let coupon = req.params.id
    var stream = User.find(query).stream();

    var q = async.queue(function (doc, callback) {
        if(doc){
            if(!doc.coupons){
                doc.coupons=[];
            }

            let coupons = doc.coupons.filter(function (c) {
                return c;
            }).map(function (c) {
                return (c.toString)?c.toString():c;
            })
            if(coupons.length){
                let idx=coupons.indexOf(coupon)
                if(idx>-1){
                    coupons.splice(idx,1)
                    User.update({_id:doc._id},{$set:{coupons:coupons}},function () {
                        callback()
                    })
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }else{
            callback()
        }
    });

    q.drain = function() {
        //console.log('all items have been processed');
        //db.close();

    }

    stream.on('data', function (doc) {
        q.push(doc, function(err) {
            //console.log('finished processing doc ',doc.name);
        });
    }).on('error', function (err) {
        // handle the error
        console.log(err)
    }).on('close', function () {
        // the stream is closed
        console.log('all done')
        res.json({})
    });
    //console.log(req.query,req.params)
}
exports.useCoupon=function(req,res,next){
    //console.log(req.query)
    if(!req.query || !req.query.lists){
        return next('there is no list of users')
    }else if(!req.query.store){
        return next('there is no selected store')
    }
    let lists;
    let query={store:req.query.store}
    try{
       lists =JSON.parse(req.query.lists);
       if(lists && lists.length){
           query.list={'$in':lists}
       }else{
           return next('there is no list of users')
       }
    }catch(err){
        return next(err)
    }
    let coupon = req.params.id
    //console.log('query',query)
    var stream = User.find(query).stream();

    /*User.find(query,function(err,users){
        console.log('users.length',users.length)
    })*/





    var q = async.queue(function (doc, callback) {
        if(doc){
            if(!doc.coupons){
                doc.coupons=[];
            }

            let coupons = doc.coupons.filter(function (c) {
                return c;
            }).map(function (c) {
                return (c.toString)?c.toString():c;
            })
            if(coupons.length){
                let idx=coupons.indexOf(coupon)
                if(idx<0){
                    coupons.push(coupon)
                }
                //console.log(coupons);
            }else{
                coupons.push(coupon)
            }

            //callback()

            User.update({_id:doc._id},{$set:{coupons:coupons}},function () {
                callback()
            })

        }else{
            callback()
        }
    });

    q.drain = function() {
        console.log('all items have been processed');
        //db.close();

    }

    stream.on('data', function (doc) {
        //console.log(doc.name)
        q.push(doc, function(err) {
            //console.log('finished processing doc ',doc.name);
        });
    }).on('error', function (err) {
        // handle the error
        console.log(err)
    }).on('close', function () {
        // the stream is closed
        console.log('all done')
        res.json({})
    });
    //console.log(req.query,req.params)

}




function sendTurboSMS(turbosms,phones,text,cb) {
    let url = 'http://turbosms.in.ua/api/wsdl.html';
    // Отправляем сообщение на один номер.
    // Подпись отправителя может содержать английские буквы и цифры. Максимальная длина - 11 символов.
    // Номер указывается в полном формате, включая плюс и код страны
    let $sms = {
        sender:turbosms.sender,
        destination:'+'+phones[0],
        text:text
    }
    var auth = "Basic " + new Buffer(turbosms.login + ':' + turbosms.password).toString("base64")
    try{
        soap.createClient(url,  { wsdl_headers: {Authorization: auth} },function(err, client) {
            if(err){
                if(cb){
                    cb(err)
                }
            }else{
                client.Auth(turbosms, function(err, result) {
                    if(err){
                        if(cb){
                            cb(err)
                        }
                    }else{
                        client.setSecurity(new Cookie(client.lastResponseHeaders));
                        client.GetCreditBalance(function(err, result) {
                            //console.log(result);
                        });
                        client.SendSMS($sms,function(err, result) {
                            if(err){
                                if(cb){
                                    cb(err)
                                }
                            }else{
                                if(cb){
                                    //console.log(result)
                                   cb(null,result)
                                }
                            }
                        });
                    }
                })
            }
        });
    }catch (err){
        if(err && cb){
            cb(err)
        }
    }
}
function sendAphaSMS(alphasms,phones,text,cb) {
    // Отправляем сообщение на один номер.
    // Подпись отправителя может содержать английские буквы и цифры. Максимальная длина - 11 символов.
    // Номер указывается в полном формате, включая плюс и код страны
    console.log(alphasms)
    var body = '<?xml version="1.0" encoding="utf-8"?>';
    body+='<package key="'+alphasms.key+'"><message>';
    phones.forEach(function (p) {
        body+='<msg recipient= "'+p+'" sender= "'+alphasms.sender+'" type="0">'+text+'</msg>'
        //body+='<msg recipient= "'+p+'" sender= "SmartClinic" type="0">'+text+'</msg>'
    })

    body+='</message></package>';
    //console.log(body)
    request.post(
        {url:'http://alphasms.ua/api/xml.php',
            body : body,
            headers: {'Content-Type': 'text/xml'}
        },
        function (error, response, body) {
            if(error){
                //console.log(error)
                return cb(error)
            }
            if (!error && response.statusCode == 200) {
                //console.log(response.body)
                return cb(null,response.body)
            }

        }
    );
}


exports.sendSMS=function(req,res,next){
    /*console.log(req.store)
    console.log(!req.store.turbosms || !req.store.turbosms.is)*/

    User.findOne({'profile.phone':req.body.phone,store:req.store._id},function(err,user){
        if(err){return next(err)}
        if(user){
            let code = shuffle(6)
            let sms ={
                exp:moment().add(6000, 'seconds').unix(),
                code:code
            }
            User.update({_id: user.id},{sms:sms},function(err,result){
                if (err) return next(err);
                //console.log(result)
                if(req.store.turbosms && req.store.turbosms.is){
                    sendTurboSMS(req.store.turbosms,[req.body.phone],'code - '+code,function (err,result) {
                        if(err){return next(err)}
                        return res.json({data:result})
                    })
                }else if(req.store.alphasms && req.store.alphasms.is){
                    sendAphaSMS(req.store.alphasms,[req.body.phone],'code - '+code,function (err,result) {
                        if(err){return next(err)}
                        return res.json({data:result})
                    })
                }else{
                    let err = new Error('there are no api for send sms')
                    return  next(err)
                }

            })
        }else{
            let err= new Error('user not found')
            next(err)
        }
    })
}
exports.verifySMScode=function(req,res,next){
    //console.log(req.body);
    let q = {'profile.phone':req.body.phone,store:req.store._id};
    User.findOne(q, function(err, user) {
        if(err){return next(err)}
        if (!user) {
            err = new Error('wrong phone')
            return next(err)
        }
        //console.log(user.sms)
        //console.log( moment().unix()< user.sms.exp)
        if(user.sms && user.sms.code==req.body.code && user.sms.exp && moment().unix()< user.sms.exp){
            res.send({ token: authCtrl.createJWT(user)});
        }else{
            err = new Error('wrong code')
            return next(err)
        }

    });

}

exports.sendMessageAboutDeal=function(req,res,next){
    //console.log('sendMessageAboutDeal',[req.body.phone],req.body.text)
    let id =(req.user && req.user._id && req.user._id.toString)?req.user._id.toString():req.user._id
    //console.log('req.body.userId ,id,req.user.admin',req.body.userId ,id,req.user.admin)
    /*if((!req.body.userId || id!=req.body.userId) && !req.user.admin){
        let err = new Error("user id don't match")
        return next(err)
    }*/
    //console.log(req.store.alphasms,[req.body.phone],req.body.text)
    if(!req.body.userId || !id){
        let err = new Error("user id don't match")
        return next(err)
    }
    if(req.store.turbosms && req.store.turbosms.is && req.store.turbosms.is!='false'){
        sendTurboSMS(req.store.turbosms,[req.body.phone],req.body.text,function (err,result) {
            if(err){return next(err)}
            return res.json({data:result})
        })
    }else if(req.store.alphasms && req.store.alphasms.is && req.store.alphasms.is!='false'){
        sendAphaSMS(req.store.alphasms,[req.body.phone],req.body.text,function (err,result) {
            if(err){return next(err)}
            return res.json({data:result})
        })
    }else{
        let err = new Error('there are no api for send sms')
        return  next(err)
    }

}

exports.sendMessageAboutDealFromServer=function(req,res,next){
    var moment = require('moment');
    moment.locale(req.store.lang)
    let d = new Date(req.body.date)
    let date = moment(d).format('LLL')
    let text = req.body.text;
    if(!req.body.onlyText){
        text = req.body.text +' '+date+"("+req.store.name+")";
    }

    if(!req.body.fromServer){
        if(req.body.userId){
            let id=cripto.md5(req.store.subDomain);
            //console.log(id,req.body.userId)
            if(id!=req.body.userId){
                let err = new Error("user id don't match")
                return next(err)
            }
        }else{
            let err = new Error("user id don't match")
            return next(err)
        }
    }



    if(req.store.turbosms && req.store.turbosms.is){
        sendTurboSMS(req.store.turbosms,[req.body.phone],text,function (err,result) {
            if(err){return next(err)}
            return res.json({data:result})
        })
    }else if(req.store.alphasms && req.store.alphasms.is){
        sendAphaSMS(req.store.alphasms,[req.body.phone],text,function (err,result) {
            if(err){return next(err)}
            return res.json({data:result})
        })
    }else{
        let err = new Error('there are no api for send sms')
        return  next(err)
    }


}










