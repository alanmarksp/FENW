(function () {
    angular.module('padelUpmApp')
        .controller('ReservationsController', ReservationsController);

    ReservationsController.$inject = ['reservationsService'];

    function ReservationsController(reservationsService) {
        const vm = this;

        vm.reservationsForm = null;

        vm.availableCourts = null;

        vm.reservationsDatePopUp = {
            isOpen: false
        };

        vm.formFields = {
            reservationsDate: ''
        };

        vm.submitReservationDate = submitReservationDate;
        vm.getValidationFeedbackClass = getValidationFeedbackClass;
        vm.getValidationFeedbackButtonClass = getValidationFeedbackButtonClass;
        vm.openReservationsDatePopUp = openReservationsDatePopUp;

        function submitReservationDate() {
            const params = {
                day: vm.formFields.reservationsDate
            };

            reservationsService.performReservationsRequest(params)
                .then(reservationsCallback);
        }

        function reservationsCallback(data) {
            vm.availableCourts = data;
        }

        function getValidationFeedbackClass(elementName) {
            if (vm.reservationsForm[elementName].$dirty) {
                if (vm.reservationsForm[elementName].$valid) {
                    return 'has-success has-feedback';
                }
                else {
                    return 'has-error has-feedback';
                }
            }
        }

        function getValidationFeedbackButtonClass(elementName) {
            if (vm.reservationsForm[elementName].$dirty) {
                if (vm.reservationsForm[elementName].$valid) {
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

        function openReservationsDatePopUp() {
            vm.reservationsDatePopUp.isOpen = true;
        }
    }
})();