var app = angular.module('app');

app.controller('CategoriasController', function($scope, $http, ApiFactory) {

  $scope.data.juegos = [];
  $scope.data.videos = [];

  function alertar_error(data) {
    alert(data);
  }

  $scope.listar_juegos = function() {
    function success(data) {
      $scope.data.juegos = data;
    }

    ApiFactory.listar_juegos(success, alertar_error);
  }

  $scope.listar_videos = function() {

    function success(data) {
      $scope.data.videos = data;
    }

    ApiFactory.listar_videos(success, alertar_error);
  }

  $scope.abrir = function(recurso) {
  }

  $scope.ver_recurso_en_educar = function(recurso) {
    window.open(recurso.visualizacion_educar);
  }

});
