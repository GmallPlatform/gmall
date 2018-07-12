'use strict';
angular.module('gmall.directives')
    .directive('filterForStuffs',['$rootScope','global','$q','$location','$section','Collection','Sections','Filter','FilterTags','Brands','Category',function($rootScope,global,$q,$location,$section,Collection,Sections,Filter,FilterTags,Brands,Category){
    return {
        scope:{
           query:'=',
            section:'=',
            admin:'@'

        },
        restrict:"E",
        templateUrl:"components/stuff/filterForStuffs.html",
        link:function($scope,element,attrs){
            console.log('??????????????')
            var $state=$rootScope.$state;
            var $stateParams=$rootScope.$stateParams;
            $scope.filterDirective={};
            $scope.filterDirective.query={section:'',brand:'',category:'',tags:[],artikul:($stateParams.searchStr)?$stateParams.searchStr.clearTag(20):'',brandTag:''};
            function getTagFromCategoriesList(tag,field){
                var category=$scope.filterDirective.category;
                if(category && category.filters && category.filters.length){
                    for (var ii= 0,ll=category.filters.length;ii<ll;ii++){
                        var filter=category.filters[ii];
                        if(filter && filter.tags && filter.tags.length){
                            for (var iii= 0,lll=filter.tags.length;iii<lll;iii++){
                                if(filter.tags[iii][field]==tag){
                                    return filter.tags[iii];
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            function _setBrand(brandId,filed){
                if(brandId && $scope.filterDirective.brands){
                    $scope.filterDirective.brand =  $scope.filterDirective.brands.getObjectFromArray(filed,brandId);

                    //console.log($scope.filterDirective.brand)
                    if ($scope.filterDirective.brand){
                        $scope.filterDirective.query.brand=$scope.filterDirective.brand._id;
                        $location.search('brand',$scope.filterDirective.brand.url);
                        // установка коллекций
                        $scope.filterDirective.brandCollections=$scope.filterDirective.brand.tags;
                    } else {
                        $scope.filterDirective.brandCollections=[];
                        $location.search('brand',null);
                    }
                }else{
                    $scope.filterDirective.brandCollections=[];
                    $location.search('brand',null);
                }

            }
            function _setBrandTag(brandTagId,filed){
                // если установлена коллекция
                if (brandTagId && $scope.filterDirective.brandCollections){
                    // если есть tag коллекции в стороке запроса то устанавливаем его в филоьтрах
                    var brandTag=$scope.filterDirective.brandCollections.getObjectFromArray(filed,brandTagId);
                    if(brandTag){
                        $scope.filterDirective.query.brandTag=brandTag._id;
                        $location.search('brandTag',brandTag.url);
                    } else {
                        $location.search('brandTag',null);
                    }
                } else {
                    $location.search('brandTag',null);
                }
            }
            function _setFilterTagsUrl(){
                if ($scope.filterDirective.filterTags && $scope.filterDirective.filterTags.length){
                    var queryTag = $scope.filterDirective.filterTags.map(function(tag){return tag.url} ).join('+');
                    $location.search('queryTag', queryTag|| null);
                }else{
                    $location.search('queryTag', null);
                }

            }
            function _getQueryTag(){
                var arr =[];
                $scope.filterDirective.query.tags.forEach(function(tags){
                    if (tags.length){
                        tags.forEach(function(tag){
                            arr.push(tag)
                        })
                    }
                })
                return arr;
            }
            //для сео
            function _getFilterTag(){
                var arr =_getQueryTag();
                if(arr.length){
                    return arr.map(function(tag){return $scope.filterDirective.filterTags.getObjectFromArray('_id',tag).url}).join('+')
                }else{
                    return ;
                }
            }
            function _getBrand(id){
                if ($scope.filterDirective.query.brand){
                    $scope.filterDirective.brand = $scope.filterDirective.brands.getObjectFromArray('_id',$scope.filterDirective.query.brand);
                    return $scope.filterDirective.brand.url
                }

            }
            function _getBrandTag(){
                if ($scope.filterDirective.query.brandTag){
                    return $scope.filterDirective.brandCollections.getObjectFromArray('_id',$scope.filterDirective.query.brandTag).url;
                }

            }
            //*********************
            // определяем в каком состоянии мы находимся. в разделе, категории или всем каталоге
            // затем устанавливаем параметры  в строку запроса если они соответствую  нащей логике
            // затем вызываем функцию получения списка
            // затем начинаем слущать клик на любом из фильтров
            // в функции $scope.filterDirective.changeFilter
            // если клик на категории то перегружаем контроллер если на фильтре то делаем запрос на новый список
            //*****************************************
            $q.when()
                .then(function(){
                    return Sections.getSections()
                }) // полчение списка разделов
                .then(function(sections){
                    //**************************************** Г Р У П П А   ********************************************
                    var q=$q.defer();
                    // группы категорий
                    if ($stateParams.groupUrl!='brand' && $stateParams.groupUrl!='group'){
                        // получение раздела
                        if($stateParams.parentGroup){
                            $scope.parentSection=Sections.getParentSection($stateParams.parentGroup);
                        }else{
                            $scope.parentSection=Sections.getParentSection($stateParams.groupUrl);
                        }
                        // получение списка категорий
                        //$scope.filterDirective.sectionCategories -- для получения списка категорий в запросе
                        //**************************************** К А Т Е Г О Р И Я  ********************************************
                        // получение выбранной категории
                        // основной шаг. от него отталкиваемся. есть категория в запросе или нет
                        // для получения брендов и фильтров
                        // если есть
                        if($stateParams.categoryList=='allCategories' || $stateParams.categoryUrl!='category'){
                            $scope.filterDirective.categories=$scope.parentSection.categories;
                            $scope.filterDirective.sectionCategories=$scope.filterDirective.categories.map(function(el){return el._id})
                            if($stateParams.categoryUrl!='category'){
                                Category.get({id:$stateParams.categoryUrl},function(res){
                                    $scope.filterDirective.query.category=res._id;
                                    $scope.filterDirective.category=res;
                                    // устанавливаем список брендов
                                    if ($scope.filterDirective.category.brands && $scope.filterDirective.category.brands.length){
                                        $scope.filterDirective.brands=$scope.filterDirective.category.brands;
                                    }
                                    q.resolve();
                                })

                                //$scope.filterDirective.query.category=
                                   // $scope.filterDirective.categories.getObjectFromArray('url',$stateParams.categoryUrl)._id;
                            }else {
                                q.resolve();
                            }
                        }else{
                            //console.log($scope.parentSection)
                            $scope.filterDirective.sectionCategories=Sections.getEmbededCategories($scope.parentSection,[])
                                .map(function(el){return el._id})
                            //console.log($scope.filterDirective.sectionCategories)
                            // у раздела нет вложенных категорий соответственно нет товаров
                            if(!$scope.filterDirective.sectionCategories.length){
                                $scope.filterDirective.sectionCategories=[null];
                            }
                            q.resolve();
                        }
                    } else {
                        q.resolve();
                    }
                    return q.promise;
                })// категория
                .then(function(){
                    console.log($scope.filterDirective.brands)
                    var q=$q.defer();
                    if($stateParams.brand && !$scope.filterDirective.brands){
                        Brands.query(function(res){
                            res.shift();
                            $scope.filterDirective.brands=res;
                            q.resolve();
                        })
                    }else{
                        q.resolve();
                    }
                    return q.promise;
                })
                .then(function(){
                    //****************************************Б Р Е Н Д   ********************************************
                    //**************************************** К О Л Л Е К Ц И И  ********************************************
                    _setBrand($stateParams.brand,'url')
                    _setBrandTag($stateParams.brandTag,'url');
                    return;
                })// end brand && collections
                .then(function(){

                    var q=$q.defer();
                    //**************************************** Т Е Г И  ********************************************
                    // получение тегов если они есть в параметрах в массив
                    //для дальнейщей установки в визуальных фильтрах
                    if($stateParams.queryTag){
                        // анализ url на наличие тегов*************
                        var queryTags=$stateParams.queryTag.split('+');
                        // удаляем возможные дубли
                        queryTags= queryTags.filter(function(item, pos) {
                            return queryTags.indexOf(item) == pos;
                        })
                        if($scope.filterDirective.categories){
                            $scope.filterDirective.filterTags=queryTags.map(function(tag){
                                return getTagFromCategoriesList(tag,'url')
                            }).filter(function(tag){return tag})
                            q.resolve()
                        }else{
                            /*var o={query:{$or:[]}};
                            queryTags.forEach(function(tag){
                                o.query.$or.push({url:tag})
                            })

                            FilterTags.query(o,function(res){
                                res.shift();
                                $scope.filterDirective.filterTags=res;
                                q.resolve()
                            })*/
                            FilterTags.getTagsByUrl(queryTags,function(res){
                                $scope.filterDirective.filterTags=res;
                                q.resolve()
                            })
                        }
                    }else{
                        q.resolve()
                    }
                    return q.promise;
                }) // end tags
                .then(function(){

                    _setFilterTagsUrl()
                    return;
                })// установка урл тегов
                .then(function(){
                    //**************************************** Ф И Л Ь Т Р Ы ********************************************
                    // установка списка и значений
                    if ($scope.filterDirective.query.category && $scope.filterDirective.category){
                        if ($scope.filterDirective.category.filters && $scope.filterDirective.category.filters.length){
                            $scope.filterDirective.category.filters.forEach(function(item,i){
                                // устанавливаем значения в фильтрах
                                if ($scope.filterDirective.filterTags &&  $scope.filterDirective.filterTags.length){
                                    $scope.filterDirective.filterTags.forEach(function(tag){
                                        if (tag.filter==item._id){
                                            if (!$scope.filterDirective.query.tags[i]){$scope.filterDirective.query.tags[i]=[]};
                                            $scope.filterDirective.query.tags[i].push(tag._id);
                                        }
                                    })
                                }
                            })
                            $scope.filterDirective.filters=$scope.filterDirective.category.filters;
                        }
                    } else {
                        if ($scope.filterDirective.filterTags && $scope.filterDirective.filterTags.length){
                            $scope.filterDirective.query.tags[0]=[];
                            $scope.filterDirective.filterTags.forEach(function(tag){$scope.filterDirective.query.tags[0].push(tag._id)})
                        }
                    }
                    return
                })// фильтры
                .then(function(){
                    $scope.filterDirective.getQuery()
                })
                .catch(function(err){
                    console.log(err)
                })





            $scope.filterDirective.getQuery=function(){
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
                    } else{
                        if(key=='category' && $scope.filterDirective.sectionCategories && $scope.filterDirective.sectionCategories.length){
                            var obj={};
                            obj['category']={$in:$scope.filterDirective.sectionCategories}
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
                // передача данных в директиву
                $scope.query=query;
                return;
                //********* start titles
                var filterTag=_getfilterTag();
                var brandTag=_getBrandTag();
                var brand=_getBrand();
                var queryTagsForSEO='';
                if (filterTag) {
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
                console.log(queryTagsForSEO)
                $rootScope.$broadcast('$allDataLoaded',{state:$state.current.name,data:queryTagsForSEO});

            }
            $scope.filterDirective.changeFilter=function(reloadController){
                if (reloadController){
                    if ($scope.filterDirective.category && $scope.filterDirective.query.category==$scope.filterDirective.category._id){return}
                    if($scope.filterDirective.query.category){
                        var categoryUrl=$scope.filterDirective.categories.getObjectFromArray('_id',$scope.filterDirective.query.category);
                        categoryUrl=(categoryUrl)?categoryUrl.url:'category';
                        $location.search('categoryList', null);
                    }else{
                        var categoryUrl='category';
                        $location.search('categoryList', 'allCategories');
                    }
                    $state.current.reloadOnSearch = true;
                    var o={groupUrl:$stateParams.groupUrl,categoryUrl:categoryUrl,queryTag:undefined,brand:undefined,brandTag:undefined};
                    $state.go($state.current.name,o,{reload:true});
                    $state.current.reloadOnSearch = false;
                }else{
                    $scope.filterDirective.query.artikul='';
                    _setBrand($scope.filterDirective.query.brand,'_id');
                    _setBrandTag($scope.filterDirective.query.brandTag,'_id');
                    $scope.filterDirective.filterTags=_getQueryTag().map(function(tag){
                        return getTagFromCategoriesList(tag,'_id')
                    } ).filter(function(tag){return tag})
                    _setFilterTagsUrl()
                    $scope.filterDirective.getQuery();
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
    .directive('filterForStuffsClinic',['$rootScope','global','$q','$location','$section','Collection','Sections','Filter','FilterTags','Brands','Category',function($rootScope,global,$q,$location,$section,Collection,Sections,Filter,FilterTags,Brands,Category){
        return {
            scope:{
                query:'=',
                section:'=',
                admin:'@'

            },
            restrict:"E",
            templateUrl:"views/clinic/partials/stuff/filterForStuffs.html",
            link:function($scope,element,attrs){
                var $state=$rootScope.$state;
                var $stateParams=$rootScope.$stateParams;
                $scope.filterDirective={};
                $scope.filterDirective.query={section:'',brand:'',category:'',tags:[],artikul:($stateParams.searchStr)?$stateParams.searchStr.clearTag(20):'',brandTag:''};
                function getTagFromCategoriesList(tag,field){
                    var category=$scope.filterDirective.category;
                    if(category && category.filters && category.filters.length){
                        for (var ii= 0,ll=category.filters.length;ii<ll;ii++){
                            var filter=category.filters[ii];
                            if(filter && filter.tags && filter.tags.length){
                                for (var iii= 0,lll=filter.tags.length;iii<lll;iii++){
                                    if(filter.tags[iii][field]==tag){
                                        return filter.tags[iii];
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                function _setBrand(brandId,filed){
                    if(brandId && $scope.filterDirective.brands){
                        $scope.filterDirective.brand =  $scope.filterDirective.brands.getObjectFromArray(filed,brandId);

                        //console.log($scope.filterDirective.brand)
                        if ($scope.filterDirective.brand){
                            $scope.filterDirective.query.brand=$scope.filterDirective.brand._id;
                            $location.search('brand',$scope.filterDirective.brand.url);
                            // установка коллекций
                            $scope.filterDirective.brandCollections=$scope.filterDirective.brand.tags;
                        } else {
                            $scope.filterDirective.brandCollections=[];
                            $location.search('brand',null);
                        }
                    }else{
                        $scope.filterDirective.brandCollections=[];
                        $location.search('brand',null);
                    }

                }
                function _setBrandTag(brandTagId,filed){
                    // если установлена коллекция
                    if (brandTagId && $scope.filterDirective.brandCollections){
                        // если есть tag коллекции в стороке запроса то устанавливаем его в филоьтрах
                        var brandTag=$scope.filterDirective.brandCollections.getObjectFromArray(filed,brandTagId);
                        if(brandTag){
                            $scope.filterDirective.query.brandTag=brandTag._id;
                            $location.search('brandTag',brandTag.url);
                        } else {
                            $location.search('brandTag',null);
                        }
                    } else {
                        $location.search('brandTag',null);
                    }
                }
                function _setFilterTagsUrl(){
                    if ($scope.filterDirective.filterTags && $scope.filterDirective.filterTags.length){
                        var queryTag = $scope.filterDirective.filterTags.map(function(tag){return tag.url} ).join('+');
                        $location.search('queryTag', queryTag|| null);
                    }else{
                        $location.search('queryTag', null);
                    }

                }
                function _getQueryTag(){
                    var arr =[];
                    $scope.filterDirective.query.tags.forEach(function(tags){
                        if (tags.length){
                            tags.forEach(function(tag){
                                arr.push(tag)
                            })
                        }
                    })
                    return arr;
                }
                //для сео
                function _getFilterTag(){
                    var arr =_getQueryTag();
                    if(arr.length){
                        return arr.map(function(tag){return $scope.filterDirective.filterTags.getObjectFromArray('_id',tag).url}).join('+')
                    }else{
                        return ;
                    }
                }
                function _getBrand(id){
                    if ($scope.filterDirective.query.brand){
                        $scope.filterDirective.brand = $scope.filterDirective.brands.getObjectFromArray('_id',$scope.filterDirective.query.brand);
                        return $scope.filterDirective.brand.url
                    }

                }
                function _getBrandTag(){
                    if ($scope.filterDirective.query.brandTag){
                        return $scope.filterDirective.brandCollections.getObjectFromArray('_id',$scope.filterDirective.query.brandTag).url;
                    }

                }
                //*********************
                // определяем в каком состоянии мы находимся. в разделе, категории или всем каталоге
                // затем устанавливаем параметры  в строку запроса если они соответствую  нащей логике
                // затем вызываем функцию получения списка
                // затем начинаем слущать клик на любом из фильтров
                // в функции $scope.filterDirective.changeFilter
                // если клик на категории то перегружаем контроллер если на фильтре то делаем запрос на новый список
                //*****************************************
                $q.when()
                    .then(function(){
                        return Sections.getSections()
                    }) // полчение списка разделов
                    .then(function(sections){
                        //**************************************** Г Р У П П А   ********************************************
                        var q=$q.defer();
                        // группы категорий
                        if ($stateParams.groupUrl!='brand' && $stateParams.groupUrl!='group'){
                            // получение раздела
                            if($stateParams.parentGroup){
                                $scope.parentSection=Sections.getParentSection($stateParams.parentGroup);
                            }else{
                                $scope.parentSection=Sections.getParentSection($stateParams.groupUrl);
                            }
                            // получение списка категорий
                            //$scope.filterDirective.sectionCategories -- для получения списка категорий в запросе
                            //**************************************** К А Т Е Г О Р И Я  ********************************************
                            // получение выбранной категории
                            // основной шаг. от него отталкиваемся. есть категория в запросе или нет
                            // для получения брендов и фильтров
                            // если есть
                            if($stateParams.categoryList=='allCategories' || $stateParams.categoryUrl!='category'){
                                $scope.filterDirective.categories=$scope.parentSection.categories;
                                $scope.filterDirective.sectionCategories=$scope.filterDirective.categories.map(function(el){return el._id})
                                if($stateParams.categoryUrl!='category'){
                                    Category.get({id:$stateParams.categoryUrl},function(res){
                                        $scope.filterDirective.query.category=res._id;
                                        $scope.filterDirective.category=res;
                                        // устанавливаем список брендов
                                        if ($scope.filterDirective.category.brands && $scope.filterDirective.category.brands.length){
                                            $scope.filterDirective.brands=$scope.filterDirective.category.brands;
                                        }
                                        console.log($scope.filterDirective.brands)
                                        q.resolve();
                                    })

                                    //$scope.filterDirective.query.category=
                                    // $scope.filterDirective.categories.getObjectFromArray('url',$stateParams.categoryUrl)._id;
                                }else {
                                    q.resolve();
                                }
                            }else{
                                //console.log($scope.parentSection)
                                $scope.filterDirective.sectionCategories=Sections.getEmbededCategories($scope.parentSection,[])
                                    .map(function(el){return el._id})
                                //console.log($scope.filterDirective.sectionCategories)
                                // у раздела нет вложенных категорий соответственно нет товаров
                                if(!$scope.filterDirective.sectionCategories.length){
                                    $scope.filterDirective.sectionCategories=[null];
                                }
                                q.resolve();
                            }
                        } else {
                            q.resolve();
                        }
                        return q.promise;
                    })// категория
                    /*.then(function(){

                    })*/
                    .then(function(){
                        var q=$q.defer();
                        if($stateParams.brand && !$scope.filterDirective.brands){
                            Brands.query(function(res){
                                res.shift();
                                $scope.filterDirective.brands=res;
                                q.resolve();
                            })
                        }else{
                            q.resolve();
                        }
                        return q.promise;
                    })
                    .then(function(){
                        //****************************************Б Р Е Н Д   ********************************************
                        //**************************************** К О Л Л Е К Ц И И  ********************************************
                        _setBrand($stateParams.brand,'url')
                        _setBrandTag($stateParams.brandTag,'url');
                        return;
                    })// end brand && collections
                    .then(function(){

                        var q=$q.defer();
                        //**************************************** Т Е Г И  ********************************************
                        // получение тегов если они есть в параметрах в массив
                        //для дальнейщей установки в визуальных фильтрах
                        if($stateParams.queryTag){
                            // анализ url на наличие тегов*************
                            var queryTags=$stateParams.queryTag.split('+');
                            // удаляем возможные дубли
                            queryTags= queryTags.filter(function(item, pos) {
                                return queryTags.indexOf(item) == pos;
                            })
                            if($scope.filterDirective.categories){
                                $scope.filterDirective.filterTags=queryTags.map(function(tag){
                                    return getTagFromCategoriesList(tag,'url')
                                }).filter(function(tag){return tag})
                                q.resolve()
                            }else{
                                /*var o={query:{$or:[]}};
                                 queryTags.forEach(function(tag){
                                 o.query.$or.push({url:tag})
                                 })

                                 FilterTags.query(o,function(res){
                                 res.shift();
                                 $scope.filterDirective.filterTags=res;
                                 q.resolve()
                                 })*/
                                FilterTags.getTagsByUrl(queryTags,function(res){
                                    $scope.filterDirective.filterTags=res;
                                    q.resolve()
                                })
                            }
                        }else{
                            q.resolve()
                        }
                        return q.promise;
                    }) // end tags
                    .then(function(){

                        _setFilterTagsUrl()
                        return;
                    })// установка урл тегов
                    .then(function(){
                        //**************************************** Ф И Л Ь Т Р Ы ********************************************
                        // установка списка и значений
                        if ($scope.filterDirective.query.category && $scope.filterDirective.category){
                            if ($scope.filterDirective.category.filters && $scope.filterDirective.category.filters.length){
                                $scope.filterDirective.category.filters.forEach(function(item,i){
                                    // устанавливаем значения в фильтрах
                                    if ($scope.filterDirective.filterTags &&  $scope.filterDirective.filterTags.length){
                                        $scope.filterDirective.filterTags.forEach(function(tag){
                                            if (tag.filter==item._id){
                                                if (!$scope.filterDirective.query.tags[i]){$scope.filterDirective.query.tags[i]=[]};
                                                $scope.filterDirective.query.tags[i].push(tag._id);
                                            }
                                        })
                                    }
                                })
                                $scope.filterDirective.filters=$scope.filterDirective.category.filters;
                            }
                        } else {
                            if ($scope.filterDirective.filterTags && $scope.filterDirective.filterTags.length){
                                $scope.filterDirective.query.tags[0]=[];
                                $scope.filterDirective.filterTags.forEach(function(tag){$scope.filterDirective.query.tags[0].push(tag._id)})
                            }
                        }
                        return
                    })// фильтры
                    .then(function(){
                        $scope.filterDirective.getQuery()
                    })
                    .catch(function(err){
                        console.log(err)
                    })





                $scope.filterDirective.getQuery=function(){
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
                        } else{
                            if(key=='category' && $scope.filterDirective.sectionCategories && $scope.filterDirective.sectionCategories.length){
                                var obj={};
                                obj['category']={$in:$scope.filterDirective.sectionCategories}
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
                    // передача данных в директиву
                    $scope.query=query;
                    return;
                    //********* start titles
                    var filterTag=_getfilterTag();
                    var brandTag=_getBrandTag();
                    var brand=_getBrand();
                    var queryTagsForSEO='';
                    if (filterTag) {
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
                    console.log(queryTagsForSEO)
                    $rootScope.$broadcast('$allDataLoaded',{state:$state.current.name,data:queryTagsForSEO});

                }
                $scope.filterDirective.changeFilter=function(reloadController){
                    if (reloadController){
                        if ($scope.filterDirective.category && $scope.filterDirective.query.category==$scope.filterDirective.category._id){return}
                        if($scope.filterDirective.query.category){
                            var categoryUrl=$scope.filterDirective.categories.getObjectFromArray('_id',$scope.filterDirective.query.category);
                            categoryUrl=(categoryUrl)?categoryUrl.url:'category';
                            $location.search('categoryList', null);
                        }else{
                            var categoryUrl='category';
                            $location.search('categoryList', 'allCategories');
                        }
                        $state.current.reloadOnSearch = true;
                        var o={groupUrl:$stateParams.groupUrl,categoryUrl:categoryUrl,queryTag:undefined,brand:undefined,brandTag:undefined};
                        $state.go($state.current.name,o,{reload:true});
                        $state.current.reloadOnSearch = false;
                    }else{
                        $scope.filterDirective.query.artikul='';
                        _setBrand($scope.filterDirective.query.brand,'_id');
                        _setBrandTag($scope.filterDirective.query.brandTag,'_id');
                        $scope.filterDirective.filterTags=_getQueryTag().map(function(tag){
                            return getTagFromCategoriesList(tag,'_id')
                        } ).filter(function(tag){return tag})
                        _setFilterTagsUrl()
                        $scope.filterDirective.getQuery();
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