'use strict';
(function(){

    angular.module('gmall.services')
        .directive('newsItem',function(){
            function newsItemCtrl(News,$stateParams,$q,$uibModal,selectStuffModalService){
                console.log('newsItemCtrl')
                var self = this;
                self.Items=News;
                $q.when()
                    .then(function(){
                        return self.Items.get({_id:$stateParams.id}).$promise
                    })
                    .then(function(res){
                        self.item=res
                    })
                    .catch(function(err){
                        console.log(err)
                    })

                self.saveField = function(field,defer){
                    defer =defer||0

                    setTimeout(function(){
                        var o={_id:self.item._id};
                        if (field=='stuffs'){
                            o[field]=self.item[field].map(function(el){return el._id})
                        }else{
                            o[field]=self.item[field]
                        }
                        self.Items.save({update:field},o);
                    },defer)
                };
                self.movedSlide = function(){
                    self.item.imgs.forEach(function(el,i){
                        el.index=i;
                    })
                    self.saveField('imgs')
                }
                self.deleteSlide = function(images,index){
                    var data={file:images.img,_id:self.item._id}
                    $http.post("api/collections/News/fileDeleteFromImgs",data).then(function(response) {
                        self.item.imgs.splice(index,1)
                        self.saveField('imgs')
                    }, function(err) {
                        console.log(err)
                    });

                }
                self.editSlide=function(slide,index){
                    //console.log(slide)
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'components/news/editSlide.html',
                        controller: function(slide,$uibModalInstance){
                            var self=this;
                            self.item=slide;
                            self.ok=function(){
                                console.log(self.item)
                                $uibModalInstance.close(self.item);
                            }
                            self.cancel = function () {
                                $uibModalInstance.dismiss('cancel');
                            };
                        },
                        controllerAs:'$ctrl',
                        resolve: {
                            slide: function () {
                                return slide;
                            },
                        }
                    });
                    modalInstance.result.then(function (slide) {
                        console.log(slide)
                        self.saveField('imgs')
                    }, function () {
                    });
                }
                self.addStuff=function(){
                    $q.when()
                        .then(function(){
                            return selectStuffModalService.selectStuff();
                        })
                        .then(function(stuff){
                            //console.log(stuff)
                            if(stuff){
                                if(!self.item.stuffs){self.item.stuffs=[];}
                                if(!self.item.stuffs.some(function(el){return el._id==stuff._id})){
                                    self.item.stuffs.push(stuff);
                                    self.saveField('stuffs');
                                }

                            }
                        })
                        .catch(function(err){
                            console.log(err)
                        })

                }
                self.movedStuff = function(){
                    self.saveField('stuffs')
                }
                self.deleteStuff = function(index){
                    self.item.stuffs.splice(index,1);
                    self.saveField('stuffs')
                }

            }
            return {
                scope: {},
                bindToController: true,
                controller: newsItemCtrl,
                controllerAs: '$ctrl',
                templateUrl: 'components/news/newsItem.html',
            }
        })
})()
