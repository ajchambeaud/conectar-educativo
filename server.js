// require node modules
var express = require("express");
var path = require("path");
var nedb = require('nedb');
var http = require('http');
var Api = require('educar-api.js');

// cross platform paths
var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
var databaseUrl = path.join (homedir, '.escritorio-educativo' ,  'recursos.db');
var configPath = path.join(homedir, ".escritorio-educativo", "config.json");

console.log('Running on: ' + process.platform);
console.log('Database: ' + databaseUrl);
console.log('Config: ' + configPath);

var config = require(configPath);

//instance api-wrapper and nedb
var api = new Api(config.apiKey);
var db = {
  recursos: new nedb({ filename: databaseUrl, autoload: true })
};

//create and configure express server
var app = express();
app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser()),
  app.use(express.static(path.join(__dirname, 'public')));
});

//REST api methods for AngularJS app
app.get('/api', function (req, res) {
  res.send('API is running');
});


app.get('/temas', function(req, res){
  var successCallback = function(data) {
    console.log(data);
    var responseObject = JSON.parse(data);
  	res.send(responseObject.result);
  };
  var errorCallback = function(e) {
    console.error(e);
  };
	api.obtenerCatalogacion(errorCallback,successCallback);
});

app.get('/juegos', function(req, res){
	var successCallback = function(data) {
		var responseObject = JSON.parse(data);
		res.send(responseObject.result);
  };
  var errorCallback = function(e) {
    	console.error(e);
  };
	api.buscarJuegos({},errorCallback,successCallback);
});

app.get('/videos', function(req, res){
	var successCallback = function(data) {
		var responseObject = JSON.parse(data);
		res.send(responseObject.result);
    };
    var errorCallback = function(e) {
    	console.error(e);
    };
	api.buscarVideos({},errorCallback,successCallback);
});

app.get('/ebooks', function(req, res){
	var successCallback = function(data) {
		var responseObject = JSON.parse(data);
		res.send(responseObject.result);
    };
    var errorCallback = function(e) {
    	console.error(e);
    };
	api.buscarEbooks({},errorCallback,successCallback);
});

app.get('/infografias', function(req, res){
	var successCallback = function(data) {
		var responseObject = JSON.parse(data);
		res.send(responseObject.result);
    };
    var errorCallback = function(e) {
    	console.error(e);
    };
	api.buscarInfografias({},errorCallback,successCallback);
});

app.get('/secuencias', function(req, res){
	var successCallback = function(data) {
		var responseObject = JSON.parse(data);
		res.send(responseObject.result);
    };
    var errorCallback = function(e) {
    	console.error(e);
    };
	api.buscarSecuencias({},errorCallback,successCallback);
});


app.get('/juego/:id', function(req, res){
	var id = req.params.id;
	var successCallback = function(data) {
		var responseObject = JSON.parse(data);
		res.send(responseObject.result);
    };
    var errorCallback = function(e) {
    	console.error(e);
    };
	api.detalleJuegos(id,errorCallback,successCallback);
});


app.get('/recursos', function (req, res) {
  db.recursos.find({}, function(err, result) {
    res.send(result);
  });
});

app.post('/recurso', function (req, res) {
  var recurso = req.body;
  db.recursos.insert(recurso, function (err, result) {
    if (err) {
      res.send({'error':'ocurrio un error'});
    } else {
      console.log('Success: ' + JSON.stringify(result));
      res.send(result);
    }
  });
});

app.listen(app.get('port'));
console.log('Server listening on port ' + app.get('port'));
