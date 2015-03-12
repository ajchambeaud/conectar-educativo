var nedb = require('nedb');
var path = require('path');
var fs = require('fs');

var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
var dir_path = path.join(homedir, ".conectar-educativo");
var databaseUrl = path.join(dir_path, "recursos.db");


var db = new nedb({filename: databaseUrl, autoload: true});

db.remove({}, {multi: true}, function (err, numRemoved) {
  console.log("Eliminando " + numRemoved + " elementos.");
});
