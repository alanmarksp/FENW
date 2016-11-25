angular.module('padelUpmApp', [
    'ngRoute'
]);

angular.module('padelUpmApp').config(['$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'templates/index.html'
            })
            .when('/login/', {
                templateUrl: 'templates/login.html'
            })
            .when('/register/', {
                templateUrl: 'templates/register.html'
            })
            .when('/services/', {
                templateUrl: 'templates/services.html'
            })
            .when('/facilities/', {
                templateUrl: 'templates/facilities.html'
            })
            .when('/reservations/', {
                templateUrl: 'templates/reservations.html'
            })
            .otherwise('/');
    }
]);