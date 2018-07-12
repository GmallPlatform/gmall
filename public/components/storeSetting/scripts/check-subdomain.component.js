'use strict';
angular.module('gmall.directives')
.directive('checkDomainName', function(){
    return {
        restrict:'A',
        scope:{
            item:'=checkDomainName',
            exist:'=',
            field:'@'
        },
        bindToController: true,
        controller: checkSubdomainNameCtrl
    };
    checkSubdomainNameCtrl.$inject=['$scope','Store']
    function checkSubdomainNameCtrl($scope,Store){
        if(!$scope.item.subDomain){$scope.exist=true;}
        //var self=this;
        var field=$scope.field;
        //console.log($scope.item[field])
        $scope.$watch(function(){return $scope.item[field]},checkName);
        function checkName(name){
            if(!name){$scope.exist=true;return}
            //console.log(name)
            var o={};
            o[field]=name;
            Store.query({query:{$and:[o,{_id:{$ne:[$scope.item._id]}}]}},function(res){
                if(!res.length){
                    $scope.exist=false;
                }else{
                    $scope.exist=true;
                }
            },function(err){
                $scope.exist=true;
            })
        }

    }
})
