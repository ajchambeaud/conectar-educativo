var nedb = require('nedb');
var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var recursos = require('./data.json');


var homedir = (process.platform === 'win32') ? "F:\\conectar-educativo" : "/media/DATOS/conectar-educativo";
var dir_path = path.join(homedir, ".conectar-educativo");
var databaseUrl = path.join(dir_path, "recursos.db");

var db = new nedb({filename: databaseUrl, autoload: true});


_.each(recursos.recursos, function(recurso) {
  console.log("Agregando el recurso     ID: " + recurso.id + "    TITULO: " + recurso.titulo);

  db.insert({
    entity: recurso.entity,
    result: {
      id: recurso.id,
      titulo: recurso.titulo,
      descripcion: recurso.descripcion,
      url: recurso.url
    }
  }, function(err, result) {
    if (err)
      console.log({'Error': err});
  });

});
