var app = angular.module('app');

app.controller('MainController', function($scope, $location, RedFactory) {

  $scope.data = {};
  $scope.data.online = RedFactory.obtenerModoOnline;

  $scope.getClass = function(path) {
    if ($location.path().substr(0, path.length) == path)
      return "active";
    else
      return "";
  }

});
