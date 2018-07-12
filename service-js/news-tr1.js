'use strict';
var globalFunction=require('./public/scripts/myPrototype.js')
var co=require('co')
var fs = require('fs');
var path = require('path');
var mongoose=require('mongoose');
var db = mongoose.connect('mongodb://localhost/gmall-stuff',{db: {safe: true}});
// Bootstrap models
var modelsPath = path.join( __dirname, 'stuff/models' );
require( modelsPath + '/news.js' );
require( modelsPath + '/stuff.js' );
var i=0;
var async = require('async')
var Items= mongoose.model('News');



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
    let is;
    for(let i=0;i<doc.blocks.length;i++){
        if(doc.blocks[i].type=='videoLink'){

            doc.blocks[i].videoLink=doc.blocks[i].desc
            doc.blocks[i].desc='';
            is=true;
        }
    }
    if(is){
        console.log(doc.blocks)
        Items.update({_id:doc._id},{$set:{blocks:doc.blocks}},function(){
            callback()
        });
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




