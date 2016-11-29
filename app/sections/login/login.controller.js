(function () {
    'use strict';

    angular.module('padelUpmApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['loginService', 'toastr'];

    function LoginController(loginService, toastr) {
        const vm = this;

        vm.username = '';
        vm.password = '';
        vm.reCaptcha = '';
        vm.loading = false;

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

                vm.loading = true;

                loginService.performLogin(params)
                    .then(loginCallback);
            }
        }

        function loginCallback(errorMessage) {
            vm.loading = false;
            if (errorMessage) {
                toastr.error(errorMessage, 'Error!!!');
            }
            else {
                toastr.success('Inicio de sesión correcto!!!', 'Login');
            }
        }
    }
})();