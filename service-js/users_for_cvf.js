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

var moment = require('moment');

var xmlbuilder = require('xmlbuilder');
var http=require('http')
var request = require('request')



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



function doIt(){
    var users = JSON.parse(fs.readFileSync('jadone.users.last.txt', 'utf8'));

    let fName='jadone.users.last.xlsx';
    let fileName=path.join(__dirname, fName);
    var options = {
        filename: './'+fName,
        useStyles: true,
        useSharedStrings: true
    };



    var Transform = require('stream').Transform;
    var util = require('util');
    var total;

    var workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    var worksheet = workbook.addWorksheet('subscribers');
    worksheet.columns = [
        /* { header: '№', key: 'num', width: 10 },*/
        { header: 'email', key: 'email', width: 30 },
        { header: 'phone', key: 'phone', width: 15},
        { header: 'fn', key: 'fio', width: 30 },

        /*{ header: 'доп.инф.', key: 'addInfo', width: 65}*/
    ];

    var arrUsers=[];
    users.forEach(function (doc) {
        let fio=(doc.profile && doc.profile.fio)?doc.profile.fio:''
        let phone=(doc.profile && doc.profile.phone)?doc.profile.phone:''
        //phone=phone.replace(/-|(| |) /g, '');
        phone=phone.replace(/-|(|\s|) /g, ''); //https://stackoverflow.com/questions/6507056/replace-all-whitespace-characters
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
            /*if(phone[0]=='+'){
                if(phone[1]=='3' && phone[2]=='8'){
                    phone=phone.split('+38').join('+38-')
                }else if(phone[1]=='7'){
                    phone=phone.split('+7').join('+7-')
                }

            }*/
            //console.log(phone)
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

        worksheet.addRow(o).commit();
    })
    worksheet.commit();
    workbook.commit();




    var json2csv = require('json2csv');

    var fields = ['email', 'phone', 'fn'];

    var csv = json2csv({ data: arrUsers, fields: fields });

    fs.writeFile('jadoneusers.csv', csv, 'utf8',function(err) {
        if (err) console.log(err);
        console.log('file saved2');
    });



}

doIt()












