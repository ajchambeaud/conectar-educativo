var app = angular.module('app');

app.controller('NavController', function($scope, DataBus, DescargasFactory) {
  $scope.data = {};
  $scope.data.cantidad_descargas_en_curso = 0;

  DataBus.on('inicia-descarga', $scope, function(data) {
    $scope.data.cantidad_descargas_en_curso = DescargasFactory.obtener_cantidad_descargas_en_curso();
  });
});
