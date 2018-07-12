'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('priceGoods',function () {
            return {
                template:"<div></div>",
                controller: goodsCtrl
            }
        })
        .directive('priceServices',function () {
            return {
                template:"<div></div>",
                controller: servicesCtrl
            }
        })
    function goodsCtrl($scope,$element,$compile,$http,$stateParams,$state,$anchorScroll,global,$q,$rootScope,$location,$timeout,$sce){
        var self=this;
        self.global=global;
        $q.when()
            .then(function(){
                if(global.get('tempContent').val){
                    var html = global.get('tempContent').val;
                    $('#tempContent').empty()
                    global.set('tempContent',null)
                    var o ={data:{html:html}}
                    if(tempTitles){
                        o.data.titles=tempTitles
                    }
                    return o;
                }else{

                    return $http.get('views/template/partials/pricegoods.html')
                }
            })
            .then(function (response) {
                //console.log(response)
                var linkFn = $compile(response.data.html);
                var content = linkFn($scope);
                $element.append(content);
                //$element.append(response.data.html);
                $anchorScroll()
                //console.log(response.data.titles)
                //var titles = {}
                if(response.data.titles && response.data.titles.title){
                    for(var k in response.data.titles){
                        //console.log(k)
                        if(response.data.titles[k]){
                            if(k=='title'){
                                if(response.data.titles[k].indexOf(global.get('titles').val[k])<0){
                                    global.get('titles').val[k]=response.data.titles[k]+'. '+global.get('titles').val[k];
                                }else{
                                    global.get('titles').val[k]=response.data.titles[k];
                                }
                            }else if(k=='canonical'){
                                try{
                                    global.get('titles').val[k]=$sce.trustAsResourceUrl(response.data.titles[k]);
                                }catch(err){console.log(err)}

                                //console.log(global.get('titles').val[k])
                            }else{
                                global.get('titles').val[k]=response.data.titles[k]
                            }
                        }
                    }

                    //global.set('titles',titles)
                }
            })
    }

    function servicesCtrl($scope,$element,$compile,$http,$stateParams,$state,$anchorScroll,global,$q,$rootScope,$location,$timeout,$sce){
        var self=this;
        self.global=global;
        $scope.$watch(function () {
            return  global.get('currency').val
        },function (n,o) {
            if(n!=o){
                getNewPrice()
            }
        })
        $q.when()
            .then(function(){
                if(global.get('tempContent').val){
                    var html = global.get('tempContent').val;
                    $('#tempContent').empty()
                    global.set('tempContent',null)
                    var o ={data:{html:html}}
                    if(tempTitles){
                        o.data.titles=tempTitles
                    }
                    return o;
                }else{
                    return $http.get('views/template/partials/priceservices.html?currency='+global.get('currency').val)
                }
            })
            .then(function (response) {
                //console.log(response)
                var linkFn = $compile(response.data.html);
                var content = linkFn($scope);
                $element.append(content);
                $anchorScroll()
                if(response.data.titles && response.data.titles.title){
                    for(var k in response.data.titles){
                        if(response.data.titles[k]){
                            if(k=='title'){
                                if(response.data.titles[k].indexOf(global.get('titles').val[k])<0){
                                    global.get('titles').val[k]=response.data.titles[k]+'. '+global.get('titles').val[k];
                                }else{
                                    global.get('titles').val[k]=response.data.titles[k];
                                }
                            }else if(k=='canonical'){
                                try{
                                    global.get('titles').val[k]=$sce.trustAsResourceUrl(response.data.titles[k]);
                                }catch(err){console.log(err)}
                            }else{
                                global.get('titles').val[k]=response.data.titles[k]
                            }
                        }
                    }

                    //global.set('titles',titles)
                }
            })
        function getNewPrice() {
            $q.when()
                .then(function(){
                    return $http.get('views/template/partials/priceservices.html?currency='+global.get('currency').val)
                })
                .then(function (response) {
                    //console.log(response)
                    var linkFn = $compile(response.data.html);
                    var content = linkFn($scope);
                    $element.empty()
                    $element.append(content);
                    $anchorScroll()
                })
        }
    }
})()



