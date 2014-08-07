var app = angular.module('app');

app.controller('DescargasController', function($http, $scope, $timeout, DataBus, DescargasFactory, RecursosFactory) {
  var timer = null;
  var misRecursos = this;

  $scope.data.descargas_en_curso = DescargasFactory.descargas_en_curso;
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
  });

  /* Observa los datos accesibles desde aquí constantemente, porque
     descargasFactory cambia periódicamente.
   */
  function actualizar() {
    timer = $timeout(actualizar, 500, true);
  }

  actualizar();

  $scope.cancelar = function(recurso) {
    recurso.estado = "cancelado";
  }

  $scope.borrar = function(recurso) {
    DescargasFactory.borrar_descarga(recurso);
  }

  $scope.test_descargar = function() {
    var detalle_video = '{"status":{"code":200,"message":"Ok"},"result":{"url":"http://s.api.educ.ar/repositorio/Video/ver?file_id=184699ba-0fed-4247-8ba5-ecd66b3660b9&rec_id=123030","audio_descripcion":{"enabled":false},"closed_caption":{"enabled":false},"id":123030,"titulo":"TVJP - Clase 3 - Video 2 - estructura e imagenes nuevas","descripcion":"Tutorial Pilas Engine: Estructura e imágenes.","derechos":"","editor":"Educ.ar","formato":"FLV -> video/x-flv","icono_chico":"http://d.api.educ.ar/repositorio/Imagen/ver?image_id=19804ab7-d595-40a2-bae2-56603c5bda83","icono_grande":"http://d.api.educ.ar/repositorio/Imagen/ver?image_id=47b23792-4ef6-4053-b0c1-c91ad2e7f9b8","fecha":"2014-05-22","version":0,"puntaje":0,"etiquetas":[{"id":70207,"descripcion":"videojuego"},{"id":106530,"descripcion":"Pilas Engine"},{"id":70406,"descripcion":"programación"}],"temas":[{"id":3,"descripcion":"Secundaria"}],"idiomas":[{"id":1,"descripcion":"Español"}],"autores":["Educ.ar"],"audiencias":[{"id":2,"descripcion":"Estudiante"}],"screenshots":[]},"entity":"video"}';

    DescargasFactory.descargar_video(JSON.parse(detalle_video), function(error, data) {
      if (error) {
        alert(error);
      } else {
        RecursosFactory.agregar_recurso(JSON.parse(detalle_video));
      }
    });
  }

  $scope.test_descargar_rapido = function() {
    var detalle_video = '{"status":{"code":200,"message":"Ok"},"result":{"url":"http://s.api.educ.ar/repositorio/Video/ver?file_id=51c6829e-2115-4dbd-af68-edae1eef9483&rec_id=122967","audio_descripcion":{"enabled":false},"closed_caption":{"enabled":false},"id":122967,"titulo":"Historia de la velocidad","descripcion":"¿Querés llegar rápido? Conocé los límites y respetá la velocidad.","derechos":"","editor":"Educ.ar","formato":"FLV -> video/x-flv","icono_chico":"http://d.api.educ.ar/repositorio/Imagen/ver?image_id=5a61e77a-4765-4f73-a107-c62ee19a618c","icono_grande":"http://d.api.educ.ar/repositorio/Imagen/ver?image_id=46d38b84-591d-4039-864e-c434973e6291","fecha":"2014-05-20","version":2,"puntaje":0,"etiquetas":[{"id":90291,"descripcion":"seguridad vial"},{"id":90001,"descripcion":"educación vial"}],"temas":[{"id":2,"descripcion":"Primaria"},{"id":3,"descripcion":"Secundaria"}],"idiomas":[{"id":1,"descripcion":"Español"}],"autores":["Educ.ar"],"audiencias":[{"id":2,"descripcion":"Estudiante"},{"id":4,"descripcion":"Familia"}],"screenshots":[]},"entity":"video"}';

    DescargasFactory.descargar_video(JSON.parse(detalle_video), function(error, data) {
      if (error) {
        alert(error);
      } else {
        RecursosFactory.agregar_recurso(JSON.parse(detalle_video));
      }
    });

  }

});
