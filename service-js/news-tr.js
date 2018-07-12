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
var stream = Items.find().populate('stuffs','name gallery url').stream();





var q = async.queue(function (doc, callback) {
    doc.blocks=[];
    let o ={type:'name'}
    doc.blocks.push(o)
    if(doc.img){
        let o ={type:'banner',img:doc.img,templ:1}
        doc.blocks.push(o)
        doc.img=''
    }
    if(doc.video){
        let o ={type:'videoLink',videoLink:doc.video}
        doc.blocks.push(o)
        doc.video=''
    }
    if(doc.desc){
        let o ={type:'text',desc:doc.desc}
        doc.blocks.push(o)
        doc.desc=''
    }
    if(doc.imgs && doc.imgs.length){
        let o ={type:'slider',imgs:doc.imgs}
        doc.blocks.push(o)
        doc.imgs=[]
    }
    if(doc.desc1){
        let o ={type:'text',desc:doc.desc1}
        doc.blocks.push(o)
        doc.desc1=''
    }
    if(doc.stuffs && doc.stuffs.length){
        let o ={type:'stuffs',imgs:doc.stuffs.map(function(s){return {name:s.name,img:(s.gallery&&s.gallery[0])?s.gallery[0].thumb:'',link:'/group/category/'+s.url}})}
        doc.blocks.push(o)
        doc.stuffs=[]
    }
    if(doc.desc2){
        let o ={type:'text',desc:doc.desc2}
        doc.blocks.push(o)
        doc.desc2=''
    }
    if(doc.desc3){
        let o ={type:'text',desc:doc.desc3}
        doc.blocks.push(o)
        doc.desc3=''
    }

    console.log(++i,' -' ,doc)
    /*let s;
     if(s=doc.blocks.getOFA('type','stuffs')){
     console.log(doc.name)
     console.log(s)
     }*/
    console.log(++i,' -' ,doc)
    Items.update({_id:doc._id},{$set:{blocks:doc.blocks,desc:'',img:'',imgs:[],stuff:[],desc1:'',desc2:'',desc3:'',video:''}},function () {
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




