/**
 * @desc news directive that is specific to the main module
 * @example <news-item></news-item>
 */
(function(){
    'use strict';
    angular.module('gmall.services')
        .directive('seoPage',itemDirective);
    function itemDirective(){
        return {
            scope: {},
            rescrict:"E",
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/SEO/seopages/seopageItem.html',
        }
    }
    itemCtrl.$inject=['Seopage','$stateParams','$state','$q','$uibModal','global','exception','Stuff','News','$window','FilterTags','BrandTags','$timeout','Keywords','$scope'];
    function itemCtrl(Items,$stateParams,$state,$q,$uibModal,global,exception,Stuff,News,$window,FilterTags,BrandTags,$timeout,Keywords,$scope){
        var self = this;
        self.Items=Items;
        self.mobile=global.get('mobile' ).val;
        self.global=global;
        self.$state=$state;

        self.saveField=saveField;
        self.deleteKeyword=deleteKeyword;
        self.addKeywords=addKeywords;
        self.dropCallback=dropCallback;

        /*self.createNews = createNews;
        self.selectFilterTag=selectFilterTag;
        self.selectBrandTag=selectBrandTag;
        self.selectStuff=selectStuff;
        self.selectConditionFilterTag=selectConditionFilterTag;
        self.selectConditionBrandTag=selectConditionBrandTag;
        self.selectConditionStuff=selectConditionStuff;
        self.deleteBrandTag=deleteBrandTag;
        self.deleteFilterTag=deleteFilterTag;
        self.deleteStuff=deleteStuff;
        self.deleteConditionBrandTag=deleteConditionBrandTag;
        self.deleteConditionFilterTag=deleteConditionFilterTag;
        self.deleteConditionStuff=deleteConditionStuff;
        self.onSelected=onSelected;
        self.showConditionInput=showConditionInput;*/
        //********************activate***************************
        activate();
        $scope.$on('changeLang',function(){
            activate()
        })

        //*******************************************************
        function activate() {
            return getItem($stateParams.id)
                .then(function() {
                    //console.log('Activated item View');
                    return Keywords.getList()
                } )
                .then(function(data){
                    self.keywords=data;
                    //console.log(self.keywords.keywords)

                    self.item.keywords=self.item.keywords.map(function(word){
                        if(!word){return word;}
                        var w=word;
                        if(!w){
                            return {
                                _id:null,
                                f:'grey',
                                word:'удаленное'
                            }
                        }
                        if(!w.f){
                            w.f='grey'
                        }else if(w.f==1){
                            w.f='red'
                        }else if(w.f==2){
                            w.f='green'
                        }else if(w.f==3){
                            w.f='blue'
                        }
                        return {
                            _id:w._id,
                            f:w.f,
                            word:w.word
                        }
                    })
                    //console.log(self.item.keywords)
                })
                .catch(function(err){
                exception.catcher('получение компании')(err)
            });
        }
        function getItem(id) {
            return self.Items.getItem(id)
                .then(function(data) {
                    self.item = data;
                    return self.item;
                } ).catch(function(err){
                    if(err){
                        exception.catcher('получение данных')(err)
                    }
                    return $q.reject(err)
                });
        }
        function saveField(field,defer){
            defer =defer||0
            setTimeout(function(){
                var o={_id:self.item._id};
                if(field=='keywords'){
                    o[field]=self.item[field].map(function(w){return w._id})
                }else{
                    o[field]=self.item[field]
                }
                self.Items.save({update:field},o,function(){
                    global.set('saving',true);
                    $timeout(function(){
                        global.set('saving',false);
                    },1500)
                });
            },defer)
        };
        function dropCallback(event, index, item, external, type){
            $timeout(function(){
                console.log(self.item.keywords)
                saveField('keywords')
            },200)
            return item;
        }
        function deleteKeyword(i){
            self.item.keywords.splice(i,1)
            saveField('keywords');
        }
        function addKeywords(){
            var options={
                animation: true,
                bindToController: true,
                controllerAs: '$ctrl',
                templateUrl: 'components/SEO/seopages/bindToPage.html',
                controller: function bindtoPageCtrl(Keywords,$q,Seopage,$uibModalInstance,exception,page,keywords){
                    var self=this;
                    self.items=[];
                    self.frequencies={1:'ВЧ',2:'CЧ',3:'НЧ'}
                    self.competitives={1:'ВК',2:'CК',3:'НК'}
                    self.ok=done;
                    self.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                    self.change=change;
                    self.getC=getC;
                    self.getF=getF;
                    self.addKeyword=addKeyword;
                    self.saveField=saveField;
                    self.clear=clear;
                    self.clearSearchStr=clearSearchStr;

                    activate()
                    function activate(){
                        keywords.forEach(function(word){
                            word.is=false;
                        })
                        var k;
                        page.keywords.forEach(function(w){
                            if(k=keywords.getOFA('_id',w._id)){
                                k.is=true;
                            }
                        })
                        self.items=keywords;
                    }
                    function getC(c){
                        if(!c)return;
                        for(var k in self.competitives){
                            if(k==c){
                                return self.competitives[k]
                            }
                        }
                    }
                    function getF(f){
                        if(!f)return;
                        for(var k in self.frequencies){
                            if(k==f){
                                return self.frequencies[k]
                            }
                        }
                    }
                    function done(){
                        $uibModalInstance.close();
                    }
                    function change(item){
                        //console.log(item)
                        if(item.is){
                            if(item.f==1){
                                var f='red'
                            }else if(item.f==2){
                                var f='green'
                            }else if(item.f==3){
                                var f='blue'
                            }else{
                                var f='grey'
                            }
                            if(!page.keywords.getOFA('_id',item._id)){
                                page.keywords.push({_id:item._id,word:item.word,
                                f:f})
                            }
                        }else{
                            page.keywords.removeOFA('_id',item._id)
                        }
                        var o={_id:page._id}
                        o.keywords=page.keywords.map(function(w){return w._id});
                        Seopage.save({update:'keywords'},o)
                    }
                    function addKeyword(word){
                        /*console.log(word.trim(),word && !self.items.getOFA('word',word));
                        return;*/
                        if(word && !self.items.getOFA('word',word)){
                            /*var o={_id:keywords._id};
                            o.word=word;
                            var update={update:'word',embeddedName:'keywords',embeddedPush:true};*/
                            $q.when()
                                .then(function(){
                                    return saveField({word:word},'word')
                                    //return Keywords.save(update,o).$promise;
                                })
                                .then(function(res){
                                    return Keywords.getList()
                                })
                                .then(function(data){
                                    if(data && data.length){
                                        self.items = data[0].keywords;
                                    }
                                    var w = self.items.getOFA('word',word);
                                    if(w){
                                        w.is=true;
                                        change(w);
                                    }
                                })
                                .catch(function(err){
                                    err=err.data||err;
                                    exception.catcher('сохранение слова')(err)
                                })

                        }
                    }
                    function saveField(item,field){
                        var o={_id:keywords._id};
                        if(field){
                            o[field]=item[field];
                        }
                        var update={update:field,embeddedName:'keywords'};
                        if(item._id){
                            if(!field){
                                update.embeddedPull=true;
                                update.update='word';
                                o.word=item.word;
                            }else{
                                update.embeddedVal=item._id
                            }
                        }else{
                            update.embeddedPush=true;
                        }
                        return Keywords.save(update,o).$promise;
                    }
                    function clear($event,item,field) {
                        $event.stopPropagation();
                        item[field]=null;
                        saveField(item,field)
                    };
                    function clearSearchStr(){
                        self.searchStr='';
                    }
                },
                size: 'lg',
                resolve:{
                    page:function(){
                        return self.item
                    },
                    keywords:function(){
                        //console.log(self.keywords)
                        return self.keywords
                    }

                }
            }
            $q.when()
                .then(function(){
                    return $uibModal.open(options).result
                })
                .then(function(res){
                   // console.log(res)
                })
                .catch(function(err){
                    //console.log(err)
                    if(err && err!='backdrop click'){
                        err=err.data||err;
                        exception.catcher('привязка к страницам')(err)
                    }
                })
        }

    }
})()
