var app = angular.module('app');

app.directive('indicadorRed', function($http){
  return {
    restrict: 'E',
    template: "<a id='connection-status-btn' class='btn btn-sm btn-default pull-right indicador' ng-class='data.red.class'>{{data.red.texto}}</a>",
    controller: function($scope, $window, RedFactory){
      $scope.data = {};
      $scope.data.red = RedFactory;

      $window.addEventListener("offline", function() {
        $scope.$apply(RedFactory.definir_modo_offline());
      }, false);

      $window.addEventListener("online", function() {
        $scope.$apply(RedFactory.definir_modo_online());
      }, false);
    }
  };
});
