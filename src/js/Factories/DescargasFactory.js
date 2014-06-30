var fs = require('fs');
var http = require('http');

var app = angular.module('app');

var ruta_descargas = './';

app.factory("DescargasFactory", function(DataBus) {
  var obj = {};

  obj.descargas_en_curso = [];

  obj.descargar_video = function(detalle_del_video) {
    var objeto = {
      progreso: 0,
      transmitido_en_bytes: 0,
      total_en_bytes: 60321853,            /* TODO: obtener de la API, no se puede calcular de otra forma :( */
      tipo: 'video',
      estado: 'descargando',            /* descargando | terminado | error */
      detalle: detalle_del_video,
    }

    var nombre = (Math.random(0, 1000) + 1000) + '.mp4';
    var ruta_completa = ruta_descargas + nombre;

    var file = fs.createWriteStream(ruta_completa);


    http.get(objeto.detalle.result.url, function(res) {
            console.log("Iniciando descarga del objeto", objeto);

            res.on('data', function(chunk) {
                file.write(chunk);
                objeto.transmitido_en_bytes += chunk.length;
                objeto.progreso = Math.floor((objeto.transmitido_en_bytes / objeto.total_en_bytes) * 100)
                //console.log("Descargando chuck (total " + objeto.transmitido_en_bytes + ")");
            });

            res.on('end', function() {
                console.log("TOTAL", objeto.transmitido_en_bytes);
                objeto.transmitido_en_bytes = objeto.total_en_bytes;
                objeto.estado = 'terminado';
            });

            res.on('close', function (){
                objeto.estado = 'error';
                fs.unlink(ruta_completa);
            });

        }).
        on('error', function() {  /* Si falla el http-get */
            objeto.estado = 'error';
            fs.unlink(ruta_completa);
        });


    obj.descargas_en_curso.push(objeto);

    DataBus.emit('inicia-descarga', {});
  }

  obj.obtener_cantidad_descargas_en_curso = function() {
    return obj.descargas_en_curso.length;
  }

  return obj;
});
