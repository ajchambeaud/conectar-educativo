var app = angular.module('app');

app.directive('cantidad', function($http, $modal, VLC){

  return {
    scope: {
      model: '=',
    },
    controller: function($scope) {
    },
    restrict: 'E',
    templateUrl: 'templates/directives/cantidad.html',
    link: function(scope, element, attributes) {}
  };

});
