'use strict';
angular.module('gmall.services')
.directive('googleMap', function() {
    // directive link function
    var link = function(scope, element, attrs) {
        var map, infoWindow;
        var markers = [];

        // map config
        var mapOptions = {
            center: {lat: 44.540, lng: -78.546},
                //new google.maps.LatLng(50, 2),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };

        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }

        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array

            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }

        // show the map and place some markers
        initMap();

        setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
        setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
        setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
    };

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
})
.directive('staticPages22',function(){
    function staticPagesCtrl(Stat,$state){
        var self = this;
        self.$state=$state;
        Stat.query().$promise.then(function(res){
            res.shift();
            self.items=res
        })
        self.movedItem = function(){
            console.log(self.items.map(function(e){return e.name}))
        }
        self.saveField=function(item,field){
            var o={_id:item._id};
            o[field]=item[field];
            Stat.save({update:field},o)
        }
    }
    return {
        scope: {},
        bindToController: true,
        controller: staticPagesCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'components/staticPage/staticPages.html',
    }
} )
