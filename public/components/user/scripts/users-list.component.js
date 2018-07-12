(function(){
'use strict';
angular.module('gmall.directives')
.directive("usersList",itemDirective);
    function itemDirective(){
        return {
            scope: {
                modalClose:'&'
            },
            rescrict:"E",
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/user/usersList.html',
        }
    }
    itemCtrl.$inject=['$q','global','$state','$user','exception','SubscibtionList','$fileUpload','Confirm','$uibModal','$http','socket','$timeout']
    function itemCtrl($q,global,$state,$user,exception,SubscibtionList,$fileUpload,Confirm,$uibModal,$http,socket,$timeout){

        var self = this;
        self.Items=$user;
        self.mobile=global.get('mobile' ).val;
        self.confirmEmail=global.get('store').val.confirmEmail;
        self.$state=$state;
        self.moment=moment;
        self.query={};
        self.paginate={page:0,rows:100,totalItems:0}
        self.store=global.get('store').val._id;
        self.getList=getList;
        self.searchItems=searchItems;
        self.clearSearch=clearSearch;
        self.deleteItem=deleteItem;
        self.saveField = saveField;
        self.uploadFile=uploadFile;
        self.createItem=createItem;
        self.changePswd=changePswd;
        self.downloadUsers=downloadUsers;
        self.viewLogFile=viewLogFile;
        self.changeEmail=changeEmail;
        self.changePhone=changePhone;
        self.changeListCriteria=changeListCriteria;
        //*******************************************************
        activate();

        function activate() {
            return getList().then(function() {
                console.log('Activated users list View');
            }).then(function(){
                return SubscibtionList.getList({page:0,rows:1,totalItems:0},{})

            }).then(function(data) {
                if(data && data[0]){
                    if(!data[0].list){data[0].list=[]}
                    for(var key in data[0].list){
                        if(!data[0].list[key]){
                            delete data[0].list[key]
                        }
                    }
                    self.subscibtionList = data[0];
                }
                console.log(self.subscibtionList)
            });
        }
        function getList() {
            return $user.getList(self.paginate,self.query)
                .then(function(data) {
                    self.items = data;
                    return self.items;
                });
        }
        function changeListCriteria(criteria) {
            if(criteria=='all'){
                delete self.query;
                self.paginate.page=0;
                getList()
            }else{
                self.query={}
                self.query.list=criteria.toString()
                //self.query.list={$in: [criteria]};
                self.paginate.page=0;
                getList()
            }
        }
        function searchItems(searchStr){
            //console.log(searchItem)
            if (searchStr.length<3){return}
            var name=searchStr.substring(0,10)
            self.query={$or:[{name:name},{email:name}, {'profile.fio':name},{'profile.phone':name}]}
            self.paginate.page=0;
            return getList().then(function() {
                self.query={};
            });
        }
        function clearSearch() {
            self.searchStr='';
            self.query={}
            self.paginate.page=0;
            return getList().then(function() {
                self.query={};
            });

        }
        function saveField(item,field){
            var o={_id:item._id};
            o[field]=item[field]
            return self.Items.save({update:field},o ).$promise.then(function(){

                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)
            },function(err){console.log(err)});
        }
        function deleteItem(item) {
            Confirm('Удалить??')
                .then(function () {
                    if(global.get('store').val.owner && global.get('store').val.owner.some(function (user) {return user==item._id})){
                        throw 'нельзя удалить админа'
                    }
                })
                .then(function(){
                    return $user.delete({_id:item._id}).$promise
                })
                .then(function(){
                    getList()
                })
                .catch(function(err){
                    err=err.data||err;
                    exception.catcher('Удаление')(err)
                })
            console.log(item);return;
            item.store.splice(item.store.indexOf(global.get('store').val._id),1);

            $q.when()
                .then(function(){
                    return saveField(item,'store')
                })
                .then(function(){
                    getList();
                })

        }
        function viewLogFile() {
            $uibModal.open({
                animation: true,
                templateUrl: 'components/user/modal/viewLog.html',
                controller: function($uibModalInstance,$q,$http,global,$sce){
                    var self=this;
                    self.$sce
                    //self.url1 = $sce.getTrustedResourceUrl(stuffHost+"/log/"+global.get('store').val.subDomain+'_users.log');
                    self.url = stuffHost+"/log/"+global.get('store').val.subDomain+'_users.log';
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
        function uploadFile(){
            var file = self.myFile;
            self.disabledUpload=true;
            self.percValue=0;
            $uibModal.open({
                animation: true,
                templateUrl: 'components/user/modal/uploadUsers.html',
                controller: function($uibModalInstance,$q,$fileUpload,file){
                    var self=this;
                    var uploadUrl = "/api/usersFileUpload";
                    self.ok=function(){$uibModalInstance.close()}
                    self.cancel = function () {$uibModalInstance.dismiss()}

                    $q.when()
                        .then(function(){
                            return $fileUpload.uploadFileToUrl(file, uploadUrl,null,null,'user');
                        })
                        .then(function(res){
                            //console.log(res)
                            self.countFfomFile=res.data.countFfomFile;
                            self.countInDb=res.data.countInDb;
                            self.countPermission=res.data.countPermission;
                            self.countToDb=res.data.countToDb;
                            self.disableSpinner=true;
                        })


                },
                controllerAs:'$ctrl',
                size:'lg',
                resolve:{
                    file:function(){
                        return file
                    }
                }

            }).result.then(function (data) {
                self.disabledUpload=false;
            })
            socket.on('endUploadUsers',function(data){
                getList();
            })
        };
        function createItem(){
            $q.when()
                .then(function(){
                    return $user.createUser()
                })
                .then(function(user){
                    setTimeout(function(){
                        getList();
                    },500)

                })
                .catch(function(err){
                    if(err){
                        err=err.data||err;
                        exception.catcher('создание клиента')(err)
                    }

                })
        }
        function changePswd(_id){
            $q.when()
                .then(function(){
                    return $user.changePswd(_id)
                })
                .then(function () {
                    exception.showToaster('succes','статус','обновлено!')
                })
                .catch(function(err){
                    if(err){
                        err=err.data||err;
                        exception.catcher('смена пароля')(err)
                    }

                })
        }
        function changeEmail(user){
            //console.log(user)
            $q.when()
                .then(function () {
                    return $user.changeEmail(user._id)
                })
                .then(function (res) {
                    user.email=res
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('change email')(err)
                    }

                })
        }
        function changePhone(user){
            //console.log(user)
            $q.when()
                .then(function () {
                    return $user.changePhone(user._id)
                })
                .then(function (res) {
                    user.profile.phone=res
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('change phone')(err)
                    }

                })
        }
        function downloadUsers(){
            self.percValue=0;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/user/modal/downloadUsers.html',
                controller: function($uibModalInstance){
                    var self=this;
                    self.dateStart=Date.now()
                    self.dateEnd=Date.now()
                    self.ok=function(){
                        var o ={}
                        if(self.showPhone){
                            o={dateStart:self.dateStart,dateEnd:self.dateEnd}
                        }
                        $uibModalInstance.close(o);
                    }
                    self.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                controllerAs:'$ctrl',
                size:'lg',
                
            });
            modalInstance.result.then(function (data) {
                //console.log(data)
                $q.when()
                    .then(function(){
                        self.pending=true;
                        //return $http.post(userHost+'/api/download/subscribersList', data)
                        $uibModal.open({
                            animation: true,
                            templateUrl: 'components/user/modal/progressBar.html',
                            controller: function($uibModalInstance,socket){
                                var self=this;
                                self.max=100;


                                socket.on('userslistCreating',function(data){
                                    self.value=data.perc;
                                    console.log(self.value)
                                    if(data.perc>=97){
                                        $uibModalInstance.close();
                                    }
                                })
                                self.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            },
                            controllerAs:'$ctrl',
                            size:'lg',

                        });

                        return $http({
                            method: "POST",
                            url: userHost+'/api/download/subscribersList',
                            data:data,
                            /*onProgress: function(event) {
                                console.log(event)
                                console.log("loaded " + ((event.loaded/event.total) * 100) + "%");
                            }*/
                        })
                    })

                    .then(function (response) {
                        self.pending=false;
                        var newWindow = window.open("","_blank");
                        var href=userHost+"/"+response.data.fileName;
                        //console.log(response,href)
                        newWindow.location.href=href
                        $timeout(function () {
                            newWindow.close()
                        },100)

                        //console.log(response.data.fileName);

                    })
                    .catch(function(err){
                        self.pending=false;
                        if(err){
                            err=err.data||err;
                            exception.catcher('выгрузка списка')(err)
                        }

                    })
            }, function () {
            });
        }
        /*self.delay;
        socket.on('userslistCreating',function(data){
            //console.log(data)
            if(self.delay){return}
            setTimeout(function () {
                self.delay=false;
            },5)
            self.delay=true;
            self.percValue=data.perc;
        })*/
    }
})()

