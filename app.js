angular.module('padelUpmApp', [
    'ngRoute'
]);

angular.module('padelUpmApp')
    .config(['$locationProvider', '$routeProvider',
        function ($locationProvider, $routeProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: 'templates/index.html'
                })
                .when('/login/', {
                    templateUrl: 'templates/login.html',
                    controller: 'LoginController as loginCtrl'
                })
                .when('/register/', {
                    templateUrl: 'templates/register.html'
                })
                .when('/services/', {
                    templateUrl: 'templates/services.html'
                })
                .when('/facilities/', {
                    templateUrl: 'templates/facilities.html'
                })
                .when('/reservations/', {
                    templateUrl: 'templates/reservations.html'
                })
                .otherwise('/');
        }
    ]);

angular.module('padelUpmApp')
    .factory('googleReCaptchaService', ['$window', '$q', function ($window, $q) {

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
    }]);

angular.module('padelUpmApp')
    .directive('googleReCaptcha', ['$timeout', 'googleReCaptchaService', function ($timeout, googleReCaptchaService) {

        const scope = {
            response: '=ngModel'
        };
        return {
            restrict: 'E',
            require: "ngModel",
            scope,
            link
        };

        function link(scope, element, attrs, ctrl) {
            googleReCaptchaService.getReCaptcha().then(function (grecaptcha) {
                grecaptcha.render(
                    element[0], {
                        sitekey: attrs.key,
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
    }]);

angular.module('padelUpmApp')
    .factory('tokenService', function () {
        const self = this;
        const observerCallbacks = [];
        self.token = '';

        function registerObserverCallback(callback) {
            observerCallbacks.push(callback);
        }

        function notifyObservers() {
            angular.forEach(observerCallbacks, function (callback) {
                callback(self.token);
            });
        }

        function getToken() {
            return self.token;
        }

        function setToken(token) {
            self.token = token;
            notifyObservers();
        }

        return {
            getToken,
            setToken,
            registerObserverCallback
        };
    });

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

angular.module('padelUpmApp')
    .factory('loginService', ['$http', '$location', 'tokenService', function ($http, $location, tokenService) {
        return {
            performLogin
        };

        function performLogin(params) {
            return $http({
                method: 'GET',
                url: 'http://salonso.etsisi.upm.es/miw_serv/padel/conexion.php',
                params: params
            }).then(function (response) {
                const token = response.headers()['token'];

                if (token) {
                    tokenService.setToken(token);
                    $location.path('/');
                    return '';
                }
                else {
                    return response.data['errorMessage'];
                }
            });
        }
    }]);

angular.module('padelUpmApp')
    .controller('LoginController', ['loginService', function (loginService) {
        const vm = this;

        vm.username = '';
        vm.password = '';
        vm.reCaptcha = '';

        vm.errorMessage = '';

        vm.submitLogin = function (loginForm) {

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

                function loginCallback(errorMessage) {
                    vm.errorMessage = errorMessage;
                }
            }
        };
    }]);