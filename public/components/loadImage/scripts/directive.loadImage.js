'use strict';

/* Directives */
angular.module('gmall.directives')

    .directive("fileReadSrc", ['$parse','$timeout',function ($parse,$timeout) {
        return {
            restrict: 'A',
            scope: {
                fileSrc : "=fileReadSrc",
                myFile:'='
            },

            link: function (scope, element, attrs) {
                element.bind("change", function (changeEvent) {
                    /*var model = $parse(attrs.fileReadScr);

                     var modelSetter = model.assign;
                     //console.log(modelSetter)*/
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        //console.log(loadEvent.target.result);
                        scope.$apply(function () {
                            $timeout(function(){
                                scope.fileSrc = loadEvent.target.result;
                                //console.log(scope.fileSrc);
                            });
                        });
                    }
                    scope.myFile= changeEvent.target.files[0];
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }])

.directive('loadImage',['$fileUpload','$timeout','Photo', function($fileUpload,$timeout,Photo) {
    return {
        restrict : 'AE',
        scope: {
            uploadUrl:'@',
            itemId:'@',
            itemUrl:'@',
            fileSrc:'=',
            Item:'=itemResourse',
            gallery:'=',
            nameImg:'@',
            nameImgForSave:'@',
            deleteFile:"@",
            replaceIndex:'@'
            //fileReadSrc
        },
        controller:function($scope){
            $scope.$ctrl={fileDimension:'Origin'}
            $scope.dimen= $scope.uploadUrl.split('/');
            $scope.$ctrl.fileDimension=''
            $scope.$ctrl.fileDimension=$scope.dimen[$scope.dimen.length-1].slice(10);
        },
        templateUrl: 'components/loadImage/loadimage.html',
        link: function(scope, element,attrs) {
            var string='abcdefghijklmnopqrstuvwxyzQAZWSXEDCRFVTGBYHNUJMIKOLP1234567890';
            var oldImg;
            scope.noLoad=true;
            scope.noChange=false;
            scope.now=Date.now()+string.shuffle(5);
            if (!scope.nameImg){scope.nameImg='img';}
            scope.photoIndexArray=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,100];
            scope.$watch('fileSrc',function(n,o){
                if(n && n.indexOf('base64') < 0){
                    //console.log(n)
                    oldImg=n;
                    //console.log(oldImg)
                }
            });

            scope.$watch('myFile',function(n,o){
                if (!n){
                    scope.noLoad=true;
                } else {
                    scope.noLoad=false;
                }
            });
            scope.$watch('itemId',function(n,o){
                if (n){
                    scope.noChange=false;
                } else {
                    scope.noChange=true;
                }
            });
            scope.clickFile=function(){
                var id= '#imagefile'+scope.now;
                angular.element(id).trigger('click');
            }
            scope.uploadImg = function(){
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
            scope.deleteImg=function(){
                if (!scope.itemId) {scope.fileSrc=null;scope.noLoad=true; return};
                if(!oldImg){return}
                var o={_id:scope.itemId}

                var field=scope.nameImg;
                field+=' '+'small'+scope.nameImg;
                o[scope.nameImg]=null;
                o['small'+scope.nameImg]=null;


                scope.Item.save({update:field},o)
                var small = oldImg.split('/');
                small[small.length-1]= small[small.length-1].replace('img','small');
                small=small.join('/')
                Photo.deleteFiles('Stuff',[oldImg,small]);
                oldImg=null;
                scope.fileSrc='';
                scope.noChange=false;
                scope.noLoad=true;
                /*scope.noChange=true;
                scope.Item.delete({_id:scope.itemId,file:scope.nameImg},function(res){
                    scope.fileSrc='';
                    scope.noChange=false;
                    scope.noLoad=true;
                });*/
            }
        }

    };
}])
.directive('uploadVideo',['$fileUpload','$timeout','Photo','exception', function($fileUpload,$timeout,Photo,exception) {
    return {
        restrict : 'AE',
        scope: {
            uploadUrl:'@',
            itemId:'@',
            fileSrc:'=',
            Item:'=itemResourse',
            gallery:'=',
            nameImg:'@'
            //fileReadSrc
        },
        templateUrl: 'components/loadImage/uploadVideo.html',
        link: function(scope, element,attrs) {
            var oldImg;
            var string='abcdefghijklmnopqrstuvwxyzQAZWSXEDCRFVTGBYHNUJMIKOLP1234567890';
            scope.noLoad=true;
            scope.noChange=false;
            scope.now=Date.now()+string.shuffle(5);
            if (!scope.nameImg){scope.nameImg='img';}
            scope.photoIndexArray=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,100];
            scope.$watch('fileSrc',function(n,o){
                if(n && n.indexOf('base64') < 0){
                    //console.log(n)
                    oldImg=n;
                }
            });
            scope.$watch('myFile',function(n,o){
                if (!n){
                    scope.noLoad=true;
                } else {
                    scope.noLoad=false;
                }
            });
            scope.$watch('itemId',function(n,o){
                if (n){
                    scope.noChange=false;
                } else {
                    scope.noChange=true;
                }
            });
            scope.clickFile=function(){
                var id= '#imagefile'+scope.now;
                angular.element(id).trigger('click');
            }
            scope.uploadImg = function(){
                if (!scope.itemId) return;
                var file = scope.myFile;
                scope.noChange=true;
                var o={_id:scope.itemId}
                $fileUpload.uploadFileToUrl(file, scope.uploadUrl,scope.itemId,{index:scope.index,nameImg:scope.nameImg})
                    .then(function(res){
                    scope.myFile=null;
                    //console.log(res);
                    scope.noChange=false;
                    scope.noLoad=true;
                    scope.fileSrc=null;

                    //alert('загружено!');
                    $timeout(function(){
                        o[scope.nameImg]=res.data.img;

                        if(oldImg){
                            var small = oldImg.split('/');
                            small[small.length-1]= small[small.length-1].replace('img','small');
                            small=small.join('/')
                            console.log('deleting');
                            Photo.deleteFiles('Stuff',[oldImg,small]);

                        }
                        oldImg=res.data.img;
                        scope.fileSrc=res.data.img;
                        scope.Item.save({update:scope.nameImg},o)
                    },100)
                })
                    .catch(function (err) {
                        if(err){
                            exception.catcher('upload video')(err)
                        }

                    })
            }
            scope.deleteImg=function(){
                if (!scope.itemId) {scope.fileSrc=null;scope.noLoad=true; return};
                if(!oldImg){return}
                var o={_id:scope.itemId}
                o[scope.nameImg]=null;
                scope.Item.save({update:scope.nameImg},o)
                Photo.deleteFiles('Stuff',[oldImg]);
                oldImg=null;
                scope.fileSrc='';
                scope.noChange=false;
                scope.noLoad=true;
            }
        }
    };
}])
.directive('loadImageWithLink',['$fileUpload','$timeout','$http', function($fileUpload,$timeout,$http) {
        return {
            restrict : 'AE',
            scope: {
                noLoad:'=noLoad',
                noChange:'=noChange',
                uploadUrl:'@',
                itemId:'@',
                fileSrc:'=',
                additionUrl:'@',
                Item:'=itemResourse',
                gallery:'='
                //fileReadSrc
            },
            templateUrl: 'manager/views/templates/loadimagewithlinks.html',
            link: function(scope, element,attrs) {
                var additionUrl=(scope.additionUrl)?scope.additionUrl:'Subscribe';
                scope.photoIndexArray=[1,2,3,4,5,6,7,8,9,10,11,12,100];
                scope.$watch('myFile',function(n,o){
                    if (!n){
                        scope.noLoad=true;
                    } else {
                        scope.noLoad=false;
                    }
                });
                scope.$watch('itemId',function(n,o){
                    if (n){
                        scope.noChange=false;
                    } else {
                        scope.noChange=true;
                    }
                });
                scope.$watch('fileSrc',function(n,o){
                    if (!n){
                        scope.fileSrc='/img/upload/no.png'
                    }
                });
                scope.link=''
                scope.index=1;
                scope.uploadImg = function(){
                    if (!scope.itemId) return;
                    var file = scope.myFile;
                    //console.log(scope.itemId);

                    scope.noChange=true;
                    $fileUpload.uploadFileToUrl(file, scope.uploadUrl,scope.itemId,{index:scope.index,link:scope.link}).then(function(res){
                        scope.myFile=null;
                        scope.link=''
                        scope.index=1;
                        console.log(res);
                        scope.noChange=false;
                        scope.noLoad=true;
                        scope.fileSrc=res.data.img;
                        //alert('загружено!');
                        $timeout(function(){
                            scope.gallery=res.data.gallery
                        },10)
                    });
                }
                scope.deleteImg=function(){
                    if (!scope.itemId) return;
                    scope.noChange=true;

                    scope.fileSrc='';

                    scope.Item.delete({id:scope.itemId,file:'file'},function(res){
                        scope.noChange=false;
                        scope.noLoad=true;
                        alert(res.msg);
                    });
                }

                scope.deletePhoto = function(index){
                    if (confirm("Удалить?")){
                        $http.get("/api/collections/"+additionUrl+"/fileGalleryDelete/"+scope.itemId+'/'+index).then(function (response) {
                            scope.gallery=response.data.gallery;
                            //$scope.gallery=[];
                            /*$timeout(function(){
                             $scope.item.gallery=response.data.gallery;
                             },10);*/

                        });
                    }
                }

                scope.updateStuffGallery = function(){
                    $http.post("/api/collections/"+additionUrl+"/fileGalleryUpdate/"+scope.itemId,{gallery:scope.gallery}).then(function (response) {
                        //alert(response.data.msg);
                        scope.gallery=response.data.gallery;
                    });
                }
            }

        };
    }])

    .directive('loadImageBig',['$fileUpload','$timeout', function($fileUpload,$timeout) {
        return {
            restrict : 'AE',
            scope: {
                noLoad:'=noLoad',
                noChange:'=noChange',
                uploadUrl:'@',
                itemId:'@',
                fileSrc:'=',
                Item:'=itemResourse',
                nameImage:'@'
                //fileReadSrc
            },
            templateUrl: 'manager/views/templates/loadimagebig.html',
            link: function(scope, element,attrs) {
                /*scope.$watch('fileSrc',function(n){
                    console.log(n);
                })*/
                scope.$watch('myFile',function(n,o){
                    // console.log(n);
                    //console.log(o)
                    if (!n){
                        // console.log('sss');
                        scope.noLoad=true;
                    } else {
                        scope.noLoad=false;
                    }
                    //console.log(scope.fileSrc);
                });
                scope.$watch('itemId',function(n,o){
                    //console.log(n);
                    //console.log(o)
                    if (n){

                        scope.noChange=false;
                    } else {
                        scope.noChange=true;
                    }
                    //console.log(scope.fileSrc);
                });
                scope.clickOnUpload = function (id) {
                    $timeout(function() {
                       // console.log(id);
                        angular.element('#'+id).trigger('click');
                    }, 100);
                };

                scope.uploadImg = function(){
                    if (!scope.itemId) return;
                    var file = scope.myFile;
                    //console.log(scope.itemId);

                    scope.noChange=true;
                    $fileUpload.uploadFileToUrl(file, scope.uploadUrl,scope.itemId,{nameImg:scope.nameImage}).then(function(res){
                        scope.myFile=null;
                        //console.log(res);
                        scope.noChange=false;
                        scope.noLoad=true;
                        scope.fileSrc=res.data.img;
                        //alert('загружено!');
                        $timeout(function(){
                            scope.fileSrc=res.data.img;
                        },10)
                    });
                }
                scope.deleteImg=function(){
                    if (!scope.itemId) return;
                    scope.noChange=true;

                    scope.fileSrc='';

                    scope.Item.delete({id:scope.itemId,file:scope.nameImage},function(res){
                        scope.noChange=false;
                        scope.noLoad=true;
                        alert(res.msg);
                    });
                }
            }

        };
    }])

//http://www.tutorialspoint.com/angularjs/angularjs_upload_file.htm
.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])
.directive('uploadFiles',function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            console.log(element[0].form)

            var $form = $(element[0].form);
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
                        droppedFiles = e.originalEvent.dataTransfer.files;
                        console.log(e.target.files)
                        console.log(droppedFiles)
                    });
            }

            var changedHandler = function (event) {
                if (window.File && window.FileList && window.FileReader) {
                    scope.$apply(function () {
                        //scope.files.length = 0;
                        var files = event.target.files; //FileList object
                        var output = document.getElementById("result");
                        if(files.length){scope.hasFiles = true;}else{scope.hasFiles = false}
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            var picReader = new FileReader();
                            picReader.addEventListener("load", function (event) {
                                var picFile = event.target;
                                file.imgSrc=picFile.result;
                                scope.files.push(file);
                                /*var div = document.createElement("div");
                                 div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" + "title='" + picFile.name + "'/>";
                                 output.insertBefore(div, null);*/
                            });
                            //Read the image
                            picReader.readAsDataURL(file);
                        }
                    })
                    $timeout(function () {
                        //console.log(scope.files)
                    },1000)

                } else {
                    console.log("Your browser does not support File API");
                }

                return;





                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        if (element[0].files) {
                            scope.files.length = 0;
                            angular.forEach(element[0].files, function (f) {
                                scope.files.push(f);
                                var fr = new FileReader;
                                //fr.onloadend = changeimg;
                                fr.readAsDataURL(f)
                            });
                            scope.hasFiles = true;
                        }
                        $timeout(function(){
                            scope.fileSrc = loadEvent.target.result;
                        });
                    });
                }
                scope.myFile= changeEvent.target.files[0];
                reader.readAsDataURL(changeEvent.target.files[0]);



                scope.$apply(function () {
                    console.log(element[0].files)
                    if (element[0].files) {
                        scope.files.length = 0;
                        angular.forEach(element[0].files, function (f) {
                            scope.files.push(f);
                            var fr = new FileReader;
                            fr.onloadend = changeimg;
                            fr.readAsDataURL(f)
                        });
                        scope.hasFiles = true;
                    }
                });
            };

            var resetHandler = function () {
                scope.$apply(function () {
                    scope.files.length = 0;
                    scope.hasFiles = false;
                });
            };

            element.bind('change', changedHandler);

            if (element[0].form) {
                angular.element(element[0].form).bind('reset', resetHandler);
            }

            // Watch the files so we can reset the input if needed
            scope.$watchCollection('files', function () {
                if (scope.files.length === 0) {
                    element.val(null);
                }
            })

            scope.$on('$destroy', function () {
                element.unbind('change', changedHandler);
                if (element[0].form) {
                    angular.element(element[0].form).unbind('reset', resetHandler);
                }
            });


        },
        restrict: 'A',
        scope: {
            files: '=uploadFiles',
            hasFiles: '='
        }
    }
})
