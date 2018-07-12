'use strict';
angular.module('gmall.directives')
.directive('filtersList',['$anchorScroll','global','Sections','Category',function($anchorScroll,global,Sections,Category){
        return {
            restrict:"E",
            templateUrl:"components/sections/sections.html",
            link:function($scope,element,attrs){
                //console.log('sectionsLink');
                $scope.prop={};
                $scope.categoryId=null;
                $scope.prop.editCategory=null;
                $scope.$watch('categoryId',function(n){
                    console.log(n);
                })
               /* function createList(section){
                    if (section.child && section.child.length){
                        section.child.forEach(function(el){
                           if(!section.list){section.list=[]}
                            el.type='section'
                            section.list.push(el);
                        })
                    }
                    if (section.categories && section.categories.length){
                        section.categories.forEach(function(el){
                            if(!section.list){section.list=[]}
                            el.type='category'
                            section.list.push(el);
                        })
                    }
                    if (section.child && section.child.length){
                        section.child.forEach(function(el){
                            createList(el)
                        })
                    }
                }*/
                function fillCategories(section){
                    if (section.categories && section.categories.length){
                        section.categories=section.categories.map(function(el){
                            return global.get('categories').val.getObjectFromArray('_id',el);
                        } ).filter(function(el){return el})
                    }
                    if (section.child && section.child.length){
                        section.child.forEach(function(el){
                            fillCategories(el)
                        })

                    }
                }
                //console.log($scope.sections)
                $scope.sections=global.get('groups').val.filter(function(el){return !el.parent && el.level===0});




                $scope.sections.forEach(function(el){
                    fillCategories(el)
                })
                //console.log($scope.sections)
                // управление разделами
                //*************************************************
                $scope.addSection=function(section){
                    var newSection={
                        name:section.name+' '+section.child.length,child:[],categories:[],
                        level:section.level+1,
                        parent:section._id
                    };
                    section.child.push(newSection)
                    Sections.save(newSection,function(res){
                        //console.log(res);
                        newSection._id=res.id;
                        Sections.save(section,function(res){
                            //console.log(res)
                        })
                    })
                    newSection.focus=true;
                }
                $scope.saveSection=function(section){
                    if (!section.name){section.name='раздел без названия'}
                    section.url=section.name.getUrl();
                    Sections.save({update:'name url'},{_id: section._id,name: section.name,url:section.url},function(){},function(err){});
                }
                $scope.deleteSection=function(parentSection,section){
                    //console.log(parentSection,section)
                    var i=parentSection.child.indexOf(section);
                    if (i>-1){
                        parentSection.child.splice(i,1);
                        Sections.delete({id:section._id},function(res){
                            console.log(res);
                        });
                        Sections.save(parentSection,function(res){
                            console.log(res);
                        });
                        return;
                    }
                }
                var findSection = function(id,sections){
                    for(var i= 0,l=sections.length;i<l;i++){
                        if (sections[i]._id==id){
                            return sections[i];
                            break;
                        }
                    }
                    var res;
                    for(var i= 0,l=sections.length;i<l;i++){
                        if (sections[i].child && sections[i].child.length){
                            res = findSection(id,sections[i].child);
                            if(res){
                                return res;
                                break;
                            }
                        }
                    }
                }
                $scope.dropSectionCallback=function(section,parentSection){
                    setTimeout(function(){
                        //console.log(section,parentSection)
                        var oldParent=findSection(section.parent,$scope.sections);
                        //console.log(oldParent);
                        //return;
                        section.parent=parentSection._id;
                        Sections.save({update:'parent'},{id:section._id},function(res){
                            console.log(res);
                        })
                        Sections.save({update:'child'},{_id:parentSection._id,child:parentSection.child.map(function(el){return el._id})},function(res){
                            console.log(res);
                        })
                        Sections.save({update:'child'},{_id:oldParent._id,child:oldParent.child.map(function(el){return el._id})},function(res){
                            console.log(res);
                        })

                    },50)

                    return section;
                }

                // управление категориями
                //**********************************************************

                $scope.addCategory=function(section){
                    var category={name:section.name+' категория  '+section.categories.length,
                    group:{_id:section._id}};
                    section.categories.push(category);
                    category.focus=true;

                    Category.save(category,function(res){
                        console.log(res);
                        category._id=res.id;
                        //category.group= {_id:category.group}
                        //section.categories.push(category);
                        Sections.save(section)
                    })
                }

                $scope.saveCategoryName=function(c,section){
                    if (!c.name){c.name='категория без названия'};
                    c.url=c.name.getUrl();
                    Category.save({update:'name url'},{_id: c._id,name: c.name,url: c.url},function(){},function(err){});
                }


                $scope.deleteCategory=function(section,idx){
                    Category.delete({id:section.categories[idx]._id},function(res){
                        var category = section.categories.splice(idx,1)
                        Sections.save({update:'categories'},{_id:section._id,categories:section.categories.map(function(el){return el._id})},function(res){})
                        /*category.group=null;
                        Category.save({update:'group'},{_id: category._id,group: category.group},function(res){
                            console.log(res);
                        });*/
                    },function(err){
                        console.log(err)
                    })



                }

                $scope.dropCategoryCallback = function(category,section) {
                    setTimeout(function(){
                        Sections.save({update:'categories'},{_id:section._id,categories:section.categories.map(function(el){return el._id})},function(res){})
                        var oldSection=findSection(category.group._id,$scope.sections);
                        Sections.save({update:'categories'},{_id:oldSection._id,categories:oldSection.categories.map(function(el){return el._id})},function(res){})
                        category.group._id=section._id;
                        Category.save({update:'group'},{_id:category._id,group:category.group._id},function(res){})
                    },50)
                    return category;
                };

                $scope.dragoverCallback = function(event, index, external, type) {
                    //$scope.logListEvent('dragged over', event, index, external, type);
                    // Disallow dropping in the third row. Could also be done with dnd-disable-if.
                    return index < 10;
                };
                $scope.editCategory=function(id){
                    //console.log(id)
                    $scope.categoryId=id;
                    $scope.prop.editCategory=true;
                }


            }
        }
}])



