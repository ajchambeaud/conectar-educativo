var app = angular.module('app');
var fs = require('fs');
var path = require('path');

var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
var dir_path = path.join(homedir, ".conectar-educativo");
var path_descargas = path.join(homedir, "Compartido/");
var config_path = path.join(dir_path, "config.json");

app.factory("PerfilFactory", function() {
  var obj = {};

  obj.perfil = {};
  obj.perfil.nombre = "...";

  /* Creando el directorio descargas */
  if (!fs.existsSync(path_descargas)) {
    console.log("Creando el directorio para descargas en: " + path_descargas);
    fs.mkdirSync(path_descargas);
  } else {
    console.log("Se usará como directorio de descargas: " + path_descargas);
  }

  obj.obtener_path_descargas = function() {
    /* TODO: obtener en base a preferencias, así el usuario puede cambiar
             esta ruta mas tarde.
     */
    return path_descargas;
  }

  obj.cargar = function() {
    // Si no existe el directorio de configuración lo crea.
    if (!fs.existsSync(dir_path))
      fs.mkdirSync(dir_path);

    // Recupera las preferencias desde el archivo .json
    if (fs.existsSync(config_path)) {
      console.log(config_path);
      obj.perfil = JSON.parse(fs.readFileSync(config_path));
    }
  }

  obj.guardar = function(nuevo_perfil) {
    obj.perfil = nuevo_perfil;

    // Escribe las preferencias en el archivo.
    fs.writeFile(config_path, angular.toJson(obj.perfil), function(error) {
      if (error)
        alert(error);
    });
  }

  obj.cargar();

  return obj;
});
