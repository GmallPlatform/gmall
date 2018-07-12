'use strict';
(function(window) {

    'use strict';

    /**
     * Extend Object helper function.
     */
    function extend(a, b) {
        for(var key in b) {
            if(b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    /**
     * Each helper function.
     */
    function each(collection, callback) {
        for (var i = 0; i < collection.length; i++) {
            var item = collection[i];
            callback(item);
        }
    }

    /**
     * Menu Constructor.
     */
    function Menu(options) {
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }

    /**
     * Menu Options.
     */
    Menu.prototype.options = {
        type:'c-menu--push-left'
    };

    /**
     * Initialise Menu.
     */
    Menu.prototype._init = function() {
        this.menu = document.querySelector('#c-menu--' + this.options.type);
        console.log()
    };

    /**
     * Open Menu.
     */
    Menu.prototype.open = function() {
        this.menu.classList.add('is-active')
    };

    /**
     * Close Menu.
     */
    Menu.prototype.close = function() {
        this.menu.classList.remove('is-active');
    };

    /**
     * Add to global namespace.
     */
    window.MenuSlide = Menu;

})(window);
//http://callmenick.com/post/slide-and-push-menus-with-css3-transitions
angular.module('gmall.directives')
.directive('slideMenu',['$rootScope','$q','Sections','$state',function($rootScope,$q,Sections,$states){
    return {
        restrict: "E",
        scope: {
            displaySlideMenu:'='
        },
        templateUrl: "components/slideMenu/slideMenu.html",
        link: function ($scope, element, attrs) {
            var slideLeft,initDone;
            setTimeout(function(){
                initDone=true;
                slideLeft = new MenuSlide({type:'push-left'});
                $( '#c-menu--push-left' ).niceScroll();
                if($scope.displaySlideMenu){
                    $scope.openMenu()
                }

            })
            $scope.$watch('displaySlideMenu',function(n,o){
                //console.log(n,o)
                if(n && initDone){
                    $scope.openMenu()
                } else if(!n && initDone){
                    $scope.closeMenu()
                }
            })
            $scope.closeMenu = function(){
                if ($('#mainContent' ).hasClass('pl300')){
                    slideLeft.close();
                    $('#mainContent' ).removeClass('pl300')
                    $('#mainContent' ).addClass('pl150')
                }
            }
            $scope.openMenu=function(){
                getSection()
                slideLeft.open();
                $('#mainContent' ).addClass('pl300')
                $('#mainContent' ).removeClass('pl150')
            }

            getSection();

            function getSection(){
                $q.when()
                    .then(function(){
                        return Sections.getSections();
                    })
                    .then(function(sections){
                        $scope.sections=sections;
                    })
            }

            $scope.getSectionUrlParams=function(section){
                //console.log(section)
                var params={
                    groupUrl:'group',
                    categoryUrl:'category',
                    categoryList:null,
                    parentGroup:null,
                    brand:null,
                    artikul:null,
                    brandTag:null,
                    queryTag:null,
                    searchStr:null
                }
                if (section.level===0){
                    params.groupUrl=section.url;
                    if(!section.child || !section.child.length){
                        params.categoryList='allCategories';
                    }else{
                        params.categoryList=null;
                    }
                }else{
                    //params.groupUrl=section.section.url;
                    params.parentUrl=section.url;
                    //params.categoryList='allCategories';
                }
                return params;
            }
            $scope.getSectionUrlParamsAndGo=function(section){
                //console.log(section)
                var params={
                    groupUrl:'group',
                    categoryUrl:'category',
                    categoryList:null,
                    parentGroup:null,
                    brand:null,
                    artikul:null,
                    brandTag:null,
                    queryTag:null,
                    searchStr:null
                }
                if (section.level===0){
                    params.groupUrl=section.url;
                    if(!section.child || !section.child.length){
                        params.categoryList='allCategories';
                    }else{
                        params.categoryList=null;
                    }
                }else{
                    params.groupUrl=section.section.url;
                    params.parentGroup=section.url;
                    params.categoryList='allCategories';
                }
                $state.go('frame.stuffs',params);
            }




        }
    }
}])

