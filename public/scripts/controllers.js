'use strict';
angular.module('gmall.controllers', [])
    .controller('404Ctrl', ['$scope','seoContent',function ($scope,seoContent) {
        //********* start titles
        seoContent.setData404();
        //********* end titles
    }])
.controller('mainFrameCtrl',['$scope','global','$witgets','$http','anchorSmoothScroll','$state','$timeout','$sce','$order','toaster','$rootScope','User','$window',function($scope,global,$witgets,$http,anchorSmoothScroll,$state,$timeout,$sce,$order,toaster,$rootScope,User,$window){
    $scope.mainFrameCtrl=this;
    $scope.mainFrameCtrl.sizeMenu='350px';
    $scope.mainFrameCtrl.scrollTo = function(id) {
        //console.log(id);
        anchorSmoothScroll.scrollTo(id);
    };
        //console.log(global.get('store' ).val)
    /*$scope.mainFrameCtrl=this;
    $scope.mainFrameCtrl.checkedMenu = false;

    $scope.mainFrameCtrl.titles=global.get('titles');*/
    // сообщение из формы обратной связи в футере
    //$scope.mainFrameCtrl.feedback={email:'',name:'',text:''}
    /*$scope.mainFrameCtrl.sendMessage = function(form){
        if ($scope.mainFrameCtrl.feedback.text.length<10){
            alert('В сообщении меньше 10 символов');
        }else{
            $scope.mainFrameCtrl.feedback.text=$scope.mainFrameCtrl.feedback.text.clearTag(1000);
            //console.log($scope.mainFrameCtrl.feedback.text);
            $scope.mainFrameCtrl.feedback.action='feedback';
            $http.post('/api/feedback',$scope.mainFrameCtrl.feedback)
                .success(function(data, status) {
                    $scope.mainFrameCtrl.feedback.text='';
                    var pap = global.get('paps').val.getObjectFromArray('action','feedback');
                    if(pap && pap.url){
                        $state.go('thanksPage',{url:pap.url})
                    } else {
                        alert('УВЕДОМЛЕНИЕ'+' сообщение отправлено');
                    }
                })
                .error(function(data, status) {
                    alert('не получается отправить сообщение, повторите отправку позже')
                });
        }
    };*/
    // поиск товара


    /*$scope.mainFrameCtrl.getTamplatePath = function(s){
        return 'views/'+global.get('store').val.template.folder+'/partials/'+s;
    }*/
    // генерация произвольного id
    /*$scope.mainFrameCtrl.guidGenerator=function() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        console.log((S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()));
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }*/
    /*$scope.mainFrameCtrl.getDate=function(date){
        if (!date) return '';
        var d=new Date(date);
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1;
        var curr_year = d.getFullYear();
        return   curr_date+ "-" + curr_month+ "-" +curr_year 
    }
    */
}])
.controller('homeCtrl', ['$scope','$q','$resource','global','seoContent','anchorSmoothScroll','$anchorScroll','News','exception','$auth','$stateParams','$location','Account','HomePage',
    function ($scope,$q,$resource,global,seoContent,anchorSmoothScroll,$anchorScroll,News,exception,$auth,$stateParams,$location,Account,HomePage) {

        if($stateParams.token){
            $auth.setToken({data:{token:$stateParams.token}})
            $location.search('token',null);
            if($auth.isAuthenticated()){
                Account.getProfile()
                    .then(function(response) {
                        global.set('user',response.data);
                        global.get('functions').val.logged();
                    })
                    .catch(function(response) {
                        if(response && response.data){
                            exception.catcher(response.status)(response.data.message);
                        }
                    });
            }
        }
        $anchorScroll();
}])
    .controller('unsubscriptionCtrl',['$scope','global','Account','$q','$state','exception','toaster',function($scope,global,Account,$q,$state,exception,toaster){
        /*if(!global.get('user').val){
            global.get('functions').val.enter();
        }
        */
        /*global.get('functions').val.enter();
        $scope.unsubscription=function(){
            $q.when()
                .then(function(){
                    return Account.unsubscription();
                })
                .then(function(){
                    toaster.pop({
                        type: 'success',
                        title: 'Рассылка',
                        body: 'Вы успешно отписалить от рассылки!'
                    });
                    $state.go('home')
                })
                .catch(function(err){
                    err=err.data||err;
                    exception.catcher('отписка от рассылки')(err)
                })

        }
*/
    }])





