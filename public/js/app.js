(function(){
	var app = angular.module('demo', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

	app.config(['$routeProvider',
	  function($routeProvider) {
		$routeProvider.
		  when('/home', {
		    templateUrl: '/templates/home.html',
		    controller: 'HomeController'
		  }).
		  when('/misrecursos', {
		    templateUrl: '/templates/misrecursos.html',
		    controller: 'MisRecursosController'
		  }).
          when('/buscar', {
		    templateUrl: '/templates/buscar.html',
		    controller: 'BuscarController'
		  }).
          when('/perfil', {
		    templateUrl: '/templates/perfil.html',
		    controller: 'PerfilController'
		  });
	}]);


	app.directive('menuPrincipal', ['$http', function(){
		return {
			restrict: 'E',
			templateUrl: '/templates/nav.html',
			controller: function($http, $scope, $timeout){
				var nav = this;
				$http.get('/status').success(function(data){
					nav.status = data;
				});
			},
			controllerAs: 'nav'
		};
	}]);

	app.controller('HomeController', function(){});

	app.controller('MisRecursosController', ['$http',function($http){
		var misRecursos = this;
		misRecursos.recursos = null;
		$http.get('/recursos').success(function(data){
			misRecursos.recursos = data;
			console.log(data);
		});
	}]);

	app.controller('BuscarController', ['$http',function($http){
		var busqueda = this;
		busqueda.buscando = "";
		busqueda.recurso = null;
		$http.get('/temas').success(function(data){
			temas = data.result;
			for(var i in temas){
				temas[i].children = [];
				for(var j in temas){
					if(temas[i].id == temas[j].id_padre){
						var t = temas[j];
						temas[i].children.push(t);
					}
				}
			}
			console.log(temas);
			busqueda.temas = temas;
		});

		this.buscarJuegos = function(){
			$http.get('/juegos').success(function(data){
				console.log(data);
				juegos = data.result.data;
				busqueda.recursos = juegos;
				busqueda.buscando = "Juegos";
			});
		};

		this.buscarVideos = function(){
			$http.get('/videos').success(function(data){
				console.log(data);
				var videos = data.result.data;
				busqueda.recursos = videos;
				busqueda.buscando = "Videos";
			});
		};

		this.buscarInfografias = function(){
			$http.get('/infografias').success(function(data){
				console.log(data);
				var infografias = data.result.data;
				busqueda.recursos = infografias;
				busqueda.buscando = "Infografias";
			});
		};

		this.buscarSecuencias = function(){
			$http.get('/secuencias').success(function(data){
				console.log(data);
				var secuencias = data.result.data;
				busqueda.recursos = secuencias;
				busqueda.buscando = "Secuencias Didácticas";
			});
		};

		this.verRecurso = function(id){
			$http.get('/juego/'+id).success(function(data){
				console.log(data);
				var recurso = data.recurso;
				busqueda.recurso = data.recurso;
			});
		};

		this.volver = function(){
			busqueda.recurso = null;
		};

		this.descargar = function(){
			if(busqueda.recurso != null){
				$http.post('/recurso', busqueda.recurso).success(function(data){
					console.log(data);
				});
			}
		};
	}]);

	app.controller('PerfilController', function(){});

})()
