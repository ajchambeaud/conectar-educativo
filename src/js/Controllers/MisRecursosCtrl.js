var app = angular.module('app');

app.controller('MisRecursosController', ['$http', function($http){
  var misRecursos = this;
  misRecursos.recursos = null;
  $http.get('/recursos').success(function(data){
    misRecursos.recursos = data;
    console.log(data);
  });
}]);
