'use strict';
angular.module('gmall.controllers')
.controller('stuffCtrl', ['$scope','$resource','$rootScope','global','Stuff','$section','$location','$q','Collection','$anchorScroll','$timeout',function ($scope,$resource,$rootScope,global,Stuff,$section,$location,$q,Collection,$anchorScroll,$timeout){
    var $state=$rootScope.$state;
    var $stateParams=$rootScope.$stateParams;
    $scope.stuffCtrl=this;
    $scope.stuffCtrl.paginate={page:0,rows:50,totalItems:0}
    $scope.stuffCtrl.query={section:'',brand:'',category:'',tags:[],artikul:($stateParams.searchStr)?$stateParams.searchStr.clearTag(20):'',brandTag:''};
    $scope.stuffCtrl.categories=[]; // список категорий для визуального блока фильтров
    var queryTags,category;// теги из строки запроса и активная категория
    $scope.stuffCtrl.brands=[]; // список брендов для визуального блока фильтров
    $scope.stuffCtrl.brandCollections=[];
    $scope.stuffCtrl.filters=[];


    // определяем в каком состоянии мы находимся. в разделе, категории или всем каталоге
    // затем устанавливаем параметры  в строку запроса если они соответствую  нащей логике
    // затем вызываем функцию получения списка
    // затем начинаем слущать клик на любом из фильтров
    // в функции $scope.stuffCtrl.changeFilter
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
                    $scope.stuffCtrl.query.section=group._id;
                    if($stateParams.parentGroup){
                        // в дополнительных парметрах передается родительсая группа для категорий
                        // если ее нет, то все нет и списка категорий. соответствено нет ни фильтров ни брендо. выводится полный каталог для данной
                        var categories = $section.getCategories($stateParams.parentGroup).map(function(i){
                            return (i._id)?i._id:i;
                        });
                        //console.log(categories)
                        if (categories){
                            // приведение к общему виду списка категорий для фильтров
                            $scope.stuffCtrl.categories=global.get('categories').val.filter(function(item){return (categories.indexOf(item._id))>-1?true:false});
                        }
                    }
                    q.resolve($scope.stuffCtrl.categories);
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
            if($scope.stuffCtrl.categories.length && $stateParams.categoryUrl){
                if ($stateParams.categoryUrl!='id'){
                    category=$scope.stuffCtrl.categories.getObjectFromArray('url',$stateParams.categoryUrl);
                    // устанавливаем категорию в строку запроса
                    if (category){
                        $scope.stuffCtrl.query.category=category._id;
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
                    $scope.stuffCtrl.query.category=category._id;
                    $scope.stuffCtrl.categories=$section.getCategories(category.group.url)
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
            if ($scope.stuffCtrl.query.category){
                $scope.stuffCtrl.brands = global.get('brands').val.getArrayObjects('categories',$scope.stuffCtrl.query.category)
            }
            // если бренд один устанавливаем его активным и получаем список коллекций
            // при этом не важно есть ли бренд в параметрах
            if ($scope.stuffCtrl.brands.length===1){
                $scope.stuffCtrl.query.brand= $scope.stuffCtrl.brands[0]._id;
            } else {
                // проверяем наличие параметра  в url и если он совпадает с одним из брендов то устранавливаем бренд
                // в запросе
                if ($stateParams.brand){
                    var brand =  $scope.stuffCtrl.brands.getObjectFromArray('url',$stateParams.brand);
                    //console.log('brand-',brand)
                    if (brand){
                        $scope.stuffCtrl.query.brand=brand._id;
                        $location.search('brand',brand.url);
                    }
                }
            }
            if (!$scope.stuffCtrl.query.brand){
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
            if ($scope.stuffCtrl.query.brand){
                var query={brand:$scope.stuffCtrl.query.brand,group:$scope.stuffCtrl.query.section}
                Collection.getCollectionsForBrand({query:query},function(res){
                    res.shift();
                    $scope.stuffCtrl.brandCollections=res;
                    if ($stateParams.brandTag){
                        // если есть tag коллекции в стороке запроса то устанавливаем его в филоьтрах
                        var brandTag=$scope.stuffCtrl.brandCollections.getObjectFromArray('url',$stateParams.brandTag);
                        //console.log($stateParams.brandTag,brandTag)
                        if(brandTag){
                            $scope.stuffCtrl.query.brandTag=brandTag._id;
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
            if ($scope.stuffCtrl.query.category){
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
                                if (!$scope.stuffCtrl.query.tags[i]){$scope.stuffCtrl.query.tags[i]=[]};
                                $scope.stuffCtrl.query.tags[i].push(tag._id);
                            }
                        })
                    }
                })
                $scope.stuffCtrl.filters=filters;

            } else {
                if (queryTags && queryTags.length){
                    $scope.stuffCtrl.query.tags[0]=[queryTags[0]._id]
                    $location.search('queryTag', queryTags[0].url);
                }
            }
            q.resolve('finsh');
            return q.promise;
        })
        .then(function(r){
            /*console.log(r)
             console.log($scope.stuffCtrl.query)
             console.log($scope.stuffCtrl.filters)*/
            $scope.stuffCtrl.getList($scope.stuffCtrl.paginate.page,$scope.stuffCtrl.paginate.rows)
        })


    var prevBrand;
    function _getCollections(){
        var query={brand:$scope.stuffCtrl.query.brand,group:$scope.stuffCtrl.query.section}
        Collection.getCollectionsForBrand({query:query},function(res){
            res.shift();
            $scope.stuffCtrl.brandCollections=res;
            if ($scope.stuffCtrl.brandCollections){
                if ($stateParams.brandTag){
                    // если есть tag коллекции в стороке запроса то устанавливаем его в филоьтрах
                    var brandTag=$scope.stuffCtrl.brandCollections.getObjectFromArray('url',$stateParams.brandTag);
                    //console.log($stateParams.brandTag,brandTag)
                    if(brandTag){
                        $scope.stuffCtrl.query.brandTag=brandTag._id;
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
        //console.log($scope.stuffCtrl.query.tags)
        $scope.stuffCtrl.query.tags.forEach(function(tags){
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
        if ($scope.stuffCtrl.query.brand){
            return global.get('brands').val.getObjectFromArray('_id',$scope.stuffCtrl.query.brand).url;
        }

    }
    function _getBrandTag(){
        if ($scope.stuffCtrl.query.brandTag){
            return $scope.stuffCtrl.brandCollections.getObjectFromArray('_id',$scope.stuffCtrl.query.brandTag).url;
        }

    }
    $scope.stuffCtrl.getList=function(page,rows){
        $scope.endLoadStuff=false;
        //console.log('получение списка - ',ii++,' раз')
        prevBrand=$scope.stuffCtrl.query.brand;
        // формирование строки запроса для выбора  товаров из БД
        var query=[];
        if (global.get('nostore').val){
            query.push({tags:{$nin:[global.get('nostore').val._id]}})
        }
        //console.log($scope.stuffCtrl.query)
        var queryTag=[];
        for (var key in $scope.stuffCtrl.query){
            if ($scope.stuffCtrl.query[key]){
                if (key=="tags"){
                    var qu=[];
                    var queryTags=$scope.stuffCtrl.query[key].filter(function(){return true});
                    //console.log(queryTags);
                    $scope.stuffCtrl.query[key].forEach(function(obj,i){
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
                    obj[key]=$scope.stuffCtrl.query[key];
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
        $rootScope.$broadcast('$allDataLoaded',{state:$state.current.name,data:queryTagsForSEO});

        Stuff.getList(query,null,page,rows,$scope.stuffCtrl.paginate).then(function(res){
            //console.log($scope.stuffCtrl.paginate.totalItems)
            $scope.stuffCtrl.items=res;
            $timeout(function(){$scope.endLoadStuff=true;},500)
        },function(err){
            $state.go('404');
        });
    }
    $scope.stuffCtrl.changeFilter=function(c){
        $anchorScroll();
        //console.log($scope.stuffCtrl.query)
        var category= (!$scope.stuffCtrl.query.category)?{name:'category',url:'id'}:$scope.stuffCtrl.categories.getObjectFromArray('_id',$scope.stuffCtrl.query.category);
        //console.log(category)
        if (c){
            $state.current.reloadOnSearch = true;
            //var category= (!$scope.stuffCtrl.query.category)?{name:'category',url:'id'}:$scope.stuffCtrl.categories.getObjectFromArray('_id',$scope.stuffCtrl.query.category);
            var o={groupUrl:$stateParams.groupUrl,categoryUrl:category.url,categoryName:category.name,queryTag:undefined,brand:undefined,brandTag:undefined};
            $state.go($state.current.name,o,{reload:true});
            $state.current.reloadOnSearch = false;
        }else{
            // очищаем строку параметров
            $location.search('');


            $scope.stuffCtrl.query.artikul='';
            if ($scope.stuffCtrl.query.brand && (!$scope.stuffCtrl.brandCollections || prevBrand!=$scope.stuffCtrl.query.brand)){
                _getCollections($scope.stuffCtrl.query.brand);
                $scope.stuffCtrl.query.brandTag='';
            } else if (!$scope.stuffCtrl.query.brand){
                $scope.stuffCtrl.brandCollections=null;
                $scope.stuffCtrl.query.brandTag='';
            }
            $scope.stuffCtrl.paginate.page=0;
            $scope.stuffCtrl.getList($scope.stuffCtrl.paginate.page,$scope.stuffCtrl.paginate.rows);
            var queryTag=_getQueryTag();
            var brandTag=_getBrandTag();
            var brand=_getBrand();

            //var o = {groupUrl:$scope.stuffCtrl.groupUrl,categoryUrl:category.url,categoryName:category.name}
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
    $scope.stuffCtrl.clearFilter=function(){
        console.log('clear filetrs')
        $scope.stuffCtrl.query.tags=[];
        $scope.stuffCtrl.changeFilter();
    }
}])
.controller('stuffDetailCtrl', ['$scope','$rootScope','global','Stuff','$timeout','$window','$anchorScroll', function ($scope,$rootScope,global,Stuff,$timeout,$window,$anchorScroll) {
    var $stateParams=$rootScope.$stateParams;
    var $state=$rootScope.$state;
    $anchorScroll();
    $scope.stuffDetailCtrl=this;
    //-- Variables --//
    // список купонов для предложения купона
    $scope.stuffDetailCtrl.coupons=global.get('coupon').val;
    // получение товара
    Stuff.getItem($stateParams.stuffUrl,function(item){
        $scope.stuff=item;
        if ($scope.stuff.group){
            $scope.colorGroup=$scope.stuff.group.col;
            $scope.recommendGroup=$scope.stuff.group.rec;
        }
        // мета данные
        //$rootScope.dataForSeoService=$scope.stuff;
        $rootScope.$broadcast('$allDataLoaded',{state:$state.current.name,data:$scope.stuff});
        //console.log($scope.objShare);
        //!***********************************************************
        $scope.endLoad=true;
        $scope.stuffDetailCtrl.filterCoupon = filterCoupon;
    });
    var filterCoupon=function(item){
        //console.log(item)
        // показываем только те купоны, которые есть в списке у пользователя и относятся к данному seller
        if (!item.seller)return;
        //console.log();
        return item.seller && $scope.stuff.seller==item.seller && global.get('user').val.coupons.indexOf(item._id)<0 &&
            global.get('user').val.coupon.indexOf(item._id)<0;

    }
}]) // end controller(stuffDetailCtrl)