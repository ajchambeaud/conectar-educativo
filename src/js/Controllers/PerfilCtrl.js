var app = angular.module('app');

app.controller('PerfilController', function($scope, PerfilFactory) {

  $scope.data = {};

  /* Se utiliza para deshabilitar el botón guardar. */
  $scope.data.sin_cambios = false;
  $scope.data.perfil = PerfilFactory.perfil;
  $scope.data.perfil.path_descargas = PerfilFactory.obtener_path_descargas();

  /* Busca re-habilitar el botón guardar si se produce algún cambio. */
  $scope.$watch('data.perfil.nombre', function(new_val, old_val) {
    $scope.data.sin_cambios = false;
  });

  $scope.guardar = function() {
    PerfilFactory.guardar($scope.data.perfil);
    $scope.data.sin_cambios = true;
  }

});
