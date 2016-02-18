(function() {
    var app = angular.module('navbar', []);

    app.directive('navbar', function() {
        return {
            restrict: 'E',
            templateUrl: 'navbar.html',
            controller: function() {
            },
            controllerAs: 'navbar'
        };
    });

})();