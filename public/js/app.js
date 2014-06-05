var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

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
