(function () {
    angular.module('padelUpmApp')
        .directive('dateToTimestamp', dateToTimestamp);

    function dateToTimestamp() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: true,
            link
        };

        function link(scope, element, attributes, ngModel) {
            ngModel.$formatters.push(formatInput);
            ngModel.$parsers.push(parseOutput);
        }

        function formatInput(value) {
            return value ? new Date(value * 1000) : value;
        }

        function parseOutput(value) {
            return value ? value.getTime() : value;
        }
    }
})();