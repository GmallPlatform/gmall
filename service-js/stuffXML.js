'use strict';
var globalFunction=require('./public/scripts/myPrototype.js')
var co=require('co')
var fs = require('fs');
var path = require('path');
var mongoose=require('mongoose');
var db = mongoose.connect('mongodb://localhost/gmall-stuff',{db: {safe: true}});
// Bootstrap models
var modelsPath = path.join( __dirname, 'stuff/models' );
require( modelsPath + '/category.js' );
require( modelsPath + '/stuff.js' );

var i=0;
var async = require('async')

var Stuff= mongoose.model('Stuff');


function stuffXML(){
    /*let q={store:req.query.store};
    if(req.body.dateStart && req.body.dateEnd){
        let start = Date.parse(req.body.dateStart)
        let end = Date.parse(req.body.dateEnd)
        q={$and:[{store:req.query.store},{date:{$gte:new Date(req.body.dateStart),$lt:new Date(req.body.dateEnd)}}]};
    }*/
    //console.log(q)
    let q={};
    Stuff.find(q).count(function (err,c) {
        total = c;
        //console.log('total -',total)
    });
    var rs = Stuff.find(q).stream();
    //let fName=req.store.subDomain+'/'+Date.now()+'.xlsx';
    let fName='catalog.xml';
    let file='public/'+fName
    //let fileName=path.join(__dirname, '../../'+file);
    let fileName=path.join(__dirname,file);

    /*let folder = './public/'+req.store.subDomain;
    try {
        fs.accessSync(folder, fs.F_OK);
    } catch (e) {
        fs.mkdirSync(folder);
    }*/



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
        //console.log('chunk' ,chunk.name)
        var upperChunk = JSON.stringify(chunk.name)+"\n"//chunk.toString().toUpperCase();
        this.push(upperChunk);
        cb();
    };
    Upper.prototype._flush = function(callback) {
        console.log('all done')
        callback()
    }


    var upper = new Upper();
    //=========================================================================

    var wstream = fs.createWriteStream('myOutput.txt');
    rs.pipe(upper).pipe(wstream)
     return;
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
    //console.log('id ',id)
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
        this.worksheet.addRow(o).commit();
        var perc = parseInt((progress / total) * 100);

        if(prevPerc!=perc){
            //console.log(prevPerc,perc)
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

        /*if(req.sockets[id]){
         req.sockets[id].emit('userslistCreating',{perc:perc})
         }
         //this.push(doc) -- это для следующего потока в chain of pipe
         return callback();
         */
        //console.log(perc = parseInt((progress / total) * 100))



    };
    ExcelTransform.prototype._flush = function(callback) {
        this.worksheet.commit();
        this.workbook.commit();
        console.log(fName)
        return res.json({fileName:fName}); // final commit
    };
    var workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    var worksheet = workbook.addWorksheet('subscribers');
    worksheet.columns = [
        { header: '№', key: 'num', width: 10 },
        { header: 'email', key: 'email', width: 30 },
        { header: 'ФИО', key: 'fio', width: 30 },
        { header: 'ТЕЛЕФОН', key: 'phone', width: 15},
        { header: 'доп.инф.', key: 'addInfo', width: 65}
    ];

    rs.pipe(new ExcelTransform({
        workbook: workbook,
        worksheet: worksheet
    }))

    /*.pipe(upper)
     .pipe(process.stdout);*/


    /*workbook.on('finish', function () {
     console.log('file has been written');
     });*/

}
stuffXML()
