/**
 * @desc news directive that is specific to the main module
 * @example <news-item></news-item>
 */
(function(){
    'use strict';
    angular.module('gmall.services')
        .directive('keywordsPage',itemDirective);
    function itemDirective(){
        return {
            scope: {},
            rescrict:"E",
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/SEO/keywords/keywordsPage.html',
        }
    }
    itemCtrl.$inject=['Keywords','$stateParams','$state','$q','$uibModal','global','exception','$timeout','Seopage','Confirm','$location','$scope'];
    function itemCtrl(Items,$stateParams,$state,$q,$uibModal,global,exception,$timeout,Seopage,Confirm,$location,$scope){
        var self = this;
        self.Items=Items;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$state;
        self.frequencies={1:'ВЧ',2:'CЧ',3:'НЧ'}
        self.competitives={1:'ВК',2:'CК',3:'НК'}
        self.listOfActions={
            delete:'удаление',
            bind:'привязка к стр.',
            f:'частотность',
            c:'конкурентность'
        }
        self.unbind=false;
        self.cacheKW;
        self.unbindingKW=[];
        self.showActions=true;
        self.saveField=saveField;
        self.addNewKeyword=addNewKeyword;
        self.deleteItem=deleteItem;
        self.dropCallbackKW=dropCallbackKW;
        self.bindItem=bindItem;
        self.clear=clear;
        self.markAllStuffs=markAllStuffs;
        self.changeAction=changeAction;
        self.filterForSeopage=filterForSeopage;
        self.filterList=filterList;
        self.changeSeopage=changeSeopage;
        self.clearSeopage=clearSeopage;
        self.setUnbindingKeyWords=setUnbindingKeyWords;
        self.changeSelectItem=changeSelectItem;
        //********************activate***************************
        activate();
        $scope.$on('changeLang',function(){
            activate()
        })

        //*******************************************************
        function activate() {
            //return getItem()
            $q.when()
                .then(function() {
                    return Seopage.getList(null,{alldata:true})
                    console.log('Activated item View');
                })
                .then(function(seopages){
                    self.seopages=seopages;
                    if($stateParams.page){
                        self.seopage=self.seopages.getOFA('_id',$stateParams.page)
                    }
                })
                .then(function(){
                    return getItem();
                })
                .catch(function(err){
                    exception.catcher('получение ключевых слов')(err)
                });
        }
        function getItem() {
            return self.Items.getList()
                .then(function(data) {

                   if(!data.length){
                       //self.item={keywords:[{word:global.get('store').val.name}]}
                       return self.Items.save({word:global.get('store').val.name}).$promise;
                   }else{
                       self.items = data;
                       self.cacheKW=self.items;
                       self.unbindingKW=getUnbindingKW(self.items)
                       //console.log(self.unbindingKW);
                       //console.log(self.unbind)
                       setUnbindingKeyWords(self.unbind)
                   }
                } )
                .then(function(data){
                    if(data){
                        console.log(data)
                        return self.Items.getList()
                    }

                })
                .then(function(data){
                    if(data && data.length){
                        self.items = data;
                        self.cacheKW=self.items;
                        self.unbindingKW=getUnbindingKW(self.items)
                        //console.log(self.unbindingKW);
                        setUnbindingKeyWords(self.unbind)
                    }
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('получение данных')(err)
                    }
                    return $q.reject(err)
                });
        }
        function saveField(item,field){
            //console.log('saveField',item)
            var o={_id:item._id};
            if(field){
                o[field]=item[field];
            }
            var update={update:field};
            console.log(update,o)


            return self.Items.save(update,o,function(){
                global.set('saving',true);
                $timeout(function(){
                    global.set('saving',false);
                },1500)

            }).$promise;
        };
        function addNewKeyword(){
            var options={
                animation: true,
                bindToController: true,
                controllerAs: '$ctrl',
                templateUrl: 'components/SEO/keywords/newKeywordModal.html',
                controller: function bindtoPageCtrl($q,$uibModalInstance){
                    var self=this;
                    self.keywords='';
                    self.ok=done;
                    self.cancel =cancel;
                    function cancel() {
                            $uibModalInstance.dismiss();
                        };
                    function done(){
                        $uibModalInstance.close(self.keywords);
                    }
                }
            }
            $q.when()
                .then(function(){
                    return $uibModal.open(options).result
                })
                .then(function(keywordsString){
                    var lines = keywordsString.replace(/\r\n/g, "\n").split("\n");
                    //console.log(lines)
                    var keywords=lines.map(function(w){return w.trim().substring(0,50)}).filter(function(w){return w})
                    //console.log(keywords)
                    return keywords;
                })
                .then(function(keywords){
                    //console.log(keywords)
                    var actions=[];
                    if(keywords && keywords.length){
                        keywords.forEach(function(word){
                            if(!self.items.getOFA('word',word)){
                                actions.push((function(){return self.Items.save({word:word}).$promise})())
                            }
                        })
                        self.newKeywords=keywords;
                    }else{
                        self.newKeywords=[];
                    }
                    //console.log(actions)
                    return $q.all(actions)
                })
                .then(function(){
                    return getItem()
                })
                .then(function(data){
                    if(self.newKeywords.length){
                        self.items.forEach(function(w){
                            var i = self.newKeywords.indexOf(w.word);
                            if(i>-1){
                                w.select=true;
                                self.newKeywords[i]=w._id;
                            }else{
                                w.select=false;
                            }
                        })
                    }
                })
                .then(function(){
                    if(self.seopage && self.newKeywords.length){
                        var is;
                        self.newKeywords.forEach(function(w){
                            if(self.seopage.keywords.indexOf(w)<0){
                                self.seopage.keywords.push(w);
                                is=true;
                            }
                        })
                        if(is){
                            var o ={_id:self.seopage._id};
                            o.keywords=self.seopage.keywords
                            return Seopage.save({update:'keywords'},o).$promise
                        }
                    }
                })
                .then(function(){
                    //return getItem();
                })
                .catch(function(err){
                    if(err){
                        err=err.data||err;
                        exception.catcher('запись новых слов')(err)
                    }
                })


            return;
        }
        function deleteItem(item){
            Confirm("удалить слово?" )
                .then(function(){
                    return self.Items.delete({_id:item._id}).$promise
                })
                .then(function(res){
                    console.log(res)
                    return getItem();
                })
                .then(function(){
                    self.seopages.forEach(function(sp){
                        //console.log(sp);
                        var pos=sp.keywords.indexOf(item._id);
                        if(pos>-1){
                            sp.keywords.splice(pos,1)
                            var o={_id:sp._id};
                            // name of field = $ for array consist from literal elements not objects with fields
                            var update={update:'$',embeddedName:'keywords'};
                            update.embeddedPull=true;
                            o.$=item._id;
                            //console.log(update,o)
                            Seopage.save(update,o).$promise;
                        }
                    })
                })

        }
        function dropCallbackKW(item){
            //console.log(item)
            var acts=[];
            setTimeout(function(){
                self.items.forEach(function(item,idx){
                    if(item.index!=(idx+1)){
                        item.index=idx+1;
                        acts.push(saveField(item,'index'))
                    }

                })
                $q.when()
                    .then(function(){
                        return $q.all(acts)
                    })
                    .then(function(){
                        return getItem()
                    })

            },100)
            return item
        }
        function bindItem(item) {
            var options={
                animation: true,
                bindToController: true,
                controllerAs: '$ctrl',
                templateUrl: 'components/SEO/keywords/bindToPage.html',
                controller: function bindtoPageCtrl($q,$uibModalInstance,keyword,seopages){
                    var self=this;
                    self.items=[];
                    self.ok=done;
                    self.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                    self.change=change;
                    activate()
                    function activate(){
                        $q.when()
                            .then(function(){
                                return seopages
                            })
                            .then(function(pages){
                                pages.forEach(function(page){
                                    page.is=false;
                                    /*console.log(keyword);
                                    console.log(page);*/
                                    if(!page.keywords){
                                        page.keywords=[];
                                    }else{
                                        if(page.keywords.indexOf(keyword)>-1){
                                            page.is=true;
                                        }
                                    }
                                })
                                self.items=pages;
                            })
                            .catch(function(err){
                                if(err){
                                    err=err.data||err;
                                    exception.catcher('получение страниц')(err)
                                }
                            })
                    }
                    function done(){
                        $uibModalInstance.close();
                    }
                    function change(item){
                        console.log(item)
                        if(item.is){
                            if(item.keywords.indexOf(keyword)<0){
                                item.keywords.push(keyword)
                            }
                        }else{
                            item.keywords.splice(item.keywords.indexOf(keyword),1)
                        }
                        var o={_id:item._id}
                        o.keywords=item.keywords;
                        Seopage.save({update:'keywords'},o)
                    }
                },
                size: 'lg',
                resolve:{
                    keyword:function(){
                        return item._id
                    },
                    seopages:function(){
                        return self.seopages||[];
                    }
                }
            }
            $q.when()
                .then(function(){
                    return $uibModal.open(options).result
                })
                .then(function(res){
                    console.log(res)
                    return getItem()
                })
                .catch(function(err){
                    console.log(err)
                    if(err && err!='backdrop click'){
                        err=err.data||err;
                        exception.catcher('привязка к страницам')(err)
                    }
                })
        }
        function clear($event,item,field) {
            $event.stopPropagation();
            item[field]=null;
            saveField(item,field)
        };
        function clearSeopage($event) {
            $event.stopPropagation();
            delete self.seopage;
            $location.search('page',null)
        };
        function markAllStuffs(m){
            self.items.forEach(function(el){
                el.select=m;
            })
        }

        function deleteKeyWords(){
            var deletingKW=[];
            Confirm('удалить?')
                .then(function(){
                    var actions=[]
                    for(var i=0;i<self.items.length;i++){
                        if(self.items[i].select){
                            var keyword=self.items.splice(i,1)
                            i--;
                            var action=self.Items.delete({_id:keyword[0]._id}).$promise;
                            actions.push(action)
                            deletingKW.push(keyword[0])
                            //saveField(el);
                        }
                    }
                    //console.log(actions)
                    return $q.all(actions)
                })
                .then(function(){
                    deletingKW.forEach(function(item){
                        self.seopages.forEach(function(sp){
                            //console.log(sp);
                            var pos=sp.keywords.indexOf(item._id);
                            if(pos>-1){
                                sp.keywords.splice(pos,1)
                                var o={_id:sp._id};
                                // name of field = $ for array consist from literal elements not objects with fields
                                var update={update:'$',embeddedName:'keywords'};
                                update.embeddedPull=true;
                                o.$=item._id;
                                //console.log(update,o)
                                Seopage.save(update,o).$promise;
                            }
                        })
                    })
                })
                .then(function(){
                    return getItem();
                })

        }
        function bindKeyWords(){
            var kws=self.items.filter(function(k){return k.select})
                .map(function(k){return k._id})
            if(!kws.length){return}
            var options={
                animation: true,
                bindToController: true,
                controllerAs: '$ctrl',
                templateUrl: 'components/SEO/keywords/bindToPageSomeKeywords.html',
                controller: function bindtoPageCtrl($q,$uibModalInstance,keywords,seopages){
                    var self=this;
                    self.items=[];
                    self.ok=done;
                    self.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                    self.change=change;
                    activate()
                    function activate(){
                        $q.when()
                            .then(function(){
                                return seopages
                            })
                            .then(function(pages){
                                pages.forEach(function(page){
                                    page.is=false;
                                    if(!page.keywords){
                                        page.keywords=[];
                                    }else{
                                        /*if(page.keywords.indexOf(keyword)>-1){
                                            page.is=true;
                                        }*/
                                    }
                                })
                                self.items=pages;
                            })
                            .catch(function(err){
                                if(err){
                                    err=err.data||err;
                                    exception.catcher('получение страниц')(err)
                                }
                            })
                    }
                    function done(){
                        $uibModalInstance.close();
                    }
                    function change(item){
                        //console.log(item)
                        if(item.is){
                            keywords.forEach(function(keyword){
                                if(item.keywords.indexOf(keyword)<0){
                                    item.keywords.push(keyword)
                                }
                            })
                        }else{
                            keywords.forEach(function(keyword){
                                item.keywords.splice(item.keywords.indexOf(keyword),1)
                            })
                        }
                        var o={_id:item._id}
                        o.keywords=item.keywords;
                        Seopage.save({update:'keywords'},o)
                    }
                },
                size: 'lg',
                resolve:{
                    keywords:function(){
                        return kws
                    },
                    seopages:function(){
                        return self.seopages
                    }
                }
            }
            $q.when()
                .then(function(){
                    return $uibModal.open(options).result
                })
                .then(function(res){
                    console.log(res)
                    activate()
                })
                .catch(function(err){
                    console.log(err)
                    if(err && err!='backdrop click'){
                        err=err.data||err;
                        exception.catcher('привязка к страницам')(err)
                    }
                })
        }
        function fcWords(list){
            var kws=self.items.filter(function(k){return k.select})
                .map(function(k){return k._id})
            if(!kws.length){return}
            var options={
                animation: true,
                bindToController: true,
                controllerAs: '$ctrl',
                templateUrl: 'components/SEO/keywords/bindFCKeywords.html',
                controller: function bindtoPageCtrl($uibModalInstance,list){
                    var self=this;
                    self.list=list;
                    self.ok=done;
                    self.value;
                    self.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                    activate()
                    function activate(){}
                    function done(){
                        $uibModalInstance.close(self.value);
                    }
                },
                resolve:{
                    list:function(){
                        return self[list]
                    }
                }
            }
            $q.when()
                .then(function(){
                    return $uibModal.open(options).result
                })
                .then(function(val){
                    //console.log(val)
                    if(!val){val=null;}
                    var field='f';
                    //console.log(field)
                    if(list=='frequencies'){
                        field='f'}else if(list=='competitives'){
                        field='c'
                    }
                    var actions=[]
                    for(var i=0;i<self.items.length;i++){
                        if(self.items[i].select){
                            self.items[i][field]=val;
                            actions.push(self.saveField(self.items[i],field))
                        }
                    }
                    return $q.all(actions)
                })
                .then(function(){
                    getItem();
                })

        }
        function changeAction(){
            if(!self.action){return}
            self.mark=false;
            var a=angular.copy(self.action);
            self.action=null;
            switch (a) {
                case 'delete':
                    return deleteKeyWords()
                    break;
                case 'bind':
                    return bindKeyWords()
                    break;
                case 'f':
                    return fcWords('frequencies')
                    break;
                case 'c':
                    return fcWords('competitives')
                    break;


            }


            //console.log(a);

        }
        function filterList(item){
            if(self.frequency && item.f!=self.frequency){
                item.select=false;
                return false;
            }
            if(self.competitive && item.c!=self.competitive){
                item.select=false;
                return false;
            }
            if(self.searchStr && item.word.indexOf(self.searchStr)<0){
                item.select=false;
                return false;
            }
            if(self.seopage){
                if(self.seopage.keywords && self.seopage.keywords.length){
                    if(self.seopage.keywords.indexOf(item._id)<0){
                        item.select=false;
                        return false;
                    }
                }
            }
            return true;
        }
        function filterForSeopage(item){
            if(!self.seopage){return true;}
            //console.log(self.seopage)
            if(!self.seopage.keywords || !self.seopage.keywords.length){return false}else{
                if(self.seopage.keywords.indexOf(item._id)>-1){return true}
            }
        }
        function changeSeopage(){
            //после выбора страницы устанавоивается список слов, связанных со страницами
            setUnbindingKeyWords(false)
            self.mark=false;
            markAllStuffs(false)

        }
        function getUnbindingKW(keywords){
            var a=[];
            keywords.forEach(function(w){
                var is=false;
                for(var i=0,l=self.seopages.length;i<l;i++){
                    if(self.seopages[i].keywords.indexOf(w._id)>-1){
                        is=true;
                        break;
                    }
                }
                if(!is){
                    a.push(w)
                }
            })
            return a;
        }
        function setUnbindingKeyWords(val){
            //console.log('1')
            if(val!=self.unbind){self.unbind=val;}
            //console.log(self.unbind)
            if(val){
                delete self.seopage;
                self.items=self.unbindingKW;
            }else{
                self.items=self.cacheKW
            }
            self.mark=false;
            markAllStuffs(false)
        }
        function changeSelectItem(val){
            if(!val && self.mark){
                self.mark=false;
            }
        }

    }
})()
