var app = angular.module('app');

app.directive('indicadorRed', function($http){
  return {
    restrict: 'E',
    template: "<a id='connection-status-btn' class='btn btn-sm btn-default' ng-class='data.red.class'>{{data.red.texto}}</a>",
    controller: function($scope, RedFactory){
      $scope.data = {};
      $scope.data.red = RedFactory;
    }
  };
});
