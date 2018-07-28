'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('pns',pnsDirective)
        .directive('pn',pnDirective)


    function pnsDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: itemsCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'bookkeep/components/pn/pns.html',
        }
    }
    function pnDirective(){
        return {
            scope: {},
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'bookkeep/components/pn/pn.html',
        }
    }
    itemsCtrl.$inject=['Pn','$stateParams','global','$q','$uibModal','$timeout','$scope','Confirm','$state']
    function itemsCtrl(Items,$stateParams,global,$q,$uibModal,$timeout,$scope,Confirm,$state){
        var self = this;
        self.mobile = global.get('mobile').val;
        self.global = global;
        self.Items = Items;
        self.moment = moment;
        self.$state = $state;
        self.query = {};
        self.paginate = {page: 0, rows: 20, totalItems: 0}

        self.getList = getList;
        self.searchItem = searchItem;
        self.createItem=createItem;

        function createItem() {
            $state.go('frame.pns.pn',{id:'new'})
        }

        activate();

        function activate() {
            return getList().then(function () {
            }).then(function () {
            });
        }

        function getList() {
            return Items.getList(self.paginate, self.query)
                .then(function (data) {
                    self.items = data;
                    //console.log(self.items)
                });
        }


        function searchItem(searchStr) {
            if (searchStr) {
                self.query = {name: searchStr.substring(0, 10)};
            } else {
                self.query = {};
            }

            self.paginate.page = 0;
            return getList().then(function () {
                console.log('Activated news list View');
            });
        }




    }
    itemCtrl.$inject=['Pn','$stateParams','global','$q','$uibModal','$timeout','$scope','Confirm','exception','$state']
    function itemCtrl(Items,$stateParams,global,$q,$uibModal,$timeout,$scope,Confirm,exception,$state){
        var self = this;
        self.mobile = global.get('mobile').val;
        self.global = global;
        self.Items = Items;
        self.moment = moment;
        self.item={}

        self.createItem=createItem;

        if($stateParams.id!='new'){activate()}
        function activate() {
            return getItem($stateParams.id).then(function() {
            } ).catch(function(err){
                err = err.data||err
                exception.catcher('получение новости')(err)
            });
        }
        function getItem(id) {
            //console.log(id)
            return self.Items.getItem(id)
            //console.log(id)
                .then(function(data) {
                    console.log(data)
                    self.item=data;
                } ).catch(function(err){
                    console.log(err)
                    return $q.reject(err)
                });
        }

        function createItem() {
            if(self.item._id){return}
            $q.when()
                .then(function () {
                    return Items.save(self.item).$promise
                })
                .then(function () {
                    $state.go('frame.pns', undefined, { reload: true })
                })
        }





    }
})()