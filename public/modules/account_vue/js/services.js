'use strict';
angular.module('gmall.services', [])
.factory('socket', function (socketFactory) {
    return socketFactory({host:socketHost});
})

