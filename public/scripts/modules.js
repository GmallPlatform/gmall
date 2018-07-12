'use strict';
//http://vitalets.github.io/checklist-model/
/**
 * Checklist-model
 * AngularJS directive for list of checkboxes
 */

angular.module('checklist-model', [])
    .directive('checklistModel', ['$parse', '$compile', function($parse, $compile) {
        // contains
        function contains(arr, item) {
            if (angular.isArray(arr)) {
                for (var i = 0; i < arr.length; i++) {
                    if (angular.equals(arr[i], item)) {
                        return true;
                    }
                }
            }
            return false;
        }

        // add
        function add(arr, item) {
            arr = angular.isArray(arr) ? arr : [];
            for (var i = 0; i < arr.length; i++) {
                if (angular.equals(arr[i], item)) {
                    return arr;
                }
            }
            arr.push(item);
            return arr;
        }

        // remove
        function remove(arr, item) {
            if (angular.isArray(arr)) {
                for (var i = 0; i < arr.length; i++) {
                    if (angular.equals(arr[i], item)) {
                        arr.splice(i, 1);
                        break;
                    }
                }
            }
            return arr;
        }

        // http://stackoverflow.com/a/19228302/1458162
        function postLinkFn(scope, elem, attrs) {
            // compile with `ng-model` pointing to `checked`
            $compile(elem)(scope);

            // getter / setter for original model
            var getter = $parse(attrs.checklistModel);
            var setter = getter.assign;

            // value added to list
            var value = $parse(attrs.checklistValue)(scope.$parent);

            // watch UI checked change
            scope.$watch('checked', function(newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                var current = getter(scope.$parent);
                if (newValue === true) {
                    setter(scope.$parent, add(current, value));
                } else {
                    setter(scope.$parent, remove(current, value));
                }
            });

            // watch original model change
            scope.$parent.$watch(attrs.checklistModel, function(newArr, oldArr) {
                scope.checked = contains(newArr, value);
            }, true);
        }

        return {
            restrict: 'A',
            priority: 1000,
            terminal: true,
            scope: true,
            compile: function(tElement, tAttrs) {
                if (tElement[0].tagName !== 'INPUT' || !tElement.attr('type', 'checkbox')) {
                    throw 'checklist-model should be applied to `input[type="checkbox"]`.';
                }

                if (!tAttrs.checklistValue) {
                    throw 'You should provide `checklist-value`.';
                }

                // exclude recursion
                tElement.removeAttr('checklist-model');

                // local scope var storing individual checkbox model
                tElement.attr('ng-model', 'checked');

                return postLinkFn;
            }
        };
    }]);

angular.module( "ngAutocomplete", [])
    .directive('ngAutocomplete1', function($parse,$timeout,global) {
        return {

            require: 'ngModel',
            scope: {
                ngModel: '=',
                options: '=?',
                details: '=?',
                fromList: '=',
                cityId:   '=',
                countryId:'='
            },

            link: function(scope, element, attrs, model) {

                //options for autocomplete
                //console.log(scope.ngModel);
                $timeout(function(){
                    if (scope.ngModel){
                        //console.log(scope.ngModel);
                        element[0].value=scope.ngModel;
                    }
                })

                //console.log(element);
                var opts
                // scope.options.types='cities';
                //convert options provided to opts
                var initOpts = function() {
                    opts = {}
                    // console.log(scope.options);
                    if (scope.options) {
                        if (scope.options.types) {
                            opts.types = []
                            //console.log(scope.options.types);
                            opts.types.push(scope.options.types)
                        }
                        if (scope.options.bounds) {
                            opts.bounds = scope.options.bounds
                        }
                        if (scope.options.country) {
                            opts.componentRestrictions = {
                                country: scope.options.country
                            }
                        }
                    }

                }
                initOpts()

                element.bind('blur', function () {
                    //console.log(scope.ngModel);
                    //console.log(scope.cityId);
                    $timeout(function(){
                        scope.cityId='';
                    });


                    //console.log(scope.cityId);
                });

                //create new autocomplete
                //reinitializes on every change of the options provided
                var newAutocomplete = function() {
                    if (typeof google === 'undefined') {
                        return
                    }
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], scope.options);
                    google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                        scope.$apply(function() {
//              if (scope.details) {
                            scope.details = scope.gPlace.getPlace();
                            console.log(scope.details);
                            //scope.cityId=scope.details.
//              }           console.log();
                            if(scope.details.address_components && scope.details.address_components.length ){
                                for (var i= 0,l=scope.details.address_components.length;i<l;i++){
                                    var c=scope.details.address_components[i];
                                    if (c.types && c.types[0] && c.types[0]=='country'){
                                        console.log(scope.details.address_components[i].short_name);
                                        scope.countryId=scope.details.address_components[i].short_name;
                                    }
                                }
                            }


                            if (scope.details && scope.details.types && scope.details.types[0]=='locality'){

                                $timeout(function(){
                                    scope.ngModel=scope.ngAutocomplete = element.val();

                                    scope.cityId=scope.details.place_id;
                                },100)
                            }


                        });
                    })
                }
                /*if (!global.get('local').val){
                    newAutocomplete()
                }*/
                newAutocomplete()
                //console.log(global.get('local').val);

                /*scope.$watch('ngModel', function (n) {
                 console.log(n);
                 });*/

                //watch options provided to directive
                scope.watchOptions = function () {
                    return scope.options
                };

                scope.$watch(scope.watchOptions, function () {
                    initOpts()
                    newAutocomplete()
                    element[0].value = '';
                    scope.ngAutocomplete = element.val();
                }, true);
            }
        };
    });


