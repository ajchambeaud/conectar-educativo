var app = angular.module('app');

/*
 * Filtra una lista de recursos pero conservando los que realmente
 * existan en el directorio de recursos, y que no estén dos o mas
 * veces en la lista original.
 */
function filtrar_existentes_y_no_duplicados(lista_de_recursos, path_recursos) {
  var recursos = lista_de_recursos;
  var listado_directorios = fs.readdirSync(path_recursos);

  var recursos_filtrados = recursos.filter(function(e) {
    return (listado_directorios.indexOf(e.result.id.toString()) > -1);
  });

  var tmp_agregados = [];
  var recursos_sin_duplicar = [];

  for (var i in recursos_filtrados) {
    var item = recursos_filtrados[i];
    var item_id = item.result.id;

    if (tmp_agregados.indexOf(item_id) === -1) {
      tmp_agregados.push(item_id);
      recursos_sin_duplicar.push(item);
    }
  }

  return recursos_sin_duplicar;
}




app.controller('MisRecursosController', function($http, $scope, $timeout, DataBus, DescargasFactory, RecursosFactory, PerfilFactory, $modal) {
  var timer = null;
  var misRecursos = this;

  $scope.data.recursos_almacenados = null;
  $scope.data.tipo_de_vista = 'lista';


  function actualizar_listado_recursos() {
    RecursosFactory.listar_recursos(function(data) {
      var path_recursos = PerfilFactory.obtener_path_descargas();
      $scope.data.recursos_almacenados = filtrar_existentes_y_no_duplicados(data, path_recursos);
    }, function(error) {
      console.log(error);
    });
  }

  actualizar_listado_recursos();

  $scope.$on("$destroy", function(event) {
    if (timer)
      $timeout.cancel(timer);
  });

  $scope.abrir = function(recurso) {

    var ModalDetalleVideoOfflineCtrl = function ($scope, $modalInstance, detalle) {
      $scope.data = {};
      $scope.data.detalle = detalle;

      var ruta_descargas = PerfilFactory.obtener_path_descargas();
      var path_recurso = path.join(ruta_descargas, detalle.id.toString(), 'video.mp4');
      $scope.data.path_recurso = path_recurso;

      $scope.ok = function () {
        $modalInstance.close();
      };

    };

    var template = 'templates/modal_offline_detalle_video.html';
    var modalInstance = $modal.open({
      templateUrl: template,
      controller: ModalDetalleVideoOfflineCtrl,
      resolve: {
        detalle: function() {return recurso;}
      }
    });
    
  }

  // Cuando termina la descarga actualiza el listado de mis-recursos.
  DataBus.on('termina-descarga', $scope, function(data) {
    actualizar_listado_recursos();

    RecursosFactory.listar_recursos(function(data) {
      console.log(data);
    }, function(error) {
      console.log(error);
    });

  });

  $scope.path_recursos = PerfilFactory.obtener_path_descargas();

  /* Observa los datos accesibles desde aquí constantemente, porque
     descargasFactory cambia periódicamente.
   */
  function actualizar() {
    timer = $timeout(actualizar, 500, true);
  }

  actualizar();
});
