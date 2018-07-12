'use strict';

(function () {
    angular.module('gmall.directives').component('dayOfMonth', {
        require: {
            parent: '^dateTimeEntry'
        },
        controller: itemCtrl,
        templateUrl: 'views/template/partials/dateTime/dayOfMonth.html'
    });
    itemCtrl.$inject = ['$scope', 'Booking', '$timeout', '$element', '$compile', 'global'];
    function itemCtrl($scope, Booking, $timeout, $element, $compile, global) {
        var self = this;
        self.setDay = setDay;
        self.filterNumOfDays = filterNumOfDays;
        self.prev = prev;
        self.next = next;
        self.moment = moment;
        self.global = global;
        self.daysOfMonth = [];

        this.$onInit = function () {
            self.$owl = $('body').find('#dayPicker');
            self.$owl.on('initialized.owl.carousel', function (event) {
                //console.log('initialized.owl.carousel')
            });
            activate();
        };
        var carousel_Settings = {
            items: 10,
            nav: false,
            dots: false
        };
        var activate = function activate(reload) {
            if (reload) {}
            //self.$owl.trigger('destroy.owl.carousel')
            //return;

            /*if(self.$owl.data('owlCarousel') && self.$owl.data('owlCarousel').destroy){
                //console.log('destroy')
                self.$owl.data('owlCarousel').destroy();
                return;
            }*/

            /*if(self.$owl.data('owlCarousel') && self.$owl.data('owlCarousel').destroy){
                //console.log('destroy')
                self.$owl.data('owlCarousel').destroy();
            }*/

            var today = new Date();
            var month = self.parent.td.getMonth();
            self.selectedDay = self.parent.td.getDate();
            var year = self.parent.td.getFullYear();
            var currentMonth = today.getMonth();
            var currentday = today.getDate();
            if (month <= currentMonth) {
                self.minDay = currentday;
            } else {
                self.minDay = 1;
            }
            //console.log(month,year)
            var qtyDaysOfMonth = Booking.getDaysOfMonth(month + 1, year);

            if (!reload) {
                var html = '';
                for (var i = self.minDay; i <= qtyDaysOfMonth; i++) {
                    html += '<div class="item" ng-class="{\'active\':' + i + '==$ctrl.selectedDay}"><a  ng-click="$ctrl.setDay(' + i + ')">' + i + '</a></div>';
                }
                /*console.log('self.minDay',self.minDay,qtyDaysOfMonth)
                console.log('html',html)*/
                var linkFn = $compile(html);
                var content = linkFn($scope);
                self.$owl.append(content);
                $timeout(function () {
                    carousel_Settings.startPosition = Number(self.selectedDay) - Number(self.minDay);
                    self.$owl.owlCarousel(carousel_Settings);
                    /*$timeout(()=>{
                     self.$owl.trigger('to.owl.carousel',[Number(self.selectedDay),1,true])
                     },500)*/
                }, 100);
            } else {
                var daysOfMonth = [];
                for (var _i = self.minDay; _i <= qtyDaysOfMonth; _i++) {
                    daysOfMonth.push(_i);
                }
                self.daysOfMonth = daysOfMonth;
                var _html = '';
                for (var _i2 = self.minDay; _i2 <= qtyDaysOfMonth; _i2++) {
                    _html += '<div class="item" ng-class="{\'active\':' + _i2 + '==$ctrl.selectedDay}"><a  ng-click="$ctrl.setDay(' + _i2 + ')">' + _i2 + '</a></div>';
                }
                //let linkFn = $compile(html);
                //let content = linkFn($scope);
                //console.log(content)
                $timeout(function () {
                    self.$owl.trigger('replace.owl.carousel', _html).trigger('refresh.owl.carousel');
                    //self.$owl.owlCarousel( carousel_Settings );
                    $timeout(function () {
                        var html = $('#dayPicker .owl-stage-outer');
                        //console.log(html)
                        $compile(html)($scope);
                        self.$owl.trigger('to.owl.carousel', [Number(self.selectedDay) - Number(self.minDay), 1, true]);
                    });
                });

                /*let delta =qtyDaysOfMonth-self.qtyDaysOfMonth;
                if(delta>0){
                    for(let i=1;i<=delta;i++){
                        let html = '<div class="item"><a  ng-click="$ctrl.setDay(day)">'+Number(self.qtyDaysOfMonth)+i+'</a></div>'
                        console.log(html)
                        self.$owl.trigger('add.owl.carousel', [$(html), Number(self.qtyDaysOfMonth)+i])
                           .trigger('refresh.owl.carousel')
                    }
                    //self.$owl.trigger('add.owl.carousel',[])
                }else if(delta<0){
                  }*/
            }
            self.qtyDaysOfMonth = qtyDaysOfMonth;
        };
        $scope.$watch(function () {
            return self.parent.td;
        }, function (n, o) {
            if (n && o) {
                self.date = n;
                //console.log(self.date)
                var nd = new Date(n);
                var od = new Date(o);
                var nM = nd.getMonth();
                var oM = od.getMonth();
                if (nM != oM) {
                    activate('reload');
                } else {
                    self.selectedDay = self.parent.td.getDate();
                    //console.log(self.selectedDay)
                }
            }
        });
        function setDay(day) {
            self.selectedDay = day;
            self.parent.td.setDate(day);
            self.parent.setDay();
        }
        function filterNumOfDays(item) {
            //return true;
            var i = Number(item);
            if (i >= self.minDay || i <= self.daysOfMonth) {
                return true;
            }
        }
        function prev() {
            console.log('prev');
            self.$owl.trigger('prev.owl.carousel', [self.selectedDay - 3, 300]);
        }
        function next() {
            console.log('next');
            self.$owl.trigger('next.owl.carousel', [self.selectedDay + 3, 300]);
        }
    }
})();
//# sourceMappingURL=dayOfMonth.components.js.map