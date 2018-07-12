'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('menuSections',menuSectionHorizontal)
        .directive('menuSectionsVirtical',menuSectionVirtical)
        .directive('dropdownOnHover',dropdownOnHover)
    function menuSectionHorizontal(){
        return {
            scope: {},
            restrict:"AE",
            bindToController: true,
            controller: directiveMenu,
            controllerAs: '$ctrl',
            templateUrl: 'components/menu/menuSectionHorizontel.html',
        }
    }
    function menuSectionVirtical(){
        return {
            scope: {},
            restrict:"AE",
            bindToController: true,
            controller: directiveMenuV,
            controllerAs: '$ctrl',
            templateUrl: 'components/menu/menuSectionVertical.html',
        }
    }
    function dropdownOnHover(){
        return {
            scope: {},
            restrict:"AE",
            bindToController: true,
            link: directiveDropdownOnHover,
            controllerAs: '$ctrl',
        }
    }
    directiveMenu.$inject=['Sections','$state','$q','global','$rootScope','$timeout'];
    function directiveMenu(Sections,$state,$q,global,$rootScope,$timeout){
        var self=this;
        var menuLis;
        var sectionElements=[];
        var innerDivs=[];
        self.getSectionUrlParams=getSectionUrlParams;
        self.getCategoryUrlParams=getCategoryUrlParams;
        activate();
        //*********************************************************
        function activate(){
            $q.when()
                .then(function(){
                    return Sections.getSections();
                } )
                .then(function(sections){
                    self.sections=sections.filter(function(el){return !el.parent && el.level===0});
                    setTimeout(function(){
                        /*menuLis=$('.mainli');
                        console.log(menuLis)
                        for(var i=0,l=menuLis.length;i<l;i++){

                        }
                        menuLis.forEach(function(li){
                            bindHoverLi(li);
                        })*/

                        // для горизонтального меню
                        var w=$(window ).width()
                        self.sections.forEach(function(sec,i){
                            var el=$('#s'+sec._id );
                            bindHoverLi(el);
                            sectionElements.push(el)
                            var sec_element_offset=el.offset();
                            if(sec_element_offset){
                                var offsetLeft=sec_element_offset.left
                                var innerDiv=$('#innerDiv'+i );
                                innerDivs.push(innerDiv)
                                innerDiv.css('left','-'+offsetLeft+'px')
                            }
                        })
                        $('.innerDiv' ).width(w)
                    },100);
                } )
                .catch(function(err){
                    console.log(err)
                })
        }
        $rootScope.$on('$stateChangeStart', function (ev) {
            // console.log('ddd')
            for(var i=0,l=innerDivs.length;i<l;i++){
                if(innerDivs[i].is(':hover')){
                    $(menuLis[i]).unbind()
                    innerDivs[i].hide()
                    /*$timeout(function(){
                        $(menuLis[i]).hover(function() {
                            $(this).children('div').stop(true, false, true).toggle();
                        });
                    },1500)*/
                    break;
                }
            }
            return;
            if(menuLis){
                sectionElements.forEach(function(el,i){
                    //console.log(el.is(':hover'))
                    var d=$('#innerDiv'+i );
                    if(d.is(':hover')){
                        d.toggle();
                        return;
                        /*menuLis.unbind('mouseenter mouseleave');

                        $timeout(function(){
                            d.hide()
                        },100).then(function(){
                            $timeout(function(){
                                bindHover(menuLis)
                            },500)
                        })*/

                        //console.log($('#innerDiv'+i ).is(':hover'))
                    }
                })
            }
            return;
            if(menuLis){
                sectionElements.forEach(function(el,i){
                    //console.log(el.is(':hover'))
                    var d=$('#innerDiv'+i );
                    if(el.is(':hover') && d.is(':hover')){
                        d.hide()
                        return;
                        /*menuLis.unbind('mouseenter mouseleave');

                        $timeout(function(){
                            d.hide()
                        },100).then(function(){
                            $timeout(function(){
                                bindHover(menuLis)
                            },500)
                        })*/

                        //console.log($('#innerDiv'+i ).is(':hover'))
                    }
                })
            }
        })
        /*$rootScope.$on('$stateChangeSuccess', function (ev) {
            if(menuLis && false){
                menuLis.unbind('mouseenter mouseleave');
                menuLis.children('div').toggle(function(){
                    console.log('hide')
                    sectionElements.forEach(function(el){if(el.is(':hover')){
                        $(el).children('div').stop(true, false, true).toggle();
                    }})
                    //bindHover(menuLis);
                });
            }
        })*/
        function bindHover(els){
            els.hover(function() {
                $(this).children('div').stop(true, false, true).toggle();
            });
        }
        function bindHoverLi(li){
            li.hover(function() {
                li.children('div').stop(true, false, true).toggle();
            });
        }
        function getSectionUrlParams(section){
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
                params.groupUrl=section.url
            }else{
                params.groupUrl=section.section.url;
                params.parentGroup=section.url;
            }
            return params;
        }
        function getCategoryUrlParams(section,category){
            var params =self.getSectionUrlParams(section);
            if(category){
                params.categoryUrl=category.url;
            } else{
                params.categoryUrl='category';
                params.categoryList='allCategories'
            }
            return params;
        }
    }
    directiveMenuV.$inject=['Sections','$state','$q','global','$rootScope'];
    function directiveMenuV(Sections,$state,$q,global,$rootScope){
        var self=this;
        self.global=global;
        var menuLis;
        self.getSectionUrlParams=getSectionUrlParams;
        self.getCategoryUrlParams=getCategoryUrlParams;
        self.getUrlParams=getUrlParams;
        activate();
        //*********************************************************
        function activate(){
            $q.when()
                .then(function(){
                    return Sections.getSections();
                } )
                .then(function(sections){
                    //console.log(sections)
                    self.sections=sections.filter(function(el){return !el.parent && el.level===0});
                    setTimeout(function(){
                        menuLis=$('.myMenuV .mainli');
                        bindHover(menuLis);

                    },100);
                } )
                .catch(function(err){
                    console.log(err)
                })
        }
        /*$rootScope.$on('$stateChangeSuccess', function (ev) {
            if(menuLis){
                menuLis.unbind('mouseenter mouseleave');
                menuLis.children('div').hide();
                setTimeout(function(){
                    bindHover(menuLis);
                },1000)
            }
        })*/
        function bindHover(els){
            els.hover(function() {
                $(this).children('div').stop(true, false, true).slideToggle(300);
            });

        }
        function getSectionUrlParams(section){
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
                params.groupUrl=section.url
            }else{
                params.groupUrl=section.section.url;
                params.parentGroup=section.url;
            }
            return params;
        }
        function getCategoryUrlParams(section,category){
            var params =self.getSectionUrlParams(section);
            if(category){
                params.categoryUrl=category.url;
            } else{
                params.categoryUrl='category';
                params.categoryList='allCategories'
            }
            return params;
        }
        function getUrlParams(queryTag){
            var params={
                groupUrl:'group',
                categoryUrl:'category',
                categoryList:null,
                parentGroup:null,
                brand:null,
                artikul:null,
                brandTag:null,
                queryTag:queryTag,
                searchStr:null
            }
            return params;
        }
    }
    function directiveDropdownOnHover(scope,element,arrts){
        activate();
        function activate(){
            $(element).children('ul').hide()
            bindHover()
        }
        function bindHover(){
            $(element).hover(function() {
                $(this).children('ul').stop(true, false, true).slideToggle(200);
            });
        }
    }

})()

