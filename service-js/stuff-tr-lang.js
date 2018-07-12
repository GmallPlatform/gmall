'use strict';
var globalFunction=require('./public/scripts/myPrototype.js')
var co=require('co')
var fs = require('fs');
var path = require('path');
var mongoose=require('mongoose');
var db = mongoose.connect('mongodb://localhost/gmall-stuff',{db: {safe: true}});
// Bootstrap models
var modelsPath = path.join( __dirname, 'stuff/models' );
require( modelsPath + '/master.js' );
require( modelsPath + '/stuff.js' );
var i=0;
var async = require('async')
var Items= mongoose.model('Stuff');




/*
Items.find().populate('stuffs','name gallery url').exec(function(err,docs){
    docs.forEach(function (doc) {
        console.log(doc.desc)
    })

})

return;
*/
var stream = Items.find().populate('stuffs','name gallery url').stream();





var q = async.queue(function (doc, callback) {
    let is = false;
    if(doc.descL===null){
        is=true;
        doc.descL={}
    }

    if(is){
        Items.update({_id:doc._id},{$set:{store:doc.store,descL:doc.descL}},function () {
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
    console.log(doc.name,doc.store)
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




