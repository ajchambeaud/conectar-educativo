var app = angular.module('app');

app.controller('MisRecursosController', function($http, $scope, $timeout, DataBus, DescargasFactory){
  var misRecursos = this;

  misRecursos.recursos = null;
  $scope.data.descargas_en_curso = DescargasFactory.descargas_en_curso;

  $http.get('/recursos').success(function(data){
    misRecursos.recursos = data;
    console.log(data);
  });

   $scope.$on("$destroy", function(event) {
     if (timer)
       $timeout.cancel(timer);
   });


  DataBus.on('descarga', $scope, function(data) {
    alert(data);
  });

  /* Observa los datos accesibles desde aquí constantemente, porque
     descargasFactory cambia periódicamente.
   */
  var timer = null;
  function actualizar() {
    timer = $timeout(actualizar, 500, true);
  }
  actualizar();


  $scope.test_descargar = function() {
    var detalle_video = '{"status":{"code":200,"message":"Ok"},"result":{"url":"http://s.api.educ.ar/repositorio/Video/ver?file_id=184699ba-0fed-4247-8ba5-ecd66b3660b9&rec_id=123030","audio_descripcion":{"enabled":false},"closed_caption":{"enabled":false},"id":123030,"titulo":"TVJP - Clase 3 - Video 2 - estructura e imagenes nuevas","descripcion":"Tutorial Pilas Engine: Estructura e imágenes.","derechos":"","editor":"Educ.ar","formato":"FLV -> video/x-flv","icono_chico":"http://d.api.educ.ar/repositorio/Imagen/ver?image_id=19804ab7-d595-40a2-bae2-56603c5bda83","icono_grande":"http://d.api.educ.ar/repositorio/Imagen/ver?image_id=47b23792-4ef6-4053-b0c1-c91ad2e7f9b8","fecha":"2014-05-22","version":0,"puntaje":0,"etiquetas":[{"id":70207,"descripcion":"videojuego"},{"id":106530,"descripcion":"Pilas Engine"},{"id":70406,"descripcion":"programación"}],"temas":[{"id":3,"descripcion":"Secundaria"}],"idiomas":[{"id":1,"descripcion":"Español"}],"autores":["Educ.ar"],"audiencias":[{"id":2,"descripcion":"Estudiante"}],"screenshots":[]},"entity":"video"}';
    DescargasFactory.descargar_video(JSON.parse(detalle_video));
  }

});
