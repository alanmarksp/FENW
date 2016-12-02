(function () {
    'use strict';

    angular.module('padelUpmApp')
        .factory('reservationsService', reservationsService);

    reservationsService.$inject = ['$http'];

    function reservationsService($http) {
        return {
            performReservationsRequest
        };

        function performReservationsRequest(params) {
            return $http({
                method: 'GET',
                url: 'http://salonso.etsisi.upm.es/miw_serv/padel/disponibilidad.php',
                params: params
            }).then(handleResponse);
        }

        function handleResponse(response) {
            return response.data;
        }
    }
})();