'use strict';
(function(){
    angular.module('gmall.services')
        .directive('infoList',listDirective)
        .directive('infoListTemplate',listTemplateDirective);
    function listDirective(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: listCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/info/infoList.html',
        }
    };
    function listTemplateDirective(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: listCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'views/template/partials/info/info.html',
        }
    };
    listCtrl.$inject=['Info','$q','$state','$stateParams','global','Confirm','exception','$fileUpload','Photo'];
    function listCtrl(Items,$q,$state,$stateParams,global,Confirm,exception,$fileUpload,Photo){
        var self = this;
        self.mobile=global.get('mobile' ).val;
        self.$state=$state;
        self.Items=Items;
        self.query={};
        self.paginate={page:0,rows:50,totalItems:0}
        self.newItem={name:'Новый информационный раздел',index:1}
        //console.log('Новый информационный раздел')
        self.getList=getList;
        self.saveField = saveField;
        self.searchItems=searchItems;
        self.createItem=createItem;
        self.deleteItem=deleteItem;
        self.dropCallback=dropCallback;
        self.loadPhoto=loadPhoto;
        self.deletePhoto=deletePhoto;
        //*******************************************************
        activate();

        function activate(page) {

            if(page || page===0){
                self.paginate.page=0;
            }
            return getList().then(function() {
                //console.log('Activated info list View');
            });
        }
        function getList() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    self.block=0;
                    if($stateParams.block){
                        for(var i =0;i<data.length;i++){
                            if($stateParams.block==data[i]._id){
                                self.block=i;
                                break;
                            }
                        }
                    }
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
        function saveField(item,field){
            var o={_id:item._id};
            o[field]=item[field]
            return self.Items.save({update:field},o ).$promise
        };
        function createItem(){
            self.Items.create()
                .then(function(res){
                    self.newItem.name=res;
                    return self.Items.save(self.newItem).$promise
                } )
                .then(function(res){
                    self.newItem._id=res.id;
                    self.newItem.url=res.url;
                    self.paginate.page=0;
                    return getList(self.paginate);
                })
                .then(function(){
                    var id=self.newItem._id;
                    delete self.newItem._id;
                    //$state.go('frame.seoPages.item',{id:id})
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
        function dropCallback(item){
            //console.log(item)
            var actions=[];
            setTimeout(function(){
                self.items.forEach(function(item,idx){
                    item.index=idx+1;
                    actions.push(saveField(item,'index'))

                })
                $q.all(actions)
                //saveField('main')
            },100)
            return item
        }

        function loadPhoto(item){
            self.uploadUrl="/api/collections/Photo/fileUpload?collectionName=Info";
            self.uploadVideoUrl="/api/collections/Photo/uploadVideoFile?collectionName=Info"
            $q.when()
                .then(function () {
                    return $fileUpload.fileUpload(self.uploadUrl,'img')
                })
                .then(function (res) {
                    //console.log(res)
                    var a=[];
                    if(res && res.length){
                        if(item.img){
                            a.push(item.img)
                        }
                        item.img=res[0].data.img
                        saveField(item,'img')
                        if(a.length){
                            Photo.deleteFiles('Info',a)
                        }

                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
        function deletePhoto(item){
            Confirm('удалить?').then(function () {
                var a=[];
                if(item.img){
                    a.push(item.img)
                }
                item.img=null
                console.log(item)
                saveField(item,'img')
                if(a.length){
                    Photo.deleteFiles('Info',a)
                }
            })

        }

    }
})()
