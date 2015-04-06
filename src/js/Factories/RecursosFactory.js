var app = angular.module('app');
var nedb = require('nedb');
var path = require('path');
var fs = require('fs');

if (process.platform === 'win32') {
    if (fs.existsSync("F:\\conectar-educativo")) {
        var homedir = "F:\\conectar-educativo";
    }
    else {
        var homedir = process.USERPROFILE;
    }
}
else {
    if (fs.existsSync("/media/DATOS/conectar-educativo")) {
        var homedir = "/media/DATOS/conectar-educativo";
    }
    else {
        var homedir = process.env.HOME;
    }
}

var dir_path = path.join(homedir, ".conectar-educativo");
var databaseUrl = path.join(dir_path, "recursos.db");

app.factory("RecursosFactory", function(PerfilFactory) {
  var obj = {};

  obj.db = new nedb({filename: databaseUrl, autoload: true});

  obj.consultar_si_existe_recurso = function(id, callback) {
    var ruta_descargas = PerfilFactory.obtener_path_descargas();
    var directorio_del_recurso = path.join(ruta_descargas, id.toString());

    fs.exists(directorio_del_recurso, function(status) {
      console.log(status);
      callback.call(this, status);
    });

  }

  obj.listar_recursos = function(callback, error_callback) {

    obj.db.find({}, function(err, result) {
      if (err)
        error_callback(err);
      else
        callback(result);
    });

  }

  obj.agregar_recurso = function(recurso) {

    obj.db.insert(recurso, function(err, result) {
      if (err)
        console.log({'Error': err});
    });
  }

  return obj;
});
