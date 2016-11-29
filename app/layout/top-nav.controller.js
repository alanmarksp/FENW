(function () {
    'use strict';

    angular.module('padelUpmApp')
        .controller('TopNavController', TopNavController);

    TopNavController.$inject = ['$location', 'tokenService', 'logoutService'];

    function TopNavController($location, tokenService, logoutService) {
        const vm = this;
        vm.logout = logoutService.logout;
        vm.isActive = isActive;
        vm.isLoggedIn = tokenService.isLoggedIn;
        
        function isActive(viewLocation) {
            return viewLocation === $location['path']();
        }
    }
})();