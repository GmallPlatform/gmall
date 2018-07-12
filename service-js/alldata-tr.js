'use strict';
var co=require('co')
var fs = require('fs');
var path = require('path');
var mongoose=require('mongoose');
var db = mongoose.connect('mongodb://localhost/gmall-stuff',{db: {safe: true}});
// Bootstrap models
var modelsPath = path.join( __dirname, 'stuff/models' );
require( modelsPath + '/stuff.js' );
var i=0;
var async = require('async')
var Items= mongoose.model('AddInfo');
//var models=['News'];





var stream = Items.find().stream();
var q = async.queue(function (doc, callback) {
    console.log(++i,' -' ,doc.name)

    let store = doc.store
    if(typeof doc.store=='object'){
        if(doc.store.length && doc.store[0] && doc.store[0].toString){
            store = doc.store[0].toString();
        }else if(doc.store.toString){
            store = doc.store.toString();
        }
    }
    Items.update({_id:doc._id},{$set:{store:store}},function () {
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


