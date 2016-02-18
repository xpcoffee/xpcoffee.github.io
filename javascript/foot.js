(function() {
    var app = angular.module('foot', []);

    app.directive('foot', function() {
        return {
            restrict: 'E',
            templateUrl: 'foot.html',
            controller: function() {
            },
            controllerAs: 'foot'
        };
    });

})();