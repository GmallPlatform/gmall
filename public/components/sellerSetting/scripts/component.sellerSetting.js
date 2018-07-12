'use strict';
angular.module('gmall.services')
.service('Seller', function($resource){
    var Items= $resource('/api/collections/Seller/:_id',{_id:'@_id'});
    this.query=Items.query;
    this.get=Items.get;
    this.delete=Items.delete;
    this.save=Items.save;
})

.directive('sellerSetting11', function(){
    function storeCtrl($q,Seller,global){
        var self = this;
        var $ctrl=self;
        console.log(global.get('seller' ).val)
        Seller.get({_id:global.get('seller' ).val}).$promise.then(function(res){
            //console.log(res)
            self.item=res
        })

    }
    return {
        scope: {
        },
        bindToController: true,
        controller: storeCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/sellerSetting/sellerSetting.html'
    };
})

