var app = angular.module('app');

app.controller('BuscarController', ['$http',function($http){
  var busqueda = this;
  busqueda.buscando = "";
  busqueda.recurso = null;
  $http.get('/temas').success(function(data){
    temas = data.result;
    for(var i in temas){
      temas[i].children = [];
      for(var j in temas){
        if(temas[i].id == temas[j].id_padre){
          var t = temas[j];
          temas[i].children.push(t);
        }
      }
    }
    console.log(temas);
    busqueda.temas = temas;
  });

  this.buscarJuegos = function(){
    $http.get('/juegos').success(function(data){
      console.log(data);
      juegos = data.result.data;
      busqueda.recursos = juegos;
      busqueda.buscando = "Juegos";
    });
  };

  this.buscarVideos = function(){
    $http.get('/videos').success(function(data){
      console.log(data);
      var videos = data.result.data;
      busqueda.recursos = videos;
      busqueda.buscando = "Videos";
    });
  };

  this.buscarInfografias = function(){
    $http.get('/infografias').success(function(data){
      console.log(data);
      var infografias = data.result.data;
      busqueda.recursos = infografias;
      busqueda.buscando = "Infografias";
    });
  };

  this.buscarSecuencias = function(){
    $http.get('/secuencias').success(function(data){
      console.log(data);
      var secuencias = data.result.data;
      busqueda.recursos = secuencias;
      busqueda.buscando = "Secuencias Didácticas";
    });
  };

  this.verRecurso = function(id){
    $http.get('/juego/'+id).success(function(data){
      console.log(data);
      var recurso = data.recurso;
      busqueda.recurso = data.recurso;
    });
  };

  this.volver = function(){
    busqueda.recurso = null;
  };

  this.descargar = function(){
    if(busqueda.recurso != null){
      $http.post('/recurso', busqueda.recurso).success(function(data){
        console.log(data);
      });
    }
  };
}]);
