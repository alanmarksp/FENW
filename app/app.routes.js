(function () {
    'use strict';

    angular.module('padelUpmApp')
        .config(routes);

    routes.$inject = ['$routeProvider'];

    function routes($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/sections/home/home.html'
            })
            .when('/login/', {
                templateUrl: 'app/sections/login/login.html',
                controller: 'LoginController as loginCtrl'
            })
            .when('/register/', {
                templateUrl: 'app/sections/register/register.html'
            })
            .when('/services/', {
                templateUrl: 'app/sections/services/services.html'
            })
            .when('/facilities/', {
                templateUrl: 'app/sections/facilities/facilities.html'
            })
            .when('/reservations/', {
                templateUrl: 'app/sections/reservations/reservations.html'
            })
            .otherwise('/');
    }
})();