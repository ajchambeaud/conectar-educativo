var app = angular.module('app');

app.directive('menuPrincipal', ['$http', 'RedFactory', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/nav.html',
    controller: function($http, $scope, $timeout, RedFactory){
      var nav = this;
      nav.red = RedFactory;
    },
    controllerAs: 'nav'
  };
}]);
