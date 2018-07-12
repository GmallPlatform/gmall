'use strict';
(function() {
    angular.module('gmall.directives')
        .directive('searchList', searchList)
        .directive('searchStuffList', searchStuffList)


    function searchList() {
        return {
            template: "<div></div>",
            bindToController: true,
            scope: {
                searchStr:'='
            },
            controllerAs: '$ctrl',
            controller: listCtrl
        }
    }
    var controllersearchStuffList = ['$scope','$rootScope','global', function ($scope,$rootScope,global) {
        var self=this;
        self.global=global;

        self.allResults= function (){
            //console.log($scope.searchStr)
            $rootScope.$emit('closeSearchModal');
            $rootScope.$state.go('search',{searchStr:$scope.searchStr},{reload: true,inherit: false,notify: true });
            //href="/search?searchStr={{searchStr}}"
        }
        /*function init() {
            $scope.items = angular.copy($scope.datasource);
        }*/



        /*$scope.addItem = function () {
            $scope.add();

            //Add new customer to directive scope
            $scope.items.push({
                name: 'New Directive Controller Item'
            });
        };*/
    }]
    function searchStuffList() {
        return {
            templateUrl:'views/template/header/search/list.html',
            //bindToController: true,
            scope: {
                searchStuffList:"=",
                searchStr:'='
            },

            controllerAs: '$ctrl',
            controller: controllersearchStuffList
        }
    }


    function listCtrl($scope,$http,$element,global,$stateParams,$q,$anchorScroll,$timeout,$compile) {
        var self=this;
        self.global=global;
        //console.log(global.get('lang').val.allresults)
        var url = 'api/search?searchStr='+$stateParams.searchStr;
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
                    //return {data:{html:html}};
                }else{
                    return $http.get(url)
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
                                global.get('titles').val[k]+=response.data.titles[k]
                            }else{
                                global.get('titles').val[k]=response.data.titles[k]
                            }
                        }
                    }
                    //global.set('titles',response.data.titles)
                }
            })

    }
})()


