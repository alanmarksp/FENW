(function () {
    'use strict';

    angular.module('padelUpmApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', 'toastr', 'registerService'];

    function RegisterController($location, toastr, registerService) {
        const vm = this;

        vm.registerForm = null;

        vm.formFields = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            birthDate: '',
            reCaptcha: '',
        };

        vm.loading = false;

        vm.birthDatePopUp = {
            isOpen: false
        };

        vm.submitRegister = submitRegister;
        vm.validateConfirmPassword = validateConfirmPassword;
        vm.getValidationFeedbackClass = getValidationFeedbackClass;
        vm.getValidationFeedbackIconClass = getValidationFeedbackIconClass;
        vm.getValidationFeedbackButtonClass = getValidationFeedbackButtonClass;
        vm.openBirthDatePopUp = openBirthDatePopUp;

        function submitRegister() {
            if (vm.registerForm.$invalid) {
                toastr.error("Debe rellenar todos los campos", 'Error!!!');
            }
            else {

                vm.loading = true;

                registerService.performRegister(vm.formFields)
                    .then(registerCallback);
            }
        }

        function registerCallback(errorMessage) {
            vm.loading = false;
            if (errorMessage === 'Usuario o email ya existente') {
                toastr.error(errorMessage, 'Error!!!');
            }
            else {
                $location.path('/login/');
                toastr.success(errorMessage, 'Registro');
            }
        }

        function validateConfirmPassword() {
            if (vm.formFields.password === vm.formFields.passwordConfirmation) {
                vm.registerForm.passwordConfirmation.$setValidity('confirmed', true);
            }
            else {
                vm.registerForm.passwordConfirmation.$setValidity('confirmed', false);
            }
        }

        function getValidationFeedbackClass(elementName) {
            if (vm.registerForm[elementName].$dirty) {
                if (vm.registerForm[elementName].$valid) {
                    return 'has-success has-feedback';
                }
                else {
                    return 'has-error has-feedback';
                }
            }
        }

        function getValidationFeedbackIconClass(elementName) {
            if (vm.registerForm[elementName].$dirty) {
                if (vm.registerForm[elementName].$valid) {
                    return 'glyphicon-ok';
                }
                else {
                    return 'glyphicon-remove';
                }
            }
        }

        function getValidationFeedbackButtonClass(elementName) {
            if (vm.registerForm[elementName].$dirty) {
                if (vm.registerForm[elementName].$valid) {
                    return 'btn-success';
                }
                else {
                    return 'btn-danger';
                }
            }
            else {
                return 'btn-default';
            }
        }

        function openBirthDatePopUp() {
            vm.birthDatePopUp.isOpen = true;
        }
    }
})();