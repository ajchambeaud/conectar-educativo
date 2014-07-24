var app = angular.module('app');

app.directive('botonAbout', function($http, $modal){

  return {
    restrict: 'E',
    template: "<a href ng-click='mostrar_dialogo_about()' class='boton-about'><i class='glyphicon glyphicon-question-sign'></i></a>",
    controller: function($scope){
      $scope.data = {};
      $scope.mostrar_dialogo_about = function() {

      var ModalAboutCtrl = function ($scope, $modalInstance) {
        $scope.data = {};

          $scope.visitar = function(url) {
            nw.Shell.openExternal(url);
          }

        $scope.ok = function () {
          $modalInstance.close();
        };
      };

      var modalInstance = $modal.open({
        templateUrl: 'templates/modal_about.html',
        controller: ModalAboutCtrl,
      });

      }
    }
  };
});
