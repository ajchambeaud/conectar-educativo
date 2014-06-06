var app = angular.module('app');

app.controller('MainController', function($scope, usSpinnerService) {

    $scope.startSpin = function(){
      usSpinnerService.spin('spinner-1');
    }

    $scope.stopSpin = function(){
      usSpinnerService.stop('spinner-1');
    }

    $scope.startSpin();
});
