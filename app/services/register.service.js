(function () {
    'use strict';

    angular.module('padelUpmApp')
        .factory('registerService', registerService);

    registerService.$inject = ['$http'];

    function registerService($http) {
        return {
            performRegister
        };

        function performRegister(params) {
            return $http({
                method: 'GET',
                url: 'http://salonso.etsisi.upm.es/miw_serv/padel/usuario.php',
                params: params
            }).then(handleResponse);
        }

        function handleResponse(response) {
            return response.data['errorMessage'];
        }
    }
})();