var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

app.config(['$routeProvider','$httpProvider',
  function($routeProvider, $httpProvider) {
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

	  //Reset headers to avoid OPTIONS request (aka preflight)
	  $httpProvider.defaults.headers.common = {};
	  $httpProvider.defaults.headers.post = {};
	  $httpProvider.defaults.headers.put = {};
	  $httpProvider.defaults.headers.patch = {};
}]);