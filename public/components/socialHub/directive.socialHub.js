'use strict';
(function(){

    angular.module('gmall.directives')
        //.directive('socialHub',itemDirective);
        .component('socialHub',{
            bindings:{
                objShare:'=',
                textCenter:'<',
                item:'<',
                state:'<',
            },
            controller: itemCtrl,
            templateUrl: '/components/socialHub/socialHub.html',
        });
    function itemDirective(){
        return {
            scope: {
                textCenter:'@',
                item:'@',
            },
            bindToController: true,
            controller: itemCtrl,
            controllerAs: '$ctrl',
            templateUrl: '/components/socialHub/socialHub.html',
            restrict:'AE'
        }
    }
    function itemCtrl($scope,global,$location,$timeout,$state,$element){
        //console.log('??????????????????')

        /*$('.rrssb-buttons').rrssb({
            // required:
            title: 'This is the email subject and/or tweet text',
            url: 'http://kurtnoble.com/labs/rrssb/',

            // optional:
            description: 'Longer description used with some providers',
            emailBody: 'Usually email body is just the description + url, but you can customize it if you want'
        });*/
        var self=this;


        self.global=global;


        //self.shareData=global.get('titles').val;
        //console.log(global.get('titles').val)
        self.$onInit=function(){
            /*console.log(self.item)
            console.log($element.data())*/

            $timeout(function () {
                var shareItem=angular.copy(global.get('titles').val);
                if(shareItem.url && shareItem.url.indexOf && shareItem.url.indexOf('http')<0){
                    shareItem.url=global.get('store').val.link+shareItem.url
                }

                if(self.item){
                    if(self.item.url){
                        if($state.current.name=='news' || $state.current.name=='master' || $state.current.name=='stat' || $state.current.name=='campaign' ||$state.current.name=='additional' || $state.current.name=='workplace' ){
                            shareItem.url+='/'+self.item.url
                        }else if($state.current.name=='home'){
                            shareItem.url+='/'+self.state+'/'+self.item.url
                        }
                    }
                    try {
                        if(self.item.name){
                            shareItem.title=self.item.name
                        }
                        if(self.item.desc){
                            shareItem.description=self.item.desc
                        }
                        if(self.item.img){
                            shareItem.image=photoHost+"/"+self.item.img
                        }
                    }catch(err){
                        console.log(err)
                    }
                }
                self.shareItem=shareItem;
               // console.log(self.shareItem)
            },400)
        }

       // console.log(self.shareData)
    }
})()


