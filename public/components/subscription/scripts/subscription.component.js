'use strict';
(function(){

    angular.module('gmall.services')
        .directive('iSubscription',itemDirective);
    function itemDirective(){
        return {
            scope: {
                modalClose:'&'
            },
            rescrict:"E",
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: 'components/subscription/subscription.html',
        }
    }
    itemCtrl.$inject=['$q','global','$state','$user','exception']
    function itemCtrl($q,global,$state,$user,exception){
        var self = this;
        self.ok=ok;
        self.email='';
        function ok(form){
            if(!form.$valid) {return}
            $q.when()
                .then(function(){
                    return $user.newUser(null,self.email)
                })
                .then(function(){
                    if(self.modalClose && typeof self.modalClose=='function'){
                        self.modalClose();
                    }
                    var pap;
                    if (global.get('paps' ) && global.get('paps' ).val && (pap=global.get('paps' ).val.getOFA('action','subscription'))){
                        $state.go('thanksPage',{url:pap.url})
                    }
                })
                .catch(function(err){
                    err = err.data;
                    self.errors = {};
                    if (err && err.error){
                        form['email'].$setValidity('mongoose', false);
                        self.errors['email'] = err.error;
                        exception.catcher('подписка')(err.error)
                    } else {
                        exception.catcher('подписка')(err)
                    }
                })
        }
    }
})()
