'use strict';
(function(){
    angular.module('gmall.services')
        .directive('helpComponent',helpComponent)
        .directive('helpCategory',helpCategory)
        .directive('helpStuff',helpStuff);
    function helpComponent(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: helpComponentCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/help/help.component.html',
        }
    };
    helpComponentCtrl.$inject=['Store','$state','global','Confirm','exception','$q','Stuff','Sections'];
    function helpComponentCtrl(Store,$state,global,Confirm,exception,$q,Stuff,Sections) {
        var self = this;
        self.mobile = global.get('mobile').val;
        self.global = global;
        self.$state = $state;
        self.query = {};
        self.paginate = {page: 0, rows: 5, totalItems: 0}

        self.helpStoreId;

        //*******************************************************
        activate();


        function activate(page) {
            $q.when()
                .then(function(){
                    return Store.query({query:{subDomain:'help'}}).$promise
                })
                .then(function (stores) {
                   // console.log(stores)
                    if(!stores || !stores[1]){
                        throw 'error'
                    }
                    self.helpStoreId= stores[1]._id
                    //console.log(self.helpStoreId)
                    Sections.query({store:self.helpStoreId},function(res){
                        res.shift();
                        self.sections=res;
                        //console.log(self.sections)
                        //setCategoriesFromSections(sections)
                    })

                })
                .catch(function(err){
                    if(err){
                        exception.catcher('get help')(err)
                    }
                })
        }
    }

    function helpCategory(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: helpCategoryCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/help/help.category.html',
        }
    };
    helpCategoryCtrl.$inject=['$state','global','Confirm','exception','$q','Stuff','$stateParams','Category'];
    function helpCategoryCtrl($state,global,Confirm,exception,$q,Stuff,$stateParams,Category) {
        var self = this;
        self.mobile = global.get('mobile').val;
        self.global = global;
        self.$state = $state;
        self.query = {};
        //self.helpStoreId;

        //*******************************************************
        activate();
        function activate() {
            $q.when()
                .then(function(){
                    return Stuff.query({store:$stateParams.store,query:{category:$stateParams.category}}).$promise
                })
                .then(function (stuffs) {
                    self.stuffs=stuffs;
                    //console.log(stuffs)
                })
                .then(function () {
                    return Category.get({store:$stateParams.store,_id:$stateParams.category}).$promise
                })
                .then(function (res) {
                    self.category=res;
                })
                .catch(function(err){
                    if(err){
                        exception.catcher('get stuffs')(err)
                    }
                })
        }
    }
    function helpStuff(){
        return {
            scope: {},
            restrict:"E",
            bindToController: true,
            controller: helpStuffCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/help/help.stuff.html',
        }
    };
    helpStuffCtrl.$inject=['$state','global','Confirm','exception','$q','Stuff','$stateParams'];
    function helpStuffCtrl($state,global,Confirm,exception,$q,Stuff,$stateParams) {
        var self = this;
        self.mobile = global.get('mobile').val;
        self.global = global;
        self.$state = $state;
        self.query = {};
        //self.helpStoreId;

        //*******************************************************
        activate();
        function activate() {
            console.log($stateParams)
            $q.when()
                .then(function(){
                    return Stuff.get({_id:$stateParams.stuff,store:$stateParams.store}).$promise
                })
                .then(function (stuff) {
                    if(stuff ){
                        self.stuff=stuff
                    }else{
                        self.stuff=null;
                    }

                })
                .catch(function(err){
                    if(err){
                        exception.catcher('get stuffs')(err)
                    }
                })
        }
    }

})()
