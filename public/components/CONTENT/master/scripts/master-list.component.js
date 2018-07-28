'use strict';
(function(){

    angular.module('gmall.services')
        .directive('masterList',masterListDirective)
        .directive('masterListTemplate',masterListTemplateDirective)
        .directive('mastersStaticPage',mastersStaticPage);
    function mastersStaticPage(){
        return {
            scope: {},
            bindToController: true,
            controllerAs: '$ctrl',
            templateUrl: 'views/template/partials/stat/masters/masters.html',
            controller:function(global){
                console.log(global.get('masters').val)
                var self=this;
                self.global=global;
                self.mobile=global.get('mobile').val;
            }
        }
    };

    function masterListDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: masterListCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/CONTENT/master/masterList.html',
        }
    };
    function masterListTemplateDirective(global){
        var s=(global.get('store').val.template.masterList)?global.get('store').val.template.masterList:'';
        return {
            scope: {},
            rescrict:"E",
            bindToController: true,
            controller: masterListCtrl,
            controllerAs: '$ctrl',
            templateUrl:'views/template/partials/master/masterList'+s+'.html',
        }
    };
    //masterListTemplateDirective.$inject=['global']
    masterListCtrl.$inject=['Master','$state','global','Confirm','$q','exception','Photo','$timeout','Label'];
    function masterListCtrl(Master,$state,global,Confirm,$q,exception,Photo,$timeout,Label){
        var self = this;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        //self.moment=moment;
        self.$state=$state;
        self.Items=Master;
        self.query={};
        self.labels=[]
        self.paginate={page:0,rows:50,totalItems:0}
        self.newItem={name:'имя мастера'}
        self.getList=getList;
        self.saveField = saveField;
        self.searchItem=searchItem;
        self.deleteItem=deleteItem;
        self.createItem=createItem;
        self.dropCallback=dropCallback;
        self.cloneItem=cloneItem;
        //*******************************************************
        activate();

        function activate() {
            return getList().then(function() {
                return Label.getList({page:0,rows:100},{list:'master'})
                //console.log('Activated news list View');
            }).then(function (data) {
                self.labels=data
            });
        }
        function getList() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    self.items = data;
                    return self.items;
                });
        }
        function searchItem(searchStr){
            if(searchStr){
                self.query = {name:searchStr.substring(0,10)};
            }else{
                self.query = {};
            }

            self.paginate.page=0;
            return getList().then(function() {
                console.log('Activated list View');
            });
        }
        function saveField(item,field){
            var o={_id:item._id};
            o[field]=item[field]
            self.Items.save({update:field},o ,function () {
                global.set('saving',true)
                $timeout(function () {
                    global.set('saving',false);
                },1500)
            })
        };
        function createItem(){
            self.Items.create()
                .then(function(res){
                    self.newItem={}
                    self.newItem.name=res;
                    return self.Items.save(self.newItem).$promise
                } )
                .then(function(res){
                    self.newItem._id=res.id;
                    self.newItem.url=res.url;
                    self.paginate.page=0;
                    getList(self.paginate);
                })
                .then(function(){
                    var id=self.newItem._id;
                    delete self.newItem._id
                    setTimeout(function(){
                        $state.go('frame.master.item',{id:id})
                    },100)

                })
                .catch(function(err){
                    if(err){
                        exception.catcher('создание мастера')(err)
                    }
                })
        }
        function cloneItem(item){
            var name;
            self.Items.create()
                .then(function (res) {
                    name=res;
                    return self.Items.getItem(item._id)
                })
                .then(function(master){
                    self.newItem=angular.copy(master)
                    self.newItem.name=name;
                    self.newItem.nameL={};

                    delete self.newItem._id
                    delete self.newItem.__v
                    delete self.newItem.url;
                    console.log( self.newItem)
                    self.newItem.blocks.forEach(function (block) {
                        delete block.img;
                        delete block._id;
                        if(block.type=='stuffs'){
                            if(block.stuffs && block.stuffs.length){
                                block.stuffs=block.stuffs.map(function (s) {
                                    return s._id
                                })
                            }
                        }
                        block.imgs=[]
                    })
                    //throw 'test'
                    return self.Items.save(self.newItem).$promise
                } )
                .then(function(res){
                    self.newItem._id=res.id;
                    self.newItem.url=res.url;
                    self.paginate.page=0;
                    getList(self.paginate);
                })
                .then(function(){
                    var id=self.newItem._id;
                    delete self.newItem._id
                    setTimeout(function(){
                        $state.go('frame.master.item',{id:id})
                    },100)

                })
                .catch(function(err){
                    if(err){
                        exception.catcher('создание мастера')(err)
                    }
                })
        }
        function deleteItem(item){
            var folder='images/'+global.get('store').val.subDomain+'/Master/'+item.url
            // console.log(folder)


            Confirm("удалить???" )
                .then(function(){
                    return self.Items.delete({_id:item._id} ).$promise;
                } )
                .then(function(){
                    return self.getList();
                })
                .then(function(){
                    Photo.deleteFolder('Master',folder)
                })
                .catch(function(err){
                    if(!err){return}
                    err = (err &&err.data)||err
                    if(err){
                        exception.catcher('удаление объекта')(err)
                    }

                })

            /*Stuff.Items.delete({_id:stuff._id} ).$promise.then(function(res){
             $scope.getList($scope.paginate.page,$scope.paginate.rows,'reload');
             } ).catch(function(err){
             err = err.data||err
             exception.catcher('удаление товара')(err)
             })*/
        }
        function dropCallback(item){
            var i=0;
            //http://stackoverflow.com/questions/28983424/make-angular-foreach-wait-for-promise-after-going-to-next-object
            setTimeout(function(){
                self.items.reduce(function(p, item) {
                    return p.then(function() {
                        i++;
                        item.index=i;
                        return saveField(item,'index')
                    });
                }, $q.when(true)).then(function(){
                    console.log(self.items.map(function(el){return el.index}))
                });
            },50)


            /*setTimeout(function(){
                self.items.forEach(function(m,i){
                    console.log(i)
                    m.index=i;
                    saveField(item,'index')
                })
            })*/
            return item;
        }
    }
})()
