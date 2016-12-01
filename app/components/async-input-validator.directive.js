(function () {
    angular
        .module('padelUpmApp')
        .directive('asyncInputValidator', asyncInputValidator);

    asyncInputValidator.$inject = ['$http', '$q', 'toastr'];

    function asyncInputValidator($http, $q, toastr) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: true,
            link: link
        };

        function link(scope, element, attributes, ngModel) {
            const {url, name} = attributes;

            ngModel.$asyncValidators.invalidField = function (modelValue, viewValue) {
                const params = {
                    [name]: viewValue
                };

                return $http({
                    method: 'GET',
                    url,
                    params
                }).then(handleResponse);
            };

            function handleResponse(response) {
                if (response.data['errorMessage'] === 'no error') {
                    return true;
                }
                else {
                    toastr.error(response.data['errorMessage']);
                    return $q.reject(response.data['errorMessage']);
                }
            }
        }
    }
})();