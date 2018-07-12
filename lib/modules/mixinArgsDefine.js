'use strict';
const globalVar=require('../../public/scripts/globalVariable.js')
const getNameProperty=globalVar.getNamePropertyCSS;
const lengthStyleBlock=globalVar.lengthStyleBlock+1;//+1 = $hover-background-color
var mixinArgsDefine='';
for(var j=0;j<lengthStyleBlock-1;j++){
    if(mixinArgsDefine){mixinArgsDefine+=','}
    mixinArgsDefine+='$'+getNameProperty(j)+':null';
}
mixinArgsDefine+=',$hover-background-color'+':null';
module.exports = mixinArgsDefine;
