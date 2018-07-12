'use strict';

angular.module('gmall.services')

.factory('Collection', function ($resource) {
    return $resource('/api/collections/Collection/:id', {
        id: '@id'
    }, {
        getCollectionsForBrand: {
            method: 'GET',
            isArray: true,
            params: {
                id:'',
                query:'query'
            }
        }
    });
})

