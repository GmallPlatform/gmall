'use strict';var
langs=['ru','uk','en','de','es'];
/*var tags={
    name:{ua:String,en:String,ru:String,de:String,desc:String}

}*/
(function(){
    angular.module('gmall.directives')
        .directive('langList',listDirective)
        .directive('langItem',itemDirective)
    function listDirective(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: listCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/lang/langList.html',
        }
    };
    function itemDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/lang/langItem.html',
        }
    }
    listCtrl.$inject=['Lang','$q','$state','global','Confirm','exception'];
    function listCtrl(Items,$q,$state,global,Confirm,exception){
        var self = this;
        self.$state=$state;
        self.Items=Items;
        self.query={};
        self.paginate={page:0,rows:50,totalItems:0}
        self.newItem={name:''}
        self.getList=getList;
        self.searchItems=searchItems;
        self.createItem=createItem;
        self.deleteItem=deleteItem;
        //*******************************************************
        activate();

        function activate(page) {
            if(page || page===0){
                self.paginate.page=0;
            }
            return getList().then(function() {
                console.log('Activated list View');
            });
        }
        function getList() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    self.items = data;
                    return self.items;
                });
        }
        function searchItems(searchStr){
            if(searchStr){
                self.query = {name:searchStr.substring(0,10)};
            }else{
                self.query = {};
            }
            self.paginate.page=0;
            activate();
        }
        function createItem(){
            self.Items.create()
                .then(function(res){
                    if(!res){return}
                    self.newItem.name=res.substring(0,30);
                    return self.Items.save(self.newItem).$promise
                } )
                .then(function(res){
                    self.paginate.page=0;
                    return getList(self.paginate);
                })
                .catch(function(err){
                    if(err){
                        err = err.datsa||err;
                        exception.catcher('создание объекта')(err)
                    }

                })
        }
        function deleteItem(item){
            Confirm("удалить???" )
                .then(function(){
                    return self.Items.delete({_id:item._id} ).$promise;
                } )
                .then(function(){
                    activate(0);
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('удаление страницы')(err)
                    }

                })
        }
    }

    itemCtrl.$inject=['Lang','$stateParams','$q','$uibModal','exception','global','$http','$timeout'];
    function itemCtrl(Items,$stateParams,$q,$uibModal,exception,global,$http,$timeout){
        var self = this;
        self.Items=Items;
        self.global=global;
        self.saveField=saveField;
        self.addNewTag=addNewTag;
        self.deleteTag=deleteTag;
        self.langs=langs;
        self.searchStrTag='';
        if(langs[0]!='ru'){
            self.currentLang=langs[0]
        }else{
            self.currentLang=langs[1]
        }
        self.langsArr = langs.filter(function (l) {
            return l!='ru'
        })
        //console.log(langs,self.langsArr)
        self.searchStrFilter=searchStrFilter;
        self.googleTranslate=googleTranslate;
        //********************activate***************************
        activate($stateParams.id);
        //*******************************************************
        function activate(id) {
            console.log('Activated item View!');
            return getItem(id).then(function() {
            }).catch(function(err){
                err = err.data||err
                exception.catcher('получение объекта')(err)
            });
        }
        function getItem(id) {
            return self.Items.getItem(id)
                .then(function(data) {
                    self.item = data;
                    return self.item;
                } ).catch(function(err){
                    return $q.reject(err)
                });
        }
        function saveField(f,value,root){
            if(root){
                var field=f;
            }else{
                var field='tags.'+f;
            }
            var o={_id:self.item._id};
            o[field]=value
            return self.Items.save({update:field},o).$promise.then(function () {
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)
            });
        };
        function addNewTag(newTag){
            console.log(newTag)
            if(!newTag){return}else{var tag=newTag.substring(0,20).replace(/\s/g, "X");newTag='';}
            console.log(tag)
            if(!self.item.tags){self.item.tags={}}
            if(Object.keys(self.item.tags).indexOf(tag)<0){
                self.item.tags[tag]={};
                self.langs.forEach(function (l) {
                    self.item.tags[tag][l]='';
                })
                self.item.tags[tag].desc='';
                //console.log(self.item)
                saveField(tag,self.item.tags[tag])
            }else{
                exception.catcher('add tag')('already exist!')
            }
            self.newTag=''
        }
        function deleteTag(tag) {
            console.log(tag)
            delete self.item.tags[tag];
            //saveField(tag,'undefined')
            saveField('tags',self.item.tags,true)
        }
        function searchStrFilter(items,str){
            //console.log(stg)
            if(!str){return items}
            var result = {};
            angular.forEach(items, function(value, key) {
                if(key.indexOf(str)>-1){
                    result[key] = value;
                }

            });
            return result;
        }
        function googleTranslate() {
            /*console.log(self.currentLang);
            console.log(self.item)*/
            var str='';
            for(var tag in self.item.tags){
                if(str){
                    str+='<br>'
                }
                str+=self.item.tags[tag].ru
            }
            //console.log(str)
            sendForTranslate([str]).then(function (data) {
                var strTranslated = data[0];
                var translatedArr=strTranslated.split('<br>')
                var arr=str.split('<br>');
                var acts=[];
                for(var tag in self.item.tags){
                    var i = arr.indexOf(self.item.tags[tag].ru)
                    self.item.tags[tag][self.currentLang]=translatedArr[i]
                    console.log(self.item.tags[tag].ru,translatedArr[i])
                    acts.push(saveField(tag+'.'+self.currentLang,translatedArr[i]))
                }
                console.log($q)
                $q.all(acts)
                    .then(function () {
                        console.log('all saved')
                    })
                    .catch(function (err) {
                        console.log(err)
                    })


            })
            
        }
        function sendForTranslate(texts) {
            var allLength=0;
            texts.forEach(function (t) {
                allLength+=t.length;
            })
            console.log('all length ',allLength)
            var fd = new FormData();
            for (var i = 0; i < texts.length; i++) {
                fd.append('texts[]', texts[i]);
            }
            //fd.append('texts', texts);
            fd.append('target', self.currentLang);
            var url=stuffHost+'/api/translate?translate=translate'
            return $http.post(url, fd,{
                withCredentials: true,
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (res) {
                console.log(res)
                return res.data;
            }).catch(function (err) {
                self.translatingGoogle=false;
                if(err){
                    exception.catcher('google translate')(err)
                }
            })
        }

    }




    angular.module('gmall.services')
        .service('Lang', infoService);
    infoService.$inject=['$resource','$uibModal','$q'];
    function infoService($resource,$uibModal,$q){
        var Items= $resource('/api/collections/Lang/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            query:Items.query,
            get:Items.get,
            create:create,
        }
        function getList(paginate,query){
            if(!paginate){
                paginate={page:0}
            }
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getPaps.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            //console.log(id)
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function create(){
            return $q(function(resolve,reject){
                var options={
                    animation: true,
                    restrict:"E",
                    templateUrl: 'components/lang/createItem.html',
                    controller: createCtrl,
                    size:'lg',
                    controllerAs:'$ctrl',
                }
                $uibModal.open(options).result.then(function (name) {
                    //console.log(name)
                    if(name){
                        resolve(name.substring(0,100))
                    }else{
                        reject('empty')
                    }

                }, function (err) {
                    reject(err)
                });
            })

        }
        createCtrl.$inject=['$uibModalInstance']
        function createCtrl($uibModalInstance){
            var self=this;
            self.name=''
            self.ok=function(){
                //console.log(self.name)
                $uibModalInstance.close(self.name);
            }
            self.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }

    }



})()



