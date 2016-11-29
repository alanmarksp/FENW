(function () {
    'use strict';

    angular.module('padelUpmApp')
        .factory('logoutService', logoutService);

    logoutService.$inject = ['$location', 'tokenService', 'toastr'];

    function logoutService($location, tokenService, toastr) {
        return {
            logout
        };

        function logout() {
            tokenService.setToken('');
            $location['path']('/');
            toastr.success('Se ha cerrado la sesión!!!', 'Logout');
        }
    }
})();