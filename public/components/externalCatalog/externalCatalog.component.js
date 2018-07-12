'use strict';
angular.module('gmall.directives')
    .directive('externalCatalog',externalCatalogComponent)
    .directive('externalCatalogDownload',externalCatalogDownload);
function externalCatalogComponent(){
    return{
        scope: {},
        restrict:"E",
        bindToController: true,
        controller: externalCatalogCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/externalCatalog/externalCatalog.html'
    }
}
function externalCatalogDownload(){
    return{
        scope: {},
        restrict:"E",
        bindToController: true,
        controller: externalCatalogDownloadCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/externalCatalog/externalCatalogDownload.html'
    }
}
externalCatalogDownloadCtrl.$inject=['ExternalCatalog','$q','Confirm','exception','global','$timeout','$http','$resource','Sections','Brands','$uibModal'];
function externalCatalogDownloadCtrl(Items,$q,Confirm,exception,global,$timeout,$http,$resource,Sections,Brands,$uibModal){
    var self=this;
    self.downloadCatalog=downloadCatalog;
    self.setGroup=setGroup;
    self.setBrand=setBrand;
    self.viewLogFile=viewLogFile;
    self.clearField=clearField;
    self.saveField=saveField;

    self.updateList=updateExternalCatalogList;
    //console.log(updateExternalCatalogList)
    self.lang=global.get('store').val.lang
    //self.changeActive=changeActive;
    activate()
    function activate(){
        $q.when()
            .then(function(){
                return Brands.getBrands()
            })
            .then(function (brands) {
                self.brands=brands
                return Sections.getSections()
            })
            .then(function (sections) {
                self.sections=sections
            })
            .then(function () {
                /*console.log(self.brands)
                console.log(self.sections)*/
                getList()
            })

    }
    function getList() {
        var query={}
        return  $q.when()
            .then(function () {
                return Items.getList(null,query)
            })
            .then(function (res) {
                //console.log(res)
                res.forEach(function(item){
                    if(item.brand){
                        item.brand=self.brands.find(function(b){return b._id==item.brand})
                    }
                    if(item.group){
                        item.group=self.sections.find(function(s){return s._id==item.group})
                    }
                })
                self.items=res;

            })

    }
    function downloadCatalog(item) {
        //Confirm('Подтверждаете?')
        $q.when()
            .then(function () {
                var file = self.myFile;

                $uibModal.open({
                    animation: true,
                    templateUrl: 'components/externalCatalog/modal/uploadExternalCatalog.html',
                    controller: function($uibModalInstance,$q,$resource,item){
                        var self=this;
                        self.disabledUpload=true;

                        var uploadUrl = stuffHost+'/api/downLoadExternalCatalog';
                        self.ok=function(){$uibModalInstance.close()}
                        self.cancel = function () {$uibModalInstance.dismiss()}
                        self.catalogName=item.name;
                        self.confirmUpload=confirmUpload;
                        console.log(item)
                        var fdata = new FormData();
                        if(item.file){
                            fdata.append("file",item.file);
                        }
                        fdata.append("_id",item._id);
                        fdata.append("url",item.url);
                        fdata.append("link",item.link);
                        fdata.append("index",item.index);
                        if(item.group){
                            fdata.append("group",item.group._id);
                        }
                        if(item.brand){
                            fdata.append("brand",item.brand._id);
                        }
                        if(item.name){
                            fdata.append("name",item.name);
                        }
                        if(item.desc){
                            fdata.append("desc",item.desc);
                        }
                        if(item.price){
                            fdata.append("price",item.price);
                        }
                        if(item.qty){
                            fdata.append("qty",item.qty);
                        }
                        if(item.artikul){
                            fdata.append("artikul",item.artikul);
                        }
                        if(item.tags){
                            fdata.append("tags",item.tags);
                        }
                        //return;
                        $q.when()
                            .then(function(){
                                return $resource(uploadUrl, {}, {
                                    postWithFile: {
                                        method: "POST",
                                        params: fdata,
                                        transformRequest: angular.identity,
                                        headers: { 'Content-Type': undefined }
                                    }
                                }).postWithFile(fdata).$promise
                            })
                            .then(function(res){
                                console.log(res)
                                if(res.err){
                                    self.errText=JSON.stringify(res.err);
                                    //console.log(self.errText)
                                    if(self.errText=='{}'){
                                        self.errText='произошла ошибка при обработке файла'
                                    }
                                    //console.log(self.errText)
                                }else{
                                    self.disabledUpload=false;
                                    self.disableSpinner=true;
                                    self.updateStuffs=res.updateStuffs
                                    self.newStuffs=res.newStuffs
                                    self.newCategories=res.newCategories
                                    self.newBrands=res.newBrands
                                    self.newBrandTags=res.newBrandTags
                                    self.newFilters=res.newFilters
                                    self.newFilterTags=res.newFilterTags

                                }
                                /*self.countFfomFile=res.data.countFfomFile;
                                self.countInDb=res.data.countInDb;
                                self.countPermission=res.data.countPermission;
                                self.countToDb=res.data.countToDb;
                                self.disableSpinner=true;*/
                            })
                        /*socket.on('endUploadUsers',function(data){
                            getList();
                        })*/
                        function confirmUpload(){
                            fdata.append("confirm",true);
                            $resource(uploadUrl, {}, {
                                postWithFile: {
                                    method: "POST",
                                    params: fdata,
                                    transformRequest: angular.identity,
                                    headers: { 'Content-Type': undefined }
                                }
                            }).postWithFile(fdata)
                            $uibModalInstance.close()
                        }

                    },
                    controllerAs:'$ctrl',
                    size:'lg',
                    resolve:{
                        item:function(){
                            return item
                        }
                    }

                }).result
            })
            .catch(function(error){
                //error
                console.log(error)
            });
    }

    function setGroup(item) {
        $q.when()
            .then(function(){
                return Sections.select()
            })
            .then(function(group){
                item.group=group
                saveField(item,'group',group._id)
            })
    }
    function setBrand(item) {
        $q.when()
            .then(function(){
                return Brands.select()
            })
            .then(function(brand){
                item.brand=brand
                saveField(item,'brand',brand._id)
            })
    }
    function clearField(item,field){
        item[field]=null;
        saveField(item,field)
    }
    function saveField(item,field,value) {
        console.log(item)
        var o ={_id:item._id}
        if(value!='undefined'){
            o[field]=item[field]
        }else{
            o[field]=value
        }
        Items.save({update:field},o,function () {
            global.set('saving',true);
            $timeout(function(){
                global.set('saving',false);
            },1500)
            var url = stuffHost+'/api/changeTaskSchedule'
            var i =angular.copy(item)
            if(i.brand){
                i.brand=i.brand._id
            }
            if(i.group){
                i.group=i.group._id
            }
            $http.post(url,i).success(function(res){
                exception.showToaster('info','schedule','was changed')
            }).error(function (err) {
                exception.catcher('error')(err)
                console.log(err)
            })

        })
    }
    function viewLogFile() {
        $uibModal.open({
            animation: true,
            templateUrl: 'components/externalCatalog/modal/viewLog.html',
            controller: function($uibModalInstance,$q,$http,global,$sce){
                var self=this;
                self.$sce
                //self.url1 = $sce.getTrustedResourceUrl(stuffHost+"/log/"+global.get('store').val.subDomain+'_users.log');
                self.url = stuffHost+"/log/"+global.get('store').val.subDomain+'_externalCatalog.log';
                //console.log(self.url1)
                self.ok=function(){$uibModalInstance.close()}
                self.cancel = function () {$uibModalInstance.dismiss()}

                $http.get(self.url).success(function(res){
                    console.log(res.replace(/[\r\n]/g, "<br />"))
                    self.loaded;
                    self.logFile=$sce.getTrustedHtml(res.replace(/[\r\n]/g, "<br />"));
                }).error(function (err) {
                    self.loaded;
                    console.log(err)
                })
            },
            controllerAs:'$ctrl',
            size:'lg',
        })
    }
}

