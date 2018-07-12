'use strict';
var globalFunction=require('./public/scripts/myPrototype.js')
var co=require('co')
var fs = require('fs');
var path = require('path');
var mongoose=require('mongoose');
var db = mongoose.connect('mongodb://localhost/gmall-stuff',{db: {safe: true}});
// Bootstrap models
var modelsPath = path.join( __dirname, 'stuff/models' );
require( modelsPath + '/homepage.js' );


var i=0;
var async = require('async')
var Items= mongoose.model('HomePage');




//var stream = Items.find().stream();








function handle(doc, callback) {
    console.log(++i,' -',doc.url)
    let blocks=[];
    doc.header.forEach(function (b) {
        b.position='top';
        blocks.push(b)
    })
    doc.left.forEach(function (b) {
        b.position='left';
        blocks.push(b)
    })
    doc.right.forEach(function (b) {
        b.position='right';
        blocks.push(b)
    })
    blocks.sort(function(a,b){return a.index-b.index})
    Items.update({_id:doc._id},{$set:{blocks:blocks}},function () {
        callback()
    })
}


Promise.resolve()
    .then( async function () {
        console.log('handle')
        const cursor = Items.find().cursor();
        await cursor.eachAsync(async function(doc) {
            await new Promise(function (resolve,reject) {
                handle(doc,resolve)
            });
        });
    })
    .then(function () {
        console.log('handle all items')
    })
    .catch(function (err) {
        console.log('err',err)
    })

return;




