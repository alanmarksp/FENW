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
                controller: 'LoginController',
                controllerAs: 'loginCtrl',
                resolve: {
                    "check": function($location, tokenService, toastr){
                        if(tokenService.isLoggedIn()){
                            $location.path('/');
                            toastr.info('Ya estas conectado');
                        }
                    }
                }
            })
            .when('/register/', {
                templateUrl: 'app/sections/register/register.html',
                controller: 'RegisterController',
                controllerAs: 'registerCtrl',
                resolve: {
                    "check": function($location, tokenService, toastr){
                        if(tokenService.isLoggedIn()){
                            $location.path('/');
                            toastr.info('Ya estas conectado');
                        }
                    }
                }
            })
            .when('/services/', {
                templateUrl: 'app/sections/services/services.html'
            })
            .when('/facilities/', {
                templateUrl: 'app/sections/facilities/facilities.html'
            })
            .when('/reservations/', {
                templateUrl: 'app/sections/reservations/reservations.html',
                controller: 'ReservationsController',
                controllerAs: 'reservationsCtrl',
                resolve: {
                    "check": function($location, tokenService, toastr){
                        if(!tokenService.isLoggedIn()){
                            $location.path('/');
                            toastr.error('Accesso denegado', 'Error');
                        }
                    }
                }
            })
            .otherwise('/');
    }
})();