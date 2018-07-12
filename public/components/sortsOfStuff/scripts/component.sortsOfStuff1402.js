angular.module('gmall.directives')
.directive('sortsOfStuff1302', function () {
    function sortsOfStuffctrlCtrl($scope,$uibModal,$resource,Stuff,$q){
        var Items = $resource('/api/collections/SortsOfStuff/:id',{id:'@_id'});
        var self = this;
        self.sortsOfStuff=null;
        $scope.stuff=self.stuff;
        self.saveField=function(stuff,field){
            if(stuff._id==self.stuff._id){
                var fields=field.split(' ');
                fields.forEach(function(el){
                    if(stuff[el]){
                        self.stuff[el]=stuff[el];
                    }
                })
            }
            Stuff.saveField(stuff,field);
        }
        self.changeStock = function(stuff,tag,value){
            // установка значений  фильтров в stuff.tags
            console.log(tag,value)
            self.saveField(stuff,'stock tags')
        }

        //console.log(self.stuff)
        $scope.$watch('stuff.sortsOfStuff',function(n){
            //console.log(n)
            if(n){
                Items.get({id: n._id},function(res){
                    //console.log(res);
                    if(res){
                        self.sortsOfStuff=res;
                        //console.log(self.stuff.category.filters)
                        self.filterOne=angular.copy(self.stuff.category.filters.getOFA('_id',self.sortsOfStuff.filterOne));
                        self.sortsOfStuff.filterTwo=angular.copy(self.stuff.category.filters.getOFA('_id',self.sortsOfStuff.filterTwo));
                        self.filterOne.tags.forEach(function(tag){
                            // the tag already has been used in group
                            if(self.sortsOfStuff.tagsOne.getOFA('tag._id',tag._id)){
                                tag.disabled=true;
                            }
                        })
                    }
                })
            }
        })
        self.getNameTag = function(tag){
            //console.log(tag)
            //console.log(self.stuff)
            if(!self.stuff.category || !self.stuff.category.filters){return}

            if (self.stuff.category.filters.length){
                for(var i= 0,l=self.stuff.category.filters.length;i<l;i++){
                    for(var ii=0,ll=self.stuff.category.filters[i].tags.length;ii<ll;ii++){
                        if(self.stuff.category.filters[i].tags[ii]._id==tag){
                            //console.log(self.stuff.category.filters[i].tags[ii].name)
                            return self.stuff.category.filters[i].tags[ii].name
                        }
                    }
                }
            }
        }
        self.getFilterName=function(filter){
            if(self.stuff.category && self.stuff.category.filters){
               for(var i= 0,l=self.stuff.category.filters.length;i<l;i++){
                   if(self.stuff.category.filters[i]._id==filter){
                       return self.stuff.category.filters[i].name
                   }
               }
            }

        }
        function setTagsInFilterTwo(){
            //console.log(self.filterTwo);
            if(!self.sortsOfStuff){
                // init sorts

            }
            if(self.sortsOfStuff && self.sortsOfStuff.filterOne){
                var stock=null;
                self.tagsTwo=null;
                if(self.sortsOfStuff.filterTwo && self.sortsOfStuff.filterTwo.tags){
                    self.sortsOfStuff.filterTwo.tags.forEach(function(tag){
                        if(!self.tagsTwo){self.tagsTwo=[]}
                        self.tagsTwo.push(tag._id)
                        if(!stock){stock={}}
                        stock[tag._id]={quantity:1}
                    })
                }

                //console.log(stock)
                self.sortsOfStuff.tagsOne.forEach(function(el){
                    //console.log(el)
                    if(stock){
                        for(var key in stock){
                            //if(key=='notag'){delete stock[key];continue;}
                            stock[key].price=el.stuff.price;
                            stock[key].priceSale=el.stuff.priceSale;
                            stock[key].retail=el.stuff.retail;
                        }
                    }else{
                        stock=={notag:{quantity:1}};
                    }
                    el.stuff.stock=angular.copy(stock);
                    /*if(el.stuff._id==self.stuff._id){
                        self.stuff.stock=el.stuff.stock;
                    }*/
                    self.saveField(el.stuff,'stock')
                    // todo save stuff from self.sortsOfStuff.tagsOne array!!!!!!
                    //console.log(el.stuff.stock)
                })
                self.sortsOfStuff.tagsTwo=self.tagsTwo;
                //console.log(self.sortsOfStuff.tagsTwo)
                Items.save({update:'tagsTwo filterTwo'},{_id:self.sortsOfStuff._id,tagsTwo:self.sortsOfStuff.tagsTwo,filterTwo:self.sortsOfStuff.filterTwo})



            }else if(self.sortsOfStuff && !self.sortsOfStuff.filterOne){

            }else{}
        }
        function initSortsOfFilterOne(tag){
            self.tagOne=angular.copy(tag);
            console.log(tag)
            if(!self.sortsOfStuff){
                self.sortsOfStuff={
                    filterOne:self.filterOne,
                    tagsOne:[{tag:self.tagOne,stuff:self.stuff}]
                }

                Items.save(self.sortsOfStuff,function(res){
                    self.sortsOfStuff._id=res.id;
                    self.bindStuffToTagOne(self.stuff,self.tagOne)
                    self.tagOne=null;
                },function(err){
                    console.log(err);
                    self.sortsOfStuff=null;
                })
            }
        }
        function setTagInfeilterOne(filter){
            var tagsArr=filter.tags.map(function(el){return el._id});
            // check is the stuff has tag from filter tags
            for(var i= 0,l=filter.tags.length;i<l;i++){
                if(self.stuff.tags.indexOf(filter.tags[i]._id)>-1){
                    initSortsOfFilterOne(filter.tags[i])
                }
            }

        }
        self.selectFilter=function(type){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/sortsOfStuff/selectFilter.html',
                controller: function(filters,sortsOfStuff,$uibModalInstance){
                    var self=this;
                    self.filters=filters;
                    self.displayFilter = function(filter){
                        //console.log(sortsOfStuff)
                        if(!sortsOfStuff){return true;}
                        if((sortsOfStuff.filterOne && sortsOfStuff.filterOne==filter._id)||
                            (sortsOfStuff.filterTwo && sortsOfStuff.filterTwo==filter._id)
                        || !filter.tags || !filter.tags.length){
                            return false;
                        }
                        return true;
                    }
                    self.selectFilter=function(filter){
                        $uibModalInstance.close(filter);
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs:'$ctrl',
                //size: 'sm',
                resolve: {
                    filters: function () {
                        return self.stuff.category.filters;
                    },
                    sortsOfStuff: function () {
                        return self.sortsOfStuff;
                    }

                }
            });
            modalInstance.result.then(function (selectedfilter) {
                //console.log(selectedfilter)
                if(type==1){
                    self.filterOne=angular.copy(selectedfilter);
                    setTagInfeilterOne(self.filterOne)
                }else if(type==2){
                    self.filterTwo=angular.copy(selectedfilter);
                    self.sortsOfStuff.filterTwo=self.filterTwo
                    setTagsInFilterTwo()
                }
            }, function () {
            });
        }
        self.selectTag=function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/sortsOfStuff/selectTag.html',
                controller: function(filter,sortsOfStuff,$uibModalInstance){
                    var self=this;
                    self.filter=filter;
                    self.selectTag=function(tag){
                        $uibModalInstance.close(tag);
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs:'$ctrl',
                //size: 'sm',
                resolve: {
                    filter: function () {
                        return self.filterOne;
                    },
                    sortsOfStuff: function () {
                        return self.sortsOfStuff;
                    }
                }
            });
            modalInstance.result.then(function (selectedTag) {
                //console.log(selectedTag)
                // if group doesn't exist
                initSortsOfFilterOne(selectedTag)

            }, function () {});
        }
        self.bindStuffToTagOne=function(stuff,tag){
            stuff.sortsOfStuff=self.sortsOfStuff;
            console.log(self.stuff.sortsOfStuff)
            // delete old values if were, and set new tag value
            self.filterOne.tags.forEach(function(t){
                stuff.tags.splice(stuff.tags.indexOf(t._id),1);
            })
            stuff.tags.push( tag._id);
            if(stuff.setTagsValue){
                stuff.setTagsValue();
            }
            Stuff.Items.save({update:'sortsOfStuff tags'},
                {_id:stuff._id,sortsOfStuff:stuff.sortsOfStuff._id,tags:stuff.tags})

        }
        self.deleteStuffFromSort=function(stuff){
            $q.when()
                .then(function(){
                    // save stuff
                    return $q(function(resolve,reject){
                        Stuff.Items.save({update:'sortsOfStuff'},
                            {_id:stuff._id,sortsOfStuff:null},function(){
                                stuff.sortsOfStuff==null;
                                if(stuff._id==self.stuff._id){
                                    self.stuff.sortsOfStuff=null;
                                }
                                resolve()
                            },function(err){
                                reject(err);
                            })
                    })
                })
                .then(function(){
                    if(self.sortsOfStuff.tagsOne.length==1 && self.sortsOfStuff.tagsOne[0].stuff._id==stuff._id){
                        //deleting sort group
                        Items.delete({id:self.sortsOfStuff._id},function(err){
                            self.sortsOfStuff=null;
                            self.filterOne=null;
                            self.tagOne=null;
                            self.filterTwo=null;
                        })

                    }else{
                        // find stuff in sorts array and delete it from
                        var usedTad;
                        for(var i= 0,l=self.sortsOfStuff.tagsOne.length;i<l;i++){
                            if(self.sortsOfStuff.tagsOne[i].stuff._id==stuff._id){
                                usedTad=self.sortsOfStuff.tagsOne.splice(i,1);
                                break;
                            }
                        }
                        //console.log(usedTad)
                        var o={_id:self.sortsOfStuff._id};
                        o.tagsOne=self.sortsOfStuff.tagsOne.map(function(el){return {tag:el.tag._id,stuff:el.stuff._id}})
                        Items.save({update:'tagsOne'},o,function(res){
                            // unable using tag
                            self.filterOne.tags.forEach(function(tag){
                                if(tag._id==usedTad[0].tag._id){
                                    //console.log(tag)
                                    tag.disabled=false
                                }

                            })
                        })
                        if(self.stuff._id==stuff._id) {
                            self.sortsOfStuff=null;
                            self.filterOne=null;
                            self.tagOne=null;
                            self.filterTwo=null;
                        }
                    }
                })
                .catch(function(err){console.log(err)})
        }

        function addStuffInSorts(stuff){
            if(self.sortsOfStuff.tagsOne.some(function(el){return el.stuff._id==stuff._id || el.tag._id==self.tagOne._id})){
                console.log('stuff already exist in sort');
                return;
            }
            var o={_id:self.sortsOfStuff._id};
            o.tagsOne=self.sortsOfStuff.tagsOne.map(function(el){return {tag:el.tag._id,stuff:el.stuff._id}})
            o.tagsOne.push({tag:self.tagOne._id,stuff:stuff._id})
            Items.save({updagte:'tagsOne'},o,function(res){
                self.bindStuffToTagOne(stuff,self.tagOne)
                self.sortsOfStuff.tagsOne.push({tag:self.tagOne,stuff:stuff});
                // deprecate using tag
                self.filterOne.tags.forEach(function(tag){
                    if(tag._id==self.tagOne._id){
                        console.log('tag.disabled')
                        tag.disabled=true;
                    }
                })
                self.tagOne=null;
            },function(err){
                self.tagOne=null;
                console.log(err);
                //self.sortsOfStuff=null;
            })
        }
        self.selectStuff=function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/sortsOfStuff/selectStuff.html',
                controller: function(sortsOfStuff,Stuff,$uibModalInstance){
                    var self=this;
                    self.stuffs=[];
                    self.name='';
                    var query={},items={};

                    self.search = function(name){
                        if (name.length<3){return}
                        console.log(name);
                        Stuff.getList(query,name,1,30,items ).then(function(res){
                            //console.log(res)
                            self.stuffs=res;
                        })
                    }
                    self.selectStuff=function(stuff){
                        $uibModalInstance.close(stuff);
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs:'$ctrl',
                size: 'lg',
                resolve: {
                    sortsOfStuff: function () {
                        return self.sortsOfStuff;
                    }
                }
            });
            modalInstance.result.then(function (stuff) {
                addStuffInSorts(stuff)
            },function () {});
        }
    }
    return {
        scope: {
            stuff: '=',
        },
        bindToController: true,
        controller: sortsOfStuffctrlCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/sortsOfStuff/sortsOfStuff.html'
    };
})

