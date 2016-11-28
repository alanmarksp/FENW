(function () {
    'use strict';

    angular.module('padelUpmApp')
        .factory('logoutService', logoutService);

    logoutService.$inject = ['$location', 'tokenService'];

    function logoutService($location, tokenService) {
        return {
            logout
        };

        function logout() {
            tokenService.setToken('');
            $location['path']('/');
        }
    }
})();