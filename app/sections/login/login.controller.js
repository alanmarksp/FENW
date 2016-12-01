(function () {
    'use strict';

    angular.module('padelUpmApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'toastr', 'loginService'];

    function LoginController($location, toastr, loginService) {
        const vm = this;

        vm.loginForm = null;

        vm.formFields = {
            usernameOrEmail: '',
            password: '',
            reCaptcha: '',
        };

        vm.loading = false;

        vm.submitLogin = submitLogin;

        function submitLogin() {
            if (vm.loginForm.$invalid) {
                toastr.error("Debe rellenar todos los campos", 'Error!!!');
            }
            else {
                const params = {
                    id: vm.formFields.usernameOrEmail,
                    password: vm.formFields.password
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
                $location.path('/');
                toastr.success('Inicio de sesión correcto!!!', 'Login');
            }
        }
    }
})();