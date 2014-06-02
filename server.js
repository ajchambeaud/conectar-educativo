var
  express = require("express"),
  path = require("path"),
  nedb = require('nedb'),
  http = require('http');
  databaseUrl = "db/recursos.db";


var db = {
  recursos: new nedb({ filename: databaseUrl, autoload: true })
};

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser()),
  app.use(express.static(path.join(__dirname, 'public')));
  //Se crea directorio para servir archivos JSON estaticos a fin de hacer pruebas sin conexión a la API
  //Eliminar en versión final
  app.use("/dummyJSON", express.static(__dirname + '/dummyJSON'));
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
	var options = {
	  host: 'localhost',
	  port: 3000,
	  path: '/dummyJSON/recursos.temas.json',
	  method: 'GET'
	};
	http.request(options, function(response) {
		var responseString = '';

		response.on('data', function(data) {
			responseString += data;
		});

		response.on('end', function() {
			console.log(responseString);
			var responseObject = JSON.parse(responseString);
			res.send(responseObject);
		});
	}).end();
});

app.get('/juegos', function(req, res){
	var options = {
	  host: 'localhost',
	  port: 3000,
	  path: '/dummyJSON/recursos.juegos.json',
	  method: 'GET'
	};
	http.request(options, function(response) {
		var responseString = '';

		response.on('data', function(data) {
			responseString += data;
		});

		response.on('end', function() {
			console.log(responseString);
			var responseObject = JSON.parse(responseString);
			res.send(responseObject);
		});
	}).end();
});

app.get('/juego/:id', function(req, res){
	var options = {
	  host: 'localhost',
	  port: 3000,
	  path: '/dummyJSON/recurso.juego.json',
	  method: 'GET'
	};
	http.request(options, function(response) {
		var responseString = '';

		response.on('data', function(data) {
			responseString += data;
		});

		response.on('end', function() {
			console.log(responseString);
			var responseObject = JSON.parse(responseString);
			res.send(responseObject);
		});
	}).end();
});

app.get('/videos', function(req, res){
	var options = {
	  host: 'localhost',
	  port: 3000,
	  path: '/dummyJSON/recursos.videos.json',
	  method: 'GET'
	};
	http.request(options, function(response) {
		var responseString = '';

		response.on('data', function(data) {
			responseString += data;
		});

		response.on('end', function() {
			console.log(responseString);
			var responseObject = JSON.parse(responseString);
			res.send(responseObject);
		});
	}).end();
});

app.get('/infografias', function(req, res){
	var options = {
	  host: 'localhost',
	  port: 3000,
	  path: '/dummyJSON/recursos.infografias.json',
	  method: 'GET'
	};
	http.request(options, function(response) {
		var responseString = '';

		response.on('data', function(data) {
			responseString += data;
		});

		response.on('end', function() {
			console.log(responseString);
			var responseObject = JSON.parse(responseString);
			res.send(responseObject);
		});
	}).end();
});

app.get('/secuencias', function(req, res){
	var options = {
	  host: 'localhost',
	  port: 3000,
	  path: '/dummyJSON/recursos.secuencias.json',
	  method: 'GET'
	};
	http.request(options, function(response) {
		var responseString = '';

		response.on('data', function(data) {
			responseString += data;
		});

		response.on('end', function() {
			console.log(responseString);
			var responseObject = JSON.parse(responseString);
			res.send(responseObject);
		});
	}).end();
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
