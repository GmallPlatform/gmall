'use strict';
(function(){
    angular.module('gmall.services')
        .directive('createLink',itemDirective);
    function itemDirective(){
        return {
            scope: {
                link:'=',
                stuffurl:'=',
                change:'&',
                title:'@',
                seoPage:'=editSeoPage'
            },
            rescrict:"E",
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/createLink/createLink.html',
        }
    }
    itemCtrl.$inject=['$q','FilterTags','Stuff','Category','BrandTags','Stat','Brands','Sections','global','$uibModal','$timeout']
    function itemCtrl($q,FilterTags,Stuff,Category,BrandTags,Stat,Brands,Sections,global,$uibModal,$timeout){
        var self = this;
        self.setFilterTag=setFilterTag;
        self.setBrandTag=setBrandTag;
        self.setBrand=setBrand;
        self.setCategory=setCategory;
        self.setSection=setSection;
        self.setStuff=setStuff;
        self.setStuffForOrder=setStuffForOrder;
        self.setSubscription=setSubscription;
        self.setSubscriptionAdd=setSubscriptionAdd;
        self.setBonus=setBonus;
        self.setFeedback=setFeedback;
        self.setStaticPage=setStaticPage;
        self.deleteLink=deleteLink;
        self.setCall=setCall;
        self.setDateTime=setDateTime;
        self.setAnyPage=setAnyPage;
        self.setHomePage=setHomePage;
        self.setCatalog=setCatalog;

        function setFilterTag(){
            $q.when()
                .then(function(){
                    return FilterTags.selectFilterTag({section:true});
                })
                .then(function(tag){
                    if(!tag.section){tag.section='group'}
                    self.link='/'+tag.section+'/category?queryTag='+tag.url;
                    $timeout(function(){
                        self.change()
                    },100)
                    //console.log(self.link)
                })
                .catch(function(){
                    console.log('dismiss')
                })
        }
        function setBrandTag(){
            $q.when()
                .then(function(){
                    return BrandTags.selectBrandTag({section:true});
                })
                .then(function(tag){
                    console.log(tag)
                    if(!tag.section){tag.section='group'}
                    if(tag.brand && tag.brand.url){
                        self.link='/'+tag.section+'/category?brand='+tag.brand.url+'&brandTag='+tag.url;
                        $timeout(function(){
                            self.change()
                        },100)
                    } else{
                        throw 'where is the BRAND?'
                    }

                    //console.log(self.link)
                })
                .catch(function(err){
                    if(err){
                        exception.caatcher('set data')(err)
                    }

                })
        }
        function setBrand(){
            $q.when()
                .then(function(){
                    return Brands.select({section:true});
                })
                .then(function(tag){
                    //console.log(tag)
                    if(!tag.section){tag.section='group'}
                    self.link='/'+tag.section+'/category?brand='+tag.url;
                    $timeout(function(){
                        self.change()
                    },100)
                    //console.log(self.link)
                })
                .catch(function(){
                    console.log('dismiss')
                })
        }
        function setCategory(){
            $q.when()
                .then(function(){
                    return Category.select();
                })
                .then(function(category){
                    //console.log(global.get('categories').val)
                    var category = global.get('categories').val.getOFA('_id',category._id)
                    //console.log(category)
                    self.link='/'+category.linkData.groupUrl+'/'+category.url;
                    if(category.linkData.parentGroup){
                        self.link+='?parentGroup='+category.linkData.parentGroup
                    }
                    $timeout(function(){
                        self.change()
                    },100)

                    //console.log(self.link)
                })
                .catch(function(){
                    console.log('dismiss')
                })
        }
        function setSection(){
            $q.when()
                .then(function(){
                    return Sections.select();
                })
                .then(function(section){
                    console.log(section)
                    self.link='/'+section.url+'/category';
                    /*if (section.level===0){
                        self.link='/'+section.url+'/category';
                    }else{
                        self.link='/'+section.section.url+'/category?parentGroup='
                            +section.url+"&categoryList=allCategories";
                    }*/
                    $timeout(function(){
                        self.change()
                    },100)
                })
                .catch(function(){
                    console.log('dismiss')
                })
        }
        function setStuff(){
            $q.when()
                .then(function(){
                    return Stuff.selectItem();
                })
                .then(function(stuff){
                    self.link=stuff.link;
                    if(self.change && typeof self.change =='function'){
                        $timeout(function(){
                            self.change()
                        },100)
                    }
                })
                .catch(function(err){
                    console.log(err)
                })
        }
        function setStuffForOrder(){
            $q.when()
                .then(function(){
                    return Stuff.selectItem();
                })
                .then(function(stuff){
                    self.link="orderStuffFromHP";
                    self.stuffurl=stuff.url;
                    if(self.change && typeof self.change =='function'){
                        $timeout(function(){
                            self.change()
                        },100)
                    }
                })
                .catch(function(err){
                    console.log(err)
                })
        }
        function setSubscription(){
            self.link='subscription';
            if(self.change && typeof self.change =='function'){
                $timeout(function(){
                    self.change()
                },100)
            }
        }
        function setBonus(){
            self.link='allBonus';
            if(self.change && typeof self.change =='function'){
                $timeout(function(){
                    self.change()
                },100)
            }
        }
        function setSubscriptionAdd(){
            self.link='subscriptionAdd';
            if(self.change && typeof self.change =='function'){
                $timeout(function(){
                    self.change()
                },100)
            }
        }
        function setFeedback(){
            self.link='feedback';
            if(self.change && typeof self.change =='function'){
                $timeout(function(){
                    self.change()
                },100)
            }
        }
        function setCall(){
            self.link='call';
            if(self.change && typeof self.change =='function'){
                $timeout(function(){
                    self.change()
                },100)
            }
        }
        function setStaticPage(){
            $q.when()
                .then(function(){
                    return Stat.selectItem();
                })
                .then(function(stat){
                    self.link='/stat/'+stat.url;
                    if(self.change && typeof self.change =='function'){
                        $timeout(function(){
                            self.change()
                        },100)
                    }
                })
                .catch(function(err){
                    console.log(err)
                })
        }
        function setDateTime(){
            self.link='dateTime';
            if(self.change && typeof self.change =='function'){
                $timeout(function(){
                    self.change()
                },100)
            }
        }
        function setAnyPage(){
            $q.when()
                .then(function(){
                    return $q(function(resolve,reject){
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'components/createLink/createAnyLink.html',
                            controller: function($uibModalInstance){
                                var self=this;
                                self.name=''
                                self.ok=function(){
                                    console.log(self.name)
                                    if(!self.name) {return}
                                    if(self.name[0]!='/' && self.name.indexOf('http')<0){
                                        self.name='/'+self.name;
                                    }
                                    $uibModalInstance.close(self.name.substring(0,100));
                                }
                                self.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            },
                            controllerAs:'$ctrl',
                        });
                        modalInstance.result.then(function (name) {
                            if(name){
                                resolve(name.substring(0,100))
                            }else{
                                reject('empty')
                            }

                        }, function (err) {
                            reject(err)
                        });
                    })
                })
                .then(function(link){
                    self.link=link;
                    if(self.change && typeof self.change =='function'){
                        $timeout(function(){
                            self.change()
                        },100)
                    }
                })
                .catch(function(err){
                    console.log(err)
                })
        }
        function setHomePage(){
            self.link='/';
            if(self.change && typeof self.change =='function'){
                $timeout(function(){
                    self.change()
                },100)
            }
        }
        function setCatalog(){
            self.link='/group/category';
            if(self.change && typeof self.change =='function'){
                $timeout(function(){
                    self.change()
                },100)
            }
        }
        function deleteLink(){
            self.link='';
            $timeout(function(){
                self.change()
            },100)

        }
    }
})()
