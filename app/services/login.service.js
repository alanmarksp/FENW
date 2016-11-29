(function () {
    'use strict';

    angular.module('padelUpmApp')
        .factory('loginService', ['$http', '$location', 'tokenService', function ($http, $location, tokenService) {
            return {
                performLogin
            };

            function performLogin(params) {
                return $http({
                    method: 'GET',
                    url: 'http://salonso.etsisi.upm.es/miw_serv/padel/conexion.php',
                    params: params
                }).then(function (response) {
                    const token = response.headers()['token'];

                    if (token) {
                        tokenService.setToken(token);
                        $location.path('/');
                        return '';
                    }
                    else {
                        return response.data['errorMessage'];
                    }
                });
            }
        }]);
})();