var fs = require('fs');
var http = require('http');

var app = angular.module('app');


app.factory("DescargasFactory", function(DataBus, PerfilFactory) {
  var obj = {};

  obj.descargas_en_curso = [];

  obj.descargar_video = function(detalle_del_video) {
    var id_random = Math.floor(Math.random(1000) * 1000);
    var objeto = {
      id_descarga: id_random,
      progreso: 0,
      transmitido_en_bytes: 0,
      tipo: 'video',
      estado: 'descargando',        /* descargando | terminado | error | cancelado */
      detalle: detalle_del_video,
    }

    var nombre = id_random + '.mp4';
    var ruta_descargas = PerfilFactory.obtener_path_descargas();
    var ruta_completa = ruta_descargas + nombre;

    var file = fs.createWriteStream(ruta_completa);

    http.get(objeto.detalle.result.url, function(res) {
            objeto.total_en_bytes = res.headers['content-length'];

            res.on('data', function(chunk) {
                file.write(chunk);
                objeto.transmitido_en_bytes += chunk.length;
                objeto.progreso = Math.floor((objeto.transmitido_en_bytes / objeto.total_en_bytes) * 100)

                if (objeto.estado === 'cancelado') {
                  res.destroy();
                  DataBus.emit('termina-descarga', {});
                }
            });

            res.on('end', function() {
                objeto.transmitido_en_bytes = objeto.total_en_bytes;
                objeto.estado = 'terminado';
                DataBus.emit('termina-descarga', {});
                objeto.progreso = Math.floor((objeto.transmitido_en_bytes / objeto.total_en_bytes) * 100)
            });

            res.on('close', function () {
                objeto.estado = 'error';
                fs.unlink(ruta_completa);
                DataBus.emit('termina-descarga', {});
            });

        }).
        on('error', function() {  /* Si falla el http-get */
            objeto.estado = 'error';
            fs.unlink(ruta_completa);
            DataBus.emit('termina-descarga', {});
        });

    obj.descargas_en_curso.push(objeto);

    DataBus.emit('inicia-descarga', {});
  }

  obj.borrar_descarga = function(recurso) {
    var indice = -1;

    for (var i in obj.descargas_en_curso) {
      if (obj.descargas_en_curso[i].id_descarga === recurso.id_descarga)
        indice = i;
    }

    if (indice > -1)
      obj.descargas_en_curso.splice(indice, 1);
  }

  obj.obtener_cantidad_descargas_en_curso = function() {
    var cantidad = 0;

    for (var i in obj.descargas_en_curso) {
      if (obj.descargas_en_curso[i].estado == 'descargando')
        cantidad += 1;
    }

    return cantidad;
  }

  return obj;
});
