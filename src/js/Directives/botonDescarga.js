var app = angular.module('app');

app.directive('botonDescarga', function() {

  return {
    restrict: 'E',
    scope: {
      recurso: '=recursoId'
    },
    template:
              "<a ng-show='data.estado === \"\"' href class='btn btn-success'>{{data}}Descargar</a>" +
              "<a ng-show='data.estado === \"descargando\"' href disabled class='btn btn-success'><img src='img/spinner.gif'> Descargando ...</a>" +
              "<a ng-show='data.estado === \"descargado\"' href class='btn btn-success'>Abrir offline</a>" +
              "<a ng-show='data.estado === \"error\"' href class='btn btn-danger'>Descarga fallida</a>",
    controller: function($scope, RecursosFactory, DescargasFactory){
      $scope.data = {};
      //$scope.data.estado = "";

      var id = $scope.recurso;
      $scope.data.id = id;

      //$scope.data.estado = "descargando";
      //$scope.data.estado = "descargado";
      $scope.data.estado = "error";


      RecursosFactory.consultar_si_existe_recurso(id, function(resultado) {
        if (resultado) {
          $scope.data.estado = "descargado";
        } else {

          if (DescargasFactory.existe_descarga_en_curso(id))
            $scope.data.estado = "descargando";
          else
            $scope.data.estado = "";
        }
      });
    }
  };
});
