'use strict';
(function() {

    angular.module( 'gmall.services' )
        .service( 'Brands', function ($resource, $q,global,$uibModal,Sections) {
            var Items = $resource( '/api/collections/Brand/:id', {id: '@_id'} );
            var brands = null;
            var pending = true;
            this.query = Items.query;
            this.get = Items.get;
            this.delete = Items.delete;
            this.save = Items.save;
            this.reloadItems=reloadItems;
            this.select=selectBrand;
            this.getList=getList;
            this.getItem=getItem;



            function getList(paginate,query){
                if(!paginate){
                    paginate={page:0}
                }
                var data ={perPage:paginate.rows ,page:paginate.page,query:query};
                if(global.get('crawler') && global.get('crawler').val){
                    data.subDomain=global.get('store').val.subDomain;
                }
                return Items.query(data).$promise
                    .then(getListComplete)
                //.catch(getListFailed);
                function getListComplete(response) {
                    if(paginate.page==0){
                        if(response && response.length){
                            paginate.items=response.shift().index;
                        }else{
                            paginate.items=0;
                        }
                    }
                    //console.log(response)
                    return response;
                }

                function getListFailed(error) {
                    console.log('XHR Failed for getNews.' + error);
                    return $q.reject(error);
                }
            }
            function getItem(id){
                return Items.get({_id:id} ).$promise
                    .then(getItemComplete)
                //.catch(getItemFailed);
                function getItemComplete(response) {
                    if(response && response.blocks && response.blocks.length){
                        response.blocks.forEach(function (b) {
                            if(b.type=='stuffs'){
                                if(b.stuffs && b.stuffs.length){
                                    b.imgs=b.stuffs.map(function(s){
                                        if(s.gallery && s.gallery.length && s.gallery[0].img){
                                            s.img=s.gallery[0].img;
                                        }
                                        return s;
                                    });
                                }else{b.imgs=[]}
                            }
                        })
                    }
                    return response;
                }
                function getItemFailed(error) {
                    return $q.reject(error);
                }
            }


            function returnBrands(resolve) {
                if (pending) {
                    setTimeout( function () {
                        returnBrands( resolve )
                    }, 300 );
                } else {
                    resolve( brands )
                }
            }

            this.getBrands = function () {
                return $q( function (resolve, reject) {
                    if(global.get('brands') && global.get('brands').val){
                        if(!brands){brands=global.get('brands').val}
                        return resolve(global.get('brands').val);
                    }
                    if (pending) {
                        setTimeout( function () {
                            returnBrands( resolve )
                        }, 300 );
                    } else {
                        if (brands) {
                            resolve( brands )
                        } else {
                            pending = true;
                            Items.query( function (res) {
                                res.shift();
                                brands = (res)?res:[];
                                pending = false;
                                resolve( brands )
                            }, function (err) {
                                pending = false;
                                ;
                                reject( err )
                            } )
                        }
                    }

                } )
            }
            if(!global.get('brands') || !global.get('brands' ).val){
                Items.query( function (res) {
                    res.shift();
                    brands = res;
                    if(global.get('brands') && !global.get('brands' ).val){
                        global.set('brands',brands)
                    }
                    pending = false;
                } )
            }


            function reloadItems(){
                pending=true;
                Items.query( function (res) {
                    res.shift();
                    brands = res;
                    global.set('brands',brands)
                    pending = false;
                } )
            }


            function selectBrand(data){
                var sections =(data &&  data.section)?Sections.getSections():null;
                return $q(function(resolve,reject){
                    var options={
                        animation: true,
                        templateUrl: 'components/brand/selectBrand.html',
                        controller: selectBrandCtrl,
                        size: 'lg',
                        controllerAs:'$ctrl',

                        resolve:{
                            sections: function(){
                                return sections
                            }
                        }

                    }
                    var modalInstance = $uibModal.open(options);
                    modalInstance.result.then(function (selected) {
                        resolve(selected)
                    }, function () {
                        console.log('Modal dismissed at: ' + new Date());
                        reject()
                    });
                })
            }
            selectBrandCtrl.$inject=['Brands','$uibModalInstance','$q','global','sections'];
            function selectBrandCtrl(Brands,$uibModalInstance,$q,global,sections){
                var self=this;

                self.global=global;
                self.sections=sections;
                if(self.sections){
                    self.section=self.sections[0].url
                }

                $q.when()
                    .then(function(){
                        return Brands.getBrands();
                    } )
                    .then(function(filters){
                        self.filters=filters;
                        //console.log(filters)
                    })
                self.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                self.ok = function (filterTag) {

                    if(self.section){
                        filterTag.section=self.section;
                    }

                    $uibModalInstance.close(filterTag);
                };
            }

        } )


        //************************************************************
        .service( 'BrandTags', brandTagsService);
    brandTagsService.$inject=['$resource','$uibModal','$q','Sections'];
    function brandTagsService($resource,$uibModal,$q,Sections) {
        var Items = $resource( '/api/collections/BrandTags/:id', {id: '@_id'} );
        return {
            getList:getList,
            getItem:getItem,
            save:Items.save,
            delete:Items.delete,
            query:Items.query,
            get:Items.get,
            selectBrandTag:selectBrandTag,
            select:selectBrandTag
        }
        function getList(paginate,query){
            return Items.query({perPage:paginate.rows ,page:paginate.page,query:query} ).$promise
                .then(getListComplete)
                .catch(getListFailed);
            function getListComplete(response) {
                if(paginate.page==0){
                    if(response && response.length){
                        paginate.items=response.shift().index;
                    }else{
                        paginate.items=0;
                    }
                }
                return response;
            }

            function getListFailed(error) {
                console.log('XHR Failed for getNews.' + error);
                return $q.reject(error);
            }
        }
        function getItem(id){
            return Items.get({_id:id} ).$promise
                .then(getItemComplete)
                .catch(getItemFailed);
            function getItemComplete(response) {
                return response;
            }
            function getItemFailed(error) {
                return $q.reject(error);
            }
        }
        function selectBrandTag(data){
            var sections =(data &&  data.section)?Sections.getSections():null;
            return $q(function(resolve,reject){
                var options={
                    animation: true,
                    templateUrl: 'components/brand/selectBrandTag.html',
                    controller: selectBrandTagCtrl,
                    size: 'lg',
                    controllerAs:'$ctrl',
                    resolve:{
                        sections: function(){
                            return sections
                        }
                    }
                }
                var modalInstance = $uibModal.open(options);
                modalInstance.result.then(function (selectedFilterTag) {
                    resolve(selectedFilterTag)
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                    reject()
                });
            })
        }
        selectBrandTagCtrl.$inject=['Brands','$uibModalInstance','$q','global','sections'];
        function selectBrandTagCtrl(Brands,$uibModalInstance,$q,global,sections){
            var self=this;
            self.global=global;
            self.sections=sections;
            if(self.sections){
                self.section=self.sections[0].url
            }
            $q.when()
                .then(function(){
                    return Brands.getBrands();
                } )
                .then(function(filters){
                    self.filters=filters;
                    //console.log(filters)
                })
            self.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            self.ok = function (filterTag) {
                if(self.section){
                    filterTag.section=self.section;
                }
                filterTag.brand=self.filters.find(function(b){
                    return b._id==filterTag.brand
                })
                $uibModalInstance.close(filterTag);
            };
        }
    }
})()
