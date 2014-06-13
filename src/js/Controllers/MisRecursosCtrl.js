var app = angular.module('app');

app.controller('MisRecursosController', function($http, DescargasFactory){
  var misRecursos = this;
  misRecursos.recursos = null;
  $http.get('/recursos').success(function(data){
    misRecursos.recursos = data;
    console.log(data);
  });
});
