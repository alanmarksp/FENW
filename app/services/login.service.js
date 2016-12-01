(function () {
    'use strict';

    angular.module('padelUpmApp')
        .factory('loginService', loginService);

    loginService.$inject = ['$http', 'tokenService'];

    function loginService($http, tokenService) {
        return {
            performLogin
        };

        function performLogin(params) {
            return $http({
                method: 'GET',
                url: 'http://salonso.etsisi.upm.es/miw_serv/padel/conexion.php',
                params: params
            }).then(handleResponse);
        }

        function handleResponse(response) {
            const token = response.headers()['token'];

            if (token) {
                tokenService.setToken(token);
                return '';
            }
            else {
                return response.data['errorMessage'];
            }
        }
    }
})();