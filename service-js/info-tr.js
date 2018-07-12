'use strict';
var globalFunction=require('./public/scripts/myPrototype.js')
var getUrl=require('./stuff/controllers/getUniqueUrl.js');
var co=require('co')
var co=require('co')
var fs = require('fs');
var path = require('path');
var mongoose=require('mongoose');
var db = mongoose.connect('mongodb://localhost/gmall-stuff',{db: {safe: true}});
// Bootstrap models
var modelsPath = path.join( __dirname, 'stuff/models' );
require( modelsPath + '/info.js' );

var i=0;
var async = require('async')
var Items= mongoose.model('Info');



/*
Items.find().populate('stuffs','name gallery url').exec(function(err,docs){
    docs.forEach(function (doc) {
        console.log(doc.desc)
    })

})

return;
*/
var stream = Items.find().stream();





var q = async.queue(function (doc, callback) {
    doc.url =getUrl.url_slug(doc.name)
    console.log(doc)
    doc.save(callback);
    //callback()
    /*doc.url =getUrl.url_slug(doc.name)
    Items.update({_id:doc._id},{$set:{url:doc.url},function(){
        callback();
    }})*/
    /*co(function*() {
        doc.url = yield getUrl.create(Items,doc.store,doc.name)
        console.log(doc.url)
        Items.update({_id:doc._id},{$set:{url:doc.url},function(){
            callback();
        }})
    }).catch(function(err){
        console.log('error in catch - ',err)
        callback(err)
    })*/

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




