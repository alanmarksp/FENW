(function () {
    'use strict';

    angular.module('padelUpmApp')
        .directive('ladda', ladda);

    ladda.$inject = ['Ladda'];

    function ladda(Ladda) {
        const scope = {
            ngModel: '=',
            ngDisabled: '='
        };

        return {
            restrict: 'A',
            scope,
            link
        };

        function link(scope, element) {
            const laddaButton = Ladda.create( element[0] );

            scope.$watch('ngModel', function(value){
                if (value) {
                    laddaButton.start();
                }
                else {
                    if (laddaButton.isLoading()) {
                        laddaButton.stop();
                    }
                    if (scope.ngDisabled) {
                        element.attr('disabled', scope.ngDisabled);
                    }
                }
            });

            scope.$on('$destroy', function () {
                if (laddaButton) {
                    laddaButton.remove();
                }
            });
        }
    }
})();