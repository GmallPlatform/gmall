'use strict';
(function(){
    angular.module('gmall.services')
        .directive('infoItem',itemDirective)
        .directive('infoItemTemplate',itemTemplateDirective)
        /*.component('infoItemTemplate',{
            bindings :{
                img:'@',
                info:'@'
            },
            controller: itemTemplateCtrl,
            templateUrl: 'views/template/partials/info/infoItem.html',
        })*/
        .directive('createInfoLink',itemInfoLinkDirective);
    function itemInfoLinkDirective(){
        return {
            scope: {
                info:'=',
                do:'&',
                title:'@'
            },
            rescrict:"E",
            bindToController: true,
            controller: itemInfoLinkCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/info/createLink.html',
        }
    }
    itemInfoLinkCtrl.$inject=['$q','Info','global']
    function itemInfoLinkCtrl($q,Info,global){
        var self = this;
        //console.log(self.change)
        if(!self.info){self.info={}}
        self.setInfoLink=setInfoLink;
        self.deleteLink=deleteLink;
        function setInfoLink(){
            $q.when()
                .then(function(){
                    return Info.selectInfo();
                })
                .then(function(tag){
                    self.info.link=tag._id;
                    self.info.name=tag.name;
                    //console.log(self.change())
                    self.do()
                    //console.log(self.info)
                })
                .catch(function(){
                    console.log('dismiss')
                })
        }
        function deleteLink(){
            self.info.link=null;
            self.info.name='';
            console.log(self.info)
            self.do()

        }
    }
    function itemDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/info/infoItem.html',
        }
    }
    itemCtrl.$inject=['Info','$stateParams','$q','$uibModal','exception','global','$scope','$timeout','Confirm'];
    function itemCtrl(Items,$stateParams,$q,$uibModal,exception,global,$scope,$timeout,Confirm){
        var self = this;
        //console.log('!!')
        self.Items=Items;
        self.global=global;
        self.mobile=global.get('mobile' ).val;
        self.saveField=saveField;
        self.saveEmbeddedField=saveEmbeddedField;
        self.dropCallback=dropCallback;
        self.createNewRazdel=createNewRazdel;


        function createNewRazdel() {
            self.Items.create('создание раздела','создать раздел')
                .then(function(res){
                    if(res){
                        saveEmbeddedField({name:res},'name')
                    }
                })
        }

        //********************activate***************************
        activate();
        $scope.$on('changeLang',function(){
            activate();
        })
        //*******************************************************
        function activate() {
            return getItem($stateParams.id).then(function() {
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
        function saveField(field,defer){
            defer =defer||0
            setTimeout(function(){
                var o={_id:self.item._id};
                o[field]=self.item[field]
                var query={update:field}
                self.Items.save(query,o,function () {
                    global.set('saving',true)
                    $timeout(function () {
                        global.set('saving',false);
                    },1500)
                });
            },defer)
        };
        function saveEmbeddedField(item,field){
            //console.log(item)
            var o={_id:self.item._id};
            if(field){
                o[field]=item[field];
            }

            var update={update:field,embeddedName:'blocks'};
            if(item._id){
                if(!field){
                    update.embeddedPull=true;
                    update.update='name';
                    o.name=item.name;
                }else{
                    update.embeddedVal=item._id
                }

            }else{
                update.embeddedPush=true;
            }
            if(!field){
                Confirm('удалить?')
                    .then(function(){
                        return self.Items.save(update,o).$promise;
                    })
                    .then(function(){
                        global.set('saving',true)
                        $timeout(function () {
                            global.set('saving',false);
                        },1500)
                        if(update.embeddedPush || update.embeddedPull){
                            activate($stateParams.id);
                        }
                    })
            }else{
                $q.when()
                    .then(function(){
                        return self.Items.save(update,o).$promise;
                    })
                    .then(function(){
                        global.set('saving',true)
                        $timeout(function () {
                            global.set('saving',false);
                        },1500)
                        if(update.embeddedPush || update.embeddedPull){
                            activate($stateParams.id);
                        }
                    })
                    .catch(function(err){
                        if(err){
                            exception.catcher('saving')(err)
                            console.log(err)
                            if(err.data && err.data.message && err.data.message.indexOf('cannot use the part')>-1){
                                console.log(field)
                                update.update=field+'L';
                                delete o[field];
                                o[update.update]={}
                                $q.when()
                                    .then(function(){
                                        return self.Items.save(update,o).$promise;
                                    })
                                    .then(function(){
                                        global.set('saving',true)
                                        $timeout(function () {
                                            global.set('saving',false);
                                        },1500)
                                        if(update.embeddedPush || update.embeddedPull){
                                            activate($stateParams.id);
                                        }
                                    })
                                    .catch(function(err){
                                        if(err){
                                            exception.catcher('saving')(err)
                                        }

                                    })
                            }
                        }

                    })
            }


        }
        function dropCallback(item){
            //console.log(item)
            var actions=[];
            setTimeout(function(){
                saveField('blocks')
                /*self.item.blocks.forEach(function(item,idx){
                 item.index=idx+1;
                 actions.push(saveField(item,'index'))

                 })
                 $q.all(actions)
                 saveField('main')*/
            },100)
            return item
        }


    }

    /*********************************itemTemplateDirective*****************************/
    function itemTemplateDirective(global){
       /* var templ=global.get('store').val.template.main.left.getOFA('name','info')
        if(!templ){
            templ=global.get('store').val.template.main.right.getOFA('name','info')
        }*/
        //var s=(templ && templ.templ)?templ.templ:'';
        //console.log(s)
        return {
            scope: {
                img:'@',
                info:'@'
            },
            bindings :{
                img:'@',
                info:'@'
            },
            bindToController: true,
            controller: itemTemplateCtrl,
            controllerAs: '$ctrl',
            templateUrl: function(element, attrs) {

                if(attrs && attrs['templ'] && attrs['templ']!='0'){
                    console.log(attrs['templ'])
                }
                var s = (attrs && attrs['templ'] && attrs['templ']!='0')?attrs['templ']:'';

                return 'views/template/partials/home/info/infoItem'+s+'.html'
            }
        }
    }
    itemTemplateCtrl.$inject=['$scope','Info','$stateParams','$q','$uibModal','exception','global','$attrs'];
    function itemTemplateCtrl($scope,Items,$stateParams,$q,$uibModal,exception,global,$attrs){
        var self = this;
        self.$onInit = function() {
            if(self.info){
                activate(self.info);
            }

        }
        if(self.info){
            activate(self.info);
        }
        self.Items=Items;
        self.global=global;
        self.mobile=global.get('mobile').val;
        function activate(id) {
            return getItem(id);
        }
        function getItem(id) {
            return self.Items.getItem(id)
                .then(function(data) {
                    if(data && data.blocks && data.blocks.length){
                        data.blocks=data.blocks.filter(function (b) {
                            return b.actived
                        })
                    }
                    self.item = data;
                    return self.item;
                } ).catch(function(err){
                    exception.catcher('получение данных')(err)
                });
        }
    }

})()