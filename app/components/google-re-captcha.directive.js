(function () {
    'use strict';

    angular.module('padelUpmApp')
        .directive('googleReCaptcha', googleReCaptcha);

    googleReCaptcha.$inject = ['$timeout', 'googleReCaptchaService'];

    function googleReCaptcha($timeout, googleReCaptchaService) {
        const scope = {
            response: '=ngModel'
        };

        return {
            restrict: 'E',
            require: "ngModel",
            scope,
            link
        };

        function link(scope, element, attributes, ctrl) {
            googleReCaptchaService.getReCaptcha().then(function (grecaptcha) {
                grecaptcha.render(
                    element[0], {
                        sitekey: attributes.key,
                        callback,
                        'expired-callback': callback
                    }
                );
            });

            validate();

            function callback(response) {
                scope.response = response;
                validate();
            }

            function validate() {
                if (ctrl) {
                    $timeout(function () {
                        ctrl.$setValidity('reCaptcha', Boolean(scope.response));
                    });
                }
            }
        }
    }
})();