'use strict';

/* Directives */
// for material design
angular.module('gmall.directives')
    .directive('datePicker', ['$window', function($window) {

        return {
            scope: {
                onChange: '&',
                date: '='
            },
            link: function($scope, $element, $attrs) {
                console.log('link')
                var format  = 'YYYY-MM-DD';
                var options = {
                    format: format,
                    time: false,
                };

                if ($attrs.minDate) {
                    if ($attrs.minDate === 'today') {
                        options.minDate = $window.moment();
                    } else {
                        options.minDate = $attrs.minDate;
                    }
                }

                if ($scope.date) {
                    options.currentDate = $scope.date;
                }

                $($element).bootstrapMaterialDatePicker(options);
                $element.on('change', function(event, date) {
                    $scope.$apply(function() {
                        $scope.date = date.format(format);
                        $scope.onChange({
                            date: date
                        });
                    });
                });

                $scope.$watch('date', function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $($element).bootstrapMaterialDatePicker('setDate', newValue);
                    }
                });
            }
        };

    }])
