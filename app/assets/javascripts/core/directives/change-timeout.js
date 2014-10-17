define(["angular", "underscore"], function(angular, _) {
  function link (scope, elem, attr, ctrl) {
            if (!attr.ngChange) {
                throw new TypeError('ng-change directive not present');
            }
            angular.forEach(ctrl.$viewChangeListeners, function (listener, index) {
                ctrl.$viewChangeListeners[index] = _.debounce(function () {
                    scope.$apply(attr.ngChange);
                }, attr.changeTimeout || 0);
            });
        }
        return function() {
        return {
            require: 'ngModel',
            link: link
        };
        };
    });