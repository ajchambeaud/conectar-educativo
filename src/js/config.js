var app = angular.module('app');

app.config(function($routeProvider, $httpProvider) {

	  $routeProvider.
	  when('/home', {
	    templateUrl: 'templates/home.html',
	    controller: 'HomeController'
	  }).
	  when('/misrecursos', {
	    templateUrl: 'templates/misrecursos.html',
	    controller: 'MisRecursosController'
	  }).
      when('/buscar', {
	    templateUrl: 'templates/buscar.html',
	    controller: 'BuscarController'
	  }).
      when('/perfil', {
	    templateUrl: 'templates/perfil.html',
	    controller: 'PerfilController'
	  }).
      when('/categorias', {
	    templateUrl: 'templates/categorias.html',
	    controller: 'CategoriasController'
	  }).
			otherwise({redirectTo:'/home'});


	  //Reset headers to avoid OPTIONS request (aka preflight)
	  $httpProvider.defaults.headers.common = {};
	  $httpProvider.defaults.headers.post = {};
	  $httpProvider.defaults.headers.put = {};
	  $httpProvider.defaults.headers.patch = {};
});


app.factory('httpInterceptor', function ($q, $rootScope, $log) {

    var numLoadings = 0;

    return {
        request: function (config) {

            numLoadings++;

            // Show loader
            $rootScope.$broadcast("loader_show");
            return config || $q.when(config)

        },
        response: function (response) {

            if ((--numLoadings) === 0) {
                // Hide loader
                $rootScope.$broadcast("loader_hide");
            }

            return response || $q.when(response);

        },
        responseError: function (response) {

            if (!(--numLoadings)) {
                // Hide loader
                $rootScope.$broadcast("loader_hide");
            }

            return $q.reject(response);
        }
    };
});

app.config(function ($httpProvider) {
	$httpProvider.interceptors.push('httpInterceptor');
});
