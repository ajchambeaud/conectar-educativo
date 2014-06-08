var app = angular.module('app');

app.directive('loader', function ($rootScope) {

    return function ($scope, element, attrs) {
        $scope.$on("loader_show", function () {
            return $(element).show();
        });

        return $scope.$on("loader_hide", function () {
            return $(element).hide();
        });
    };
});
