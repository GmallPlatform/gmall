'use strict';
module.exports = function(mongoose) {
    var options = {
        cache: true, // start caching
        ttl: 30 // 30 seconds
    };
    var mongooseCachebox=require('mongoose-cachebox');
    mongooseCachebox(mongoose, options);

};