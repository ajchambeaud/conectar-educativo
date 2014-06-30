var app = angular.module('app');

app.controller('NavController', function($scope, DataBus, DescargasFactory) {
  $scope.data = {};
  $scope.data.cantidad_descargas_en_curso = 0;

  function actualizar_contador_de_descargas(data) {
    $scope.data.cantidad_descargas_en_curso = DescargasFactory.obtener_cantidad_descargas_en_curso();
  }

  DataBus.on('inicia-descarga', $scope, actualizar_contador_de_descargas);
  DataBus.on('termina-descarga', $scope, actualizar_contador_de_descargas);
});
