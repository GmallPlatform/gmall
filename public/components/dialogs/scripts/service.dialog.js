'use strict';
angular.module('gmall.services')
.factory('$dialogs', function ($resource) {
    return $resource('/api/collections/Dialog/:id',{id:'@_id'});
})

