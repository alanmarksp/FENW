(function () {
    angular.module('padelUpmApp')
        .controller('ReservationsController', ReservationsController);

    ReservationsController.$inject = ['reservationsService'];

    function ReservationsController(reservationsService) {
        const vm = this;

        vm.reservationsForm = null;

        vm.availableCourts = null;

        vm.reservationDate = '';

        vm.submitReservationDate = submitReservationDate;

        function submitReservationDate() {
            const params = {
                day: vm.reservationDate
            };

            reservationsService.performReservationsRequest(params)
                .then(reservationsCallback);
        }

        function reservationsCallback(data) {
            vm.availableCourts = data;
        }
    }
})();