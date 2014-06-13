var app = angular.module('app');

app.directive('menuPrincipal', ['$http', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/nav.html',
    controller: function($http, $scope, $timeout){
      var nav = this;

      $http.get('/status').success(function(data){
        nav.status = data;
      });

    },
    controllerAs: 'nav'
  };
}]);
