'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('priceGoods',itemsGoods)
        //.directive('priceServices',itemsServices)

    function itemsGoods(){
        return {
            template:"<div></div>",
            //controller: goodsCtrl
        }
    }
    /*function itemsServices(){
        return {
            template:"<div></div>",
            bindToController: true,
            scope: {},
            controllerAs: '$ctrl',
            //controller: servicesCtrl
        }
    }*/


    function itemsServices($scope,$element,$compile,$http,$stateParams,$state,$anchorScroll,global,$q,$rootScope,$location,$timeout,$sce){
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
                    return $http.get('views/template/partials/priceservices.html')
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
                                global.get('titles').val[k]+=response.data.titles[k]
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

})()



