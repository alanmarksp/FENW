(function () {
    'use strict';

    angular.module('padelUpmApp')
        .config(config);

    config.$inject = ['toastr'];

    function config(toastr) {
        toastr.options = {
            "closeButton": true,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
        };
    }
})();