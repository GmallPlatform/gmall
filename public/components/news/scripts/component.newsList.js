'use strict';
(function(){

    angular.module('gmall.services')
        .directive('newsList',newsListDirective)
        .directive('newsListTemplate',newsListTemplateDirective)
        .directive('newsCart',newsCartDirective)
        .directive('newsCart1',newsCartDirective1)
        .directive('newsCart2',newsCartDirective2)
        .directive('newsCart3',newsCartDirective3)
        .directive('newsCart4',newsCartDirective4)
        .directive('newsCart5',newsCartDirective5)
    function newsCartDirective(){
        return {
            templateUrl:'/views/template/partials/news/cart/news-cart.html',
            restrict:'A'
        }
    }
    function newsCartDirective1(){
        return {
            templateUrl:'/views/template/partials/news/cart/news-cart1.html',
            restrict:'A'
        }
    }
    function newsCartDirective2(){
        return {
            templateUrl:'/views/template/partials/news/cart/news-cart2.html',
            restrict:'A'
        }
    }
    function newsCartDirective3(){
        return {
            templateUrl:'/views/template/partials/news/cart/news-cart3.html',
            restrict:'A'
        }
    }
    function newsCartDirective4(){
        return {
            templateUrl:'/views/template/partials/news/cart/news-cart4.html',
            restrict:'A'
        }
    }
    function newsCartDirective5(){
        return {
            templateUrl:'/views/template/partials/news/cart/news-cart5.html',
            restrict:'A'
        }
    }
    function newsListDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: newsListCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/news/newsList.html',
        }
    };
    function newsListTemplateDirective($stateParams){
        return {
            template:"<div ui-view></div></div><div ng-bind-html='$ctrl.content|unsafe'></div>",
            bindToController: true,
            scope: {},
            controllerAs: '$ctrl',
            controller: ['$http','$stateParams','global',function ($http,$stateParams,global) {
                var self=this;
                $http.get('/views/template/partials/news').then(function(response){
                    console.log(response)
                    self.content=response.data.html;
                    console.log(response.data.titles)
                    global.set('titles',response.data.titles)
                })
            }],
            /*templateUrl: function () {
             return 'views/template/partials/News/itemPage/'+$stateParams.id;
             }*/
        }
    }

    function newsListTemplateDirective1(global){
        var s=(global.get('store').val.template.newsList)?global.get('store').val.template.newsList:'';
        return {
            scope: {
                actived:'@'
            },
            rescrict:"E",
            bindToController: true,
            controller: newsListCtrl,
            controllerAs: '$ctrl',
            templateUrl:'views/template/partials/news/newsList'+s+'.html',
            /*templateUrl:'views/'+global.get('store').val.template.folder+'/partials/news/newsList.html',
            templateProvider: function(global,$http) {

                var url = 'views/'+global.get('store').val.template.folder+'/partials/news/newsList.html';
                console.log(url)
                return $http.get(url).then(function(tpl){return tpl.data;});
            },*/
        }
    };
    newsListTemplateDirective.$inject=['global']
    newsListCtrl.$inject=['News','$state','global','$timeout','$anchorScroll','Photo','Confirm','Label'];
    function newsListCtrl(News,$state,global,$timeout,$anchorScroll,Photo,Confirm,Label){
        var self = this;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        //self.moment=moment;
        self.datePickerOptions ={
            locale: {
                applyClass: 'btn-green',
                applyLabel: "Выбрать",
                fromLabel: "от",
                toLabel: "до",
                cancelLabel: 'Отменить',
                customRangeLabel: 'Прозвольный диапазон',
                format:"DD-MMMM-YYYY",
                daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб', 'Вс'],
                firstDay: 1,
                monthNames: ['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
                    'Ноябрь', 'Декабрь'
                ]
            },
            singleDatePicker: true,
            date:{
                startDate: null, endDate: null
            }
        }
        self.$state=$state;
        self.Items=News;
        self.moment=moment;
        self.query={};
        self.paginate={page:0,rows:20,totalItems:0}
        self.newNews={name:'Новая иноформация',actived:false}
        self.data={rows:2}
        self.itemsArr2=[[],[]]
        self.itemsArr3=[[],[],[]]
        self.itemsArr4=[[],[],[],[]]
        self.getList=getList;
        self.saveField = saveField;
        self.searchNews=searchNews;
        self.createNews=createNews;
        self.deleteItem=deleteItem;
        self.setRows=setRows;

        //*******************************************************
        activate();

        function activate() {
            return getList().then(function() {
                return Label.getList({page:0,rows:100},{list:'news'})
                //console.log('Activated news list View');
            }).then(function (data) {
                console.log(data)
                self.labels=data
            });
        }
        function getList() {
            if(!Object.keys(self.query ).length && self.actived){
                self.query={actived:true}
            }
            return News.getList(self.paginate,self.query)
                .then(function(data) {
                    self.itemsArr2=data.divideArrayWithChunk(2);
                    self.itemsArr3=data.divideArrayWithChunk(3);
                    self.itemsArr4=data.divideArrayWithChunk(4);
                    self.items = data;
                    //console.log(self.data.rows)
                    $timeout(function (){
                        self.data.rows=setRows();
                        $anchorScroll();
                        //console.log(self.data.rows)
                    })

                    return self.items;
                });
        }
        function setRows(){
            return (global.get('functions').val.setRows)?
                global.get('functions').val.setRows():2
        }
        $(window).resize(function(){
            $timeout(function (){
                self.data.rows=setRows();
                //console.log(self.data.rows)
            })

        })

        function searchNews(searchStr){
            if(searchStr){
                self.query = {name:searchStr.substring(0,10)};
            }else{
                self.query = {};
            }

            self.paginate.page=0;
            return getList().then(function() {
                console.log('Activated news list View');
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

        function createNews(item){
            var name =(item)?item.name:''
            self.Items.create(name)
                .then(function(res){
                    name=res;
                    if(item){
                        return self.Items.get({_id:item._id,clone:'clone'}).$promise
                    }else{
                        return {name:res}
                    }

                } )
                .then(function(res){
                    if(res._id){
                        self.newNews=angular.copy(res)
                        self.newNews.send={date:null,quantity:0}
                        self.newNews.name=name;
                        self.newNews.actived=false;
                        delete self.newNews.date
                        delete self.newNews._id
                        delete self.newNews.url
                        delete self.newNews.__v;
                        self.newNews.nameL={}
                        self.newNews.blocks.forEach(function (block) {
                            delete block.img;
                            delete block._id;
                            if(block.type=='stuffs'){
                                if(block.stuffs && block.stuffs.length){
                                    block.stuffs=block.stuffs.map(function (s) {
                                        if(s._id){
                                            return s._id
                                        }else{
                                            return s
                                        }

                                    })
                                }
                            }
                            block.imgs=[]
                        })
                    }else{
                        self.newNews={actived:false}
                        self.newNews.name=name;
                    }


                    return self.Items.save(self.newNews).$promise
                } )
                .then(function(res){
                    self.newNews._id=res.id;
                    self.newNews.url=res.url;
                    self.paginate.page=0;
                    getList(self.paginate);
                })
                .then(function(){
                    var id=self.newNews._id;
                    delete self.newNews._id
                    setTimeout(function(){
                        $state.go('frame.news.item',{id:id})
                    },100)

                })
                .catch(function(err){
                    console.log(err)
                })
        }
        function deleteItem(item){
            var folder='images/'+global.get('store').val.subDomain+'/News/'+item.url
            // console.log(folder)
            Confirm("удалить?" )
                .then(function(){
                    return News.delete({_id:item._id} ).$promise;
                } )
                .then(function(){
                    return getList();
                })
                .then(function(){
                    return Photo.deleteFolder('News',folder)
                })
                .catch(function(err){
                    err = (err &&err.data)||err
                    if(err){
                        exception.catcher('удаление новости')(err)
                    }

                })

            /*Stuff.Items.delete({_id:stuff._id} ).$promise.then(function(res){
             $scope.getList($scope.paginate.page,$scope.paginate.rows,'reload');
             } ).catch(function(err){
             err = err.data||err
             exception.catcher('удаление товара')(err)
             })*/
        }


    }
})()
