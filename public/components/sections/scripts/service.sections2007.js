'use strict';
angular.module('gmall.services')
.service('Sections', sectionServiceFunction)

.service('selectCategoryFromModal',function($q,$uibModal){
    this.bind=function(categoryId){
        return $q(function(resolve,reject){
            var options={
                animation: true,
                templateUrl: 'components/selectCategoryModal/selectCategoryModal.html',
                controller: 'selectCategoryModalCtrl',
                size: 'lg',
                resolve:{
                    categoryId:function(){return categoryId}
                }
            }
            var modalInstance = $uibModal.open(options);
            modalInstance.result.then(function (selectedItem) {
                resolve(selectedItem)
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
                reject()
            });
        })
    }
})

sectionServiceFunction.$inject=['$resource', '$q' ,'global','$uibModal'];
function sectionServiceFunction($resource,$q,global,$uibModal) {
    var Items= $resource('/api/collections/Group/:id',{id:'@_id'});

    var sections=null;
    var pending=true;
    function getParentSection(sections,sectionUrl,id){
        //console.log(sectionUrl)
        if(!sections) return  null;
        for(var i=0,l=sections.length;i<l;i++){
            if(id){
                if(sections[i]._id==sectionUrl){
                    return sections[i];
                    break
                }
            }else{
                if(sections[i].url && sections[i].url==sectionUrl){
                    return sections[i];
                    break
                }
            }

            if (sections[i].child && sections[i].child.length){
                var categories;
                if(categories=getParentSection(sections[i].child,sectionUrl,id)){
                    return categories;
                    break;
                }
            }
        }
        return null;
    }
    function getEmbededCategories(section,arr){
        if(section.categories && section.categories.length){
            arr.push.apply(arr,section.categories);
        }
        if (section.child && section.child.length){
            section.child.forEach(function(section){
                getEmbededCategories(section,arr);
            })
        }
        return arr;
    }
    this.query=Items.query;
    this.get=Items.get;
    this.delete=Items.delete;
    this.save=Items.save;
    function returnSections(resolve){
        if(pending){setTimeout(function(){returnSections(resolve)}, 100);}else{
            resolve(sections)
        }

    }
    this.getSections=function(){
        return $q(function(resolve,reject){
            if(global.get('sections') && global.get('sections' ).val){
                if(!sections){sections=global.get('sections' ).val}
                resolve(global.get('sections' ).val);
            }else{
                if(pending){
                    setTimeout(function(){returnSections(resolve)}, 100);
                }else{
                    if(sections){
                        resolve(sections)
                    } else{
                        pending=true;
                        Items.query(function(res){
                            res.shift();
                            sections=res;
                            pending=false;
                            resolve(sections)
                        },function(err){pending=false;;reject(err)})
                    }
                }

            }

        })


    }
    this.setSections=function(newSections){
        sections=newSections
        setCategoriesFromSections(sections)
    }
    this.getParentSection=function(sectionUrl,id){
        return getParentSection(sections,sectionUrl,id)
    }
    this.getEmbededCategories=function(section,arr){
        return getEmbededCategories(section,arr)
    }
    this.setCategoriesFromSections=setCategoriesFromSections;
    function setCategoriesFromSections(sections){
        var categories=[];
        sections.forEach(function(section){
            if(section.categories && section.categories.length){
                section.categories.forEach(function(c){
                    //console.log(c)
                    c.section={url:section.url}
                    c.linkData={groupUrl:section.url,categoryUrl:c.url}
                })
                categories.push.apply(categories,section.categories)
            }
            if(section.child && section.child.length){
                section.child.forEach(function(subSection){
                    if(subSection.categories && subSection.categories.length){
                        subSection.categories.forEach(function(c){
                            //console.log(c)
                            c.section={url:section.url}
                            c.linkData={groupUrl:section.url,categoryUrl:c.url,parentGroup:subSection.url}
                        })
                        categories.push.apply(categories,subSection.categories)
                    }
                })
            }
        })
        global.set('categories',categories);
    }


    if(!global.get('sections') || !global.get('sections' ).val){
        Items.query(function(res){
            res.shift();
            sections=res;
            setCategoriesFromSections(sections)
            pending=false;
        })
    }
    this.select=function(){
        var that=this;
        return $q(function(resolve,reject){
            var options={
                animation: true,
                templateUrl: 'components/sections/selectSubsectionModal.html',
                controller: selectSubsectionCtrl,
                size: 'lg',
                resolve:{
                    sections:function(){return that.getSections();}
                },
                controllerAs:'$ctrl'
            }
            var modalInstance = $uibModal.open(options);
            modalInstance.result.then(function (selectedItem) {
                resolve(selectedItem)
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
                reject()
            });
        })

    }
    selectSubsectionCtrl.$inject=['$q','$uibModalInstance','sections'];
    function selectSubsectionCtrl($q,$uibModalInstance,sections){
        var self=this;
        self.sections = sections;
        console.log(sections)
        self.ok = function (section) {
            $uibModalInstance.close(section);
        };
        self.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
}