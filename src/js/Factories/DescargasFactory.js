var fs = require('fs');
var http = require('http');
var path = require('path');
var child = require('child_process');
var ffthumb = require('ffthumb');

var app = angular.module('app');

/*
 * Elimina un directorio completo, por mas que tenga archivos dentro.
 */
function rmdir(directorio) {
  child.execSync('rm -rf ' + directorio);
}


/**
 * Genera una miniatura llamada thumb.png en el directorio del
 * recurso.
 */
function crear_miniatura(directorio) {
  var ruta_completa = path.join(directorio, 'video.mp4');
  var ruta_salida = path.join(directorio, 'thumb.png');

  function on_error(error) {
    alert(error);
  }

  var ff = new ffthumb.obj();

  ff.create(ruta_completa).
     output(ruta_salida).
     size('200').
     error(on_error).
     done();
}


/*
 * Informa si el recurso está en la lista de recursos actualmente en descargas.
 */
function existe_en_lista_descargas_en_curso(obj, id_recurso) {

  var descargas = obj.descargas_en_curso.filter(function(e) {
    return (e.detalle.result.id === id_recurso);
  });

  return (descargas.length > 0);
}


app.factory("DescargasFactory", function(DataBus, PerfilFactory, RecursosFactory) {
  var obj = {};

  obj.descargas_en_curso = [];

  obj.descargar_video = function(detalle_del_video, callback) {
    var id_random = Math.floor(Math.random(1000) * 1000);
    var id_recurso = detalle_del_video.result.id;

    var objeto = {
      id_descarga: id_random,
      progreso: 0,
      transmitido_en_bytes: 0,
      tipo: 'video',
      estado: 'descargando',        /* descargando | terminado | error | cancelado */
      detalle: detalle_del_video,
    }

    var nombre = 'video.mp4';
    var ruta_descargas = PerfilFactory.obtener_path_descargas();
    var directorio_recurso = path.join(ruta_descargas, id_recurso.toString());
    var directorio_recurso_temporal = path.join(ruta_descargas, '_incompleto__' + id_recurso.toString());

    var ruta_completa = path.join(directorio_recurso, nombre);
    var ruta_completa_temporal = path.join(directorio_recurso_temporal, nombre);

    fs.exists(directorio_recurso, function(existe) {

      // Verifica además si el recurso se está descargando ...
      if (fs.existsSync(directorio_recurso_temporal)) {
        console.log("pepe");

        if (existe_en_lista_descargas_en_curso(obj, id_recurso)) {
          existe = true;
        } else {
          // Elimina el directorio, dado que puede ser una descarga vieja, a causa
          // de que el programa ha fallado o algo así.
          rmdir(directorio_recurso_temporal);
        }
      }

      // Evita descargar si ya lo descargó (o si está en curso).
      if (existe) {

        var mensaje_error = "El directorio '" + directorio_recurso + "' ya existe, parece que el recurso ya se descargó.";

        if (callback)
          callback.call(this, mensaje_error, "");

      } else {

        fs.mkdirSync(directorio_recurso_temporal);

        var file = fs.createWriteStream(ruta_completa_temporal);

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

                    // Si la descarga es exitosa ...
                    if (objeto.transmitido_en_bytes == objeto.total_en_bytes) {
                        objeto.transmitido_en_bytes = objeto.total_en_bytes;
                        objeto.progreso = Math.floor((objeto.transmitido_en_bytes / objeto.total_en_bytes) * 100)

                        if (fs.existsSync(directorio_recurso_temporal)) {
                          objeto.estado = 'terminado';
                          fs.renameSync(directorio_recurso_temporal, directorio_recurso);
                          crear_miniatura(directorio_recurso);
                          RecursosFactory.agregar_recurso(objeto.detalle);
                        } else {
                          objeto.estado = 'error';
                        }

                        DataBus.emit('termina-descarga', objeto.detalle);
                    }

                });

                res.on('close', function () {
                    objeto.estado = 'error';
                    rmdir(directorio_recurso_temporal);
                    DataBus.emit('termina-descarga', objeto.detalle);
                });

            }).
            on('error', function() {  /* Si falla el http-get */
                objeto.estado = 'error';
                rmdir(directorio_recurso_temporal);
                DataBus.emit('termina-descarga', {});
            });

        obj.descargas_en_curso.push(objeto);

        DataBus.emit('inicia-descarga', {});
      }
    })
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
