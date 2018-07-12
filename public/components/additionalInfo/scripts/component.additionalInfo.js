'use strict';
angular.module('gmall.directives')
.directive('additionaInfo', function () {
    function additionaInfo(){

    }
    return {
        scope: {
            stuff: '=',
        },
        bindToController: true,
        controller: additionaInfoCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/additionaInfo/additionaInfo.html'
    };
})
.service('AddInfo', function ($resource,$q,$uibModal) {
    var Items= $resource('/api/collections/AddInfo/:id',{id:'@_id'});
    this.query=Items.query;
    this.get=Items.get;
    this.delete=Items.delete;
    this.save=Items.save;
    this.editTable=editTable;
    this.select=selectItem;

    function selectItem(){
        return $q(function(resolve,reject){
            var options={
                animation: true,
                templateUrl: 'components/additionalInfo/selectItem.html',
                controller: selectItemCtrl,
                size: 'lg',
                controllerAs:'$ctrl',
            }
            $uibModal.open(options).result.then(function(selected){resolve(selected)},function(){reject()});
        })
    }
    selectItemCtrl.$inject=['Filters','AddInfo','$uibModalInstance','$q','global'];
    function selectItemCtrl(Filters,AddInfo,$uibModalInstance,$q,global){
        var self=this;
        self.global=global;
        self.lang=global.get('lang').val
        $q.when()
            .then(function(){
                return Filters.getFilters();
            } )
            .then(function(filters){
                self.filters=filters;
                return AddInfo.query().$promise;
            } )
            .then(function(addInfos){
                self.filters.forEach(function(f){
                    f.addInfos=[];
                    addInfos.forEach(function(a){
                        if(a.filter==f._id){
                            f.addInfos.push(a)
                        }
                    })
                })
                //console.log(addInfos)
            })
        self.cancel = function () {$uibModalInstance.dismiss();};
        self.ok = function (item) {$uibModalInstance.close(item);};
    }

    function editTable(filter,addInfo){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/additionalInfo/additionalInfo.html',
            controller: function(filter,carrentAddInfo,AddInfo,$uibModalInstance,global,exception,Confirm){
                var self=this;
                self.global=global;
                self.lang=global.get('store').val.lang
                var langArr = global.get('store').val.langArr;
                console.log(langArr)
                if(!filter){$uibModalInstance.dismiss('cancel');}else{self.filter=filter}

                var query={filter:filter._id};
                self.items=[];


                activate()
                function activate(){
                    initItem();
                    AddInfo.query({query:query},function(res){
                        res.shift();
                        self.items=res;
                    },function(err){console.log(err)})
                }
                function initItem(){
                    self.item={headerTable:{},table:{},name:'',filter:filter._id};
                    filter.tags.forEach(function(tag){
                        self.item.table[tag._id]={}
                    })
                    if(langArr && langArr.forEach&& langArr.length ){
                        langArr.forEach(function(lang){
                            if(!self.item.headerTable){self.item.headerTable={}}
                            self.item.headerTable[lang]=['']
                            for(var key in self.item.table){
                                self.item.table[key][lang]=['']
                            }
                        })
                    }else{
                        if(!self.item.headerTable){self.item.headerTable={}}
                        self.item.headerTable[self.lang]=['']
                        for(var key in self.item.table){
                            self.item.table[key][self.lang]=['']
                        }
                    }
                    //console.log(self.item)
                }

                self.getTagName=function(id){
                    for(var i= 1,l=self.filter.tags.length;i<l;i++){
                        if(self.filter.tags[i]._id==id){
                            return self.filter.tags[i].name;
                            break;
                        }
                    }
                    return 'noname'
                }
                /*self.selectAddInfo=function(addInfo){
                    $uibModalInstance.close(addInfo);
                }*/
                self.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                self.saveTable=function(){
                    //console.log(self.item)
                    //if (self.item.headerTable[self.lang].length==1){return}
                    //self.item.headerTable[self.lang].pop()
                    /*filter.tags.forEach(function(tag){
                        self.item.table[tag._id][self.lang].pop();
                    })*/
                    if(!self.item.name){self.item.name=filter.name}

                    if(self.item._id){
                        AddInfo.save({'update':'headerTable table name'},self.item,function(res){
                            activate()
                        })
                    } else{
                        AddInfo.save(self.item,function(res){
                            activate()
                        })
                    }
                }
                self.addRow = function(){
                    if(langArr && langArr.forEach && langArr.length){
                        langArr.forEach(function(lang){
                            if(!self.item.headerTable){self.item.headerTable={}}
                            self.item.headerTable[lang].push('');
                            for(var key in self.item.table){
                                self.item.table[key][lang].push('');
                            }
                        })
                    }else{
                        if(!self.item.headerTable){self.item.headerTable={}}
                        self.item.headerTable[self.lang].push('');
                        for(var key in self.item.table){
                            self.item.table[key][self.lang].push('');
                        }
                    }
                    console.log(self.item)
                }
                self.deleteRow = function(i){
                    if(langArr && langArr.forEach&& langArr.length ){
                        langArr.forEach(function(lang){
                            self.item.headerTable[lang].splice(i,1);
                            for(var key in self.item.table){
                                self.item.table[key][lang].splice(i,1);
                            }
                        })
                    }else{
                        self.item.headerTable[self.lang].splice(i,1);
                        for(var key in self.item.table){
                            self.item.table[key][self.lang].splice(i,1);
                        }
                    }
                    /*

                     self.item.headerTable.splice(i,1);
                     filter.tags.forEach(function(tag){
                     self.item.table[tag._id].splice(i,1);
                     })*/
                }
                self.editTable = function(item){
                    console.log(item)
                    self.item=item;
                    if(langArr && langArr.forEach && langArr.length ){
                        langArr.forEach(function(lang){
                            self.item.headerTable[lang].push('');
                            for(var key in self.item.table){
                                self.item.table[key][lang].push('');
                            }
                        })
                    }else{
                        self.item.headerTable[self.lang].push('');
                        for(var key in self.item.table){
                            self.item.table[key][self.lang].push('');
                        }
                    }

                    /*self.item.headerTable.push('');
                     filter.tags.forEach(function(tag){
                     self.item.table[tag._id].push('')
                     })*/


                }
                self.deleteTable = function(item){
                    Confirm("удалить?" )
                        .then(function(){
                            return AddInfo.delete({id:item._id} ).$promise;
                        } )
                        .then(function(){
                            return activate();
                        })
                        .catch(function(err){
                            err = (err &&err.data)||err
                            if(err){
                                exception.catcher('удаление')(err)
                            }

                        })
                }
                self.setTable = function(item){
                    self.item=item;
                    if(langArr && langArr.forEach&& langArr.length ){
                        langArr.forEach(function(lang){
                            if(!self.item.headerTable){
                                self.item.headerTable={}
                                self.item.headerTable[lang]=[];
                                self.item.headerTable[lang].push('');
                            }
                            for(var key in self.item.table){
                                if(!self.item.table[key][lang]){
                                    self.item.table[key][lang]=[];
                                    self.item.table[key][lang].push('');
                                }
                            }
                        })
                    }else{
                        if(!self.item.headerTable){
                            self.item.headerTable={}
                            self.item.headerTable[self.lang]=[];
                            self.item.headerTable[self.lang].push('');
                        }
                        for(var key in self.item.table){
                            if(self.item.table[key].length){
                                self.item.table[key]={}
                                self.item.table[key][self.lang]=[];
                                self.item.table[key][self.lang].push('');
                            }

                        }
                    }
                    console.log(self.item)

                }
            },
            controllerAs:'$ctrl',
            size: 'lg',
            resolve: {
                filter: function () {
                    return filter;
                },
                carrentAddInfo:function(){
                    return addInfo;
                }
            }
        });
        return modalInstance.result.then(function (addInfo) {
            console.log(addInfo)
            //self.stuff.sortsOfStuff.addInfo=addInfo._id

        },function () {});
    }



})
