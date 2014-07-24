var app = angular.module('app');

app.controller('MisRecursosController', function($http, $scope, $timeout, DataBus, DescargasFactory, RecursosFactory) {
  var timer = null;
  var misRecursos = this;

  $scope.data.recursos_almacenados = null;

  function actualizar_listado_recursos() {
    RecursosFactory.listar_recursos(function(data) {
      $scope.data.recursos_almacenados = data;
    }, function(error) {
      console.log(error);
    });
  }

  actualizar_listado_recursos();

  $scope.$on("$destroy", function(event) {
    if (timer)
      $timeout.cancel(timer);
  });

  // Cuando termina la descarga actualiza el listado de mis-recursos.
  DataBus.on('termina-descarga', $scope, function(data) {
    actualizar_listado_recursos();

    RecursosFactory.listar_recursos(function(data) {
      console.log(data);
    }, function(error) {
      console.log(error);
    });
    
  });

  /* Observa los datos accesibles desde aquí constantemente, porque
     descargasFactory cambia periódicamente.
   */
  function actualizar() {
    timer = $timeout(actualizar, 500, true);
  }

  actualizar();

});
