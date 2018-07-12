'use strict';
angular.module('gmall.directives')
.directive('sortsOfStuff', function () {
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
sortsOfStuffctrlCtrl.$inject=['$uibModal','$resource','Stuff','$q','createStuffService','exception','global','$timeout'];
function sortsOfStuffctrlCtrl($uibModal,$resource,Stuff,$q,createStuffService,exception,global,$timeout){
    var Items = $resource('/api/collections/SortsOfStuff/:id',{id:'@_id'});
    var self = this;
    var $ctrl=self;
    //console.log($scope.stuff)

    //console.log(self.stuff)
    self.saveField=function(stuff,field){
        if(stuff._id==self.stuff._id){
            var fields=field.split(' ');
            fields.forEach(function(el){
                if(stuff[el]!='undefined'){
                    self.stuff[el]=stuff[el];
                    //console.log(self.stuff[el])
                }
            })

        }
        $q.when()
            .then(function () {
                return Stuff.saveField(stuff,field);
            })
            .then(function () {
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            })
            .catch(function (err) {
                console.log(err)
                if(err){
                    exception.catcher('сохранение')(err)
                }
            })


    }
    self.saveFieldsortsOfStuff=function(field){
        var o={_id:self.stuff.sortsOfStuff._id};
        if(!self.stuff.sortsOfStuff[field]){
            o[field]=null
        }else{
            o[field]=self.stuff.sortsOfStuff[field];
        }



        Items.save({update:field},o,function(res){
            global.set('saving',true);
            $timeout(function () {
                global.set('saving',false);
            },1500)
        })
    }
    self.changeDifferentPrice = function(){
        Items.save({update:'differentPrice'},{_id:self.stuff.sortsOfStuff._id,
            differentPrice:self.stuff.sortsOfStuff.differentPrice},function(res){
            global.set('saving',true);
            $timeout(function () {
                global.set('saving',false);
            },1500)
        })
    }
    self.changeStock = function(stuff,tag,value){

        //console.log(stuff)
        // установка значений  фильтров в stuff.tags
        //console.log(tag,value)
        stuff.priceForFilter=[]
        for(var key in stuff.stock){
            if(key==stuff.sort && !stuff.stock[key].quantity){
                stuff.sort=null;
            }
            if(stuff.stock[key].quantity){
                var c = (stuff.currency)?stuff.currency:global.get('store').val.mainCurrency;
                var price =(c==global.get('store').val.mainCurrency)?stuff.stock[key].price:Math.ceil10(stuff.stock[key].price/global.get('store').val.currency[c][0],-2)
                stuff.priceForFilter.push(price)
            }

        }
        if(tag && tag._id){
            var i= stuff.tags.indexOf(tag._id);
            if(value && i<0){ // add tag
                console.log('add')
                stuff.tags.push(tag._id);
            }else if(!value && i>-1){
                stuff.tags.splice(i,1)
            }
            if(stuff.setTagsValue){
                stuff.setTagsValue();
            }
            self.saveField(stuff,'stock tags sort priceForFilter')
        }else{
            self.saveField(stuff,'stock sort priceForFilter')
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

    // create sort *****************************************
    //******************************************************
    self.createSort = function(filter){
        return $q(function(resolve,reject){
            self.stuff.sortsOfStuff={stuffs:[self.stuff._id]}
            if(filter){
                self.stuff.sortsOfStuff['filter']=filter._id;
            }
            Items.save(self.stuff.sortsOfStuff,function(res){
                self.stuff.sortsOfStuff._id=res.id;
                self.stuff.sortsOfStuff.stuffs[0]=self.stuff;
                if(filter){
                    self.stuff.sortsOfStuff['filter']=filter;
                }
                Stuff.Items.save({update:'sortsOfStuff'},
                    {_id:self.stuff._id,sortsOfStuff:self.stuff.sortsOfStuff._id}
                    ,function(){resolve()},function(err){reject(err)});
            },function(err){reject(err)})
        })
    }
    //******************************************************
    //******************************************************
    // create sort *****************************************
    //******************************************************
    function setFilterInSort(filter){
        return $q(function(resolve,reject){
            self.stuff.sortsOfStuff['filter']=filter;
            Items.save({update:'filter'},{
                _id:self.stuff.sortsOfStuff._id,
                filter:(filter && filter._id)?filter._id:null,
            },function(){resolve()},function(err){reject(err)})
        })
    }
    function setFilterGroupInSort(filter){
        return $q(function(resolve,reject){
            self.stuff.sortsOfStuff['filterGroup']=filter;
            Items.save({update:'filterGroup'},{
                _id:self.stuff.sortsOfStuff._id,
                filterGroup:(filter && filter._id)?filter._id:null,
            },function(){resolve()},function(err){reject(err)})
        })
    }
    //******************************************************
    //******************************************************
    // получение товара*****************
    function getStuffPromise(stuff){
        return $q(function(resovle,reject){
            if(stuff && stuff._id){resovle(stuff)}else if(stuff && !stuff._id){
                Stuff.get({_id:stuff}).$promise.then(
                    function(res){resolve(res)},function(err){reject(err)}
                )
            }
        })
    }
    // создание таблицы наличия для товара*****************
    self.setStockTableForSort  = function(stuff,stockTemplate){
        return $q(function(resolve,reject){
            getStuffPromise(stuff).then(
                function(stuff){
                    var fields='stock';
                    if(stuff.sortsOfStuff && self.stuff.sortsOfStuff._id!=stuff.sortsOfStuff._id){
                        // если надо обновить группу у товара
                        stuff.sortsOfStuff=self.stuff.sortsOfStuff._id;
                        fields+=' sortsOfStuff'
                    }
                    if(stockTemplate){
                        var stock=angular.copy(stockTemplate);
                        for(var key in stock){
                            if(stuff.stock && stuff.stock[key]){
                                stock[key].quantity=stuff.stock[key].quantity;
                            }
                            //if(key=='notag'){delete stock[key];continue;}
                            stock[key].price=stuff.price;
                            stock[key].priceSale=stuff.priceSale;
                            stock[key].retail=stuff.retail;
                            if(key!='notag'){
                                var i= stuff.tags.indexOf(key);
                                if(i<0){ // add tag
                                    stuff.tags.push(key);
                                }
                            }
                        }
                        stuff.stock=stock;
                        if(stuff.setTagsValue){
                            stuff.setTagsValue();
                        }
                        fields +=' tags';
                    }else{
                        stock={notag:{quantity:1}};
                    }
                    Stuff.saveField(stuff,fields).then(function(){resolve()},function(err){reject(err)});
                },function(err){reject(err)}
            )

        })
    }

    self.setStockTableForSorts = function(filter,stuffs){
        /*return $q(function(resolve,reject){
         var stock;
         if(filter){
         filter.tags.forEach(function(tag){
         if(!stock){stock={}}
         stock[tag._id]={quantity:1}
         })
         }

         var actions = self.stuff.sortsOfStuff.stuffs.map(function(stuff){
         return self.setStockTableForSort(stuff,stock)
         })
         $q.all(actions ).then(function(){resolve()}).catch(function(err){reject(err)})
         })*/
        var stock;
        //global.get('store').val.settingContent.admin.sortsDisable
        var qty = (global.get('store').val.settingContent&& global.get('store').val.settingContent.admin && global.get('store').val.settingContent.admin.sortsDisable)?0:1;
        if(filter){
            filter.tags.forEach(function(tag){
                if(!stock){stock={}}
                stock[tag._id]={quantity:qty}
            })
        }
        var actions = stuffs.map(function(stuff){
            return self.setStockTableForSort(stuff,stock)
        })
        return $q.all(actions)

    }
    //******************************************************
    //******************************************************
    self.changeFilter=function(filter){
        //console.log(filter)
        return $q.when()
            .then(function(){
                if(!self.stuff.sortsOfStuff){
                    return self.createSort(filter);
                }else{
                    return setFilterInSort(filter);
                }
            })
            .then(function(newSort){
                $q(function(resolve,reject){
                    self.setStockTableForSorts(filter,self.stuff.sortsOfStuff.stuffs ).then(
                        function(){resolve()},function(err){reject(err)}
                    )
                })

            })
            .catch(function(err){
                console.log(err)
            })
    }
    self.changeFilterGroup=function(filter){
        return $q.when()
            .then(function(){
                return setFilterGroupInSort(filter);
            })
            .catch(function(err){
                console.log(err)
            })
    }
    //*************************************************
    //************************** select filter***********************
    self.selectFilter=function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/sortsOfStuff/selectFilter.html',
            controller: function(filters,sortsOfStuff,$uibModalInstance){
                var self=this;
                self.filters=filters;
                self.selectFilter=function(filter){
                    $uibModalInstance.close(filter);
                }
                self.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            controllerAs:'$ctrl',
            resolve: {
                filters: function () {
                    return (self.stuff.category&& self.stuff.category[0].filters)?self.stuff.category[0].filters:[]
                },
                sortsOfStuff: function () {
                    return self.sortsOfStuff;
                }

            }
        });
        modalInstance.result.then(function (selectedfilter) {
            //console.log(selectedfilter)
            self.changeFilter(selectedfilter)
        }, function () {
        });
    }
    self.selectFilterGroup=function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/sortsOfStuff/selectFilter.html',
            controller: function(filters,sortsOfStuff,$uibModalInstance){
                var self=this;
                self.filters=filters;
                self.selectFilter=function(filter){
                    $uibModalInstance.close(filter);
                }
                self.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            controllerAs:'$ctrl',
            resolve: {
                filters: function () {
                    return (self.stuff.category&& self.stuff.category[0] && self.stuff.category[0].filters)?self.stuff.category[0].filters:[]
                },
                sortsOfStuff: function () {
                    return self.sortsOfStuff;
                }

            }
        });
        modalInstance.result.then(function (selectedfilter) {
            self.changeFilterGroup(selectedfilter)
        }, function () {
        });
    }
    self.clearFilterGroup=function(){
        self.changeFilterGroup(null)
    }

    //************************************************************************
    //************************************************************************
    //************************************** stuffs **************************
    //************************************************************************
    function addStuffInSorts(stuff){
        //console.log(stuff);return;
        if(self.stuff.sortsOfStuff.stuffs.some(function(el){return el._id==stuff._id})){
            console.log('stuff already exist in sort');
            return;
        }
        $q.when()
            .then(function(){
                //получение группы для миграции
                return $q(function(resolve,reject){
                    if(stuff.sortsOfStuff){
                        Items.get({id:stuff.sortsOfStuff._id} ).$promise.then(
                            function(megreSorts){stuff.sortsOfStuff=megreSorts;resolve()},function(err){reject(err)}
                        )
                    }else{
                        resolve(null)
                    }
                })
            })
            .then(function(){
                // установка фильтра в группу
                return $q(function(resolve,reject){
                    //console.log(stuff.sortsOfStuff.filter,self.stuff.sortsOfStuff.filter)
                    if(stuff.sortsOfStuff && stuff.sortsOfStuff.filter && !self.stuff.sortsOfStuff.filter){
                        //console.log(stuff.sortsOfStuff.filter && !self.stuff.sortsOfStuff.filter)
                        Items.save({update:'filter'},{_id:self.stuff.sortsOfStuff._id,filter:stuff.sortsOfStuff.filter} ).$promise.then(
                            function(){resolve()},function(err){reject(err)}
                        )
                    }else{
                        resolve()
                    }
                })
            })
            .then(function(){
                // установка таблиц для товаров
                return $q(function(resolve,reject){
                    if(stuff.sortsOfStuff && stuff.sortsOfStuff.filter && !self.stuff.sortsOfStuff.filter){
                        // для текущих
                        self.stuff.sortsOfStuff.filter=
                            self.stuff.category.filters.getOFA('_id',stuff.sortsOfStuff.filter)
                        if(self.stuff.sortsOfStuff.filter){
                            self.setStockTableForSorts(self.stuff.sortsOfStuff.filter,self.stuff.sortsOfStuff.stuffs).then(
                                function(){resolve()},function(err){reject(err)}
                            )
                        }else{
                            resolve()
                        }
                    }else{
                        // для вносимых
                        var stuffs = (stuff.sortsOfStuff && stuff.sortsOfStuff.stuffs)?stuff.sortsOfStuff.stuffs:[stuff];
                        self.setStockTableForSorts(self.stuff.sortsOfStuff.filter,stuffs).then(
                            function(){resolve()},function(err){reject(err)}
                        )
                    }
                })
            })
            .then(function(){
                // обновление списка товаров в группе
                return $q(function(resolve,reject){
                    if(stuff.sortsOfStuff && stuff.sortsOfStuff.stuffs){
                        self.stuff.sortsOfStuff.stuffs.push.apply(self.stuff.sortsOfStuff.stuffs,
                            stuff.sortsOfStuff.stuffs)
                    }else{
                        self.stuff.sortsOfStuff.stuffs.push(stuff)
                    }

                    var o={_id:self.stuff.sortsOfStuff._id};
                    o.stuffs=self.stuff.sortsOfStuff.stuffs.filter(function(el){return el}).map(function(el){return el._id})
                    //console.log(o.stuffs,self.stuff.sortsOfStuff)
                    Items.save({update:'stuffs'},o ).$promise.then(
                        function(){resolve()},function(err){reject(err)}
                    )
                })
            })
            .then(function(){
                // удаление группы из которой осуществлялась миграция
                if(stuff.sortsOfStuff){
                    Items.delete({id:stuff.sortsOfStuff._id})
                }
            })
            .then(function(){
                // проверка ссылок на группу
                var action = self.stuff.sortsOfStuff.stuffs.filter(function(el){
                    return el.sortsOfStuff != self.stuff.sortsOfStuff._id}).map(function(el){
                    Stuff.Items.save({update:'sortsOfStuff'},{_id:el._id,sortsOfStuff:self.stuff.sortsOfStuff._id})
                })
            })
            .catch(function(){})

    }
    //************************************************************************
    //************************************************************************

    self.selectStuff=function(){
        $q.when()
            .then(function(){
                //return selectStuffModalService.selectStuff();
                var query={category: self.stuff.category._id};
                return Stuff.selectItem(query)
            })
            .then(function(stuff){
                if(stuff && stuff.sortsOfStuff && self.stuff.sortsOfStuff.filter && stuff.sortsOfStuff.filter!=self.stuff.sortsOfStuff.filter._id){
                    throw "признаки разновидностей не совподают"
                }else{
                    addStuffInSorts(stuff)
                }
            })
            .catch(function(err){
                err = err.data||err
                if(err){
                    exception.catcher('добавление товара')(err)
                }
            })
        /*var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'components/sortsOfStuff/selectStuff.html',
         controller: function(category,Stuff,$uibModalInstance){
         var self=this;
         self.stuffs=[];
         self.name='';
         var paginate={page:0,rows:30,items:0}
         // select only stuffs with the same category
         var query={category: category};
         self.search = function(name){
         if (name.length<3){return}
         // console.log(name);
         Stuff.getList(paginate,query,name).then(function(res){
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
         category: function () {
         return self.stuff.category._id;
         }
         }
         });
         modalInstance.result.then(function (stuff) {
         if(stuff.sortsOfStuff && self.stuff.sortsOfStuff.filter && stuff.sortsOfStuff.filter!=self.stuff.sortsOfStuff.filter._id){
         console.log("filters don't match")
         }else{
         addStuffInSorts(stuff)
         }
         },function () {});*/
    }

    // create stuff from template*********************
    //*******************************************
    self.createAndAddStuff = function(){
        var newStuff=angular.copy(self.stuff);
        $q.when()
            .then(function(){
                return Stuff.cloneStuff(newStuff,true)
                //return createStuffService.cloneStuff(newStuff,true)
            })
            .then(function(stuffFromResolve){
                //console.log('stuffFromResolve-',stuffFromResolve);
                //console.log(newStuff===stuffFromResolve); true
                addStuffInSorts(stuffFromResolve);

            } )
            .catch(function(err){
                console.log(err)
            })


        return;

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
                stuff.brand=(stuff.brand && stuff.brand._id)?stuff.brand._id:stuff.brand;
                stuff.brandTag=(stuff.brandTag && stuff.brandTag._id)?stuff.brandTag._id:stuff.brandTag;
                stuff.category=(stuff.category && stuff.category._id)?stuff.category._id:stuff.category;
                stuff.sortsOfStuff=(stuff.sortsOfStuff && stuff.sortsOfStuff._id)?stuff.sortsOfStuff:null;
                stuff.name=stuffName.name.substring(0,50);
                stuff.artikul=stuffName.artikul.substring(0,50);
                delete stuff._id;
                delete stuff.url;
                delete stuff.gallery;
                delete stuff.setTagsValue;
                if (stuff.stock){
                    for(var key in stuff.stock){
                        stuff.stock[key].quantity=1;
                    }
                }
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
    //*******************************************
    // delet stuff from sort*********************
    //*******************************************
    self.deleteStuffFromSort=function(stuff,index){
        $q.when()
            .then(function(){
                // товары в группе
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
                            /*if(self.stuff._id==stuff._id) {
                             self.stuff.sortsOfStuff=null;
                             }*/
                            resolve()
                        },function(err){reject(err)})

                    }
                })


            })
            .then(function(){
                // создали группу
                return $q(function(resolve,reject){
                    if(self.stuff.sortsOfStuff && self.stuff.sortsOfStuff.filter){
                        var o={filter:self.stuff.sortsOfStuff.filter._id,stuffs:[stuff._id]}
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
                    if (!sort){
                        stuff.stock={notag:{quantity:1}}
                    }
                    Stuff.Items.save({update:'sortsOfStuff stock'},
                        {_id:stuff._id,sortsOfStuff:sort,stock:stuff.stock},function(){
                            resolve(sort)
                        },function(err){
                            reject(err);
                        })
                })
            })
            .then(function(sort){
                // save stuff
                return $q(function(resolve,reject){
                    if(sort) {
                        Items.get({id:sort},function(res){
                            self.stuff.sortsOfStuff=res;
                            self.stuff.sortsOfStuff.filter=
                                self.stuff.category.filters.getOFA('_id',self.stuff.sortsOfStuff.filter)
                            resolve()
                        },function(err){reject(err)})
                    }else{
                        resolve()
                    }
                })
            })
            .catch(function(err){console.log(err)})
    }
    //***********************************************************************
    //***********************************************************************
    //***********************************************************************
    //************************ .additionalInfo  *****************************
    self.additionalInfo = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/sortsOfStuff/additionalInfo.html',
            controller: function(filter,carrentAddInfo,AddInfo,$uibModalInstance,global){
                var self=this;
                self.global=
                self.lang=global.get('store').val.lang
                var langArr = global.get('store').val.langArr;
                console.log(langArr)
                if(!filter){$uibModalInstance.dismiss('cancel');}else{self.filter=filter}

                var query={filter:filter._id};
                self.items=[];
                function initItem(){
                    self.item={header:{},table:{},name:'',filter:filter._id};
                    filter.tags.forEach(function(tag){
                        self.item.table[tag._id]={}
                    })
                    if(langArr && langArr.forEach){
                        langArr.forEach(function(lang){
                            self.item.header[lang]=['']
                            for(var key in self.item.table){
                                self.item.table[key][lang]=['']
                            }
                        })
                    }else{
                        self.item.header[self.lang]=['']
                        for(var key in self.item.table){
                            self.item.table[key][self.lang]=['']
                        }
                    }
                }
                initItem();

                self.getTagName=function(id){
                    for(var i= 1,l=self.filter.tags.length;i<l;i++){
                        if(self.filter.tags[i]._id==id){
                            return self.filter.tags[i].name;
                            break;
                        }
                    }
                    return 'noname'
                }
                activate()
                function activate(){
                    AddInfo.query({query:query},function(res){
                        res.shift();
                        self.items=res;
                        if(carrentAddInfo){
                            for(var i= 1,l=self.items.length;i<l;i++){
                                if(self.items[i]._id==carrentAddInfo){
                                    self.item=self.items[i];
                                    break;
                                }
                            }
                        }
                    },function(err){console.log(err)})
                }


                self.selectAddInfo=function(addInfo){
                    $uibModalInstance.close(addInfo);
                }
                self.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                self.saveTable=function(){
                    //console.log(self.item)
                    if (self.item.header.length==1){return}
                    self.item.header.pop()
                    filter.tags.forEach(function(tag){
                        self.item.table[tag._id].pop();
                    })
                    if(!self.item.name){self.item.name=filter.name}

                    if(self.item._id){
                        //console.log('&&&')
                        AddInfo.save({'update':'header table name'},self.item,function(res){
                            AddInfo.query({query:query},function(res){
                                res.shift();
                                self.items=res;
                            })
                            initItem()
                        })
                    } else{
                        AddInfo.save(self.item,function(res){
                            AddInfo.query({query:query},function(res){
                                res.shift();
                                self.items=res;
                            })
                            initItem()
                        })
                    }
                }
                self.addRow = function(){
                    if(langArr && langArr.forEach){
                        langArr.forEach(function(lang){
                            self.item.header[lang].push('');
                            for(var key in self.item.table){
                                self.item.table[key][lang].push('');
                            }
                        })
                    }else{
                        self.item.header[self.lang].push('');
                        for(var key in self.item.table){
                            self.item.table[key][self.lang].push('');
                        }
                    }
                    /*
                    self.item.header.push('');
                    filter.tags.forEach(function(tag){
                        self.item.table[tag._id].push('')
                    })*/
                    console.log(self.item)
                }
                self.deleteRow = function(i){
                    if(langArr && langArr.forEach){
                        langArr.forEach(function(lang){
                            self.item.header[lang].splice(i,1);
                            for(var key in self.item.table){
                                self.item.table[key][lang].splice(i,1);
                            }
                        })
                    }else{
                        self.item.header[self.lang].splice(i,1);
                        for(var key in self.item.table){
                            self.item.table[key][self.lang].splice(i,1);
                        }
                    }
/*

                    self.item.header.splice(i,1);
                    filter.tags.forEach(function(tag){
                        self.item.table[tag._id].splice(i,1);
                    })*/
                }
                self.editTable = function(item){
                    console.log(item)
                    self.item=item;

                    if(langArr && langArr.forEach){
                        langArr.forEach(function(lang){
                            self.item.header[lang].push('');
                            for(var key in self.item.table){
                                self.item.table[key][lang].push('');
                            }
                        })
                    }else{
                        self.item.header[self.lang].push('');
                        for(var key in self.item.table){
                            self.item.table[key][self.lang].push('');
                        }
                    }

                    /*self.item.header.push('');
                    filter.tags.forEach(function(tag){
                        self.item.table[tag._id].push('')
                    })*/


                }
                self.setTable = function(item){

                }
            },
            controllerAs:'$ctrl',
            size: 'lg',
            resolve: {
                filter: function () {
                    return self.stuff.sortsOfStuff.filter;
                },
                carrentAddInfo:function(){
                    return self.stuff.sortsOfStuff.addInfo;
                }
            }
        });
        modalInstance.result.then(function (addInfo) {
            self.stuff.sortsOfStuff.addInfo=addInfo._id
            /*Items.save({update:'addInfo'},{_id:self.stuff.sortsOfStuff._id,
             arrInfo:self.stuff.sortsOfStuff.addInfo},function(){
             AddInfo.query({query:{filter:self.stuff.sortsOfStuff.filter._id}},function(res){
             res.shift();
             self.stuff.addInf==res;
             })
             })*/
            console.log(addInfo)
        },function () {});
    }

    //***********************************************************************
    //***********************************************************************
}

var SortsOfSfuffSchema = {
    store:[{type : 'Schema.ObjectId', ref : 'Store'}],
    filterOne:{type : 'Schema.ObjectId', ref : 'Filter'},// характеристика с фото
    filterTwo:{type : 'Schema.ObjectId', ref : 'Filter'},//характеристика без фото
    tagsOne:[{tag:{type : 'Schema.ObjectId', ref : 'FilterTags'},stuff:{type : 'Schema.ObjectId', ref : 'Stuff'}}],
    tagsTwo:{},// {stuff._id:{price,....,quantity}}
    differentPrice:{type:Boolean,default:false}
}