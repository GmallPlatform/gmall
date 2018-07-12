'use strict';
angular.module('gmall.directives')
.directive('stuffsAdminListWithPaginate',['$rootScope','Stuff','$timeout','$q','Sections','createStuffService','queryFromUrlService','filterStuffsListService','FilterTags','Filters',function($rootScope,Stuff,$timeout,$q,Sections,createStuffService,queryFromUrlService,filterStuffsListService,FilterTags,Filters){
    return {
        restrict:"E",
        scope:{
            query:'=',
            rate:'=',
            mobile:'@'
        },
        //controller:"stuffsLWPCtrl",
        templateUrl:"components/stuff/stuffsAdminListWithPaginate.html",
        link:function($scope,element,attrs,ctrl){
            var $state=$rootScope.$state;
            var $stateParams=$rootScope.$stateParams;
            $scope.global=$rootScope.global;
            setTimeout(function(){$rootScope.displaySlideMenu=true;},400)

            var query,queryForFilter; // save current state params
            $scope.paginate={page:0,rows:20,totalItems:0}
            $scope.newStuff={name:'',actived:false}
            $scope.saveStuff = function(stuff,field){
                var f=field.split(' ');
                var o={_id:stuff._id}
                f.forEach(function(el){o[el]=stuff[el]})
                /*console.log(f)
                console.log(stuff)*/
                Stuff.Items.save({update:field},o,function(res){
                    console.log(res)
                    if(f[0]=='index'){
                        $scope.getList($scope.paginate.page,$scope.paginate.rows,'reload');
                    }
                })
            }
            $scope.getList=function(page,rows,reload){
                if ($scope.paginate.page!=page){
                    $scope.paginate.page=page;
                }
                return $q(function(resolve,reject){
                    var queryString;
                    if(reload){queryString=query}else{queryString=$scope.query}
                    Stuff.getList(queryString,null,page,rows,$scope.paginate).then(function(res){
                        $scope.items=res;
                        $scope.newStuff.index=($scope.items && $scope.items[0])?$scope.items[0].index:1;
                        //$timeout(function(){$scope.$emit('endLoadStuffs');},300)
                        if(!reload){
                            try {
                                query=JSON.parse($scope.query);
                            } catch (err) {
                                query={};
                            }
                            $scope.query=null;
                        }
                        resolve();
                    },function(err){
                        reject(err)
                    });
                })
            }
            var i=0;
            //*************************************************************************************************************
            //******************************************* для формирования url
            $scope.getUrlParams = Stuff.getUrlParams;
            //$scope.getUrlParams = Stuff.getUrlParams;
            //************************* for stuff URL *************************
            $scope.getCategoryName = Stuff.getCategoryName;
            $scope.getBrandName = Stuff.getBrandName;
            // работа со списком

            $scope.reloadList = function(){
                $scope.getList($scope.paginate.page,$scope.paginate.rows,'reload');
            }
            $scope.searchStuff = function(artikul){
                if(!artikul || artikul.length<3){return};
                artikul=artikul.substring(0,20)

                $state.current.reloadOnSearch = true;
                var o={groupUrl:'group',categoryUrl:'category',searchStr:artikul.substring(0,20),
                queryTag:null,brand:null,brandTag:null,categoryList:null}
                $state.go($state.current.name,o,{reload:true})
            }
            $scope.filterList=function(){
                $q.when()
                    .then(function(){
                        return filterStuffsListService.setFilters(queryForFilter)
                    })
                    .then(function(query){
                        queryForFilter=query;
                        $scope.query=prepareQueryForRequest(query)
                        //console.log($scope.query);
                        return $scope.getList($scope.paginate.page,$scope.paginate.rows);
                    })
                    .then(function(){
                    })
                    .catch(function(err){
                        console.log(err)
                    })
            }
            $scope.cloneStuff=function(stuff){
                var newStuff=angular.copy(stuff);
                $q.when()
                    .then(function(){
                        return createStuffService.cloneStuff(newStuff,true)
                    })
                    .then(function(stuff){
                        console.log($scope.newStuff==stuff)
                        $scope.newStuff=stuff
                        return $scope.getList($scope.paginate.page,$scope.paginate.rows,'reload');
                    })
                    .then(function(){
                        var url=newStuff.url;
                        //$scope.newStuff={name:'',actived:false}
                        $state.go('frame.stuffs.stuff',{groupUrl:'group',categoryUrl:'category',stuffUrl:url});
                    })
                    .catch(function(err){
                        console.log(err)
                    })




               /* var newStuff=angular.copy(stuff);
                $q.when()
                    .then(function(){
                        return createStuffService.cloneStuff(newStuff,true,$scope.reloadList)
                    })
                    .then(function(stuffFromResolve){
                        //console.log('stuffFromResolve-',stuffFromResolve);
                        console.log(newStuff===stuffFromResolve);

                    } )
                    .catch(function(err){
                        console.log(err)
                    })*/

            }
            $scope.createNewStuff = function(){
                $q.when()
                    .then(function(){
                        return createStuffService.cloneStuff($scope.newStuff)
                    })
                    .then(function(stuff){
                        console.log($scope.newStuff==stuff)
                        $scope.newStuff=stuff
                        return $scope.getList($scope.paginate.page,$scope.paginate.rows,'reload');
                    })
                    .then(function(){
                        var url=$scope.newStuff.url;
                        $scope.newStuff={name:'',actived:false}
                        $state.go('frame.stuffs.stuff',{groupUrl:'group',categoryUrl:'category',stuffUrl:url});
                    })
                    .catch(function(err){
                        console.log(err)
                    })

                /*if(!$scope.newStuff.name){return}
                $scope.newStuff.index=($scope.items && $scope.items[0])?$scope.items[0].index:1;
                var stuffUrl;
                $q.when()
                    .then(function(){
                        return Sections.getSections()
                    }) // полчение списка разделов
                    .then(function(sections){
                    // получение категорий и разделов
                        if ($stateParams.groupUrl!='brand' && $stateParams.groupUrl!='group'){
                            var section=sections.getOFA('url',$stateParams.groupUrl);
                            if(sections){
                                $scope.newStuff.section=section._id;
                                $scope.newStuff.store=section.store;
                                if($stateParams.categoryUrl!='category'){
                                    if(query['$and']){
                                        var a=query.$and;
                                        for(var j=0,l=a.length;j<l;j++){
                                            if(a[j].category && !a[j].category.$in){
                                                $scope.newStuff.category= a[j].category;
                                                break;
                                            }
                                        }

                                    }else{
                                        if(query.category && !query.category.$in){
                                            $scope.newStuff.category= query.category
                                        }
                                    }
                                }
                            }

                        }
                        return;
                    })
                    .then(function(){
                       // console.log($scope.newStuff);return;
                        var q=$q.defer();
                        Stuff.Items.save($scope.newStuff,function(res){
                            $scope.newStuff={name:'',actived:false};
                            q.resolve(res.url);
                        },function(err){q.reject(err)})
                        return q.promise;
                    })
                    .then(function(url){
                        stuffUrl=url;
                        return $scope.getList($scope.paginate.page,$scope.paginate.rows,'reload');

                    } )
                    .then(function(){
                        $state.go('frame.stuffs.stuff',{stuffUrl:stuffUrl});
                    })
                    .catch(function(err){
                        console.log(err)
                    })*/
            }
            $scope.deleteStuff=function(stuff){
                if(confirm("удалить???")){
                    Stuff.Items.delete({_id:stuff._id},function(res){
                        $scope.getList($scope.paginate.page,$scope.paginate.rows,'reload');
                    })
                }
            }

            function prepareQueryForRequest(queryStart){
                // формирование строки запроса для выбора  товаров из БД
                var query=[];
                for (var key in queryStart){
                    if (queryStart[key]){
                        if (key=="tags"){
                            var qu=[];
                            for (var key2 in queryStart[key]){
                                var obj=queryStart[key][key2];
                                var q=[];
                                if (obj && obj.length){
                                    obj.forEach(function(objT){
                                        q.push({tags:objT});
                                    })

                                    if (q.length>1){
                                        q={$or:q}
                                        qu.push(q)
                                    } else {
                                        q=q[0];
                                        qu.push(q)
                                    }
                                }
                            }
                            if (qu.length){
                                if(qu.length==1){
                                    query.push(qu[0]);
                                } else {
                                    query.push({$and:qu});
                                }
                            }
                        } else {
                            var obj={};
                            obj[key]=queryStart[key];
                            query.push(obj);
                        }
                    }
                }
                if (query.length==1){
                    query=JSON.stringify(query[0]);
                } else if(query.length>1){
                    query =JSON.stringify({$and:query});
                } else {
                    query={};
                }
                return query;
            }

            $q.when()
                .then(function(){
                    return queryFromUrlService.get()
                })
                .then(function(query){
                    queryForFilter=query;
                    $scope.query=prepareQueryForRequest(query)
                    return $scope.getList($scope.paginate.page,$scope.paginate.rows);

                })
                .then(function(){
                    return FilterTags.getFilterTags()
                })
                .then(function(filterTags){
                    $scope.filterTags=filterTags;
                })
                .then(function(){
                    return Filters.getFilters()
                })
                .then(function(filters){
                    $scope.filters=filters;
                })
                .catch(function(err){
                    console.log(err)
                })

            $scope.getTagName=function(_id){
                if(!_id)return;
                return $scope.filterTags.getOFA('_id',_id ).name||null;
            }
            $scope.getFilterName=function(_id){
                return $scope.filters.getOFA('_id',_id ).name||null;
            }
            $scope.changeSortOfStuff=function(stuff){
                var sort=stuff.stock[stuff.sort];
                //console.log(sort)
                stuff.price=sort.price;
                stuff.priceSale=sort.priceSale;
                stuff.retail=sort.retail;
            }
            $scope.filterSorts=function(sort){
                return sort.value.quantity
            }
            $scope.onSelected=function(){
                setTimeout(function(){
                    $(':focus').blur();
                })
            }
        }
    }
}])
