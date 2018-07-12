'use strict';

/* Directives */

angular.module('gmall.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  })

 .directive('mongooseError', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            element.on('keydown', function() {
                return ngModel.$setValidity('mongoose', true);
            });
        }
    };
})
 //AngularJS browser autofill workaround by using a directive
//http://stackoverflow.com/questions/14965968/angularjs-browser-autofill-workaround-by-using-a-directive/16800988#16800988
// Form model doesn't update on autocomplete #1460 https://github.com/angular/angular.js/issues/1460
.directive('autoFillableField', function() {
      return {
          restrict: "A",
          require: "?ngModel",
          link: function(scope, element, attrs, ngModel) {
              setInterval(function() {
                  var prev_val = '';
                  if (!angular.isUndefined(attrs.xAutoFillPrevVal)) {
                      prev_val = attrs.xAutoFillPrevVal;
                  }
                  if (element.val()!=prev_val) {
                      if (!angular.isUndefined(ngModel)) {
                          if (!(element.val()=='' && ngModel.$pristine)) {
                              attrs.xAutoFillPrevVal = element.val();
                              scope.$apply(function() {
                                  ngModel.$setViewValue(element.val());
                              });
                          }
                      }
                      else {
                          element.trigger('input');
                          element.trigger('change');
                          element.trigger('keyup');
                          attrs.xAutoFillPrevVal = element.val();
                      }
                  }
              }, 300);
          }
      };
})





.directive( 'hideSpinner', function() {
   return {
       restrict: 'A',
       scope:{hideSpinner:'='},
       link: function( scope, elem, attrs ) {    
          scope.$watch('hideSpinner',function(n,o){
            //console.log(n,o)
            if (n){
                //console.log(elem);
                $(elem).hide();
            }
          })
       }
    }
})



/*----------------------------------------------------*/
/*  Back Top Link
/*----------------------------------------------------*/
.directive('toTop', [function () {
    return {
        restrict: 'C',
        scope:{go:'&'},
        link: function (scope, element, iAttrs) {
            var offset = 200;
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;
            if (scrolled > offset) {                   
                element.addClass('toTopDispalay');
            } else {
                element.addClass('toTopDispalayNone');              
            }
            window.onscroll = function() {
                scrolled = window.pageYOffset || document.documentElement.scrollTop;
                if (scrolled > offset) {                   
                    element.addClass('toTopDispalay');
                    element.removeClass('toTopDispalayNone');
                } else {                 
                    element.removeClass('toTopDispalay');
                    element.addClass('toTopDispalayNone');
                }
            }
            /*element.click(function(event) {
                event.preventDefault();
                scope.go({id:'firstDiv'})
                return false;
            })*/
        }
    };
}])

.directive('pswdCheck', ['$timeout',function ($timeout) {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.pswdCheck;
        $timeout(function(){
            elem.on('keyup', function () {
                scope.$apply(function () {
                    var v = elem.val()===$(firstPassword).val();
                    ctrl.$setValidity('pswdmatch', v);
                });
            });
        },100)

    }
  }
}])

.directive('profileData',['global','User', function(global,User) {
  return {
    restrict: 'E',
    scope:{
      confirmFunction:'&',
      bottomName:'@'
    },
    templateUrl: 'mobile/views/template/profile.html',
    link: function( scope, elem, attrs ) {
      console.log('link')    
      scope.profileSave= function(formProfile) {
        scope.submittedProfile = true;
        if(formProfile.$valid) {
          scope.errors={};
          User.update(global.get('user').val,function(res){
              if (res='OK'){
                scope.submittedProfile=false;
                scope.confirmFunction();
              }
          });
        }
      };    
    }
  }
}])


    // на странице купона
    //http://plnkr.co/edit/11NIZqB3G3KYKI0OChGA?p=preview
    //http://stackoverflow.com/questions/16677304/slide-up-down-effect-with-ng-show-and-ng-animate
    .directive('sliderToggle', function($timeout,$rootScope) {
        return {
            scope:{
                sliderToggle:"="
            },
            restrict: 'AE',
            link: function(scope, element, attrs) {
                var target = element.parent()[0].querySelector('[slider]');
                attrs.expanded = false;
                $rootScope.$on('$includeContentLoaded', function(event) {
                    $timeout(function(){
                        scope.$watch('sliderToggle',function(n){
                            var content = target.querySelector('.slideable_content');
                            if(!n) {
                                content.style.border = '1px solid rgba(0,0,0,0)';
                                var y = content.clientHeight;
                                content.style.border = 0;
                                target.style.height = y + 'px';
                            } else {
                                target.style.height = '0px';
                            }
                        })
                    },10)
                });


                element.bind('click', function() {
                    if (scope.sliderToggle){return;}
                    var content = target.querySelector('.slideable_content');
                    if(!attrs.expanded) {
                        //content.style.border = '1px solid rgba(0,0,0,0)';
                        var y = content.clientHeight;
                        console.log()
                        content.style.border = 0;
                        target.style.height = y + 'px';
                    } else {
                        target.style.height = '0px';
                    }
                    attrs.expanded = !attrs.expanded;
                });
            }
        }
    })
    .directive('slider', function () {
        return {
            restrict:'A',
            compile: function (element, attr) {
                // wrap tag
                var contents = element.html();
                element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

                return function postLink(scope, element, attrs) {
                    // default properties
                    var content = element.parent()[0].querySelector('.slideable_content');
                    attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                    attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                    element.css({
                        //'overflow': 'hidden',
                        'height': '0px',
                        'transitionProperty': 'height',
                        'transitionDuration': attrs.duration,
                        'transitionTimingFunction': attrs.easing
                    });
                };
            }
        };
    })


