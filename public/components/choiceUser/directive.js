'use strict';

/* Directives */
var directives = angular.module('gmall.directives');
directives.directive('choiceUser',['$resource' ,function($resource) {
     return {
         restrict: 'E',
         scope: { onSelected: '&'},
         templateUrl:'components/choiceUser/index.html',

         link: function ( scope, $element ) {
             console.log('link');
             scope.select={};
             var User =$resource('/api/collections/User/:id',{id:'@_id'});
             scope.selectUser = function(user){
                 console.log(user)
                 scope.onSelected({user:user});
             }
             scope.refresUsers = function(search) {
                 //console.log(search)
                 if (search && search.length && search.length>2){
                     User.query({search:search.substring(0,30).replace(/\\/g, '')},function(res){
                         if(res){
                             scope.select.users=res;
                             //console.log(scope.select.users)
                         }else{
                             scope.select.users=[]
                         }
                     })
                 }
             }
         }
     };
 }])