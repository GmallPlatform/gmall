'use strict';
angular.module('gmall.directives')
.directive('categoryTree',[function(){
    return {
        restrict:"E",
        templateUrl:"components/sections/categoryTree.html",
    }

}])
    .directive('categoryHtml',[function(){
        return {
            restrict:"E",
            templateUrl:"components/sections/categoryHtml.html",
        }

    }])
.directive('sectionsList',[function(){
    function sectionCtrl($state,global,$anchorScroll,Sections,Category,$q,$timeout,$scope){
        var self=this;
        self.$state=$state;
        self.global=global;
        self.sectionsList={};
        self.sectionTypes={'good':'товар','service':'услуга','infp':'инфо','media':'медиа'}

        $scope.$on('changeLang',function(){
            //console.log('!!!')
            Sections.setSections(null)
            activate()
        })

        activate()
        function activate() {
            $q.when()
                .then(function(){
                    return Sections.getSections()
                })
                .then(function(sections){
                    self.sections=sections.filter(function(el){return !el.parent && el.level===0});
                    self.sectionsList.sections=self.sections;
                    //console.log(self.sectionsList.sections)
                    //console.log(sections)
                })
        }


        function setNewList(){

        }
        self.setTimeout=timoutForShow;
        self.showRadio;
        function timoutForShow() {
            if(!self.showRadio){
                $timeout(function(){self.showRadio=true;},300)
            }
            return self.showRadio;
        }
        // управление разделами
        //*************************************************
        var scrollTopAllow=true;
        self.newSection=function(section){
            if(!section.name){return}
            var index=0;
            self.sections.forEach(function(s){
                if(s.index>=index){
                    index=s.index+1;
                }
            })
            var newSection={
                name:section.name,child:[],categories:[],
                level:0,
                parent:null,
                index:index
            };
            Sections.save(newSection,function(res){
                section.name='';
                newSection._id=res.id;
                self.sections.push(newSection);

            })
        }
        self.dragoverCallback = function(event){
            return true;
            //console.log($(window).height(),event.y)
            if(!scrollTopAllow){return}
            scrollTopAllow=false;
            setTimeout(function(){
                scrollTopAllow=true;
            },500)
            if(event.y<250){

                //console.log(event.y)
                var y = $(window).scrollTop();  //your current y position on the page
                $(window).scrollTop(y-100);
            }
            if($(window).height()-event.y<200){

                //console.log(event.y)
                var y = $(window).scrollTop();  //your current y position on the page
                $(window).scrollTop(y+100);
            }
            //console.log(event);
        }
        function getLastIndex() {
            var  i =0;
            self.sections.forEach()
        }
        self.addSection=function(section){
            //console.log(section)
            if(!section.sectionNewName){return}
            var newSection={
                name:section.sectionNewName,child:[],categories:[],
                level:section.level+1,
                parent:section._id,
                //index:getLastIndex()+1
            };
            section.child.push(newSection)

            Sections.save(newSection,function(res){
                //console.log(res);
                newSection._id=res.id;
                newSection.url=res.url;
                newSection.section={url:section.url};
                console.log(section)
                section.sectionNewName='';
                var child=section.child.map(function(el){return el._id;})
                Sections.save({update:'child'},{_id:section._id,child:child},function(res){
                    //console.log(res)
                })
            })
            //newSection.focus=true;
        }
        self.saveSection=function(section,field){
            if (!section.name){section.name='раздел без названия'}
            //section.url=section.name.getUrl();
            var o ={_id: section._id};
            o[field]=section[field];
            Sections.save({update:field},o,function(){
                global.set('saving',true);
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            },function(err){});
        }
        self.deleteSection=function(parentSection,section){
            //console.log(parentSection,section);return;
            if (parentSection){
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
            }else{
                if (!section.child.length && !section.categories.length){
                    var i=self.sections.indexOf(section);
                    if (i>-1){
                        self.sections.splice(i,1);
                        Sections.delete({id:section._id},function(res){
                            console.log(res);
                        });
                    }
                }
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
        self.dropSectionCallback=function(section,parentSection){
            setTimeout(function(){
                //console.log(section,parentSection)
                var oldParent=findSection(section.parent,self.sections);
                //console.log(oldParent);
                //return;
                Sections.save({update:'child'},{_id:parentSection._id,child:parentSection.child.map(function(el){return el._id})},function(res){
                    console.log(res);
                })
                if(oldParent._id!=parentSection._id){
                    section.parent=parentSection._id;
                    Sections.save({update:'parent'},{id:section._id},function(res){
                        console.log(res);
                    })
                    Sections.save({update:'child'},{_id:oldParent._id,child:oldParent.child.map(function(el){return el._id})},function(res){
                        console.log(res);
                    })
                }
            },50)
            return section;
        }
        self.dropMainSectionCallback=function(section){
            setTimeout(function(){
                self.sections.forEach(function(section,i){
                    section.index=i;
                    Sections.save({update:'index'},{_id:section._id,index:section.index});
                })
            },50)
            return section;
        }
        // управление категориями
        //**********************************************************
        self.addCategory=function(section,name){
            //todo find section id {section:id}
            if(!section.newCategoryName)return;
            var category={name:section.newCategoryName,
                group:section._id};
            section.categories.push(category);
            category.focus=true;
            Category.save(category,function(res){
                section.newCategoryName='';
                category._id=res.id;
                category.url=res.url;
                var categories=section.categories.map(function(el){return el._id})
                Sections.save({update:'categories'},{_id:section._id,categories:categories})
            })
        }
        self.saveCategoryName=function(c,section){
            if (!c.name){c.name='категория без названия'};
            //c.url=c.name.getUrl();
            //Category.save({update:'name url'},{_id: c._id,name: c.name,url: c.url},function(){},function(err){});
            Category.save({update:'name'},{_id: c._id,name: c.name},function(){
                global.set('saving',true);
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            },function(err){});
        }
        self.saveCategoryActive=function(c){
            console.log(c.name)
            Category.save({update:'notActive'},{_id: c._id,notActive: c.notActive},function(){
                global.set('saving',true);
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            },function(err){});
        }


        self.deleteCategory=function(section,idx){
            Category.delete({_id:section.categories[idx]._id},function(res){
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
        self.dropCategoryCallback = function(category,section) {
            // console.log(category)
            setTimeout(function(){
                section.categories.forEach(function(c,i){c.index=i})
                Sections.save({update:'categories'},{_id:section._id,categories:section.categories.map(function(el){return el._id})},function(res){})

                if (category.group!=section._id){
                    var oldSection=findSection(category.group,self.sections);
                    oldSection.categories.forEach(function(c,i){c.index=i});
                    Sections.save({update:'categories'},{_id:oldSection._id,categories:oldSection.categories.map(function(el){return el._id})},function(res){})
                }

                category.group=section._id;
                Category.save({update:'group'},{_id:category._id,group:category.group},function(res){})
            },50)
            return category;
        };
        self.movedCategory=function(section,index){
            // console.log(index,section.categories[index].index)
            if(index!=section.categories[index].index){
                index++
            }
            section.categories.splice(index,1)
        }
    }
    return {
        scope: {},
        bindToController: true,
        controller: sectionCtrl,
        controllerAs: '$ctrl',
        restrict:"E",
        templateUrl:"components/sections/sections.html",
    }
}])

.directive('categoryEdit',[function(){

    function categoryCtrl($scope,Category,$q,$stateParams,Filters,Brands,global,$timeout,Sections,$http,Photo){
        var self=this;
        self.Items=Category;
        self.global=global;
        self.block='desc';
        self.listOfBlocks=angular.copy(listOfBlocksForAll);
        self.selectCategoryFromMP=selectCategoryFromMP;
        self.deleteCategoryFromMP=deleteCategoryFromMP;

        self.addBlock=addBlock;
        self.deleteBlock=deleteBlock;
        self.refreshBlocks=refreshBlocks;
        self.type='Category';
        var mps;
        $q.when()
            .then(function(){
                return Category.get({_id:$stateParams.id} ).$promise;
            })
            .then(function(res){
                if(!res.blocks){res.blocks=[];}
                res.blocks.forEach(function(b,i){
                    b.i=i
                })
                res.filters= res.filters.map(function(el){return el._id})
                self.item=res;
            })
            .then(function(){
                return Filters.getFilters()
            })
            .then(function(filters){
                self.filters=filters
            })
            .then(function(){
                return Brands.getBrands()
            })
            .then(function(brands){
                self.brands=brands
            })
            .then(function () {
                // get categories for mp
                if(global.get('store').val.mp && global.get('store').val.mp.mps  && global.get('store').val.mp.mps.length){
                    mps = global.get('store').val.mp.mps.map(function (mp) {
                        return mp._id
                    })
                    //console.log(mps)
                    if(mps && mps.length){
                        var acts=[];
                        mps.forEach(function (mp) {
                            acts.push(getPromiseForMPCategories(mp))
                        })
                        return $q.all(acts)
                    }
                }

            })
            .then(function (results) {
                if(results && results.length){
                    self.mps={}
                    self.mpsCategories={}
                    mps.forEach(function (mp,i) {
                        //console.log(i)
                        results[i].shift()
                        self.mps[mp]=results[i]
                        self.mpsCategories[mp]=results[i].reduce(function (o,sec) {
                            if(sec.categories && sec.categories.length){
                                sec.categories.forEach(function (c) {
                                    o[c._id]=c;
                                })
                            }
                            if(sec.child && sec.child.length){
                                sec.child.forEach(function (ch) {
                                    if(ch.categories && ch.categories.length){
                                        ch.categories.forEach(function (c) {
                                            o[c._id]=c;
                                        })
                                    }
                                })
                            }
                           return o;
                        },{})
                        if(self.item.mp && self.item.mp[mp]){
                            self.item.mp[mp]=self.mpsCategories[mp][self.item.mp[mp]]
                        }
                    })
                }
                //console.log(self.mps)

            })
            .catch(function(err){
                self.edit=false;
            })

        function selectCategoryFromMP(mpId,data) {
            //console.log(mpId,data)
            var categoryId=(data && data._id)?data._id:null
            $q.when()
                .then(function () {
                    return Category.select(categoryId,null,self.mps[mpId])
                })
                .then(function (category) {
                    if(!self.item.mp){
                        self.item.mp={}
                    }
                    self.item.mp[mpId]=category;
                    var o={}
                    var categoriesMP=[]
                    for(var key in self.item.mp){
                        o[key]=self.item.mp[key]._id
                        categoriesMP.push(self.item.mp[key]._id)
                    }
                    //console.log(o)
                    saveField('mp',o)
                    changeCategoryForStuffs(self.item._id,categoriesMP)
                })
                .catch(function (err) {
                    console.log(err)
                })

        }
        function deleteCategoryFromMP(mp) {
            var categoryId=self.item.mp[mp]._id
            delete self.item.mp[mp]
            var  o={}
            for(var key in self.item.mp){
                o[key]=self.item.mp[key]._id
            }
            saveField('mp',o)
        }

        function getPromiseForMPCategories(store) {
            return Sections.query({store:store}).$promise;
        }

        function changeCategoryForStuffs(category,categoriesMP) {
            var o ={
                category:category,
                categoriesMP:categoriesMP
            }
            $http.post('/api/stuffs/changeMPCategory',o)
        }

        self.saveField = function(field,defer){
            console.log('field')
            defer =defer||0
            $timeout(function(){
                var o={_id:self.item._id};
                o[field]=self.item[field]
                Category.save({update:field},o,function(){
                    global.set('saving',true)
                    $timeout(function () {
                        global.set('saving',false);
                    },1500)
                });
            },defer)
        };
        function saveField(field,data){
            var o={_id:self.item._id};
            o[field]=data
            Category.save({update:field},o,function(){
                global.set('saving',true)
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            });
        };
        $scope.$on('changeLang',function(){
            $q.when()
                .then(function(){
                    return Category.get({_id:$stateParams.id} ).$promise;
                })
                .then(function(res){
                    if(!res.blocks){res.blocks=[];}
                    res.blocks.forEach(function(b,i){
                        b.i=i
                    })
                    res.filters= res.filters.map(function(el){return el._id})
                    self.item=res;

                })
        })

        function refreshBlocks() {
           // console.log('???????????????')
            return Category.get({_id:$stateParams.id} ).$promise
            //console.log(id)
                .then(function(data) {
                    /*console.log(data)
                     console.log(self.item.blocks.length)*/
                    data.blocks.forEach(function (b,i) {
                        b.i=i;
                        if(!b.desc){b.desc=''}
                        if(!b.descL){b.descL={}}
                        if(!b.desc1){b.desc1=''}
                        if(!b.desc1L){b.desc1L={}}
                        if(!b.name){b.name=''}
                        if(!b.nameL){b.nameL={}}
                        if(!b.name1){b.name1=''}
                        if(!b.name1L){b.name1L={}}
                        if(!b.videoLink){b.videoLink=''}
                    })
                    self.item.blocks=data.blocks
                    /*console.log(self.item.blocks.length)*/
                })
        }
        function addBlock(type){
            if(!type){return}
            $scope.$broadcast('addNewBlock',{type:type})
            self.newBlock=null;
            return;
        }
        function deleteBlock(block) {
            console.log(block)
            var o={_id:self.item._id};
            o['id']=block.id;
            var update={update:'id',embeddedName:'blocks'};
            update.embeddedPull=true;

            console.log(update,o)
            //return;
            Confirm('удалить?')
                .then(function () {
                    return self.Items.save(update,o).$promise;
                })
                .then(function (res) {
                    self.item.blocks.splice(block.i,1)
                    self.item.blocks.forEach(function(b,i){
                        b.i=i;
                    })

                    var images=[]
                    if(block.img){
                        images.push(block.img);
                    }
                    if(block.video){
                        images.push(block.video);
                    }
                    if(block.videoCover){
                        images.push(block.videoCover);
                    }
                    if(block.imgs && block.imgs.length){
                        block.imgs.forEach(function(im){
                            if(im.img){
                                images.push(im.img);
                            }
                        })

                    }
                    if(images.length){
                        return Photo.deleteFiles('Stuff',images)
                    }

                })

        }

    }
    return {
        scope: {},
        bindToController: true,
        controller: categoryCtrl,
        controllerAs: '$ctrl',
        templateUrl:'components/sections/category.html',
    }
}])

.directive('fixSection',[function(){
    return{

        link:function(scope,element,attrs){
            var i=0;
            var delay;
            var visible;
            scope.$on('changeMenuStatus',function(event, reload) {
                if(delay){return}
                delay=true;
                /*timerId= setTimeout(function(){
                    init('reload')
                });


                setTimeout(function(){
                    delay=false;
                    clearTimeout(timerId);
                },200)
*/
                if(clonedBlock.is(":visible")){
                    visible=true;
                    clonedBlock.hide();
                }

                init('reload')
                setTimeout(function(){
                    delay=false;
                    if(visible){
                        visible=false;
                        clonedBlock.fadeIn(200);
                    }

                },400)

            });
            $(window ).resize(function(){

            })
            if($( window ).width()<1200){return}
            /*$(window).resize(function(){
                console.log($( window ).width());
            })*/


            var mainDiv=$('#sectionsTree');
            var borderElement;
            var clonedBlockDisplay=false;
            var clonedBlock;
            var sdvig=(attrs['subSection'])?15:0;
            function getOffsetTop(){
                var offset = $(element).offset();
                return offset.top - $(window).scrollTop();
            }
            function getOffsetBorderElement(){
                var offset = element.offset();
                return offset.top - $(window).scrollTop()+borderElement.height();
            }
            function setScrollBlock(){
                var posY=getOffsetTop();
                var posBottonBorderElement=getOffsetBorderElement();
                //console.log(posY,posBottonBorderElement)
                if (posY<70 && !clonedBlockDisplay && posBottonBorderElement>150){
                    clonedBlockDisplay=true;
                    clonedBlock.show()
                    $(element).css('opacity',0)
                    //console.log('show')
                    //console.log(clonedBlock)
                }
                if (posY>70 && clonedBlockDisplay){

                    clonedBlockDisplay=false;
                    $(element).css('opacity',1)
                    clonedBlock.hide()
                    //console.log('hide')
                }
                if (posBottonBorderElement<150 && clonedBlockDisplay){
                    clonedBlockDisplay=false;
                    $(element).css('opacity',1)
                    clonedBlock.hide()
                    //console.log('hide')
                }
            }
            function init(reload){
                setTimeout(function(){
                    if(!reload){
                        clonedBlock=element.clone().hide()
                        clonedBlock
                            .css('position','fixed')
                            .css("top", 43 )
                            .css('height',element.height())
                    }
                    clonedBlock
                        .css("left",$(element).offset().left )
                        .css('width',element.width()+15+sdvig)




                    if(!reload){
                        mainDiv.append(clonedBlock)
                        borderElement=$('#borderBox'+attrs['fixSection']);
                        setScrollBlock()
                    }
                },200)
            }
            init();

            $(window).scroll(setScrollBlock);;

        }
    }
}])

