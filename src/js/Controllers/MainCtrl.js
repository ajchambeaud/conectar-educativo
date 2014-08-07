var app = angular.module('app');
var nw = require('nw.gui');

app.controller('MainController', function($scope, $location, ApiFactory, RedFactory) {


  $scope.data = {};
  $scope.data.online = RedFactory.obtenerModoOnline;


  ApiFactory.set_api_key('263e0b0bccb1ae7310f913b404a351f3ab010f7f');

  // Función auxiliar para detectar la página actual y utilizarlo al momento
  // de dibujar el menú de la aplicación.
  $scope.getClass = function(path) {
    if ($location.path().substr(0, path.length) == path)
      return "active";

    return "";
  }

});
