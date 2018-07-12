'use strict';
var fs=require('fs')
var pug=require('pug');
var globalFunction=require('./public/scripts/myPrototype.js')
try{
    let pugFile = fs.readFileSync('5867d1b3163808c33b590c12.pug', "utf8");
    const pugData = JSON.parse(fs.readFileSync('5867d1b3163808c33b590c12.data', "utf8"));
    const time1=Date.now()
    console.time("rendering time");
    const fn = pug.compile(pugFile,{debug:false,compileDebug:false});
    const html = fn(pugData);
    const time2=Date.now()
    console.timeEnd("rendering time");
}catch(err){console.log(err)}