angular.module('i.mongoPaginate', [])
    .filter('forLoop', function() {
        return function(input, start, end) {
            input = new Array(end - start);
            for (var i = 0; start < end; start++, i++) {
                input[i] = start;
            }

            return input;
        }
    })
    .directive('paginator', function (anchorSmoothScroll) {
        return {
            restrict:'E',
            scope :{
                page:'=',
                rows:'=',
                items:'=',
                getlist:'&'
            },
            link: function (scope, element, attrs, controller) {
                //console.log('likn paginator');
                var l;
                scope.paginator={};
                //scope.paginator.page=scope.page;
                scope.paginator.rows =parseInt(scope.rows);
                scope.paginator.items=0;
                
                scope.$watch('items',function(n,o){
                    if (n) {
                        scope.paginator.items=Number(n)
                        l=scope.paginator.pageCount();
                        scope.arrayPage=scope.getListPage();

                    }
                   
                })
                

                function getList(){
                    anchorSmoothScroll.scrollTo('topPage');
                    scope.getlist({page:scope.page,rows:scope.paginator.rows})
                }

                scope.paginator.setPage = function (page) {
                    page = Number(page);
                    if (!page && page!==0) return;
                    if (page > scope.paginator.pageCount() || page==scope.page) {
                        return;
                    }
                    scope.page = page;

                    if (scope.page==0){
                        console.log('думаем');
                        scope.arrayPage=scope.getListPage(2)

                    }
                    if (scope.page==(l-1)){
                        console.log('думаем2');
                        scope.arrayPage=scope.getListPage(6)
                    }
                    
                    if (scope.page==scope.arrayPage[3] && scope.arrayPage.length==6&& ((l-1)-scope.page)>2){
                        scope.arrayPage=scope.getListPage()
                    } else if(scope.page==scope.arrayPage[4] && scope.arrayPage.length==7){
                        scope.arrayPage=scope.getListPage()
                    } else if (scope.page==scope.arrayPage[2] && scope.page-scope.arrayPage[0]>=2){
                        scope.arrayPage=scope.getListPage()
                    }

                    
                    getList()
                };
                scope.paginator.nextPage = function () {
                    if (scope.paginator.isLastPage()) {
                        return;
                    }
                    scope.page++;
                    if (scope.page==scope.arrayPage[3] && scope.arrayPage.length==6&& ((l-1)-scope.page)>2){
                        scope.arrayPage=scope.getListPage()
                    } else if(scope.page==scope.arrayPage[4] && scope.arrayPage.length==7){
                        scope.arrayPage=scope.getListPage()
                    } else if (scope.page==scope.arrayPage[2] && scope.page-scope.arrayPage[0]>=2){
                        scope.arrayPage=scope.getListPage()
                    }
                    getList()
                };
                scope.paginator.perviousPage = function () {
                    if (scope.paginator.isFirstPage()) {
                        return;
                    }
                    scope.page--;
                    if (scope.page==scope.arrayPage[3] && scope.arrayPage.length==6&& ((l-1)-scope.page)>2){
                        scope.arrayPage=scope.getListPage()
                    } else if(scope.page==scope.arrayPage[4] && scope.arrayPage.length==7){
                        scope.arrayPage=scope.getListPage()
                    } else if (scope.page==scope.arrayPage[2] && scope.page-scope.arrayPage[0]>=2){
                        scope.arrayPage=scope.getListPage()
                    }
                    getList()
                };
                scope.paginator.firstPage = function() {
                    scope.page = 0;
                    getList()
                };
                scope.paginator.lastPage = function () {
                    scope.page = scope.paginator.pageCount() - 1;
                    getList()
                };
                scope.paginator.isFirstPage = function () {
                    return scope.page == 0;

                };
                scope.paginator.isLastPage = function () {
                    return scope.page == scope.paginator.pageCount() - 1;
                };
                scope.paginator.pageCount = function () {
                    var count = Math.ceil(parseInt(scope.paginator.items, 10) / parseInt(scope.paginator.rows, 10)); if (count === 1) { scope.page = 0; }                    
                    return count;
                };
                
               
                scope.changeRow = function(rows){
                    scope.paginator.rows=rows;
                    while (scope.paginator.pageCount()<(scope.page-1)){                        
                        scope.page--;
                    }                    
                    getList()
                }
                scope.arrayPage=[];
                
                scope.getListPage = function(num){
                    //if (!page){page=}
                    var page=scope.page;
                    var arrayPage=[];
                    if (num===0 || num){page = num}                   
                    if (l<=6){
                        for(var i=0;i<l;i++){
                            arrayPage.push(i)
                        } 
                    }else{ 
                        if (page>=3 ){
                            arrayPage.push(0)
                            arrayPage.push('...');
                            arrayPage.push(page-1)
                            arrayPage.push(page)
                            arrayPage.push(page+1)
                        } else{
                            for(var i=0;i<4;i++){
                                arrayPage.push(i)
                            }
                        }
                        if(((l-1)-page)>2){
                            arrayPage.push('...');
                        }
                        arrayPage.push(l-1)
                    }
                    //console.log(arrayPage)
                    return arrayPage;
                }
                scope.getPageStr = function(i){
                    if (Number(i) || i===0){return i+1} else {return i}
                }
                
            },
            templateUrl: 'mobile/views/template/paginator.html'
        };
    })

    







