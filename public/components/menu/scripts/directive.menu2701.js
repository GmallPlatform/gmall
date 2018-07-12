'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('menuSections',menuSectionHorizontal)
        .directive('menuSectionsPug',menuSectionHorizontalPug)
        .directive('menuBrandsPug',menuBrandsHorizontalPug)
        .directive('menuSectionsVirtical',menuSectionVirtical)
        .directive('menuSectionsVirticalPug',menuSectionVirticalPug)
        .directive('menuBrandsVirticalPug',menuBrandsVirticalPug)
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
    function menuSectionHorizontalPug(){
        return {
            scope: {},
            restrict:"AE",
            bindToController: true,
            controller: directiveMenu,
            controllerAs: '$ctrl',

        }
    }
    function menuBrandsHorizontalPug(){
        return {
            scope: {},
            restrict:"AE",
            bindToController: true,
            controller: directiveMenuBrands,
            controllerAs: '$ctrl',

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
    function menuSectionVirticalPug(){
        return {
            scope: {},
            restrict:"AE",
            bindToController: true,
            controller: directiveMenuV,
            controllerAs: '$ctrl',
            //templateUrl: 'components/menu/menuSectionVertical.html',
        }
    }
    function menuBrandsVirticalPug(){
        return {
            scope: {},
            restrict:"AE",
            bindToController: true,
            controller: directiveMenuVBrands,
            controllerAs: '$ctrl',
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
        self.clickMenu=global.get('store').val.template.clickMenu;
        self.global=global;
        var menuLis;
        var sectionElements=[];
        var innerDivs=[];
        self.getSectionUrlParams=getSectionUrlParams;
        self.getCategoryUrlParams=getCategoryUrlParams;
        activate();
        //*********************************************************
        function activate(){
            //console.log('menu')
            $q.when()
                .then(function(){
                    return Sections.getSections();
                } )
                .then(function(sections){
                    self.sections=sections.filter(function(el){return !el.parent && el.level===0});
                    setTimeout(function(){
                        // для горизонтального меню
                        var w=$(window ).width()
                        //console.log(w)
                        self.sections.forEach(function(sec,i){
                            var el=$('#s'+sec._id );
                            if(sec.categories.length<2 && !sec.child.length){return}
                            var sec_element_offset=el.offset();
                            //console.log(sec_element_offset)
                            if(sec_element_offset){
                                var offsetLeft=sec_element_offset.left
                                var innerDiv=$('#innerDiv'+i );
                                innerDivs.push(innerDiv)
                                innerDiv.css('left','-'+offsetLeft+'px')
                                bindHoverLi(el,i);
                                sectionElements.push(el)
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
                    //console.log('do it')
                    sectionElements[i].unbind()
                    innerDivs[i].slideUp(function(){
                        $timeout(function(){
                            bindHoverLi(sectionElements[i],i);
                        },700)
                    })
                    break;
                }
            }
            return;
        })
        function bindHoverLi(li,ii){
            if(self.clickMenu){
                li.click(function(e) {
                    for(var i=0,l=innerDivs.length;i<l;i++){
                        if(i==ii){
                            innerDivs[i].stop(true, false, true).toggle();
                        }else{
                            innerDivs[i].hide();
                        }

                    }
                });
            }else{
                /*li.hover(function() {
                    innerDivs[ii].stop(true, false, true).toggle();
                });*/
                li.hover(function() {
                    innerDivs[ii].stop(true, false, true).show();
                },function() {
                    innerDivs[ii].stop(true, false, true).hide();
                })

            }

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
        self.clickMenu=global.get('store').val.template.clickMenu;
        self.global=global;
        var sectionElements=[],innerDivs=[];
        var menuLis;
        self.getSectionUrlParams=getSectionUrlParams;
        self.getCategoryUrlParams=getCategoryUrlParams;
        self.getUrlParams=getUrlParams;
        activate();
        //*********************************************************
        function activate(){
            //console.log('qq')
            $q.when()
                .then(function(){
                    return Sections.getSections();
                } )
                .then(function(sections){
                    //console.log(sections)
                    self.sections=sections.filter(function(el){return !el.parent && el.level===0});
                    setTimeout(function(){
                        /*menuLis=$('.myMenuV .mainli');
                        bindHover(menuLis);*/

                        self.sections.forEach(function(sec,i){
                            var el=$('#s'+sec._id )
                            var innerDiv=el.children('div')
                            innerDivs.push(innerDiv)
                            bindHoverLi(el,i);
                            sectionElements.push(el);
                        })


                    },100);
                } )
                .catch(function(err){
                    console.log(err)
                })
        }
        function bindHoverLi(li,ii){
            innerDivs[ii].hide();
            //console.log(innerDivs[ii])
            if(global.get('mobile').val || self.clickMenu){
                li.click(function(e) {
                    for(var i=0,l=innerDivs.length;i<l;i++){
                        if(i==ii){
                            innerDivs[i].stop(true, false, true).slideToggle(300);
                        }else{
                            //innerDivs[i].hide();
                        }

                    }
                });
            }else{
                li.hover(function() {
                    innerDivs[ii].stop(true, false, true).slideToggle(300);
                });
            }
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
        function bindHover(els){
            console.log(els)
            els.hide()
            els.hover(function() {
                $(this).children('div').stop(true, false, true).slideToggle(300);
            });

        }
    }

    directiveMenuBrands.$inject=['Sections','$state','$q','global','$rootScope','$timeout','$element'];
    function directiveMenuBrands(Sections,$state,$q,global,$rootScope,$timeout,$element){
        var self=this;
        self.clickMenu=global.get('store').val.template.clickMenu;
        self.global=global;
        var menuLis;
        var sectionElements=[];
        var innerDivs=[];
        activate();
        //*********************************************************
        function activate(){
            $q.when()
                .then(function(){
                    return Sections.getSections();
                } )
                .then(function(sections){
                    self.brands=global.get('brands').val
                    setTimeout(function(){
                        // для горизонтального меню
                        var w=$(window ).width()
                        //console.log(w)
                        self.brands.forEach(function(sec,i){
                            var el=$('#s'+sec._id );
                            var sec_element_offset=el.offset();
                            console.log(sec_element_offset)
                            if(sec_element_offset){
                                var offsetLeft=sec_element_offset.left
                                var innerDiv=$element.find('#innerDiv'+i);
                                innerDivs.push(innerDiv)
                                innerDiv.css('left','-'+offsetLeft+'px')
                                bindHoverLi(el,i);
                                sectionElements.push(el)
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
            return;
            for(var i=0,l=innerDivs.length;i<l;i++){
                if(innerDivs[i].is(':hover')){
                    //console.log('do it')
                    sectionElements[i].unbind()
                    innerDivs[i].slideUp(function(){
                        $timeout(function(){
                            bindHoverLi(sectionElements[i],i);
                        },700)
                    })
                    break;
                }
            }
            return;
        })
        function bindHoverLi(li,ii){
            if(self.clickMenu){
                li.click(function(e) {
                    for(var i=0,l=innerDivs.length;i<l;i++){
                        if(i==ii){
                            innerDivs[i].stop(true, false, true).toggle();
                        }else{
                            innerDivs[i].hide();
                        }

                    }
                });
            }else{
                /*li.hover(function() {
                 innerDivs[ii].stop(true, false, true).toggle();
                 });*/
                li.hover(function() {
                    innerDivs[ii].stop(true, false, true).show();
                },function() {
                    innerDivs[ii].stop(true, false, true).hide();
                })

            }

        }

    }
    directiveMenuVBrands.$inject=['Sections','$state','$q','global','$rootScope'];
    function directiveMenuVBrands(Sections,$state,$q,global,$rootScope){
        var self=this;
        self.clickMenu=global.get('store').val.template.clickMenu;
        self.global=global;
        var sectionElements=[],innerDivs=[];
        var menuLis;
        self.getSectionUrlParams=getSectionUrlParams;
        self.getCategoryUrlParams=getCategoryUrlParams;
        self.getUrlParams=getUrlParams;
        activate();
        //*********************************************************
        function activate(){
            //console.log('qq')
            $q.when()
                .then(function(){
                    return Sections.getSections();
                } )
                .then(function(sections){
                    //console.log(sections)
                    self.sections=sections.filter(function(el){return !el.parent && el.level===0});
                    setTimeout(function(){
                        /*menuLis=$('.myMenuV .mainli');
                         bindHover(menuLis);*/

                        self.sections.forEach(function(sec,i){
                            var el=$('#s'+sec._id )
                            var innerDiv=el.children('div')
                            innerDivs.push(innerDiv)
                            bindHoverLi(el,i);
                            sectionElements.push(el);
                        })


                    },100);
                } )
                .catch(function(err){
                    console.log(err)
                })
        }
        function bindHoverLi(li,ii){
            innerDivs[ii].hide();
            //console.log(innerDivs[ii])
            if(global.get('mobile').val || self.clickMenu){
                li.click(function(e) {
                    for(var i=0,l=innerDivs.length;i<l;i++){
                        if(i==ii){
                            innerDivs[i].stop(true, false, true).slideToggle(300);
                        }else{
                            //innerDivs[i].hide();
                        }

                    }
                });
            }else{
                li.hover(function() {
                    innerDivs[ii].stop(true, false, true).slideToggle(300);
                });
            }
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
        function bindHover(els){
            console.log(els)
            els.hide()
            els.hover(function() {
                $(this).children('div').stop(true, false, true).slideToggle(300);
            });

        }
    }

    function directiveDropdownOnHover(scope,element,arrts){
        activate();
        function activate(){
            //console.log('???')
            $(element).children('ul').hide()
            bindHover()
        }
        function bindHover(){
            //console.log('sss')
            $(element).hover(function() {
                $(this).children('ul').stop(true, false, true).slideToggle(200);
            });
        }
    }

})()

