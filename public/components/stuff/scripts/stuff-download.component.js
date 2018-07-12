'use strict';
(function(){

    angular.module('gmall.services')
        .directive('downloadStuffs',directiveFunction)
    function directiveFunction(){
        return {
            scope: {},
            bindToController: true,
            controller: directiveCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/stuff/downloadStuffs.html',
            restrict:'E'
        }
    }
    directiveCtrl.$inject=['Stuff','$rootScope','$q','$uibModal','global','exception','FilterTags','Filters','Confirm','anchorSmoothScroll','$timeout','$anchorScroll','Category','Brands','BrandTags','$window','$http'];
    function directiveCtrl(Stuff,$rootScope,$q,$uibModal,global,exception,FilterTags,Filters,Confirm,anchorSmoothScroll,$timeout,$anchorScroll,Category,Brands,BrandTags,$window,$http){
        anchorSmoothScroll.scrollTo('topPage')
        var self = this;
        self.catalog='prom';
        self.langArr=global.get('store').val.langArr;
        self.lang=global.get('store').val.lang;
        self.currencyArray=global.get('store').val.currencyArr;
        self.currency=global.get('store').val.mainCurrency;
        self.brand='all';
        self.ext='xml'
        self.razdel;
        self.brands=global.get('brands')
        //console.log(global.get('local').val)
        if(global.get('local').val){
            self.link=global.get('store').val.protocol+"://"+global.get('store').val.subDomain+".localhost:8909"
        }else{
            self.link=global.get('store').val.link//stuffHost
        }

        self.link=stuffHost

        self.Items=Stuff;
        self.mobile=global.get('mobile').val;
        self.global=global;
        self.$state=$rootScope.$state;
        self.$stateParams=$rootScope.$stateParams;
        self.query={};
        
        self.dataImage=null;
        self.setLink=setLink;
        self.copyLink=copyLink;
        self.setCollection=setCollection;
        self.deleteCollection=deleteCollection;
        self.setCategory=setCategory;
        self.deleteCategory=deleteCategory;
        self.getStuffs=getStuffs;
        self.getLinkToXMLCatalog=getLinkToXMLCatalog;


        //*******************************************************
        activate();
        function activate() {
            //console.log('downloadStuffs')
        }
        function setLink(){
            var link = self.link+'/downloads/'+global.get('store').val.subDomain.toLowerCase()+'/'+self.lang
                +'/'+self.currency.toLowerCase()+'/'+self.brand+'/catalog_'+((self.razdel)?'razdel_':'')+self.catalog+'.'+self.ext
            return link;
        }
        function copyLink() {
            var val =setLink();
            console.log(val)
            try {
                

                var dummy = document.createElement("input");
                document.body.appendChild(dummy);
                //$(dummy).css('display','none');
                //$(dummy).css('width','100px');
                dummy.setAttribute("id", "dummy_id");
                document.getElementById("dummy_id").value=val;
                dummy.select();
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
                exception.showToaster('info', "Copying text", msg)
                document.body.removeChild(dummy);
            } catch (err) {
                document.body.removeChild(dummy);
                exception.catcher("Copying text")(err);
                console.log('Oops, unable to copy');
            }
        }

        function setCollection() {
            $q.when()
                .then( function () {
                    return BrandTags.select()
                } )
                .then( function (collection) {
                    self.collection = collection;
                } )
        }
        function deleteCollection(){
            self.collection=null;
        }
        function setCategory() {
            $q.when()
                .then( function () {
                    return Category.select()
                } )
                .then( function (category) {
                    self.category = category;
                } )
        }
        function deleteCategory(){
            self.category=null;
        }


        function getLinkToXMLCatalog() {
            return stuffHost+'/downloads/'+global.get('store').val.subDomain.toLowerCase()+
                '/'+global.get('store').val.lang.toLowerCase() +
                '/'+self.currency.toLowerCase()+'/catalog'+
                //'.xlsx';
                '.xml';
        }
        function getStuffs(XML) {
            //http://stackoverflow.com/questions/20822711/jquery-window-open-in-ajax-success-being-blocked
            XML=(XML)?'XML':'';
            var newWindow = window.open("","_blank")
            newWindow.location.href=getLinkToXMLCatalog()

                /*'/downloads/'+global.get('store').val.subDomain.toLowerCase()+
                '/'+global.get('store').val.lang.toLowerCase() +
                '/'+self.currency.toLowerCase()+'/catalog'+
                '.xml';*/
            return;
            var newWindow = window.open("","_blank");
            if(self.category){self.query.category=self.category._id}else{delete self.query.category}
            if(self.collection){self.query.brandTag=self.collection._id}else{delete self.query.collection}
            $http.post(stuffHost+'/api/downloadPrice'+XML+'?currency='+self.currency,self.query).then(
                function(res){
                    //console.log(res);
                    if(XML){
                        newWindow.location.href=stuffHost+res.data.file;
                    }else{
                        newWindow.location.href=stuffHost+'/api/downloadPriceFromFile/'+res.data.file;
                    }

                    //$window.open(stuffHost+'/api/downloadPriceFromFile/'+res.data.file);
                },
                function(res){
                    console.log(res);
                }
            );
            //console.log(self.query)
        }


    }
})()
