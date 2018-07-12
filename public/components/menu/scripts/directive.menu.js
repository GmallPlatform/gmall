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

        .directive('slideMenuAfterScroll',slideMenuAfterScroll)

        .directive('setFonAfterStartScroll', ['$timeout','$state','$rootScope','global',function ($timeout,$state,$rootScope,global) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    var mainContentDiv= $('#mainContentDiv');
                    var templ=global.get('store').val.template;
                    var h1,h2;
                    $timeout(function () {
                        h1= $('#menu1-section').outerHeight();
                        h2= $('#menu2-section').outerHeight();
                        //h2&&(h1+=h2)
                        if(h2){h1+=h2}
                        if(global.get('store').val.template.menu1.hideMenuIfNotHome){
                            h1=h2;
                        }
                        h2=h1;
                        //console.log('h2',h1,h2)
                    })



                    //element.css('margin-top',-h1)

                    $(element).hover(function() {
                        $rootScope.$emit('menuHoverIn')
                        //$(element).addClass('menuColor')
                    },function() {
                        $rootScope.$emit('menuHoverOut')
                        //$(element).removeClass('menuColor')
                    })

                    $rootScope.$on('menuHoverIn',function(){
                        //console.log('menuHoverIn',console.log(element))
                        if(global.get('store').val.template.menu1.BGColorOnHover){
                            $(element).addClass('menuColor')
                        }

                    })
                    $rootScope.$on('menuHoverOut',function(){
                        if(global.get('store').val.template.menu1.BGColorOnHover && !global.get('store').val.template.menu1.background){
                            if(window.pageYOffset<5 && $rootScope.$state.current.name=='home'){
                                $(element).removeClass('menuColor')
                            }
                        }
                    })



                    //element.css('margin-top',-h1)



                    $rootScope.$on('$stateChangeStart', function(event, to){
                        //console.log(to.name)
                        if(to.name!='home'){
                            //console.log(to.name)
                            if(!templ.menu1.marginOther){
                                $(element).addClass('menuColor')
                            }
                            if(!templ.margin){
                                //console.log('templ.margin from setFonAfterStartScroll',templ.margin)
                                $timeout(function () {
                                    //console.log(templ.menu1)
                                    if(templ.menu1.position!='left' && templ.menu1.position!='right' && !templ.menu1.marginOther){
                                        mainContentDiv.css('margin-top',h1)
                                    }
                                })
                            }
                        }else{
                            if(!global.get('store').val.template.menu1.background){
                                if(global.get('store').val.template.menu1.BGColorOnHover){
                                    if(window.pageYOffset<5){
                                        //console.log(global.get('store').val.template.menu1)
                                        $(element).removeClass('menuColor')
                                    }
                                }else{
                                    $(element).removeClass('menuColor')
                                }
                            }

                            /*if(window.pageYOffset<5 && !global.get('store').val.template.menu1.background){
                             //console.log(global.get('store').val.template.menu1)
                             $(element).removeClass('menuColor')
                             }*/

                            if(!templ.margin){
                                if(templ.menu1.position!='left' && templ.menu1.position!='right'){
                                    mainContentDiv.css('margin-top',0)
                                }
                            }
                        }
                    })


                    //console.log('link')
                    var is=false;
                    //console.log("attr['setFonAfterStartScroll']",attr['setFonAfterStartScroll'])
                    //console.log("global.get('store').val.template.menu1.BGColorOnHover",global.get('store').val.template.menu1.BGColorOnHover)
                    if(attr['setFonAfterStartScroll']){
                        //console.log(attr['setFonAfterStartScroll'])
                        $(element).addClass('menuColor')
                    }else{
                        //console.log('!!!!!!!!!!!!!!!!!??????????')
                        if(global.get('store').val.template.menu1.BGColorOnHover){
                            $(window).scroll(function(){
                                if(window.pageYOffset>5){
                                    if(!is){
                                        is=true;
                                        $(element).addClass('menuColor')
                                    }
                                }else{
                                    if($rootScope.$state.current.name=='home'){
                                        is=false
                                        $(element).removeClass('menuColor')
                                    }
                                }
                            })
                        }

                    }

                }
            }
        }])
        .directive('setMenuColorClass', ['$rootScope',function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    console.log(element)
                    $rootScope.$on('$stateChangeStart', function(event, to){
                        if(to.name!='home'){
                            $(element).addClass('menuColor')
                        }else{

                            if(window.pageYOffset<5){
                                $(element).removeClass('menuColor')
                            }
                        }
                    })

                    $rootScope.$on('menuHoverIn',function(){
                        console.log('menuHoverIn',console.log(element))
                        $(element).addClass('menuColor')
                    })
                    $rootScope.$on('menuHoverOut',function(){
                        if($rootScope.$state.current.name=='home'){
                            if(window.pageYOffset<5){
                                $(element).removeClass('menuColor')
                            }
                        }
                    })
                    $(window).scroll(function(){
                        if($rootScope.$state.current.name=='home'){
                            if(window.pageYOffset>5){
                                $(element).addClass('menuColor')
                            }else{
                                $(element).removeClass('menuColor')
                            }
                        }

                    })
                }
            }
        }])
        .directive('marginMainContent22',function(global,$timeout){
            return {
                restrict:'A',
                link:function(scope,element,attrs){
                    var mainContentDiv= $('#mainContentDiv');
                    var templ=global.get('store').val.template;
                    //console.log(templ.menu1,templ.menu2)
                    //if(templ.margin && templ.menu1.is && templ.menu1.fixed && templ.menu1.position=='top'){

                    $timeout(function () {
                        if(templ.margin && templ.menu1.position!='left' && templ.menu1.position!='right'){
                            // console.log('templ.margin from setFonAfterStartScroll',templ.margin)
                            $timeout(function(){
                                var m1=$('#menu1-section')
                                var h1= m1.height();

                                var m2=$('#menu2-section')
                                if(m2){
                                    var h2= m2.height();
                                }
                                h2&&(h1+=h2)
                                //console.log(m1,m2)
                                mainContentDiv.css('margin-top',h1)
                                //element.css('margin-top',h1)
                            })
                        }
                    },100)



                }
            }
        })

        // минимальная высоты страницы что бы футер был по нижнему краю
        .directive('marginMainContent',function($rootScope,$timeout){
            return {
                restrict:'A',
                link:function(scope,element,attrs){
                    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
                        $timeout(function () {
                            var h =$(document.body).find('#firstDiv').height();
                            var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                            var delta=vh-h
                            //console.log(h,vh,delta)
                            //console.log()
                            if(delta>30){
                                //console.log($(element[0].querySelector('#mainContentDiv')).css('margin-top'))
                                var mt = $(element[0].querySelector('#mainContentDiv')).css('margin-top');
                                if(mt){
                                    mt=parseInt(mt, 10)
                                }else{
                                    mt=0;
                                }
                                var elH=element.height()
                                /*console.log(mt,elH+delta-mt)
                                console.log(elH,delta,mt)
*/

                                 //console.log(h,vh,delta,elH+delta)
                                element.css('min-height',elH+delta-mt)
                            }
                        },200)

                    })
                }
            }
        })
        .directive('footer22',function($timeout,$rootScope){
            return {
                restrict :'E',
                link:function(scope,element){
                    $rootScope.$on('$stateChangeStart', function(event, to, toParams, fromState, fromParams){
                        //console.log('$stateChangeStart')
                        element.css('position','static')
                    })
                    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
                        $timeout(function () {
                           /*var h =document.body.clientHeight;
                           var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                           console.log(h,vh)
                            if(vh-h>20){
                                element.css('position','fixed')
                                element.css('bottom',0)
                            }*/
                        })

                    })
                }
            }
        })

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
        self.dropDownCatalog=global.get('store').val.template.dropDownCatalog;
        self.global=global;
        var menuLis;
        var sectionElements=[];
        var innerDivs=[];
        var innerDivsBrand=[];
        /*self.getSectionUrlParams=getSectionUrlParams;
        self.getCategoryUrlParams=getCategoryUrlParams;*/
        activate();
        //*********************************************************
        function activate(){
            //console.log('menu')
            $q.when()
                .then(function(){
                    return Sections.getSections();
                } )
                .then(function(sections){
                    global.get('brands').val.forEach(function(sec,i){
                        var el=$('#s'+sec._id );
                        var innerDiv=$(el).find('#innerDivBrand'+sec._id );
                        innerDivsBrand.push(innerDiv)
                    })


                    self.sections=sections.filter(function(el){return !el.parent && el.level===0});
                    setTimeout(function(){
                        // для горизонтального меню
                        var w=$(window ).width()
                        self.sections.forEach(function(sec,i){
                            var el=$('#s'+sec._id );
                            //if(sec.categories.length<2 && !sec.child.length){return}
                            var sec_element_offset=el.offset();
                            //console.log(sec_element_offset)
                            if(sec_element_offset){
                                var offsetLeft=sec_element_offset.left
                                var innerDiv=$('#innerDiv'+sec._id );
                                var container=innerDiv.find('div');
                                var sub_menu=container.find('.sub-menu')
                                console.log()
                                el.innerDiv=innerDiv;
                                //innerDivs.push(innerDiv)
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
            //console.log('ddd in directiveMenu')
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
            for(var i=0,l=innerDivsBrand.length;i<l;i++){
                innerDivsBrand[i].hide();
            }
        }
        function bindHoverLi(li,ii){
            if(self.clickMenu){
                //console.log(bindHoverLi)
                li.click(function(e) {
                    if($(e.target).hasClass('sibsection')){
                        li.find('.section-in-section').each(function (i,li2) {
                            $(li2).hover(function() {
                                //li.innerDiv.slideDown()
                                if(self.dropDownCatalog==1){
                                    $(li2).find('.sub-menu').stop(true, false, true).slideDown('slow');
                                }else if(self.dropDownCatalog==2){
                                    $(li2).find('.sub-menu').stop(true, false, true).slideDown('fast');
                                }else{
                                    $(li2).find('.sub-menu').stop(true, false, true).show();
                                }

                            },function() {
                                if(self.dropDownCatalog==1){
                                    $(li2).find('.sub-menu').stop(true, false, true).hide();
                                }else if(self.dropDownCatalog==2){
                                    $(li2).find('.sub-menu').stop(true, false, true).hide();
                                }else{
                                    $(li2).find('.sub-menu').stop(true, false, true).hide();
                                }
                            })
                        })
                    }else{
                        closeRest();
                        for(var i=0,l=sectionElements.length;i<l;i++){
                            if(sectionElements[i][0].id==li[0].id){
                                if(self.dropDownCatalog==1){
                                    li.innerDiv.stop(true, false, true).slideToggle('slow');
                                }else if(self.dropDownCatalog==2){
                                    li.innerDiv.stop(true, false, true).slideToggle('fast');
                                }else{
                                    li.innerDiv.stop(true, false, true).toggle();
                                }

                            }else{
                                if(self.dropDownCatalog==1){
                                    sectionElements[i].innerDiv.slideUp('slow');
                                }else if(self.dropDownCatalog==2){
                                    sectionElements[i].innerDiv.slideUp('fast');
                                }else{
                                    sectionElements[i].innerDiv.hide();
                                }


                            }
                        }
                    }

                });
            }else{
                li.hover(function() {
                    //li.innerDiv.slideDown()
                    if(self.dropDownCatalog==1){
                        li.innerDiv.stop(true, false, true).slideDown('slow');
                    }else if(self.dropDownCatalog==2){
                        li.innerDiv.stop(true, false, true).slideDown('fast');
                    }else{
                        li.innerDiv.stop(true, false, true).show();
                    }

                },function() {
                    if(self.dropDownCatalog==1){
                        li.innerDiv.stop(true, false, true).slideUp('slow');
                    }else if(self.dropDownCatalog==2){
                        li.innerDiv.stop(true, false, true).slideUp('fast');
                    }else{
                        li.innerDiv.stop(true, false, true).hide();
                    }

                    //li.innerDiv.slideUp();
                })
                li.find('.section-in-section').each(function (i,li2) {
                    $(li2).hover(function() {
                        //li.innerDiv.slideDown()
                        if(self.dropDownCatalog==1){
                            $(li2).find('.sub-menu').stop(true, false, true).slideDown('slow');
                        }else if(self.dropDownCatalog==2){
                            $(li2).find('.sub-menu').stop(true, false, true).slideDown('fast');
                        }else{
                            $(li2).find('.sub-menu').stop(true, false, true).show();
                        }

                    },function() {
                        if(self.dropDownCatalog==1){
                            $(li2).find('.sub-menu').stop(true, false, true).hide();
                        }else if(self.dropDownCatalog==2){
                            $(li2).find('.sub-menu').stop(true, false, true).hide();
                        }else{
                            $(li2).find('.sub-menu').stop(true, false, true).hide();
                        }
                    })
                })

            }

        }

    }
    directiveMenuV.$inject=['Sections','$state','$q','global','$rootScope','$element'];
    function directiveMenuV(Sections,$state,$q,global,$rootScope,$element){
        var self=this;
        self.clickMenu=global.get('store').val.template.clickMenu;
        self.global=global;
        var sectionElements=[],innerDivs=[];
        var menuLis;
        activate();
        //*********************************************************
        function activate(){
            $q.when()
                .then(function(){
                    return Sections.getSections();
                } )
                .then(function(sections){
                    //console.log(sections)
                    self.sections=sections.filter(function(el){return !el.parent && el.level===0 && !el.hideSection});
                    setTimeout(function(){
                        /*menuLis=$('.myMenuV .mainli');
                        bindHover(menuLis);*/
                        self.sections.forEach(function(sec,i){
                            var el=$('#s'+sec._id )
                            var innerDiv=el.children('div')
                            innerDivs.push(innerDiv)
                            //console.log(el)
                            bindHoverLi(el,i);
                            sectionElements.push(el);
                        })

                        var innerUl = $element.find('.category-in-section');
                        $(innerUl).each(function (i,section) {
                            var ul = $(section).find('ul');
                            //console.log('slideToggle',ul)
                            $(ul).slideToggle()

                            $(section).click(function(e) {
                                console.log('section',section)
                                e.stopPropagation()
                                $(ul).stop(true, false, true).slideToggle(300);
                            });
                        })


                    },100);
                } )
                .catch(function(err){
                    console.log(err)
                })
        }
        function bindHoverLi(li,ii){
            if(!self.sections[ii] || !self.sections[ii].openCatalog){
                $(innerDivs[ii]).slideToggle();
            }
            if(self.clickMenu){
                li.click(function(e) {
                    for(var i=0,l=innerDivs.length;i<l;i++){
                        if(i==ii){
                            $(innerDivs[i]).stop(true, false, true).slideToggle(300);
                        }else{
                            //innerDivs[i].hide();
                        }

                    }
                });
            }else{
                li.hover(function() {
                    $(innerDivs[ii]).stop(true, false, true).slideToggle(300);
                });
            }
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
                        var innerDiv=$(el).find('#innerDiv'+sec._id );
                        innerDivsSection.push(innerDiv)
                    })


                    self.brands=(global.get('brands').val)?global.get('brands').val:[];
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
                                var innerDiv=$element.find('#innerDivBrand'+sec._id);
                                el.innerDiv=innerDiv;
                                //innerDivs.push(innerDiv)
                                innerDiv.css('left','-'+offsetLeft+'px')
                                bindHoverLi(el,index);
                                sectionElements.push(el)
                                index++
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
             //console.log('ddd in brands')
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
                    closeRest();
                    for(var i=0,l=sectionElements.length;i<l;i++){
                        if(sectionElements[i][0].id==li[0].id){
                            li.innerDiv.stop(true, false, true).toggle();
                        }else{
                            sectionElements[i].innerDiv.hide();
                        }
                    }
                });
            }else{
                li.hover(function() {
                    li.innerDiv.stop(true, false, true).show();
                },function() {
                    li.innerDiv.stop(true, false, true).hide();
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
        activate();
        //*********************************************************
        function activate(){
            self.brands=(global.get('brands').val)?global.get('brands').val:[];
            setTimeout(function(){
                /*menuLis=$('.myMenuV .mainli');
                 bindHover(menuLis);*/
                var index=0;
                self.brands.forEach(function(sec,i){
                    if(!sec.display){return}
                    var el=$('#s'+sec._id )
                    var innerDiv=el.children('div')
                    innerDivs.push(innerDiv)
                    bindHoverLi(el,index);
                    sectionElements.push(el);
                    index++
                })


            },100);
        }
        function bindHoverLi(li,ii){
            $(innerDivs[ii]).slideToggle();
            //console.log(innerDivs[ii])
            if(self.clickMenu){
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

    function slideMenuAfterScroll(global,$timeout,$rootScope){
        return {
            restrict:'A',
            link:function(scope,element,attrs){
                var firstLook=true;
                var menu=attrs['slideMenuAfterScroll'];

                var menuHide=attrs['hideMenu'];
                /*console.log(attrs)
                console.log('menuHide',menuHide)*/

                var template=global.get('store').val.template;
                var offset = 199;
                var done;
                var h=$('#menu1-section').height();

                if(menu=='menu2' && template.menu2.fixed && template.menu2.is && template.menu2.position=='top'){
                    //console.log('????')
                    //$(element).css('top',h+'px')
                }

                if(menu=='menu1' && template.menu1.fixed && template.menu1.position=='top' && template.menu1.scrollSlide){
                    $(window).scroll(scrollHandlerMenu1)
                }else if(menu=='menu2' && template.menu1.fixed && template.menu1.position=='top' && template.menu2.position=='top'  && template.menu1.scrollSlide){
                    $(window).scroll(scrollHandlerMenu2)
                }

                function scrollHandlerMenu1(){
                    if(menuHide && $rootScope.$state.current.name!='home'){
                        return
                    }

                    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrolled > offset && !done) {
                        done=true;
                        $rootScope.$emit('hideMenu1AfterScroll')
                        $(element).css('top','-'+h+'px')
                    } else if (scrolled < offset && done) {
                        done=false;
                        $rootScope.$emit('showMenu1AfterScroll')
                        $(element).css('top',0)
                    }
                }

                function scrollHandlerMenu2(){
                    if(menuHide && $rootScope.$state.current.name!='home'){
                        return
                    }
                    var scrolled = window.pageYOffset || document.documentElement.scrollTop;

                    if (scrolled > offset && !done) {
                        done=true;
                        $(element).css('top',0)
                    }else if (scrolled < offset && done) {
                        done=false;
                        $(element).css('top',h+'px')
                    }
                }

                var logo,logoInverse;
                var cart,cartInverse;
                var humb,humbInverse;

                //http://stackoverflow.com/questions/4306387/jquery-add-and-remove-window-scrollfunction
                // можно еще делать bind unbind function in relative of $sate
                //console.log(template.inverseColor)
                if(template.inverseColor && template.inverseColor.use){
                    if(template.inverseColor.homePage){
                        listenState()
                    }
                    $timeout(function(){
                        logo=$("#mainLogo")
                        logoInverse=$("#inverseLogo")
                        cart=$("#mainCart")
                        cartInverse=$("#inverseCart")
                        humb=$("#mainHumb")
                        humbInverse=$("#inverseHumb")
                        if(template.inverseColor.startScroll){
                            listenScroll()
                        }else if(template.inverseColor.firstBanner){
                            listenBanner()
                        }
                    },300)
                }
                function inverseNone(){
                    logoInverse.css('display','none')
                    logo.css('display','block')

                    cartInverse.css('display','none')
                    cart.css('display','block')
                    humbInverse.css('display','none')
                    humb.css('display','block')
                }
                function inverseBlock(){
                    logo.css('display','none')
                    logoInverse.css('display','block')
                    cart.css('display','none')
                    cartInverse.css('display','block')
                    humb.css('display','none')
                    humbInverse.css('display','block')
                }
                function listenState() {
                    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, fromState, fromParams){
                        //console.log(to,toParams)
                        var delay=0;
                        if(firstLook){
                            delay=500;
                            firstLook=false;
                        }
                        $timeout(function () {
                            if(to.name=='home'){
                                element.removeClass('inverseColor')
                                inverseNone()
                            }else{
                                element.addClass('inverseColor')
                                inverseBlock()
                            }
                        },delay)

                    })
                }
                function listenScroll() {
                    $(window).scroll(function () {
                        if($rootScope.$state.current.name!='home'){
                            return
                        }
                        if(template.inverseColor.homePage && $rootScope.$state.current.name!='home'){return}


                        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                        if (scrolled > 10) {
                            element.addClass('inverseColor')
                            inverseBlock()
                        } else {
                            element.removeClass('inverseColor')
                            inverseNone()
                        }
                    })
                }
                function listenBanner() {
                    var el = document.getElementById('arrowDownDiv')
                    if(!el){return}
                    //console.log(el)
                    var elOffsetY=$(el).offset().top
                    $(window).scroll(function () {
                        if($rootScope.$state.current.name!='home'){
                            return
                        }
                        //console.log($rootScope.$state.current.name)
                        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                        //console.log($(el).height()+elOffsetY,scrolled)
                        if(($(el).height()+elOffsetY)-10>scrolled){
                            element.removeClass('inverseColor')
                            inverseNone()
                        }else{
                            element.addClass('inverseColor')
                            inverseBlock()
                        }
                    })
                }


                $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, fromState, fromParams){
                    if(menuHide){
                        if(to.name=='home'){
                            $rootScope.$emit('showMenu1AfterScroll')
                            if(menu=='menu1'){
                                $(element).css('top',0)
                            }else{
                                $(element).css('top',h+'px')
                            }

                        }else{
                            $rootScope.$emit('hideMenu1AfterScroll')
                            if(menu=='menu1'){
                                $(element).css('top','-'+h+'px')
                            }else{
                                $(element).css('top',0)
                            }

                        }
                    }

                })
            }
        }
    }



})()

