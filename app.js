

angular.module('padelUpmApp')
    .controller('HeaderController', ['$scope', '$location', 'tokenService', function ($scope, $location, tokenService) {
        const vm = this;
        vm.currentPath = '';
        vm.token = '';
        vm.logout = logout;

        function updateToken(token) {
            vm.token = token;
        }

        function logout() {
            tokenService.setToken('');
            $location.path('/');
        }

        tokenService.registerObserverCallback(updateToken);

        $scope.$on('$routeChangeSuccess', function (angularEvent, current) {
            vm.currentPath = current['$$route'].originalPath;
        });
    }]);