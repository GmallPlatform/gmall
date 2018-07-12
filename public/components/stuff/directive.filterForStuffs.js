'use strict';
angular.module('gmall.directives').directive('filterForStuffs',['$rootScope','global','$q','$location','$section','Collection',function($rootScope,global,$q,$location,$section,Collection){
    return {
        scope:{
           query:'='
        },
        restrict:"E",
        templateUrl:"components/stuff/filterForStuffs.html",
        link:function($scope,element,attrs){
            var $state=$rootScope.$state;
            var $stateParams=$rootScope.$stateParams;
            $scope.filterDirective={};
            //$scope.filterDirective.paginate={page:0,rows:50,totalItems:0}
            $scope.filterDirective.query={section:'',brand:'',category:'',tags:[],artikul:($stateParams.searchStr)?$stateParams.searchStr.clearTag(20):'',brandTag:''};
            $scope.filterDirective.categories=[]; // список категорий для визуального блока фильтров
            var queryTags,category;// теги из строки запроса и активная категория
            $scope.filterDirective.brands=[]; // список брендов для визуального блока фильтров
            $scope.filterDirective.brandCollections=[];
            $scope.filterDirective.filters=[];


            // определяем в каком состоянии мы находимся. в разделе, категории или всем каталоге
            // затем устанавливаем параметры  в строку запроса если они соответствую  нащей логике
            // затем вызываем функцию получения списка
            // затем начинаем слущать клик на любом из фильтров
            // в функции $scope.filterDirective.changeFilter
            // если клик на категории то перегружаем контроллер если на фильтре то делаем запрос на новый список
            //*****************************************
            function initChainForGettingList(){
                var q=$q.defer(); q.resolve();return q.promise;
            }
            //console.log($stateParams)
            initChainForGettingList()
                .then(function(){
                    //**************************************** Г Р У П П А   ********************************************
                    var q=$q.defer();
                    // группы категорий
                    if ($stateParams.groupUrl!='brand' && $stateParams.groupUrl!='group'){
                        // получение массива категорий
                        var group=global.get('groups').val.getObjectFromArray('url',$stateParams.groupUrl);
                        if(group){
                            // устанавливает груаау категорий
                            $scope.filterDirective.query.section=group._id;
                            if($stateParams.parentGroup){
                                // в дополнительных парметрах передается родительсая группа для категорий
                                // если ее нет, то все нет и списка категорий. соответствено нет ни фильтров ни брендо. выводится полный каталог для данной
                                var categories = $section.getCategories($stateParams.parentGroup).map(function(i){
                                    return (i._id)?i._id:i;
                                });
                                //console.log(categories)
                                if (categories){
                                    // приведение к общему виду списка категорий для фильтров
                                    $scope.filterDirective.categories=global.get('categories').val.filter(function(item){return (categories.indexOf(item._id))>-1?true:false});
                                }
                            }
                            q.resolve($scope.filterDirective.categories);
                        }else{
                            //нет такого раздела
                            $state.go('404')
                        }
                    } else {
                        q.resolve(1);
                    }
                    return q.promise;
                })
                .then(function(r){
                    //**************************************** К А Т Е Г О Р И Я  ********************************************
                    // получение выбранной категории
                    // основной шаг. от него отталкиваемся. есть категория в запросе или нет
                    // для получения брендов и фильтров
                    var q=$q.defer();
                    if($scope.filterDirective.categories.length && $stateParams.categoryUrl){
                        if ($stateParams.categoryUrl!='id'){
                            category=$scope.filterDirective.categories.getObjectFromArray('url',$stateParams.categoryUrl);
                            // устанавливаем категорию в строку запроса
                            if (category){
                                $scope.filterDirective.query.category=category._id;
                            } else {
                                // неверно уствновлен url категории
                                $state.go('404')
                            }
                        }
                    } else if($stateParams.categoryUrl!='id'){
                        // не была установлена робительская группа. вычимляем ее по категории
                        // если она не была установлена для всех категорий то весь каталог
                        category=global.get('categories').val.getObjectFromArray('url',$stateParams.categoryUrl);
                        if (category){
                            $scope.filterDirective.query.category=category._id;
                            $scope.filterDirective.categories=$section.getCategories(category.group.url)
                        }
                        //console.log(category)
                    }
                    q.resolve();
                    return q.promise;
                })
                .then(function(){
                    //****************************************Б Р Е Н Д   ********************************************
                    var q=$q.defer();
                    // бренд привязаны к категориям. соответственно если есть выбранная категория то
                    // получаем списков брендов
                    if ($scope.filterDirective.query.category){
                        $scope.filterDirective.brands = global.get('brands').val.getArrayObjects('categories',$scope.filterDirective.query.category)
                    }
                    // если бренд один устанавливаем его активным и получаем список коллекций
                    // при этом не важно есть ли бренд в параметрах
                    if ($scope.filterDirective.brands.length===1){
                        $scope.filterDirective.query.brand= $scope.filterDirective.brands[0]._id;
                    } else {
                        // проверяем наличие параметра  в url и если он совпадает с одним из брендов то устранавливаем бренд
                        // в запросе
                        if ($stateParams.brand){
                            var brand =  $scope.filterDirective.brands.getObjectFromArray('url',$stateParams.brand);
                            //console.log('brand-',brand)
                            if (brand){
                                $scope.filterDirective.query.brand=brand._id;
                                $location.search('brand',brand.url);
                            }
                        }
                    }
                    if (!$scope.filterDirective.query.brand){
                        $location.search('brand',null);
                    }
                    q.resolve();
                    return q.promise;
                })
                .then(function(){
                    //**************************************** К О Л Л Е К Ц И И  ********************************************
                    var q=$q.defer();
                    // console.log($stateParams)
                    // если установлен бренд в запросе то  получаем для него коллекции
                    if ($scope.filterDirective.query.brand){
                        var query={brand:$scope.filterDirective.query.brand,group:$scope.filterDirective.query.section}
                        Collection.getCollectionsForBrand({query:query},function(res){
                            res.shift();
                            $scope.filterDirective.brandCollections=res;
                            if ($stateParams.brandTag){
                                // если есть tag коллекции в стороке запроса то устанавливаем его в филоьтрах
                                var brandTag=$scope.filterDirective.brandCollections.getObjectFromArray('url',$stateParams.brandTag);
                                //console.log($stateParams.brandTag,brandTag)
                                if(brandTag){
                                    $scope.filterDirective.query.brandTag=brandTag._id;
                                    $location.search('brandTag',brandTag.url);
                                } else {
                                    $location.search('brandTag',null);
                                }
                            }
                            q.resolve(1);
                        },function(){q.resolve(3);})
                    }else{q.resolve(2);}
                    return q.promise;
                }) // end collections
                .then(function(){
                    //**************************************** Т Е Г И  ********************************************
                    //console.log(r)
                    var q=$q.defer();
                    // получение тегов если они есть в параметрах в массив
                    //для дальнейщей установки в визуальных фильтрах
                    if($stateParams.queryTag){
                        //console.log($stateParams);
                        // агализ url на наличие тегов*************
                        queryTags=$stateParams.queryTag.split('+');
                        // удаляем возможные дубли
                        queryTags = queryTags.filter(function(item, pos) {
                            return queryTags.indexOf(item) == pos;
                        })
                        queryTags=queryTags.reduce(function(tags,tag){
                            var t;
                            if (t=global.get('filterTags').val.getObjectFromArray('url',tag)){
                                tags.push(t);
                            }
                            return tags
                        },[])
                    }
                    q.resolve();
                    return q.promise;
                })
                .then(function(){
                    //**************************************** Ф И Л Ь Т Р Ы ********************************************
                    var q=$q.defer();
                    // получение списка фильтров для данной категории для визуального представления
                    if ($scope.filterDirective.query.category){
                        var filters=global.get('filters').val.filter(
                            function(item){return (!item.dontshow && category.filters.indexOf(item._id)>-1)?true:false})
                        // получение списка тегов для каждого фильтра
                        filters.forEach(function(item,i){
                            item.tags=[];
                            global.get('filterTags').val.forEach(function(tag){
                                if (tag.filter==item._id){item.tags.push(tag)}
                            })
                            // устанавливаем значения в фильтрах
                            if (queryTags &&  queryTags.length){
                                queryTags.forEach(function(tag){
                                    if (tag.filter==item._id){
                                        if (!$scope.filterDirective.query.tags[i]){$scope.filterDirective.query.tags[i]=[]};
                                        $scope.filterDirective.query.tags[i].push(tag._id);
                                    }
                                })
                            }
                        })
                        $scope.filterDirective.filters=filters;

                    } else {
                        if (queryTags && queryTags.length){
                            $scope.filterDirective.query.tags[0]=[queryTags[0]._id]
                            $location.search('queryTag', queryTags[0].url);
                        }
                    }
                    q.resolve('finsh');
                    return q.promise;
                })
                .then(function(r){
                    /*console.log(r)
                     console.log($scope.filterDirective.query)
                     console.log($scope.filterDirective.filters)*/
                    $scope.filterDirective.getList()
                })


            var prevBrand;
            function _getCollections(){
                var query={brand:$scope.filterDirective.query.brand,group:$scope.filterDirective.query.section}
                Collection.getCollectionsForBrand({query:query},function(res){
                    res.shift();
                    $scope.filterDirective.brandCollections=res;
                    if ($scope.filterDirective.brandCollections){
                        if ($stateParams.brandTag){
                            // если есть tag коллекции в стороке запроса то устанавливаем его в филоьтрах
                            var brandTag=$scope.filterDirective.brandCollections.getObjectFromArray('url',$stateParams.brandTag);
                            //console.log($stateParams.brandTag,brandTag)
                            if(brandTag){
                                $scope.filterDirective.query.brandTag=brandTag._id;
                                $location.search('brandTag',brandTag.url);
                            } else {
                                $location.search('brandTag',null);
                            }
                        }
                    }
                })
            }
            function _getQueryTag(){
                var arr =[];
                //console.log($scope.filterDirective.query.tags)
                $scope.filterDirective.query.tags.forEach(function(tags){
                    if (tags.length){
                        tags.forEach(function(tag){
                            arr.push(tag)
                        })
                    }
                })
                //console.log(arr)
                if(arr.length){
                    return arr.map(function(tag){return global.get('filterTags').val.getObjectFromArray('_id',tag).url}).join('+')
                }else{
                    return ;
                }

            }
            function _getBrand(){
                if ($scope.filterDirective.query.brand){
                    return global.get('brands').val.getObjectFromArray('_id',$scope.filterDirective.query.brand).url;
                }

            }
            function _getBrandTag(){
                if ($scope.filterDirective.query.brandTag){
                    return $scope.filterDirective.brandCollections.getObjectFromArray('_id',$scope.filterDirective.query.brandTag).url;
                }

            }
            $scope.filterDirective.getList=function(){
                //$scope.endLoadStuff=false;
                //console.log('получение списка - ',ii++,' раз')
                prevBrand=$scope.filterDirective.query.brand;
                // формирование строки запроса для выбора  товаров из БД
                var query=[];
                if (global.get('nostore').val){
                    query.push({tags:{$nin:[global.get('nostore').val._id]}})
                }
                //console.log($scope.filterDirective.query)
                var queryTag=[];
                for (var key in $scope.filterDirective.query){
                    if ($scope.filterDirective.query[key]){
                        if (key=="tags"){
                            var qu=[];
                            var queryTags=$scope.filterDirective.query[key].filter(function(){return true});
                            //console.log(queryTags);
                            $scope.filterDirective.query[key].forEach(function(obj,i){
                                //console.log(i)
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
                            })
                            if (qu.length){
                                if(qu.length==1){
                                    query.push(qu[0]);
                                } else {
                                    query.push({$and:qu});
                                }
                            }
                        } else {
                            //console.log();
                            var obj={};
                            obj[key]=$scope.filterDirective.query[key];
                            query.push(obj);
                        }
                    }
                }
                if (query.length==1){
                    query=JSON.stringify(query[0]);
                } else if(query.length>1){
                    query =JSON.stringify({$and:query});
                } else {
                    query='';
                }
                //console.log(query);
                /*console.log(query); if (i>1)return;
                 i++;*/

                //********* start titles
                var queryTag=_getQueryTag();
                var brandTag=_getBrandTag();
                var brand=_getBrand();
                var queryTagsForSEO='';
                if (queryTag) {
                    queryTagsForSEO+='queryTag='+queryTag;
                }
                if (brand) {
                    if(queryTagsForSEO){queryTagsForSEO+='&';}
                    queryTagsForSEO+='brand='+brand;
                }
                if (brandTag) {
                    if(queryTagsForSEO){queryTagsForSEO+='&';}
                    queryTagsForSEO+='brandTag='+brandTag;
                }
               // console.log(queryTagsForSEO)
                //$rootScope.$broadcast('$allDataLoaded',{state:$state.current.name,data:queryTagsForSEO});
                // передача данных в директиву
                $scope.query=query;
            }
            $scope.filterDirective.changeFilter=function(c){
                //console.log($scope.filterDirective.query)
                var category= (!$scope.filterDirective.query.category)?{name:'category',url:'id'}:$scope.filterDirective.categories.getObjectFromArray('_id',$scope.filterDirective.query.category);
                //console.log(category)
                if (c){
                    $state.current.reloadOnSearch = true;
                    //var category= (!$scope.filterDirective.query.category)?{name:'category',url:'id'}:$scope.filterDirective.categories.getObjectFromArray('_id',$scope.filterDirective.query.category);
                    var o={groupUrl:$stateParams.groupUrl,categoryUrl:category.url,categoryName:category.name,queryTag:undefined,brand:undefined,brandTag:undefined};
                    $state.go($state.current.name,o,{reload:true});
                    $state.current.reloadOnSearch = false;
                }else{
                    // очищаем строку параметров
                    $location.search('');


                    $scope.filterDirective.query.artikul='';
                    if ($scope.filterDirective.query.brand && (!$scope.filterDirective.brandCollections || prevBrand!=$scope.filterDirective.query.brand)){
                        _getCollections($scope.filterDirective.query.brand);
                        $scope.filterDirective.query.brandTag='';
                    } else if (!$scope.filterDirective.query.brand){
                        $scope.filterDirective.brandCollections=null;
                        $scope.filterDirective.query.brandTag='';
                    }
                    
                    $scope.filterDirective.getList();
                    var queryTag=_getQueryTag();
                    var brandTag=_getBrandTag();
                    var brand=_getBrand();

                    //var o = {groupUrl:$scope.filterDirective.groupUrl,categoryUrl:category.url,categoryName:category.name}
                    if (queryTag) {
                        $location.search('queryTag', queryTag);
                    }
                    if (brandTag) {
                        $location.search('brandTag', brandTag);
                    }
                    if (brand) {
                        $location.search('brand', brand);
                    }
                    if ($stateParams.brandTag){
                        $location.search('brandTag',$stateParams.brandTag);
                    }

                    //$state.go('stuff',o,{notify:false});
                }
            }
            $scope.filterDirective.clearFilter=function(){
                console.log('clear filetrs')
                $scope.filterDirective.query.tags=[];
                $scope.filterDirective.changeFilter();
            }
        }
    }
}])
