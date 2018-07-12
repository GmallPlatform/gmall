'use strict';
angular.module('gmall.directives')
    .directive('checkUniqueFieldInBase',[function(){
        return {
            restrict: 'E',
            scope :{
                result:'=',
                Items:'=',
                field:'@',
                item:'=',
                msg:'@',
                color:'@'
            },
            template:'<p style="color:{{color}}" ng-if="result" ng-bind="msg"></p>',
            link:function(scope,$element){
                if (!scope.color){scope.color='red'}
                if (!scope.msg){scope.msg='такое значение уже используется'}
                var field = 'item.'+scope.field;
                //console.log(field)
                scope.$watch(function(){return 'item.'+scope.field;},function(n,o){
                    console.log(n,o)
                    if(n && n!=o){
                        var query = {};
                        qyery[scope.field]=n;
                        Items.query({query:query},function(res){
                            res.shift();
                            if(($scope.item._id && res.length && $scope.item._id!=res[0]._id)||($scope.item._id && res.length>1)
                                ||(!$scope.item._id && res.length)){
                                scope.result=true;
                            } else{
                                scope.result=false;
                            }
                        })
                    }
                })
            }
        }
    }])
