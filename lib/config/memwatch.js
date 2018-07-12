'use strict';

var Template =mongoose.model('Template');
var User=mongoose.model('User');
var Config=mongoose.model('Config');
module.exports = function() {
     var memwatch = require('memwatch-next');
     var firstLine=true;
     memwatch.on('leak', function(info) {
         var fs = require("fs");
         info= JSON.stringify(info, null, ' ');
         fs.appendFile('memory-leak.log', info);
     });
     memwatch.on("stats", function(stats) {
         var fs = require("fs"),
         info = [];
         if(firstLine) {
         info.push("num_full_gc");
         info.push("num_inc_gc");
         info.push("heap_compactions");
         info.push("usage_trend");
         info.push("estimated_base");
         info.push("current_base");
         info.push("min");
         info.push("max");
         fs.appendFileSync('memory.log', info.join(",") + "\n");
         info = [];
         firstLine = false;
     }

         info.push(stats["num_full_gc"]);
         info.push(stats["num_inc_gc"]);
         info.push(stats["heap_compactions"]);
         info.push(stats["usage_trend"]);
         info.push(stats["estimated_base"]);
         info.push(stats["current_base"]);
         info.push(stats["min"]);
         info.push(stats["max"]);

         fs.appendFile('memory.log', info.join(",") + "\n");
     });
};