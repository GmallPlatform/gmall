'use strict';
(function(){
    angular.module( 'gmall.services' ).service( 'EditModelData',serviceFunction )
    serviceFunction.$inject=['$uibModal','$q']
    function serviceFunction($uibModal,$q){
        return {
            doIt:doIt
        }
        function doIt(model,_id,Item){
            var item=angular.copy(Item)
            return $q(function(resolve,reject){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/editModel/editModel.html',
                    controller: editModelCtrl,
                    size: 'lg',
                    controllerAs:'$ctrl',
                    resolve:{
                        model:function(){return model},
                        _id:function(){return _id},
                        item:function(){return item}
                    }
                });
                modalInstance.result.then(
                    function(){
                        //console.log(item.img)
                        var img
                        if(item.img && item.img.indexOf('data:image') < 0 ){
                            img=item.img;
                            //console.log(Item.img)
                        }
                        resolve(img)},
                    function(){
                            var img
                        if(item.img && item.img.indexOf('data:image') < 0 ){
                            img=item.img;
                        }
                        resolve(img)
                        //reject(item)
                    }
                );
            })
        }
        editModelCtrl.$inject=['$resource','$uibModalInstance','$q','model','_id'];
        function editModelCtrl($resource,$uibModalInstance,$q,model,_id,item){
            //console.log('!!!!!!!!!!!!')
            var self=this;
            var url= '/api/collections/'+model+'/:_id';
            self.urlFile='/api/collections/'+model+'/fileUploadBig'
            self.Items=$resource(url,{_id:'@_id'})
            self.saveField=saveField;
            self.item=item;
            activate()
            function activate(){
                $q.when()
                    .then(function(){
                        return self.Items.get({_id:_id} ).$promise
                    })
                    .then( function (res) {
                        //console.log(res)
                        if(res){
                            self.item=res;
                        }
                    })
                    .catch(function(){
                        self.cancel()
                    })
            }
            function saveField(field,defer){
                defer =defer||0
                var o={_id:self.item._id};
                setTimeout(function(){
                    o[field]=self.item[field]
                    self.Items.save({update:field},o);
                },defer)
            }
            self.cancel = function () {
                $uibModalInstance.dismiss();
            };
            self.ok = function () {
                $uibModalInstance.close(self.item);
            };
        }
    }


})()
