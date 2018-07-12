'use strict';

/* Directives */
angular.module('gmall.directives')
.directive('paginatorMain', function (anchorSmoothScroll,$anchorScroll) {
    return {
        restrict:'E',
        scope :{
            page:'=',
            rows:'=',
            items:'=',
            getlist:'&',
            scroll:"@"
        },
        link: function (scope, element, attrs, controller) {
            //console.log('likn paginator');
            var l;
            scope.paginator={};
            //scope.paginator.page=scope.page;
            scope.paginator.rows =parseInt(scope.rows);
            scope.paginator.items=0;

            scope.$watch('items',function(n,o){
                //console.log(n)
                if (n || n===0) {
                    scope.paginator.items=Number(n)
                    l=scope.paginator.pageCount();
                    scope.arrayPage=scope.getListPage();

                }

            })


            function getList(){
                console.log(scope.scroll)
                if(scope.scroll){
                    //$anchorScroll(scope.scroll);
                    anchorSmoothScroll.scrollTo(scope.scroll,200);
                }
                //console.log('ssss')
                scope.getlist({page:scope.page,rows:scope.paginator.rows})
            }

            scope.paginator.setPage = function (page) {
                //console.log(page)
                page = Number(page);
                if (!page && page!==0) return;
                if (page > scope.paginator.pageCount() || page==scope.page) {
                    return;
                }
                scope.page = page;

                if (scope.page==0){
                    //console.log('думаем');
                    scope.arrayPage=scope.getListPage(2)

                }
                //console.log(l)
                if (scope.page==(l-1)){
                    console.log('посдедняя страница');
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
                //console.log(num)
                //if (!page){page=}
                var page=scope.page;
                var arrayPage=[];
                if (num===0 || num){page = num}
                //var page=scope.page;
                //console.log(page,l)
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
        templateUrl: 'views/templates/paginator.html'
    };
})