/**
 * Created by Igor on 13.12.2015.
 */
(function() {
    var AppComponent = ng
        .Component({
            selector: 'gmall-order',
            templateUrl: 'order/views/orders.html'
        })
        .Class({
            constructor: function () { }
        });
    document.addEventListener('DOMContentLoaded', function() {
        ng.bootstrap(AppComponent);
    });
})();