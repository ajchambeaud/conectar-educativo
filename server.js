var
  express = require("express"),
  path = require("path"),
  nedb = require('nedb'),
  http = require('http');
  api = require('educar-api.js');

  // cross platform paths
  var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
  databaseUrl = path.join (homedir, '.escritorio_educativo' ,  'recursos.db');

  console.log('Running on: ' + process.platform);
  console.log('Database: ' + databaseUrl)

  http = require('http'),
  Api = require('educar-api.js'),

  config = require(path.join(homedir, ".escritorio_educativo", "config.json"));

var api = new Api(config.apiKey);

// cross platform paths
var homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
databaseUrl = path.join (homedir, '.escritorio_educativo' ,  'recursos.db');

console.log('Running on: ' + process.platform);
console.log('Database: ' + databaseUrl)

var db = {
  recursos: new nedb({ filename: databaseUrl, autoload: true })
};

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser()),
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/api', function (req, res) {
  res.send('API is running');
});

app.get('/status', function (req, res) {
	require('dns').resolve('www.google.com', function(err) {
	  if (err)
	     res.send('offline');
	  else
	     res.send('online');
	});
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