//https://www.jsnippet.net/snippet/258/pure-javascript-slidetoggle
.directive('slideToggle11', function($timeout) {
    // в корзине применяется для сообщений о применении акции
    return {
        restrict: 'A',
        scope:{
            slideToggle:'='
        },
        link: function(scope, elem, attrs) {
            var querySelector='aaa'+guidGenerator();
            elem.addClass(querySelector)
            var div;
            $timeout(function(){
              div = document.querySelector('.'+querySelector)
              console.log(div)
            },50)
              //console.log(elem)

            
             /*attrs.$observe('slideToggle', function(n){
                //console.log(n);
                var val = scope.$eval(attrs.slideToggle);
                //console.log(val);
                if (val){} else {}
            });*/
            if (!scope.slideToggle) {
              elem.hide();
            }
            scope.$watch('slideToggle',function(n,o){
                console.log(n,o)
                if (n!=o){
                  toggleSlide(div)
                  //toggleSlide(document.querySelector('.text'));
                    //$(elem).slideToggle()
                }
            })

            
        }
    }
})
    .directive('inline', function () {
        return {
            template: '<span >' +
            '<span ng-show="!edit" ng-class="{\'redColor\':!value}">{{value||empty}}</span>' +
            '<span ng-show="!edit" ng-transclude></span>'+
            '<input ng-show="edit" style="width:{{width}}" class="input-inline" type="{{type}}" ng-model="value"/>' +
            '</span>',
            restrict: 'C',
            scope: {
                value: '=',
                empty:"@",
                type:"@",
                width:"@"
            },

            transclude: true,
            link: function (scope, element, attribs) {

                if(!scope.type){
                    scope.type='text';
                }
                if(!scope.width){
                    scope.width='80%';
                }

                /* watch for changes from the controller */
                scope.$watch('inline', function (val) {
                    scope.value = val;
                });

                /* enable inline editing functionality */
                var enablingEditing = function () {
                    scope.edit = true;

                    setTimeout(function () {
                        //console.log(element.children().children('input')[2]);
                        element.children().children('input')[2].focus();
                        element.children().children('input').bind('blur', function (e) {
                            scope.$apply(function () {
                                disablingEditing();
                            });
                        });
                    }, 100);
                };


                /* disable inline editing functionality */
                var disablingEditing = function () {
                    scope.edit = false;
                    scope.inline = scope.value;
                };


                /* set up the default */
                disablingEditing();


                /* when the element with the inline attribute is clicked, enable editing */
                element.bind('click', function (e) {

                    if ((e.target.nodeName.toLowerCase() === 'span') || (e.target.nodeName.toLowerCase() === 'img')) {
                        scope.$apply(function () { // bind to scope
                            enablingEditing();
                        });
                    }
                });

                /* allow editing to be disabled by pressing the enter key */
                element.bind('keypress', function (e) {

                    if (e.target.nodeName.toLowerCase() != 'input') return;

                    var keyCode = (window.event) ? e.keyCode : e.which;

                    if (keyCode === 13) {
                        scope.$apply(function () { // bind scope
                            disablingEditing();
                        });
                    }
                });
            }
        }
    })

    .directive('inlineTextarea', function () {
        return {
            template: '<span >' +
            '<span ng-show="!edit" ng-class="{\'redColor\':!value}">{{value||empty}}</span>' +
            '<span ng-show="!edit" ng-transclude></span>'+
            '<textarea ng-show="edit" style="width:{{width}}" class="textarea-inline" rows="{{rows}}" cols1="{{cols}}" ng-model="value">' +
            '</textarea></span>',
            restrict: 'C',
            scope: {
                value: '=',
                empty:"@",
                rows:"@",
                cols:"@"
            },

            transclude: true,
            link: function (scope, element, attribs) {

                /*if(!scope.cols){
                    scope.cols=100;
                }*/
                if(!scope.rows){
                    scope.rows=5;
                }

                /* watch for changes from the controller */
                scope.$watch('inline', function (val) {
                    scope.value = val;
                });

                /* enable inline editing functionality */
                var enablingEditing = function () {
                    scope.edit = true;

                    setTimeout(function () {
                        console.log(element.children().children('input')[2]);
                        element.children().children('input')[2].focus();
                        element.children().children('input').bind('blur', function (e) {
                            scope.$apply(function () {
                                disablingEditing();
                            });
                        });
                    }, 100);
                };


                /* disable inline editing functionality */
                var disablingEditing = function () {
                    scope.edit = false;
                    scope.inline = scope.value;
                };


                /* set up the default */
                disablingEditing();


                /* when the element with the inline attribute is clicked, enable editing */
                element.bind('click', function (e) {

                    if ((e.target.nodeName.toLowerCase() === 'span') || (e.target.nodeName.toLowerCase() === 'img')) {
                        scope.$apply(function () { // bind to scope
                            enablingEditing();
                        });
                    }
                });

                /* allow editing to be disabled by pressing the enter key */
                element.bind('keypress', function (e) {

                    if (e.target.nodeName.toLowerCase() != 'input') return;

                    var keyCode = (window.event) ? e.keyCode : e.which;

                    if (keyCode === 13) {
                        scope.$apply(function () { // bind scope
                            disablingEditing();
                        });
                    }
                });
            }
        }
    })
    .directive('ngPageslideWrapper', function ($document,$timeout,$rootScope) {
        return {
            restrict: 'A',

            link: function (scope, element, attribs) {
               //console.log(element);
                var wrappedID,wrappedClass;
                $timeout(function(){
                    var queryResult = document.getElementsByTagName("body")[0]
                    wrappedID = angular.element(queryResult);
                    var queryResult1 = document.getElementsByClassName("navbar-nav")[0]
                    wrappedClass = angular.element(queryResult1);
                },200)
                $timeout(function(){
                    element.bind('mouseenter', function (event) {
                        // console.log('mouseenter');
                        wrappedID.css('overflow-y','hidden')
                        wrappedID.css('margin-right','20px')
                        wrappedClass.css('margin-right','20px')
                    });

                    element.bind('mouseleave', function (event) {
                        //console.log('mouseleave');
                        $rootScope.checkedMenu.m=false;
                        console.log($rootScope.checkedMenu)
                        wrappedID.css('overflow-y','scroll')
                        wrappedID.css('margin-right','0')
                        wrappedClass.css('margin-right','0')
                    });
                },300)

            }
        }
    })



