var app = angular.module('app');

app.factory("DescargasFactory", function(DataBus) {
  var obj = {};

  obj.descargas_en_curso = [];

  obj.descargar_video = function(detalle_del_video) {
    var objeto = {
      progreso: 0,
      tipo: 'video',
      detalle: detalle_del_video,
    }


    setInterval(function() {
      if (objeto.progreso < 100)
        objeto.progreso += 1;
    }, 500);
    

    obj.descargas_en_curso.push(objeto);

    DataBus.emit('inicia-descarga', {});
  }

  obj.obtener_cantidad_descargas_en_curso = function() {
    return obj.descargas_en_curso.length;
  }

  return obj;
});
