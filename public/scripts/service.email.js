'use strict';
angular.module('gmall.services')
.factory('$email', function ($resource) {
    return $resource('/api/sendEmail');
})
    .factory('Email', function ($resource) {
        return $resource('/api/sendEmails');
    })