var guidGenerator=function() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        console.log((S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()));
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }


'use strict';
    /**
    * getHeight - for elements with display:none
     */
var getHeight = function(el) {
  console.log(el)
        var el_style      = window.getComputedStyle(el),
            el_display    = el_style.display,
            el_position   = el_style.position,
            el_visibility = el_style.visibility,
            el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),

            wanted_height = 0;


        // if its not hidden we just return normal height
        if(el_display !== 'none' && el_max_height !== '0') {
            return el.offsetHeight;
        }

        // the element is hidden so:
        // making the el block so we can meassure its height but still be hidden
        el.style.position   = 'absolute';
        el.style.visibility = 'hidden';
        el.style.display    = 'block';

        wanted_height     = el.offsetHeight;

        // reverting to the original values
        el.style.display    = el_display;
        el.style.position   = el_position;
        el.style.visibility = el_visibility;

        return wanted_height;
    },


    /**
    * toggleSlide mimics the jQuery version of slideDown and slideUp
    * all in one function comparing the max-heigth to 0
     */
    toggleSlide = function(el) {
        var el_max_height = 0;

       /* if(el.getAttribute('data-max-height')) {
            // we've already used this before, so everything is setup
            if(el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
                el.style.maxHeight = el.getAttribute('data-max-height');
            } else {
                el.style.maxHeight = '0';
            }
        } else {
            el_max_height                  = getHeight(el) + 'px';
            el.style['transition']         = 'max-height 0.5s ease-in-out';
            el.style.overflowY             = 'hidden';
            el.style.maxHeight             = '0';
            el.setAttribute('data-max-height', el_max_height);
            el.style.display               = 'block';

            // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
            setTimeout(function() {
                el.style.maxHeight = el_max_height;
            }, 10);
        }*/


        el_max_height                  = getHeight(el) + 'px';
            el.style['transition']         = 'max-height 0.5s ease-in-out';
            el.style.overflowY             = 'hidden';
            el.style.maxHeight             = '0';
            el.setAttribute('data-max-height', el_max_height);
            el.style.display               = 'block';

            // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
            setTimeout(function() {
                el.style.maxHeight = el_max_height;
            }, 10);
    }

/*document.addEventListener("DOMContentLoaded", function(event) { 

  document.querySelector('.showme').addEventListener('click', function(e) {
      toggleSlide(document.querySelector('.text'));
  }, false);
});*/




