'use strict';
(function(){

    angular.module('gmall.services')
        .directive('siteMap',itemDirective);
    function itemDirective(){
        return {
            scope: {},
            restrict:'E',
            bindToController: true,
            controller: listCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/SEO/sitemap/sitemap.html',
        }
    };
    listCtrl.$inject=['$http','$state','global','exception','$q'];
    function listCtrl($http,$state,global,exception,$q){
        var self = this;
        self.mobile=global.get('mobile' ).val;
        self.$state=$state;
        self.getItem=getItem;
        self.createItem = createItem;
        var domain=global.get('store').val.domain;
        self.getFileName=getFileName;
        function getFileName() {
            return domain+'/'+global.get('store').val.subDomain+'.xml'
        }
        //*******************************************************
        activate();

        function activate() {
            return getItem()
        }
        function getItem(){
            return $http.get(global.get('store').val.subDomain+'.xml')
                .then(function(res) {
                    self.content=vkbeautify.xml(res.data);
                })
                .catch(function(response){
                    if(response.status=='404'){
                        createItem();
                    }
                })
        }
        function createItem(){
            $http.get(stuffHost+'/apiStore/createSitemap')
                .then(function(res) {
                    self.content=vkbeautify.xml(res.data);
                })
        }
    }
})()

