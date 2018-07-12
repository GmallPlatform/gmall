'use strict';
angular.module('gmall.directives')
.directive('stuffDetail',['$anchorScroll','global','Stuff','seoContent','CouponServ','$sce',function($anchorScroll,global,Stuff,seoContent,CouponServ,$sce){
    return {
        restrict:"E",
        scope:{
            rate:'=',
            mobile:'@',
            url:'='
        },
        templateUrl:"components/stuff/stuffDetail.html",
        link:function($scope,element,attrs){

            //console.log('link stuffDetail');
            $anchorScroll();
            $scope.currency=global.get('currency');
            //console.log($scope.currency)
            //-- Variables --//
            // список купонов для предложения купона
            $scope.coupons=global.get('coupon').val;
            $scope.couponServ=CouponServ;

            // получение товара
            Stuff.getItem($scope.url,function(item){
                $scope.stuff=item;
                if ($scope.stuff.stuffGroups && $scope.stuff.stuffGroups.length){
                    for(var i= 0,l=$scope.stuff.stuffGroups.length;i<l;i++){
                        if($scope.stuff.stuffGroups[i].type==1){
                            $scope.colorGroup=$scope.stuff.stuffGroups[i];
                            break;
                        }

                    }
                    //console.log($scope.colorGroup);
                    //$scope.recommendGroup=$scope.stuff.group.rec;
                }
                // мета данные
                //$rootScope.dataForSeoService=$scope.stuff;
                $scope.$emit('$allDataLoaded',{state:'stuffs.stuff',data:$scope.stuff});
                $scope.objShare=seoContent.setDataStuff($scope.stuff);
                console.log($scope.objShare);
                //console.log($scope.objShare);
                //!***********************************************************
                $scope.filterCoupon = filterCoupon;
            });
            var filterCoupon=function(item){
                if (!global.get('user').val)return true;
                // показываем только те купоны, которые есть в списке у пользователя и относятся к данному seller
                //console.log(global.get('user'))
                if (!item.seller)return;
                //console.log();
                return item.seller && $scope.stuff.seller==item.seller && global.get('user').val.coupons.indexOf(item._id)<0 &&
                    global.get('user').val.coupon.indexOf(item._id)<0;

            }
            $scope.getUrlParams=function(stuff){
                //console.log($scope.stuff.getUrlParams.call(stuff))
                return $scope.stuff.getUrlParams.call(stuff)
            }
            $scope.trustHtml = function(text){
                var trustedHtml = $sce.trustAsHtml(text);
                //console.log(text)
                return trustedHtml;
            };
        }
    }
}])


