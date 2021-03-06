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
var i=0;
var async = require('async')
var Items= mongoose.model('Category');
var stream = Items.find().stream();





var q = async.queue(function (doc, callback) {
    console.log(++i,' -' ,doc)
    doc.nameL={'ru':doc.name}
    doc.descL={}
    if(doc.desc){
        doc.descL.ru=doc.desc
    }
    Items.update({_id:doc._id},{$set:{nameL:doc.nameL,descL:doc.descL}},function () {
        callback()
    })
});

q.drain = function() {
    console.log('all items have been processed');
    //db.close();
}



stream.on('data', function (doc) {
    //console.log(doc.name)
    q.push(doc, function(err) {
        console.log('finished processing doc ',doc.name);
    });
}).on('error', function (err) {
    // handle the error
    console.log(err)
}).on('close', function () {
    // the stream is closed
    console.log('all done')
});
return;




