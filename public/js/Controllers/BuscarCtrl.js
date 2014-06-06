var app = angular.module('app');

app.controller('BuscarController', ['$http',function($http){
  var busqueda = this;
  busqueda.buscando = "";
  busqueda.recurso = null;
  $http.get('/temas').success(function(data){
    temas = data;
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
    $http.get('/juegos').success(function(result){
      console.log(result);
      juegos = result.data;
      busqueda.recursos = juegos;
      busqueda.buscando = "Juegos";
    });
  };

  this.buscarVideos = function(){
    $http.get('/videos').success(function(result){
      console.log(result);
      var videos = result.data;
      busqueda.recursos = videos;
      busqueda.buscando = "Videos";
    });
  };

  this.buscarEbooks = function(){
    $http.get('/ebooks').success(function(result){
      console.log(result);
      var ebooks = result.data;
      busqueda.recursos = ebooks;
      busqueda.buscando = "Videos";
    });
  };

  this.buscarInfografias = function(){
    $http.get('/infografias').success(function(result){
      console.log(result);
      var infografias = result.data;
      busqueda.recursos = infografias;
      busqueda.buscando = "Infografias";
    });
  };

  this.buscarSecuencias = function(){
    $http.get('/secuencias').success(function(result){
      console.log(result);
      var secuencias = result.data;
      busqueda.recursos = secuencias;
      busqueda.buscando = "Secuencias Didácticas";
    });
  };

  this.verRecurso = function(id){
    $http.get('/juego/'+id).success(function(data){
      console.log(data);
      var recurso = data;
      busqueda.recurso = recurso;
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
