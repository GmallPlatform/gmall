var async = require('async')
// create a queue object with concurrency 2
var q = async.queue(function(task, callback) {
    console.log('hello ' + task.name);
    callback();
}, 2);

// assign a callback
q.drain = function() {
    console.log('all items have been processed');
};


// add some items to the queue
q.push({name: 'foo'}, function(err) {
    console.log('finished processing foo');
});
q.push({name: 'bar'}, function (err) {
    console.log('finished processing bar');
});

// add some items to the queue (batch-wise)
q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
    console.log('finished processing item');
});

// add some items to the front of the queue
q.unshift({name: 'bar'}, function (err) {
    console.log('finished processing bar');
});

return;
String.prototype.getFormatedDate=function(){
    var d=new Date(this);
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    return   curr_date+ "-" + curr_month+ "-" +curr_year
}
var s ='lkldkf';
//console.log( s.getFormatedDate())
/*
var im = require('imagemagick');
var target_path='18.jpg'
var target_path1='2.jpg';
var dimension = 1400;
im.resize({
    srcPath: target_path,
    dstPath: target_path1,
    quality: 0.6,
    width:   dimension
}, function(err, stdout, stderr){
    console.log('err-',err)

});
*/

'use strict';

function* gen() {
    "use strict";
    // Передать вопрос во внешний код и подождать ответа
    let  result = yield "Сколько будет 2 + 2?";

    console.log(result);
}

var  generator = gen();

var   question = generator.next().value;
// "Сколько будет 2 + 2?"

console.log(question)

//setTimeout(() => generator.next(4), 2000);
