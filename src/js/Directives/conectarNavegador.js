var app = angular.module('app');

app.directive('conectarNavegador', ['RedFactory', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/directives/conectarNavegador.html',
    controller: function($http, $scope, $timeout, RedFactory){

      function obtener_history() {
        var e = document.getElementById('iframe');
        return e.contentWindow.history;
      }

      $scope.avanzar = function() {
        var h = obtener_history();
        h.forward();
      }

      $scope.regresar = function() {
        var h = obtener_history();
        h.back();
      }
    },
  };
}]);
