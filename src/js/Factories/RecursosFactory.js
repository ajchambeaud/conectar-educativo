var app = angular.module('app');
var nedb = require('nedb');
var path = require('path');

var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
var dir_path = path.join(homedir, ".escritorio-educativo");
var databaseUrl = path.join(dir_path, "recursos.db");

app.factory("RecursosFactory", function() {
  var obj = {};

  obj.db = new nedb({filename: databaseUrl, autoload: true});

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
