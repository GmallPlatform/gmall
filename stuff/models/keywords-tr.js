'use strict';
var co=require('co')
var fs = require('fs');
var path = require('path');


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var db = mongoose.connect('mongodb://localhost/gmall-stuff',{db: {safe: true}});
// Bootstrap models
var modelsPath = path.join( __dirname, 'stuff/models' );
require( modelsPath + '/seopage.js' );
var i=0;
var async = require('async')
var Keywords= mongoose.model('Keywords');
var stream = Keywords.find().stream();





var q = async.queue(function (doc, callback) {
    // code for your update

    async.eachSeries(doc.keywords, function(item, cb) {
        let a = {word:item.word,_id:item._id}
        if(item.f){a.f=item.f}
        a.store=doc.store;
        let w = new Keywords(a)
        /*

         a.store= doc.store;
         let w = new Keywords(a)*/
        console.log(++i,' -' ,w)
        w.save(cb);
    },callback);
});

q.drain = function() {
    console.log('all items have been processed');
    //db.close();
}



stream.on('data', function (doc) {
    q.push(doc, function(err) {
        console.log('finished processing ',doc.store);
    });
}).on('error', function (err) {
    // handle the error
    console.log(err)
}).on('close', function () {
    // the stream is closed
    console.log('all done')
});
return;
Keywords.find(function(err,items){

    items.forEach(function(item,i){
        console.log(items[i].keywords)
        try{
            for(let k in item){
                //console.log(k)
                if(item.hasOwnProperty(k)){
                    //console.log(k)
                    if(k=='keywords'){
                        item.keywords.forEach(function(word){
                            let a = Object.assign({},word)
                            delete a._id
                            a.store= kwds.store;
                            let w = new keywords(a)
                            console.log(++i,' -' ,a)
                            //a.save();
                        })
                    }
                }

            }
        }catch(err){console.log(err)}


    })
})




