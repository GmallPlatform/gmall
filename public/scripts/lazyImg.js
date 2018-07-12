// http://kvasnicak.info/2014/08/04/lazy-loading-images-using-angularjs
angular.module('lazyImg', []).service(
    'scrollAndResizeListener', function($window, $document, $timeout) {
        var id = 0,
            listeners = {},
            scrollTimeoutId,
            resizeTimeoutId;

        function invokeListeners() {
            var clientHeight = $document[0].documentElement.clientHeight,
                clientWidth = $document[0].documentElement.clientWidth;

            for (var key in listeners) {
                if (listeners.hasOwnProperty(key)) {
                    listeners[key](clientHeight, clientWidth); // call listener with given arguments
                }
            }
        }


        $window.addEventListener('scroll', function() {
// cancel previous timeout (simulates stop event)
            $timeout.cancel(scrollTimeoutId);

// wait for 200ms and then invoke listeners (simulates stop event)
            scrollTimeoutId = $timeout(invokeListeners, 200);
        });


        $window.addEventListener('resize', function() {
            $timeout.cancel(resizeTimeoutId);
            resizeTimeoutId = $timeout(invokeListeners, 200);
        });


        return {
            bindListener: function(listener) {
                var index = ++id;

                listeners[id] = listener;

                return function() {
                    delete listeners[index];
                }
            }
        };
    }
);

angular.module('lazyImg').directive(
    'imageLazySrc', function ($document, scrollAndResizeListener,$timeout) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attributes) {
                //console.log($attributes)
                var listenerRemover;
                //console.log($element.offsetParent())
                function isInView(clientHeight, clientWidth) {
                    //console.log($attributes.imageLazySrc);
// get element position
                    var imageRect = $element[0].getBoundingClientRect();
                    //console.log(imageRect.top,imageRect.bottom,clientHeight);
                    //console.log((imageRect.top >= 0 && imageRect.bottom <= (clientHeight+250)) )

                    if (
                        (imageRect.top >= 0 && imageRect.bottom <= (clientHeight+800))

                    ) {
                        //console.log(photoHost+'/'+$attributes.imageLazySrc)

                        //$attributes.$set('ng-src',$attributes.imageLazySrc)
                        $element[0].src = photoHost+'/'+$attributes.imageLazySrc; // set src attribute on element (it will load image)
                        //console.log($attributes.name,$element[0].src)

// unbind event listeners when image src has been set
                        listenerRemover();
                    }
                }

// bind listener
                listenerRemover = scrollAndResizeListener.bindListener(isInView);

// unbind event listeners if element was destroyed
// it happens when you change view, etc
                $element.on('$destroy', function () {
                    listenerRemover();
                });


// explicitly call scroll listener (because, some images are in viewport already and we haven't scrolled yet)
                $timeout(function(){
                    isInView(
                        $document[0].documentElement.clientHeight,
                        $document[0].documentElement.clientWidth
                    );
                },200)

            }
        };
    }
);