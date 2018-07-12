'use strict';
(function(){
    angular.module('gmall.directives')
        .directive('ngAutocompleteCity', function($parse,$timeout,global) {
            return {
                scope: {
                    user:'=',
                    change:'&'
                },

                link: function(scope, element, attrs, model,contorller) {
                    var placeChosen=false;
                    setTimeout(function(){
                        activate()
                    },500)
                    function activate(){
                        if(!scope.user){scope.user={}}
                        if(!scope.user.profile){scope.user.profile={}}
                        if(!scope.user.profile.city){scope.user.profile.city=''}
                        element[0].value=scope.user.profile.city;
                        if (scope.gPlace == undefined) {
                            //console.log(google.maps.places)
                            scope.gPlace = new google.maps.places.Autocomplete(element[0], {types: ['(cities)']});
                        }
                        google.maps.event.addListener(scope.gPlace, 'place_changed',place_changed);
                        google.maps.event.addDomListener(element[0], 'keydown', function(e) {
                            if (e.keyCode == 13) {
                                e.preventDefault();
                            }
                            //console.log(scope.user.profile.cityId)
                        });
                    }
                    scope.$watch(function(){return element.val()},function (o,n) {
                        //console.log(o,n)
                        if(n && n!=o && !placeChosen){
                            scope.user.profile.cityId=null;
                            scope.user.profile.city= element.val();
                            //scope.$apply()
                        }
                    })
                    function place_changed() {
                        placeChosen=true;
                        var place = scope.gPlace.getPlace();
                        if(place.place_id){

                            setTimeout(function(){
                                scope.user.profile.city= element.val();
                                $timeout(function () {
                                    scope.user.profile.cityId=place.place_id;
                                },200)

                                scope.$apply()
                                if(scope.change && typeof scope.change=='function'){
                                    scope.change()
                                }
                            },50)
                        }else{
                            scope.cityId=null;
                            scope.user.profile.city= element.val();
                            scope.$apply()
                        }
                        $timeout(function () {
                            placeChosen=false;
                        },1000)
                    }
                }
            };
        });
})()

