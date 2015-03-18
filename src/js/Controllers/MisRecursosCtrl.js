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
    var entity = recurso.entity;
    recurso = recurso.result;
    var ruta_descargas = PerfilFactory.obtener_path_descargas();

    var ModalDetalleVideoOfflineCtrl = function ($scope, $modalInstance, detalle) {
      $scope.data = {};
      $scope.data.detalle = detalle;

      var path_recurso = path.join(ruta_descargas, detalle.id.toString(), 'video.mp4');
      $scope.data.path_recurso = path_recurso;

      $scope.ok = function () {
        $modalInstance.close();
      };

    };

    var ruta_video = path.join(ruta_descargas, recurso.id.toString(), 'video.mp4')
    //var ruta_flash = path.join(ruta_descargas, recurso.id.toString(), 'flash.swf')
    var ruta_html = path.join(ruta_descargas, recurso.id.toString(), 'index.htm')

    if (path.existsSync(ruta_video)) {
      var template = 'templates/modal_offline_detalle_video.html';
      var controller = ModalDetalleVideoOfflineCtrl;

      var modalInstance = $modal.open({
        templateUrl: template,
        controller: controller,
        resolve: {
          detalle: function() {return recurso;}
        }
      });
    }

    //if (path.existsSync(ruta_flash)) {
    //  var gui = require('nw.gui');
    //  gui.Shell.openExternal(ruta_flash);
    //  console.log(ruta_flash);
    //}

    if (path.existsSync(ruta_html)) {
      var gui = require('nw.gui');
      console.log(ruta_html);
      gui.Shell.openExternal('file://'+ruta_html);
    }




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
