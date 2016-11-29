(function () {
    'use strict';

    angular.module('padelUpmApp')
        .factory('googleReCaptchaService', googleReCaptchaService);

    googleReCaptchaService.$inject = ['$window', '$q'];

    function googleReCaptchaService($window, $q) {
        const deferred = $q.defer();
        const service = {
            getReCaptcha
        };
        let reCaptcha;

        $window.onLoadGoogleReCaptchaCallback = onLoadGoogleReCaptchaCallback;

        if (angular.isDefined($window['grecaptcha'])) {
            callback();
        }

        return service;

        function onLoadGoogleReCaptchaCallback() {
            callback();
        }

        function callback() {
            reCaptcha = $window['grecaptcha'];
            deferred.resolve(reCaptcha);
        }

        function getReCaptcha() {
            if (!!$window['grecaptcha']) {
                return $q.when(reCaptcha);
            }

            return deferred.promise;
        }
    }
})();