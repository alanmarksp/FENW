angular.module('padelUpmApp', [
    'ngRoute'
]);

angular.module('padelUpmApp').config(['$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {

        $routeProvider.when('/', {
            template: ''
        }).otherwise('/');
    }
]);