externalCatalogCtrl.$inject=['ExternalCatalog','$q','Confirm','exception','global','$timeout'];
function externalCatalogCtrl(Items,$q,Confirm,exception,global,$timeout) {
    var self=this;
    self.saveField=saveField;
    self.createItem=createItem;
    self.deleteItem=deleteItem;
    activate()
    function activate(){
        getList()
    }
    function getList() {
        var query={}
        return  $q.when()
            .then(function () {
                return Items.getList(null,query)
            })
            .then(function (res) {
                console.log(res)
                self.items=res;
            })
            .then(function () {
                var d = new Date()

                self.items.forEach(function(item){
                    if(!item.timezoneOffset && item.timezoneOffset!=0){
                        item.timezoneOffset= Math.ceil(d.getTimezoneOffset()/60);
                        saveField(item,'timezoneOffset')
                    }
                    //console.log(item.timezoneOffset)
                })
            })
    }
    function saveField(item,field) {
        //console.log(item)
        var o ={_id:item._id}
        o[field]=item[field]
        Items.save({update:field},o,function () {
            global.set('saving',true);
            $timeout(function(){
                global.set('saving',false);
            },1500)

        })
    }
    function createItem(){
        //console.log('create')
        $q.when()
            .then(function(){
                return Items.create()
            })
            .then(function(item){
                var d = new Date()
                item.timezoneOffset = d.getTimezoneOffset();
                return Items.save(item).$promise
            })
            .then(function(){
                return getList()

            })
            .catch(function(err){
                if(err){
                    exception.catcher('создание внешнего каталога')(err)
                }
            })
    }
    function deleteItem(item){
        Confirm("удалить?" )
            .then(function(){
                item.actived=false;
                saveField(item,'actived')
                //return Items.delete({_id:item._id} ).$promise;
            } )
            .then(function(){
                //return getList();
            })
            .catch(function(err){
                err = (err &&err.data)||err
                if(err){
                    exception.catcher('удаление внешнего каталога')(err)
                }

            })
    }

}
angular.module('gmall.services')
.service('ExternalCatalog', function($resource,$q,$uibModal){
    var Items= $resource('/api/collections/ExternalCatalog/:_id',{_id:'@_id'});
    var items;
    return {
        getList:getList,
        getItem:getItem,
        query:Items.query,
        get:Items.get,
        save:Items.save,
        delete:Items.delete,
        create:create,
        getItems:getItems
    }
    function getItems(reload){
        if(!items || reload){
            return getList();
        }else{
            return items;
        }

    }
    function getList(paginate,query){
        //console.log('get list')
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
            items=response;
            //console.log(response)
            return response;
        }

        function getListFailed(error) {
            console.log('XHR Failed for getNews.' + error);
            return $q.reject(error);
        }
    }
    function getItem(id){
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
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/externalCatalog/createExternalCatalog.html',
                controllerAs:'$ctrl',
                controller: function ($uibModalInstance){
                    var self=this;
                    self.name='';
                    self.ok=function(){
                        if(!self.name){
                            exception.catcher('создание объекта')('нужено название')
                            return
                        }
                        $uibModalInstance.close({name:self.name});
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                },

            });
            modalInstance.result.then(function (item) {
                if(item.name){
                    item.name=item.name.substring(0,25)
                    resolve(item)
                }else{
                    reject('empty')
                }
            }, function (err) {
                reject(err)
            });
        })
    }
    /*createExternalCatalogCtrl=['$uibModalInstance'];
     function createExternalCatalogCtrl($uibModalInstance){
     var self=this;
     self.name='';
     self.addOwner=addOwner;
     self.ok=function(){
     if(!self.name){
     exception.catcher('создание объекта')('нужено название')
     return
     }
     $uibModalInstance.close({name:self.name});
     }
     self.cancel = function () {
     $uibModalInstance.dismiss();
     };
     }*/

})



