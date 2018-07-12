'use strict';

angular.module('gmall.services', []).
     value('version', '0.1')

.factory('socket', ['socketFactory',function (socketFactory) {
    return socketFactory();


}])


/*.factory('User', function ($resource) {
    return $resource('/api/users/:id/:email', {
        id: '@id'
    }, { //parameters default
        update: {
            method: 'PUT',
            params: {
                id:'profile',
                email:''
            }
        },
        updateCoupon: {
            method: 'PUT',
            params: {
                id:'coupon',
                email:''
            }
        },
        updatePswd: {
            method: 'PUT',
            params: {
                // id:'profile'
                id:'changepswd',
                email:''
            }
        },
        resetPswd: {
            method: 'POST',
            params: {
                id:'resetpswd',
                email:'@email'
            }
        },
        get: {
            method: 'GET',
            params: {
                id:'me',
                email:''
            }
        }
    });
})*/


// вынести в отдельный модуль
.factory('$witgets',['$resource', function ($resource) {
    /*//$scope.mainFrameCtrl={openWitget:false,witgetFile:'',witget:null,slides:[]}
    var Witget=$resource('/api/collections/Witget/:id',{id:'@id'});
    //$scope.openWitget=false;
    //$scope.contextWitget='myChildView.html';
    // сохраняем в нем таймауты для витжетов
        var witTimeout={};
        function callWitget(w){
            Witget.get({id: w._id},function(wit){
                witTimeout[w._id]=$timeout(function(){
                    openWitget(wit)
                }, w.deffer*500);
                witTimeout[w._id].then(
                    function() {

                        console.log( "Timer resolved!", Date.now() );

                    },
                    function() {

                        console.log( "Timer rejected!", Date.now() );

                    }
                );

            });
        }

        $scope.saveShownWitget = function(w){

            //console.log('ghbdtn');
            if (w.write){
                $http.get('api/lead/'+ w._id,function (res) {
                    //console.log(res);
                }, function (err) {
                    console.log(err);
                })
            }
            $scope.mainFrameCtrl.openWitget=false;
            $scope.mainFrameCtrl.witget=null;

        }

        function openWitget(w){
            //console.log(w);
            if (!$scope.mainFrameCtrl.openWitget) {
                $scope.mainFrameCtrl.openWitget=true;;
                if (w.type==1){
                    openWitgetModal(w)
                }else {
                    console.log('??');

                    //$scope.mainFrameCtrl.contextWitget= w.desc;
                    $scope.mainFrameCtrl.witget=  w;
                }

                //var sdf='<div ng-controller="ignupCtrl"></div>'
                //$compile(sdf)($scope);
            } else {
                witTimeout[w._id]=$timeout(function(){
                    openWitget(w)
                }, w.deffer*500);
            }
        }*/
    return {
        set:function(witgets){
            console.log(witgets);
            witgets.forEach(function(el){callWitget(el)});
        }
    }
}])


.service('anchorSmoothScroll', function(){
    
    this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        speed = 7;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            if (!elm) return 0;
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
    
})
    //
