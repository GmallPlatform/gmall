'use strict';
angular.module('gmall.directives')
.directive('stuffsListWithPaginate',['$state','Stuff','$timeout',function($state,Stuff,$timeout){
    return {
        restrict:"E",
        scope:{
            query:'=',
            rate:'=',
            mobile:'@'
        },
        //controller:"stuffsLWPCtrl",
        templateUrl:"components/stuff/stuffsWithPaginate.html",
        link:function($scope,element,attrs,ctrl){
            console.log('stuffsListWithPaginate')
            $scope.stuffsLWPCtrl={};
            $scope.stuffsLWPCtrl.scrollId= $scope.scrollId;
            $scope.stuffsLWPCtrl.rate=$scope.rate;
            $scope.stuffsLWPCtrl.paginate={page:0,rows:20,totalItems:0}
            $scope.stuffsLWPCtrl.getList=function(page,rows){
                Stuff.getList($scope.query,null,page,rows,$scope.stuffsLWPCtrl.paginate).then(function(res){
                    $scope.stuffsLWPCtrl.items=res;
                    //$timeout(function(){$scope.$emit('endLoadStuffs');},300)
                    $scope.query=null;
                    $scope.$emit('$allDataLoaded');
                },function(err){
                    $state.go('404');
                });
            }
            var i=0;
            $scope.$watch(function(){return $scope.query},function(n){
                console.log(n)
                if(n){
                    $scope.stuffsLWPCtrl.paginate.page=0;
                    $scope.stuffsLWPCtrl.getList($scope.stuffsLWPCtrl.paginate.page,$scope.stuffsLWPCtrl.paginate.rows);
                }
            })

            /*$scope.getCategoryName = Stuff.getCategoryName;
            $scope.getBrandName = Stuff.getBrandName;*/

        }
    }
}])
