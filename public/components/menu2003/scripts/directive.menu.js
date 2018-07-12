'use strict';
angular.module('gmall.directives')
.directive('menuSections',['Sections','$state','$q','global',function(Sections,$state,$q,global){
    return {
        replace:true,
        restrict:"AE",
        scope:{

        },
        templateUrl:"components/menu/menuSections.html",
        link:function($scope,element,attrs){
            var topMenu =$('#topMenu');
            function getOffsetTop(){
                var offset = $(element).offset();
                return offset.top - $(window).scrollTop();
            }
            var fix=false;
            $(window ).scroll(function(){
                if(attrs['menuSections']=='fixed'){
                    // console.log(getOffsetTop(),fix)
                    if (getOffsetTop()<70 && !fix){
                        fix=true;
                        topMenu.css('opacity',0);
                        element.addClass('section-menu-fixed')
                    }
                    if ($(window).scrollTop()<70 && fix){
                        fix=false;
                        topMenu.css('opacity',1);
                        element.removeClass('section-menu-fixed')
                    }
                }

            })
            var menuElements=[],dropDownMenu=[];
            var enter={};
            $q.when().then(function(){
                return Sections.getSections();
            } ).then(function(sections){
                $scope.sections=sections.filter(function(el){return !el.parent && el.level===0});
                //console.log($scope.sections)
                setTimeout(function(){
                    var wrapperSections=$('#wrapperForSections')
                    var wrapperSubSections=$('#wrapperForSubSections')
                    wrapperSections.on("mouseenter", function(){
                        //console.log('mouseenter wrapperSections')
                    })
                    wrapperSections.on("mouseleave", function(){
                        //console.log('mouseleave wrapperSections')
                    })
                    wrapperSubSections.on("mouseenter", function(){
                        console.log('!!!mouseenter wrapperSubSections')
                    })
                    wrapperSubSections.on("mouseleave", function(){
                        console.log('!!!mouseleave wrapperSubSections')
                    })
                    $scope.sections.forEach(function(el,i){
                        (function(){
                            function openSubSection(){
                                enter[el._id]=true;
                                if (enter[el._id]){
                                    subsection.css('display','block');
                                }
                                setTimeout(function(){

                                })
                            }
                            function closeSubSection(){
                                enter[el._id]=false

                                setTimeout(function(){
                                    if (!enter[el._id]){
                                        subsection.css('display','none')
                                    }
                                },100)

                            }

                            enter[el._id]=false;
                            var section=$('#s'+el._id )
                            var subsection=$('#s'+el._id+'ub' );
                            section.on("mouseenter", function(){
                                openSubSection()
                            })
                            section.on("mouseleave", function(){
                                closeSubSection()
                            })
                            subsection.on("mouseenter", function(){
                                openSubSection()
                            })
                            subsection.on("mouseleave", function(){
                                closeSubSection()
                            })
                            // устанавливаем одинаковую высоту вложенных секций
                            var height=subsection.height();
                            for(var i= 0,l=subsection.children()[0].children.length;i<l;i++){
                                $(subsection.children()[0].children[i]).height(height)
                            }
                        })()
                    })
                },100)
            } ).catch(function(err){
                console.log(err)
            })

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
                    queryTag:null
                }
                if (section.level===0){
                    params.groupUrl=section.url
                }else{
                    params.groupUrl=section.section.url;
                    params.parentGroup=section.url;
                }
                return params;
            }
            $scope.getCategoryUrlParams=function(section,category){
                var params =$scope.getSectionUrlParams(section);
                if(category){
                    params.categoryUrl=category.url;
                } else{
                    params.categoryUrl='category';
                    params.categoryList='allCategories'
                }
                return params;
            }
        }
    }
}])
.directive('sectionInMenu',[function(){
    return {
        replace:true,
        restrict:"E",
        scope:{
            section:'=',
            urlParams:'='
        },
        templateUrl:"components/menu/sectionInMenu.html",
        link:function(scope,element,attrs){
            setTimeout(function(){
                var height=$(element[0].children[2].children[1] ).height();
                //console.log(height)
                var children=[];
                var numChildren=element[0].children[2].children[1].children[0].children.length;
                for(var i= 0,l=numChildren;i<l;i++){
                    $(element[0].children[2].children[1].children[0].children[i]).height(height)
                }
                //console.log();
            },500)

            setTimeout(function(){
                var el=document.querySelector('#s'+scope.section._id)
               // console.log(el)
                var rect = el.getBoundingClientRect();

                var pos = {
                    top: rect.top + document.body.scrollTop,
                    left: rect.left + document.body.scrollLeft
                }
                //console.log(pos)
               // subsection.css('left',pos.left-20+'px')
            })
            var section = angular.element(element.children().children()[0]);
            var subsection =angular.element(element.children().children()[1]);
            //console.log(section,subsection)
            var enter;
            subsection.css('display','none')

            subsection.on("mouseenter", function(){

                enter=true;
                //console.log('subsection mouseenter ',enter)
                subsection.css('display','block')
            })
            subsection.on("mouseleave", function(){
                enter=false
                //console.log('subsection mouseleave ',enter)
                setTimeout(function(){
                    //console.log('timeout ',enter)
                    if(!enter){
                        subsection.css('display','none')
                    }
                },10)
            })
            section.on("mouseenter", function(){
                enter=true;
                //console.log('section mouseenter ',enter)
                subsection.css('display','block')
            })
            section.on("mouseleave", function(){
                enter=false
                //console.log('section mouseleave ',enter)
                setTimeout(function(){
                    //console.log('timeout ',enter)
                    if(!enter){
                        subsection.css('display','none')
                    }
                },10)
            })

            scope.getSectionUrlParams=function(section){
                //console.log(section)
                var params={
                    groupUrl:'group',
                    categoryUrl:'category',
                    categoryList:null,
                    parentGroup:null,
                    brand:null,
                    artikul:null,
                    brandTag:null,
                    queryTag:null
                }
                if (section.level===0){
                    params.groupUrl=section.url
                }else{
                    params.groupUrl=section.section.url;
                    params.parentGroup=section.url;
                }
                return params;
            }
            scope.getCategoryUrlParams=function(section,category){
                var params =scope.getSectionUrlParams(section);
                if(category){
                    params.categoryUrl=category.url;
                } else{
                    params.categoryUrl='category';
                    params.categoryList='allCategories'
                }
                return params;
            }
        }
    }
}])
.directive('subsubsection',[function(){
    return{
        restrict:'C',
        link:function(scope,element,attrs){
            //console.log($(element.parent().parent()[0]).height());
            /*scope.$watch(function(){return element.parent().parent().height()},function(n,o){
            })*/

        }
    }
}])

