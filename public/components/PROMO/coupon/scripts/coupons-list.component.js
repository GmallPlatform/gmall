(function(){
    'use strict';
    angular.module('gmall.services')
        .directive('couponsList',listDirective)

    function listDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: listCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/PROMO/coupon/couponsList.html',
        }
    };
    listCtrl.$inject=['Coupon','$state','global','exception','$q','$timeout','News','$http','Confirm','$scope','SubscibtionList','User'];
    function listCtrl(Coupon,$state,global,exception,$q,$timeout,News,$http,Confirm,$scope,SubscibtionList,User){
        var self = this;
        self.Items = Coupon;
        self.mobile=global.get('mobile').val;
        self.global=global;
        self.query={};
        self.paginate={page:0,rows:5,totalItems:0}
        self.newItem={name:'Новый купон',actived:false,currency:global.get('store').val.mainCurrency}
        self.userLists=[];
        
        self.getList=getList;
        self.saveField = saveField;
        self.createNews=createNews;
        self.createItem=createItem;
        self.deleteItem=deleteItem;
        self.useCoupon=useCoupon;
        self.cancelCoupon=cancelCoupon;
        //*******************************************************
        activate();
        $scope.$on('changeLang',function(){
            activate()
        })

        function activate() {
            return getList().then(function(){
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
            });
        }
        function getList() {
            return self.Items.getList(self.paginate,self.query)
                .then(function(data) {
                    self.items = data;

                    if(!data.length){
                        createCoupons();
                    }
                    return self.items;
                });
        }
        function saveField(item,field,defer){
            defer =defer||0
            setTimeout(function(){
                var o={_id:item._id};
                o[field]=item[field]
                return self.Items.save({update:field},o ).$promise.then(function(){
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)

                },function(err){console.log(err)});
            },defer)
        };
        function createCoupons(){
            self.newItem.name='купон на первую покупку';
            self.newItem.code=true;
            self.newItem.index=9999;
            $q.when()
                .then(function(){
                    return self.Items.save(self.newItem).$promise
                } )
                .then(function(res){
                    self.newItem.name='купон для подписчиков';
                    self.newItem.code=false;
                    self.newItem.index=1;
                    return self.Items.save(self.newItem).$promise
                })
                .then(function(){
                    return getList();
                } )
                .catch(function(err){
                    exception.catcher('создание купона')(err)
                })
        }
        function createNews(item){
            var news={
                name:item.name,
                desc:item.desc,
                actived:false
            }
            $q.when()
                .then(function(){
                    return News.save(news).$promise;
                })
                .then(function(res){
                    news._id=res.id;
                    if(item.img){
                        news.fileSrc=item.img;
                        news.fieldName='img';
                        return $http.post(photoUpload+'/api/collections/News/copyfile',news )
                    }
                })
                .then(function(res){
                    return News.save({update:'img'},res.data);
                    //$state.go('frame.news.item',{_id:news._id});
                })
                .then(function(){
                    $state.go('frame.news.item',{id:news._id});
                })
                .catch(function(err){
                    exception.catcher('создание новости')(err)
                })

        }
        function deleteItem(item){
            Confirm("удалить???" )
                .then(function(){
                    return self.Items.delete({_id:item._id} ).$promise;
                } )
                .then(function(){
                    return getList();
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('удаление')(err)
                    }
                })
        }
        function createItem(){
            self.newItem.name='новый купон';
            self.newItem.code=false;
            $q.when()
                .then(function(){
                    return Coupon.create()
                } )
                .then(function(res){
                    self.newItem.name=res.substring(0,100);
                    if(res){
                        self.newItem.name=res.substring(0,100);
                        return self.Items.save(self.newItem).$promise
                    }

                } )
                .then(function(res){
                    if(res){
                        return getList();
                    }
                } )
                .catch(function(err){
                    exception.catcher('создание купона')(err)
                })
        }
        function useCoupon(id) {
            if(!self.userLists){return}
            Confirm('подтверждаете?')
                .then(function () {
                    return User.useCoupon({email:id,lists:JSON.stringify(self.userLists)}).$promise
                })
                .then(function () {
                    self.userLists.length=0;
                })
                .then(function () {
                    exception.showToaster('info','применение купона','OK')
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('применение купона')(err)
                    }
                })
        }
        function cancelCoupon(id) {
            if(!self.userLists){return}
            Confirm('подтверждаете?')
                .then(function () {
                    return User.cancelCoupon({email:id,lists:JSON.stringify(self.userLists)}).$promise
                })
                .then(function () {
                    self.userLists.length=0;
                })
                .then(function () {
                    exception.showToaster('info','отмена купона','OK')
                })
                .catch(function (err) {
                    if(err){
                        exception.catcher('отмена купона')(err)
                    }
                })
        }

        
    }
})()
