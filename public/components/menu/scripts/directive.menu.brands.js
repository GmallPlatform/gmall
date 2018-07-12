'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('menuBrandsPug1',menuBrandsHorizontalPug)
        .directive('menuBrandsVirticalPug1',menuBrandsVirticalPug)

     function menuBrandsHorizontalPug(){
        return {
            scope: {},
            restrict:"AE",
            bindToController: true,
            controller: directiveMenuBrands,
            controllerAs: '$ctrl',

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

    directiveMenuBrands.$inject=['Sections','$state','$q','global','$rootScope','$timeout','$element'];
    function directiveMenuBrands(Sections,$state,$q,global,$rootScope,$timeout,$element){
        var self=this;
        self.clickMenu=global.get('store').val.template.clickMenu;
        self.global=global;
        var menuLis;
        var sectionElements=[];
        var innerDivs=[];
        var innerDivsSection=[];
        activate();
        //*********************************************************
        function activate(){
            $q.when()
                .then(function(){
                    return Sections.getSections();
                } )
                .then(function(sections){

                    sections.forEach(function(sec,i){
                        var el=$('#s'+sec._id );
                        var innerDiv=$(el).find('#innerDiv'+i );
                        innerDivsSection.push(innerDiv)
                    })


                    self.brands=global.get('brands').val
                    setTimeout(function(){
                        // для горизонтального меню
                        var w=$(window ).width()
                        //console.log(w)
                        var index=0;
                        self.brands.forEach(function(sec,i){
                            if(!sec.display){return}
                            var el=$('#s'+sec._id );
                            var sec_element_offset=el.offset();
                            //console.log(sec_element_offset)
                            if(sec_element_offset){
                                var offsetLeft=sec_element_offset.left
                                var innerDiv=$element.find('#innerDiv'+i);
                                innerDivs.push(innerDiv)
                                innerDiv.css('left','-'+offsetLeft+'px')
                                bindHoverLi(el,index);
                                sectionElements.push(el)
                                index++;
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
             console.log('ddd in brands')
            for(var i=0,l=innerDivs.length;i<l;i++){
                if(innerDivs[i][0]){
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

            }
            return;
        })
        function closeRest() {
            for(var i=0,l=innerDivsSection.length;i<l;i++){
                innerDivsSection[i].hide();
            }
        }
        function bindHoverLi(li,ii){
            if(self.clickMenu){

                li.click(function(e) {
                    console.log(li,ii,innerDivs[ii])
                    closeRest()
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

})()

