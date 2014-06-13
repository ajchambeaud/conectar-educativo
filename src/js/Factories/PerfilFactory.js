var app = angular.module('app');
var fs = require('fs');
var path = require('path');

var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
var dir_path = path.join(homedir, ".escritorio-educativo");
var config_path = path.join(dir_path, "config.json");

app.factory("PerfilFactory", function() {
  var obj = {};

  obj.perfil = {};
  obj.perfil.nombre = "hola?";

  obj.cargar = function() {

    // Si no existe el directorio de configuración lo crea.
    if (! fs.existsSync(dir_path))
      fs.mkdirSync(dir_path);

    // Recupera las preferencias desde el archivo .json
    obj.perfil = JSON.parse(fs.readFileSync(config_path));

  }

  obj.guardar = function(nuevo_perfil) {
    obj.perfil = nuevo_perfil;

    // Escribe las preferencias en el archivo.
    fs.writeFile(config_path, angular.toJson(obj.perfil), function(error) {
      if (error)
        alert(error)
    });
  }

  obj.cargar();

  return obj;
});