.directive('sortsOfStuff', function () {
    function sortsOfStuffctrlCtrl($scope,$uibModal,$resource,Stuff,$q){
        var Items = $resource('/api/collections/SortsOfStuff/:id',{id:'@_id'});
        var self = this;
        //self.sortsOfStuff=null;
        //$scope.stuff=self.stuff;
        // set current stuff in stuffs array foe reset tags and auto renew
        if(self.stuff.sortsOfStuff && self.stuff.sortsOfStuff.stuffs && self.stuff.sortsOfStuff.stuffs.length){
            for(var i=0,l=self.stuff.sortsOfStuff.stuffs.length;i<l;i++){
                if(self.stuff.sortsOfStuff.stuffs[i].stuff._id==self.stuff._id){
                    self.stuff.sortsOfStuff.stuffs[i].stuff=self.stuff;
                    break;
                }
            }
        }

        self.saveField=function(stuff,field){
            if(stuff._id==self.stuff._id){
                var fields=field.split(' ');
                fields.forEach(function(el){
                    if(stuff[el]){
                        self.stuff[el]=stuff[el];
                    }
                })
            }
            Stuff.saveField(stuff,field);
        }
        self.changeStock = function(stuff,tag,value){
            // установка значений  фильтров в stuff.tags
            console.log(tag,value)
            //self.saveField(stuff,'stock tags')
        }
        self.getNameTag = function(tag){
            //console.log(tag)
            //console.log(self.stuff)
            if(!self.stuff.category || !self.stuff.category.filters){return}

            if (self.stuff.category.filters.length){
                for(var i= 0,l=self.stuff.category.filters.length;i<l;i++){
                    for(var ii=0,ll=self.stuff.category.filters[i].tags.length;ii<ll;ii++){
                        if(self.stuff.category.filters[i].tags[ii]._id==tag){
                            //console.log(self.stuff.category.filters[i].tags[ii].name)
                            return self.stuff.category.filters[i].tags[ii].name
                        }
                    }
                }
            }
        }

        self.bindStuffToTagOne=function(index,tag){
            var stuff=self.stuff.sortsOfStuff.stuffs[index].stuff;
            //console.log(stuff); return;
            self.stuff.sortsOfStuff.stuffs[index].tag=tag._id;

            // delete old values if were, and set new tag value
            self.stuff.sortsOfStuff.filterOne.tags.forEach(function(t){
                var ii= stuff.tags.indexOf(t._id);
                if(ii>-1){
                    stuff.tags.splice(stuff.tags.indexOf(t._id),1);
                }

            })
            stuff.tags.push(tag._id);
            //if(stuff._id ==self.stuff._id && self.stuff.setTagsValue){
            if(stuff.setTagsValue){
                stuff.setTagsValue();
            }
           // console.log(stuff.tags)
            Stuff.Items.save({update:'tags'}, {_id:stuff._id,tags:stuff.tags})

            var o={_id:self.stuff.sortsOfStuff._id};
            o.stuffs=self.stuff.sortsOfStuff.stuffs.map(function(el){return {tag:el.tag,stuff:el.stuff._id}})
            Items.save({update:'stuffs'},o,function(res){})
        }

        function autoSetTagForSort(index){
            var tag;
            for(var i = 0,l=self.stuff.sortsOfStuff.stuffs[index].stuff.tags.length;i<l;i++){
                tag= self.stuff.sortsOfStuff.filterOne.tags.getOFA('_id',
                    self.stuff.sortsOfStuff.stuffs[index].stuff.tags[i]);
                if(tag){
                    self.bindStuffToTagOne(index,tag)
                    return true;
                }
            }
        }
        function setTagInfilter(type){
            if(type=='filterOne'){
                if(!autoSetTagForSort(0)){
                    self.selectTag(0); // pass index
                }

            }
        }
        //******************** firsl action select filter
        self.selectFilter=function(type){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/sortsOfStuff/selectFilter.html',
                controller: function(filters,sortsOfStuff,$uibModalInstance){
                    var self=this;
                    self.filters=filters;
                    self.displayFilter = function(filter){
                        //console.log(sortsOfStuff)
                        if(!sortsOfStuff){return true;}
                        if((sortsOfStuff.filterOne && sortsOfStuff.filterOne==filter._id)||
                            (sortsOfStuff.filterTwo && sortsOfStuff.filterTwo==filter._id)
                            || !filter.tags || !filter.tags.length){
                            return false;
                        }
                        return true;
                    }
                    self.selectFilter=function(filter){
                        $uibModalInstance.close(filter);
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs:'$ctrl',
                //size: 'sm',
                resolve: {
                    filters: function () {
                        return self.stuff.category.filters.filter(function(filter){
                            if(type=='filterOne'){
                                if(self.sortsOfStuff && self.sortsOfStuff.filterTwo){
                                    if(filter._id==self.sortsOfStuff.filterTwo._id){
                                        return false;
                                    }
                                }
                            }else if(type=='filterOne'){
                                if(self.sortsOfStuff && self.sortsOfStuff.filterOne){
                                    if(filter._id==self.sortsOfStuff.filterOne._id){
                                        return false;
                                    }
                                }
                            }
                            return true;
                        });
                    },
                    sortsOfStuff: function () {
                        return self.sortsOfStuff;
                    }

                }
            });
            modalInstance.result.then(function (selectedfilter) {
                $q.when().then(function(){
                    return $q(function(resolve,reject){
                        if(!self.stuff.sortsOfStuff){
                            self.stuff.sortsOfStuff={stuffs:[{tag:null,stuff:self.stuff._id}]}
                            self.stuff.sortsOfStuff[type]=selectedfilter._id;
                            Items.save(self.stuff.sortsOfStuff,function(res){
                                self.stuff.sortsOfStuff._id=res.id;
                                self.stuff.sortsOfStuff.stuffs[0].stuff=self.stuff;
                                resolve(true)
                            },function(err){reject(err)})
                        }else{
                            self.stuff.sortsOfStuff[type]=selectedfilter._id;
                            var o={_id:self.stuff.sortsOfStuff._id}
                            o[type]=self.stuff.sortsOfStuff[type];
                            Items.save({update:type},o,function(res){
                                resolve()
                            },function(err){reject(err)})
                        }
                    })
                }).then(function(newSort){
                    return $q(function(resolve,reject){
                        if(!newSort){resolve()}else{
                            Stuff.saveField({_id:self.stuff._id,sortsOfStuff:self.stuff.sortsOfStuff._id},'sortsOfStuff',function(err){
                                if(err){reject(err)}else{resolve()}
                            });
                        }
                    })
                }).then(function(){
                    self.stuff.sortsOfStuff[type]=angular.copy(selectedfilter);
                    setTagInfilter(type)
                }).catch(function(err){
                    console.log(err)
                })


            }, function () {
            });
        }
        self.selectTag=function(index){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/sortsOfStuff/selectTag.html',
                controller: function(filter,sortsOfStuff,index,$uibModalInstance){
                    var self=this;
                    self.filter=filter;
                    self.selectTag=function(tag){
                        $uibModalInstance.close(tag);
                    }
                    self.filterTags=function(tag){
                        for(var i = 0,l=sortsOfStuff.stuffs.length;i<l;i++){
                            if(sortsOfStuff.stuffs[i].tag==tag._id && i!=index){
                                return false;
                            }
                        }
                        return true;
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs:'$ctrl',
                //size: 'sm',
                resolve: {
                    filter: function () {
                        return self.stuff.sortsOfStuff.filterOne;
                    },
                    sortsOfStuff: function () {
                        return self.stuff.sortsOfStuff;
                    },
                    index: function () {
                        return index;
                    }
                }
            });
            modalInstance.result.then(function (selectedTag) {
                self.bindStuffToTagOne(index,selectedTag);
            }, function () {});
        }
        //**********************************************
        //console.log(self.stuff)


        self.getFilterName=function(filter){
            if(self.stuff.category && self.stuff.category.filters){
                for(var i= 0,l=self.stuff.category.filters.length;i<l;i++){
                    if(self.stuff.category.filters[i]._id==filter){
                        return self.stuff.category.filters[i].name
                    }
                }
            }

        }
        function setTagsInFilterTwo(){
            //console.log(self.filterTwo);
            if(!self.sortsOfStuff){
                // init sorts

            }
            if(self.sortsOfStuff && self.sortsOfStuff.filterOne){
                var stock=null;
                self.tagsTwo=null;
                if(self.sortsOfStuff.filterTwo && self.sortsOfStuff.filterTwo.tags){
                    self.sortsOfStuff.filterTwo.tags.forEach(function(tag){
                        if(!self.tagsTwo){self.tagsTwo=[]}
                        self.tagsTwo.push(tag._id)
                        if(!stock){stock={}}
                        stock[tag._id]={quantity:1}
                    })
                }

                //console.log(stock)
                self.sortsOfStuff.tagsOne.forEach(function(el){
                    //console.log(el)
                    if(stock){
                        for(var key in stock){
                            //if(key=='notag'){delete stock[key];continue;}
                            stock[key].price=el.stuff.price;
                            stock[key].priceSale=el.stuff.priceSale;
                            stock[key].retail=el.stuff.retail;
                        }
                    }else{
                        stock=={notag:{quantity:1}};
                    }
                    el.stuff.stock=angular.copy(stock);
                    /*if(el.stuff._id==self.stuff._id){
                     self.stuff.stock=el.stuff.stock;
                     }*/
                    self.saveField(el.stuff,'stock')
                    // todo save stuff from self.sortsOfStuff.tagsOne array!!!!!!
                    //console.log(el.stuff.stock)
                })
                self.sortsOfStuff.tagsTwo=self.tagsTwo;
                //console.log(self.sortsOfStuff.tagsTwo)
                Items.save({update:'tagsTwo filterTwo'},{_id:self.sortsOfStuff._id,tagsTwo:self.sortsOfStuff.tagsTwo,filterTwo:self.sortsOfStuff.filterTwo})



            }else if(self.sortsOfStuff && !self.sortsOfStuff.filterOne){

            }else{}
        }
        function initSortsOfFilterOne(tag){
            self.tagOne=angular.copy(tag);
            console.log(tag)
            if(!self.sortsOfStuff){
                self.sortsOfStuff={
                    filterOne:self.filterOne,
                    tagsOne:[{tag:self.tagOne,stuff:self.stuff}]
                }

                Items.save(self.sortsOfStuff,function(res){
                    self.sortsOfStuff._id=res.id;
                    self.bindStuffToTagOne(self.stuff,self.tagOne)
                    self.tagOne=null;
                },function(err){
                    console.log(err);
                    self.sortsOfStuff=null;
                })
            }
        }




        self.deleteStuffFromSort=function(stuff){
            $q.when()

                .then(function(){
                    if(self.stuff.sortsOfStuff.stuffs.length==1 && self.stuff.sortsOfStuff.stuffs[0].stuff._id==stuff._id){
                        //deleting sort group
                        Items.delete({id:self.stuff.sortsOfStuff._id},function(err){
                            self.stuff.sortsOfStuff=null;
                        })

                    }else{
                        // find stuff in sorts array and delete it from
                        for(var i= 0,l=self.stuff.sortsOfStuff.stuffs.length;i<l;i++){
                            if(self.stuff.sortsOfStuff.stuffs[i].stuff._id==stuff._id){
                                self.stuffs.sortsOfStuff.stuffs.splice(i,1);
                                break;
                            }
                        }
                        //console.log(usedTad)
                        var o={_id:self.stuff.sortsOfStuff._id};
                        o.stuffs=self.stuff.sortsOfStuff.stuffs.map(function(el){return {tag:el.tag._id||el.tag,stuff:el.stuff._id}})
                        Items.save({update:'stuffs'},o,function(res){})
                        if(self.stuff._id==stuff._id) {
                            self.stuff.sortsOfStuff=null;
                        }
                    }
                    return;
                })
                .then(function(){
                    // save stuff
                    return $q(function(resolve,reject){
                        Stuff.Items.save({update:'sortsOfStuff'},
                            {_id:stuff._id,sortsOfStuff:null},function(){
                                /*stuff.sortsOfStuff==null;
                                if(stuff._id==self.stuff._id){
                                    self.stuff.sortsOfStuff=null;
                                }*/
                                resolve()
                            },function(err){
                                reject(err);
                            })
                    })
                })
                .catch(function(err){console.log(err)})
        }

        function addStuffInSorts(stuff){
            if(self.sortsOfStuff.tagsOne.some(function(el){return el.stuff._id==stuff._id || el.tag._id==self.tagOne._id})){
                console.log('stuff already exist in sort');
                return;
            }
            var o={_id:self.sortsOfStuff._id};
            o.tagsOne=self.sortsOfStuff.tagsOne.map(function(el){return {tag:el.tag,stuff:el.stuff._id}})
            o.tagsOne.push({tag:self.tagOne._id,stuff:stuff._id})
            Items.save({updagte:'tagsOne'},o,function(res){
                self.bindStuffToTagOne(stuff,self.tagOne)
                self.sortsOfStuff.tagsOne.push({tag:self.tagOne,stuff:stuff});
                // deprecate using tag
                self.filterOne.tags.forEach(function(tag){
                    if(tag._id==self.tagOne._id){
                        console.log('tag.disabled')
                        tag.disabled=true;
                    }
                })
                self.tagOne=null;
            },function(err){
                self.tagOne=null;
                console.log(err);
                //self.sortsOfStuff=null;
            })
        }
        self.selectStuff=function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/sortsOfStuff/selectStuff.html',
                controller: function(sortsOfStuff,Stuff,$uibModalInstance){
                    var self=this;
                    self.stuffs=[];
                    self.name='';
                    var query={},items={};

                    self.search = function(name){
                        if (name.length<3){return}
                        console.log(name);
                        Stuff.getList(query,name,1,30,items ).then(function(res){
                            //console.log(res)
                            self.stuffs=res;
                        })
                    }
                    self.selectStuff=function(stuff){
                        $uibModalInstance.close(stuff);
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs:'$ctrl',
                size: 'lg',
                resolve: {
                    sortsOfStuff: function () {
                        return self.sortsOfStuff;
                    }
                }
            });
            modalInstance.result.then(function (stuff) {
                addStuffInSorts(stuff)
            },function () {});
        }
    }
    return {
        scope: {
            stuff: '=',
        },
        bindToController: true,
        controller: sortsOfStuffctrlCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/sortsOfStuff/sortsOfStuff.html'
    };
});


var SortsOfSfuffSchema = {
    store:[{type : 'Schema.ObjectId', ref : 'Store'}],
    filterOne:{type : 'Schema.ObjectId', ref : 'Filter'},// характеристика с фото
    filterTwo:{type : 'Schema.ObjectId', ref : 'Filter'},//характеристика без фото
    tagsOne:[{tag:{type : 'Schema.ObjectId', ref : 'FilterTags'},stuff:{type : 'Schema.ObjectId', ref : 'Stuff'}}],
    tagsTwo:{},// {stuff._id:{price,....,quantity}}
    differentPrice:{type:Boolean,default:false}
}