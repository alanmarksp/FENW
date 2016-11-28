(function () {
    'use strict';

    angular.module('padelUpmApp')
        .factory('tokenService', tokenService);

    function tokenService() {
        const self = this;
        const service = {
            getToken,
            setToken,
            isLoggedIn
        };

        self.token = '';

        return service;

        function getToken() {
            return self.token;
        }

        function setToken(token) {
            self.token = token;
        }

        function isLoggedIn() {
            return !!self.token;
        }
    }
})();