angular.module('padelUpmApp', [
    'ngRoute'
]);

angular.module('padelUpmApp').config(['$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'templates/index.html'
            })
            .when('/register', {
                template: 'register'
            })
            .when('/login', {
                template: 'login'
            })
            .otherwise('/');
    }
]);