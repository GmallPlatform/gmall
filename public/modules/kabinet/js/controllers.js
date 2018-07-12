'use strict';
String.prototype.replaceBlanks = function(){
    if (!this) return;
    return this.replace(/(["',.\/\s])/g, "-");
}
angular.module('gmall.controllers', [])

 
