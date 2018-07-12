'use strict';
angular.module('gmall.services')
.service('$fileUpload', ['$http','$uibModal','$q', function ($http,$uibModal,$q) {
        this.uploadFileToUrl = function(file, uploadUrl,id,params,type){
            var fd = new FormData();
            fd.append('file', file);
            fd.append('id', id);
            // console.log(uploadUrl,id,params);
            if (params && (typeof params == "object")){
                for (var key in params) {
                    ////fd[key]=params[key]
                    fd.append(key, params[key]);
                }
            }
            var preffix=photoUpload;
            switch(type){
                case 'user': preffix=userHost;break;
            }
           return $http.post(preffix+uploadUrl, fd, {
                withCredentials: true,
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
        }
        this.showFile =function (block,field) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/loadImage/showImgInModal.html',
                controllerAs:'$ctrl',
                controller: function ($uibModalInstance ,block,field) {
                    var self=this;
                    self.item=block;
                    console.log(self.item)
                    self.ok=ok;
                    self.cancel = cancel;

                    function ok(item){
                        $uibModalInstance.close();
                    }
                    function cancel() {
                        $uibModalInstance.dismiss();
                    };
                },
                resolve: {
                    block:function () {
                        return block
                    },
                    field:function () {
                        return field
                    }
                }
            });
            return modalInstance.result

        }

        this.fileUpload=function (uploadUrl,field,itemUrl,itemId,index) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: function () {
                return (field && field=='video')?'components/loadImage/loadVideoModal.html':'components/loadImage/loadImageModal.html';
                if(field=='video'){'components/loadImage/loadVideoModal.html'}else{return 'components/loadImage/loadImageModal.html'}
            },
            controller: function(uploadUrl,field,itemUrl,itemId,index,$uibModalInstance,$scope,$timeout,exception){
                //console.log(itemUrl)
                var self=this;
                self.files=[]
                self.hasFiles=false;
                self.urlArr=uploadUrl.split('?');
                self.suffix=(self.urlArr[1])?self.urlArr[1]:'';
                self.dimen= self.urlArr[0].split('/');
                self.fileDimension=''
                if(field!='video'){
                    self.fileDimension=self.dimen[self.dimen.length-1].slice(10);
                }
                self.uploadFiles=uploadFiles;
                var $form,$input;
                $timeout(function () {
                    $form = $('#uploadImgForm');
                    $input = $form.find('#inputFilesUpload')
                    $input.bind('change', changedHandler);
                    $form.bind('reset', resetHandler);
                    var isAdvancedUpload = function() {
                        var div = document.createElement('div');
                        return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
                    }();
                    if (isAdvancedUpload) {
                        $form.addClass('has-advanced-upload');
                        var droppedFiles = false;

                        $form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                        })
                            .on('dragover dragenter', function() {
                                $form.addClass('is-dragover');
                            })
                            .on('dragleave dragend drop', function() {
                                $form.removeClass('is-dragover');
                            })
                            .on('drop', function(e) {
                                handleImage(e.originalEvent.dataTransfer.files)
                            });
                    }

                },300)
                /****************************************************************/
                /****************************************************************/
                var changedHandler = function (event) {
                    if (window.File && window.FileList && window.FileReader) {
                        handleImage(event.target.files)
                    } else {
                        console.log("Your browser does not support File API");
                    }
                };
                var resetHandler = function () {
                    $scope.$apply(function () {
                        self.files.length = 0;
                        self.hasFiles = false;
                        self.isUploading=false;
                    });
                };
                function handleImage(files) {
                    $scope.$apply(function () {
                        if(files.length){self.hasFiles = true;}else{self.hasFiles = false}
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            var picReader = new FileReader();
                            closureI(picReader,file)
                            //Read the image
                            picReader.readAsDataURL(files[i]);
                        }
                    })
                    function closureI(picReader,file) {
                        picReader.addEventListener("load", function (event) {
                            var picFile = event.target;
                            file.imgSrc=picFile.result;
                            var is;
                            for(var j=0;j<self.files.length;j++){
                                if(self.files[j].name==file.name){
                                    is=true;
                                    break;
                                }
                            }
                            if(!is){
                                $timeout(function () {
                                    self.files.push(file);
                                },100)

                            }
                        });
                    }
                }
                // Watch the files so we can reset the input if needed
                $scope.$watchCollection('files', function () {
                    if (self.files.length === 0 && $input) {
                        $input.val(null);
                    }
                })
                $scope.$on('$destroy', function () {
                    $input.unbind('change', changedHandler);
                    $form.unbind('reset', resetHandler);
                });
                /****************************************************************/
                /****************************************************************/

                function uploadFiles() {
                    if(self.isUploading){return}
                    self.isUploading=true;
                    var acts=[];
                    self.files.forEach(function (file,i) {
                        if((field!='imgs' && field!='gallery' && i) || i>20){
                            return
                        }
                        acts.push(handlePhoto(file))
                    })

                    function handlePhoto(file) {
                        console.log(uploadUrl,self.fileDimension)
                        var url = self.urlArr[0]+self.fileDimension;
                        //console.log(url)
                        var fd = new FormData();
                        //console.log(file)
                        fd.append('file', file);
                        if(itemUrl){
                            fd.append('url', itemUrl);
                        }
                        if(field){
                            fd.append('nameImg', field);
                        }
                        if(itemId){
                            fd.append('id', itemId);
                        }
                        if(index){
                            fd.append('index', index);
                        }
                        var preffix=photoUpload;
                        console.log(preffix+url+'?'+self.suffix)
                        return $http.post(preffix+url+'?'+self.suffix, fd, {
                            withCredentials: true,
                            transformRequest: angular.identity,
                            headers: {'Content-Type': undefined}
                        })
                    }

                    return $q.all(acts)
                        .then(function (res) {
                            //console.log(res)
                            $uibModalInstance.close(res);
                        })
                        .catch(function (err) {
                            exception.catcher('load file')(err)
                            console.log(err)
                        })

                }




                $scope.$watch('fileSrc',function(n,o){
                    if(n && n.indexOf('base64') < 0){
                        //console.log(n)
                        oldImg=n;
                        //console.log(oldImg)
                    }
                });
                $scope.$watch('myFile',function(n,o){
                    if (!n){
                        $scope.noLoad=true;
                    } else {
                        $scope.noLoad=false;
                    }
                });
                $scope.clickFile=function(){
                    var id= '#imagefile'+$scope.now;
                    angular.element(id).trigger('click');
                }
                $scope.uploadImg = function(){
                    if (!scope.itemId) return;
                    var file = scope.myFile;
                    scope.noChange=true;
                    var params={index:scope.index,nameImg:scope.nameImg}
                    if(scope.itemUrl && scope.itemUrl!='undefined'){
                        params.url=scope.itemUrl;
                    }
                    scope.dimen[scope.dimen.length-1]=scope.dimen[scope.dimen.length-1].slice(0,10);
                    var url = scope.dimen.join('/');
                    url +=scope.$ctrl.fileDimension;
                    /*console.log(url)
                     return;*/
                    //console.log(scope.uploadUrl,scope.fileDimension,url)
                    $fileUpload.uploadFileToUrl(file, url,scope.itemId,params)
                        .then(function(res){
                            scope.myFile=null;
                            //console.log(res);
                            scope.noChange=false;
                            scope.noLoad=true;
                            scope.fileSrc=null;
                            //alert('загружено!');
                            var o={_id:scope.itemId}
                            $timeout(function(){
                                //if(!scope.gallery){scope.gallery=[]}
                                if(scope.nameImg=='imgs'){
                                    if(scope.replaceIndex){
                                        scope.gallery[scope.replaceIndex].img=res.data.imgs[0].img
                                        if(oldImg){
                                            console.log('deleting');
                                            Photo.deleteFiles('Stuff',[oldImg]);
                                        }
                                    }else{
                                        scope.gallery.push(res.data.imgs[0]);
                                    }
                                    if(scope.nameImgForSave){
                                        o[scope.nameImgForSave]=scope.gallery;
                                    }else{o[scope.nameImg]=scope.gallery;}

                                    // console.log(scope.gallery)
                                } else if(scope.nameImg=='gallery'){
                                    scope.gallery.push(res.data.gallery[0]);
                                    o[scope.nameImg]=scope.gallery;
                                } else{
                                    if(oldImg){
                                        var small = oldImg.split('/');
                                        small[small.length-1]= small[small.length-1].replace('img','small');
                                        small=small.join('/')
                                        console.log('deleting');
                                        Photo.deleteFiles('Stuff',[oldImg,small]);
                                    }
                                    oldImg=(res.data.img)?res.data.img:res.data[scope.nameImg];
                                    scope.fileSrc=(res.data.img)?res.data.img:res.data[scope.nameImg];
                                    o[scope.nameImg]=(res.data.img)?res.data.img:res.data[scope.nameImg];
                                }


                                var field=(scope.nameImgForSave)?scope.nameImgForSave:scope.nameImg;
                                //console.log(field)
                                //for smallimg
                                if(res.data['small'+scope.nameImg]){
                                    field+=' '+'small'+scope.nameImg;
                                    o['small'+scope.nameImg]=res.data['small'+scope.nameImg];
                                }
                                //console.log(field,o)
                                scope.Item.save({update:field},o)
                            },10)
                        })
                        .catch(function (err) {
                            if(err){
                                exception.catcher('upload video')(err)
                            }

                        })
                }
                self.ok=function(){
                    console.log(self.item)
                    $uibModalInstance.close(self.item);
                }
                self.cancel = function () {
                    $uibModalInstance.dismiss();
                };
            },
            controllerAs:'$ctrl',
            size:'lg',
            resolve: {
                uploadUrl: function () {
                    return uploadUrl;
                },
                field: function () {
                    return field;
                },
                itemUrl: function () {
                    return itemUrl;
                },
                itemId: function () {
                    return itemId;
                },
                index: function () {
                    return index;
                },
            }
        });
        return modalInstance.result
    }



    }])
.factory('Photo',photoFactory)

photoFactory.$inject=['$http'];
function photoFactory($http) {
    return {
        deleteFolder: function(model,folder) {
            return $http.post('/api/collections/Photo/deleteFolder',{folder:folder});
        },
        deleteFolders: function(model,folders) {
            return $http.post('/api/collections/Photo/deleteFolders',{folders:folders});
        },
        deleteFiles: function(model,files) {
            return $http.post('/api/collections/Photo/deleteFiles',{files:files});
        }
    };
    return {
        deleteFolder: function(model,folder) {
            return $http.post(photoUpload+'/api/collections/'+model+'/deleteFolder',{folder:folder});
        },
        deleteFolders: function(model,folders) {
            return $http.post(photoUpload+'/api/collections/'+model+'/deleteFolders',{folders:folders});
        },
        deleteFiles: function(model,files) {
            return $http.post(photoUpload+'/api/collections/'+model+'/deleteFiles',{files:files});
        }
    };
}


