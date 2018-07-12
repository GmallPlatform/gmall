'use strict';var
langs=['ru','uk','en','de'];
/*var tags={
    name:{ua:String,en:String,ru:String,de:String,desc:String}

}*/
(function(){
    angular.module('gmall.directives')
        .directive('redirectList',listDirective)

    function listDirective(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: listCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/ADMIN/redirect/redirectList.html',
        }
    };

    listCtrl.$inject=['Redirect','Store','$q','$state','global','Confirm','exception','$timeout','$element'];
    function listCtrl(Items,Store,$q,$state,global,Confirm,exception,$timeout,$element){
        var self = this;
        self.$state=$state;
        self.Items=Items;
        self.itemId=null;
        self.query={store:global.get('store').val._id};
        self.paginate={page:0,rows:50,totalItems:0}
        self.newItem={}
        self.enableEdit=[];
        self.deleteItem=deleteItem;
        self.createItem=createItem;
        self.createObject=createObject;
        self.saveField=saveField;
        self.activeEdit=activeEdit;
        self.deleteObject=deleteObject;
        //*******************************************************
        activate();

        function activate() {

            if(global.get('store').val.redirect && global.get('store').val.redirect._id){
                return self.Items.getItem(global.get('store').val.redirect._id).then(function(res){
                    self.itemId=global.get('store').val.redirect._id
                    self.items = res.urls;
                    self.enableData=true;
                })
            }else{
                self.enabledCreate=true;
            }
            return;
        }
        function createObject(){
            self.enabledCreate=false;
            $q.when()
                .then(function(){
                    return self.Items.save({store:global.get('store').val._id,url:[]}).$promise
                } )
                .then(function(res){
                    var o={}
                    o._id=global.get('store').val._id;
                    o.redirect=res.id;
                    Store.save({update:'redirect'},o,function(){})
                    self.itemId=res.id
                    self.items = [];
                    self.enableData=true;
                })
                .catch(function(err){
                    if(err){
                        err = err.datsa||err;
                        exception.catcher('создание объекта')(err)
                    }

                })
        }
        function deleteObject(){
            Confirm('подтверждаете?')
                .then(function(){
                    var o={}
                    o._id=global.get('store').val._id;
                    o.redirect=null;
                    return Store.save({update:'redirect'},o,function(){}).$promise
                } )
                .then(function(res){
                    self.enabledCreate=true;
                    self.itemId=null
                    self.items = null;
                    self.enableData=false;
                })
                .catch(function(err){
                    if(err){
                        err = err.datsa||err;
                        exception.catcher('удаление объекта')(err)
                    }

                })
        }
        function createItem(){
            if(!self.url ||!self.redUrl){
                return exception.showToaster('error','error','fill all fields')
            }
            if(self.url.charAt(0)!='/'){
                self.url='/'+self.url
            }
            if(self.redUrl.charAt(0)!='/'){
                self.redUrl='/'+self.redUrl
            }
            var is = self.items.find(function (item) {
                return item.url == self.url
            })
            if(is){
                return exception.showToaster('error','error','allready exist')
            }
            var o={url:self.url,redUrl:self.redUrl}
            self.url='';self.redUrl='';
            self.items.push(o)
            var update={update:'url redUrl',embeddedName:'urls',embeddedPush:true};
            o._id=self.itemId;
            console.log(update,o)
            $q.when()
                .then(function () {
                    return self.Items.save(update,o).$promise;
                })
                .then(function (res) {
                    activate()
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('добавление блока')(err)
                    }
                })
        }
        function deleteItem(index){
            Confirm("удалить???" )
                .then(function(){
                    self.items.splice(index,1)
                } )
                .then(function(block){
                    var o={_id:self.itemId,urls:self.items};
                    var update={update:'urls'};
                    update.embeddedPull=true;
                    return self.Items.save(update,o).$promise;
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('удаление объекта')(err)
                    }

                })
        }
        function activeEdit(i){
            $element.find('#editUrl'+i).focus()
            self.enableEdit[i]=true;
        }
        function saveField(i) {
            self.enableEdit.forEach(function (item,idx) {
                self.enableEdit[idx]=false
            })
            $q.when()
                .then(function(){
                    if(!self.items[i].url ||!self.items[i].redUrl){
                        throw 'fill all fields'
                    }
                    if(self.items[i].url.charAt(0)!='/'){
                        self.items[i].url='/'+self.items[i].url
                    }
                    if(self.items[i].redUrl.charAt(0)!='/'){
                        self.items[i].redUrl='/'+self.items[i].redUrl
                    }
                    var is = self.items.find(function (item,ii) {
                        return (item.url == self.items[i].url && i!=ii)
                    })
                    if(is){
                        throw'allready exist'
                    }

                    var o={_id:self.itemId,urls:self.items};
                    var update={update:'urls'};
                    return self.Items.save(update,o).$promise;
                } )
                .then(function(){
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)

                })
                .catch(function(err){
                    self.enableEdit[i]=true
                    if(err){
                        exception.catcher('сохранение объекта')(err)
                    }

                })
        }

    }




    angular.module('gmall.services')
        .service('Redirect', infoService);
    infoService.$inject=['$resource','$uibModal','$q'];
    function infoService($resource,$uibModal,$q){
        var Items= $resource('/api/collections/Redirect/:_id',{_id:'@_id'});
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            query:Items.query,
            get:Items.get,
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
    }



})()



