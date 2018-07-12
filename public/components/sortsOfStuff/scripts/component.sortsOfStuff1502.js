angular.module('gmall.directives')
.directive('sortsOfStuff', function () {
    function sortsOfStuffctrlCtrl($scope,$uibModal,$resource,Stuff,$q){
        var Items = $resource('/api/collections/SortsOfStuff/:id',{id:'@_id'});
        var self = this;
        var $ctrl=self;

        //console.log(self.stuff)
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
            //console.log(tag,value)
            if(tag && tag._id){
                // для размеров
                var i= stuff.tags.indexOf(tag._id);
                //console.log(stuff.tags,i)
                if(value && i<0){ // add tag
                    console.log('add')
                    stuff.tags.push(tag._id);
                }else if(!value && i>-1){
                    stuff.tags.splice(i,1)
                }
                if(stuff.setTagsValue){
                    stuff.setTagsValue();
                }
                self.saveField(stuff,'stock tags')
            }else{
                self.saveField(stuff,'stock')
            }

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

        // create sort for photo
        //**************************************
        self.setStockTableForSorts = function(filter){
            var stock;
            if(filter){
                filter.tags.forEach(function(tag){
                    if(!stock){stock={}}
                    stock[tag._id]={quantity:1}
                })
            }
            self.stuff.sortsOfStuff.stuffs.forEach(function(stuff){
                if(stock){
                    for(var key in stock){
                        //if(key=='notag'){delete stock[key];continue;}
                        stock[key].price=stuff.price;
                        stock[key].priceSale=stuff.priceSale;
                        stock[key].retail=stuff.retail;
                        var i= stuff.tags.indexOf(key);
                        if(i<0){ // add tag
                            stuff.tags.push(key);
                        }

                    }
                    stuff.stock=angular.copy(stock);
                    if(stuff.setTagsValue){
                        stuff.setTagsValue();
                    }
                    self.saveField(stuff,'stock tags');
                }else{
                    stock={notag:{quantity:1}};
                    stuff.stock=angular.copy(stock);
                    self.saveField(stuff,'stock')
                }

                // todo save stuff from self.sortsOfStuff.tagsOne array!!!!!!
            })
        }
        self.createSort=function(filter){
             return $q.when()
                .then(function(){
                    return $q(function(resolve,reject){
                        if(!self.stuff.sortsOfStuff){
                            self.stuff.sortsOfStuff={stuffs:[self.stuff._id]}
                            if(filter){
                                self.stuff.sortsOfStuff['filter']=filter._id;
                            }

                            Items.save(self.stuff.sortsOfStuff,function(res){
                                self.stuff.sortsOfStuff._id=res.id;
                                self.stuff.sortsOfStuff.stuffs[0]=self.stuff;
                                if(filter){
                                    self.stuff.sortsOfStuff['filter']=filter;
                                } else{
                                    self.setStockTableForSorts();
                                }
                                resolve(true)
                            },function(err){reject(err)})
                        }else{
                            self.stuff.sortsOfStuff['filter']=filter;

                            Items.save({update:'filter'},{
                                _id:self.stuff.sortsOfStuff._id,
                                filter:(filter && filter._id)?filter._id:null,
                            },function(){
                                resolve()
                            },function(err){reject(err)})
                        }
                    })
                })
                 .then(function(newSort){
                    return $q(function(resolve,reject){
                        if(!newSort){resolve()}else{
                            Stuff.saveField({_id:self.stuff._id,sortsOfStuff:self.stuff.sortsOfStuff._id},'sortsOfStuff',function(err){
                                if(err){reject(err)}else{resolve()}
                            });
                        }
                    })
                })
                .catch(function(err){
                    console.log(err)
                })

        }

        //**************************************

        //*************************************************
        // delet stuff from sort
        self.deleteStuffFromSort=function(stuff,index){
            $q.when()
                .then(function(){
                    return $q(function(resolve,reject){
                        if(self.stuff.sortsOfStuff.stuffs.length==1 && self.stuff.sortsOfStuff.stuffs[0]._id==stuff._id){
                            //deleting sort group
                            Items.delete({id:self.stuff.sortsOfStuff._id},function(err){
                                self.stuff.sortsOfStuff=null;
                                resolve()
                            },function(err){reject(err)})
                        }else{
                            // find stuff in sorts array and delete it from
                            self.stuff.sortsOfStuff.stuffs.splice(index,1);
                            //console.log(usedTad)
                            var o={_id:self.stuff.sortsOfStuff._id};
                            o.stuffs=self.stuff.sortsOfStuff.stuffs.map(function(el){return el._id})
                            Items.save({update:'stuffs'},o,function(res){
                                if(self.stuff._id==stuff._id) {
                                    self.stuff.sortsOfStuff=null;
                                }
                                resolve()
                            },function(err){reject(err)})

                        }
                    })


                })
                .then(function(){
                    return $q(function(resolve,reject){
                        if(self.stuff.sortsOfStuff.filter){
                            var o={filter:self.stuff.sortsOfStuff.filter,stuffs:[stuff._id]}
                            Items.save(o,function(res){
                                resolve(res.id)
                            },function(err){reject(err)})
                        }else{
                            resolve(null)
                        }
                    })
                })
                .then(function(sort){
                    // save stuff
                    return $q(function(resolve,reject){
                        Stuff.Items.save({update:'sortsOfStuff'},
                            {_id:stuff._id,sortsOfStuff:sort},function(){
                                resolve()
                            },function(err){
                                reject(err);
                            })
                    })
                })
                .catch(function(err){console.log(err)})
        }
        //*************************************************
        self.selectFilter=function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/sortsOfStuff/selectFilter.html',
                controller: function(filters,sortsOfStuff,$uibModalInstance){
                    var self=this;
                    self.filters=filters;
                    self.displayFilter = function(filter){
                        /*//console.log(sortsOfStuff)
                        if(!sortsOfStuff){return true;}
                        if((sortsOfStuff.filterOne && sortsOfStuff.filterOne==filter._id)||
                            (sortsOfStuff.filterTwo && sortsOfStuff.filterTwo==filter._id)
                            || !filter.tags || !filter.tags.length){
                            return false;
                        }*/
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
                        return (self.stuff.category&& self.stuff.category.filters)?self.stuff.category.filters:[]
                            /*.filter(function(filter){
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
                        });*/
                    },
                    sortsOfStuff: function () {
                        return self.sortsOfStuff;
                    }

                }
            });
            modalInstance.result.then(function (selectedfilter) {
                $q.when()
                    /*.then(function(){
                        return $q(function(resolve,reject){

                        })
                    })*/
                    .then(function(){
                        return self.createSort(selectedfilter)
                    })
                    .then(function(){
                        self.setStockTableForSorts(selectedfilter)
                        return;
                    })

                /*$q.when()
                    .then(function(){
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
                })*/


            }, function () {
            });
        }

        self.selectStuff=function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/sortsOfStuff/selectStuff.html',
                controller: function(sortsOfStuff,Stuff,$uibModalInstance){
                    var self=this;
                    self.stuffs=[];
                    self.name='';

                    var query={category: ($ctrl.stuff.category && $ctrl.stuff.category._id)?$ctrl.stuff.category._id:null};
                    var items={};

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
                //console.log(stuff);
                /*if(stuff.sortsOfStuff){
                    if(stuff.sortsOfStuff.filter==self.stuff.sortsOfStuff.filter._id){
                        addStuffInSorts(stuff)
                    }else{
                        console.log("filters don't match")
                    }
                }else{
                    addStuffInSorts(stuff)
                }*/
                if(stuff.sortsOfStuff && stuff.sortsOfStuff.filter!=self.stuff.sortsOfStuff.filter._id){
                    console.log("filters don't match")
                }else{
                    addStuffInSorts(stuff)
                }

            },function () {});
        }
        function addStuffInSorts(stuff){
            //console.log(stuff);return;
            if(self.stuff.sortsOfStuff.stuffs.some(function(el){return el._id==stuff._id})){
                console.log('stuff already exist in sort');
                return;
            }
            var o={_id:self.stuff.sortsOfStuff._id};
            o.stuffs=self.stuff.sortsOfStuff.stuffs.filter(function(el){return el}).map(function(el){return el._id})
            if(stuff.sortsOfStuff && stuff.sortsOfStuff.stuffs && stuff.sortsOfStuff.stuffs.length){
                o.stuffs.push.apply(o.stuffs,stuff.sortsOfStuff.stuffs)
            }else{
                o.stuffs.push(stuff._id)
            }

            Items.save({updagte:'stuffs'},o,function(res){
                if(stuff.sortsOfStuff && stuff.sortsOfStuff.stuffs && stuff.sortsOfStuff.stuffs.length){
                    stuff.sortsOfStuff.stuffs.forEach(function(stuff){
                        var o={_id:stuff};
                        o['sortsOfStuff']=self.stuff.sortsOfStuff._id;
                        Stuff.Items.save({update:'sortsOfStuff'},o);
                    })
                    Items.get({id:self.stuff.sortsOfStuff._id},function(res){
                        self.stuff.sortsOfStuff=res;
                        self.stuff.sortsOfStuff.filter=
                            self.stuff.category.filters.getOFA('_id',self.stuff.sortsOfStuff.filter)

                    })

                }else{
                    self.stuff.sortsOfStuff.stuffs.push(stuff);
                    stuff.stock=angular.copy(self.stuff.stock);
                    for(var key in stuff.stock){
                        stuff.stock[key].quantity=1;
                        stuff.stock[key].price=stuff.price;
                        stuff.stock[key].priceSale=stuff.priceSale;
                        stuff.stock[key].retail=stuff.retail;
                        var i= stuff.tags.indexOf(key);
                        if(i<0){ // add tag
                            stuff.tags.push(key);
                        }
                    }
                    stuff.sortsOfStuff=self.stuff.sortsOfStuff._id;
                    self.saveField(stuff,'stock tags sortsOfStuff');
                }


            },function(err){
                console.log(err);
                //self.sortsOfStuff=null;
            })
        }

        self.createAndAddStuff = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/sortsOfStuff/createStuff.html',
                controller: function($uibModalInstance){
                    var self=this;
                    self.stuff={name:'',artikul:''}
                    self.ok=function(stuff){
                        $uibModalInstance.close(stuff)
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs:'$ctrl',
            });
            modalInstance.result.then(function (stuffName) {
                if(stuffName.name){
                    var stuff=angular.copy(self.stuff);
                    stuff.brand=stuff.brand._id||null;
                    //stuff.brandTag=stuff.brandTag._id||null;
                    stuff.category=stuff.category._id||null;
                    stuff.sortsOfStuff=stuff.sortsOfStuff._id||null;
                    stuff.name=stuffName.name.substring(0,50);
                    stuff.artikul=stuffName.artikul.substring(0,50);
                    delete stuff._id;
                    delete stuff.url;
                    delete stuff.gallery;
                    delete stuff.setTagsValue;
                    $q.when()
                        .then(function(){
                            return $q(function(resolve,reject){
                                Stuff.Items.save(stuff,function(res){
                                    stuff._id=res.id;
                                    stuff.url=res.url;

                                    resolve(stuff)
                                },function(err){reject(err)})

                            })
                        })
                        .then(function(stuff){
                            addStuffInSorts(stuff);
                        })
                        .catch(function(err){console.log(err)})
                }
            }, function () {});
        }
        //***********************************************************************
        //***********************************************************************
        //***********************************************************************
        //***********************************************************************
        //***********************************************************************
        //***********************************************************************
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