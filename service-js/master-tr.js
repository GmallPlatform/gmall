'use strict';
var globalFunction=require('./public/scripts/myPrototype.js')
var co=require('co')
var fs = require('fs');
var path = require('path');
var mongoose=require('mongoose');
var db = mongoose.connect('mongodb://localhost/gmall-stuff',{useMongoClient:true});
// Bootstrap models
var modelsPath = path.join( __dirname, 'stuff/models' );
require( modelsPath + '/master.js' );
require( modelsPath + '/stuff.js' );
var i=0;
var async = require('async')
var Items= mongoose.model('Master');

function handle(doc, callback) {
    let data={}
    if(doc.blocks && doc.blocks.length){
        doc.blocks.forEach(b=>{
            if(b.type=='position' && b.position){
                data.position=b.position;
                if(b.positionL){
                    data.positionL=b.positionL;
                }
            }
        })
    }
    console.log(doc.name,data)
    //return callback();
    Items.update({_id:doc._id},{$set: data},function () {
        callback()
    })


}


async function run() {
    console.log('handle')
    const cursor = Items.find()
        .cursor();
    await cursor.eachAsync(async function(doc) {
        await new Promise(function (resolve,reject) {
            handle(doc,resolve)
        });


    });
    console.log('handle all items')
}
run()
