(function () {
    'use strict';

    angular.module('padelUpmApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['loginService'];

    function LoginController(loginService) {
        const vm = this;

        vm.username = '';
        vm.password = '';
        vm.reCaptcha = '';

        vm.errorMessage = '';

        vm.submitLogin = submitLogin;

        function submitLogin(loginForm) {
            if (loginForm.$invalid) {
                vm.errorMessage = "Debe rellenar todos los campos";
            }
            else {
                const params = {
                    id: vm.username,
                    password: vm.password
                };

                loginService.performLogin(params)
                    .then(loginCallback);
            }
        }

        function loginCallback(errorMessage) {
            vm.errorMessage = errorMessage;
        }
    }
})();