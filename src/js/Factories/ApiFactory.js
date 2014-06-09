var app = angular.module('app');

app.factory("ApiFactory", function($http) {
  var api = {};

  api.uri = {};
  api.hostname = 'https://api.educ.ar';
  console.log("iniciando");
  api.key = undefined; // La función set_api_key le da el valor inicial.

  function definir_recursos() {
    api.uri.recursos = {
          buscarJuegos: api.hostname + "/0.9/recursos/juegos?key=" + api.key + "&q=",
          buscarVideos: api.hostname + "/0.9/recursos/videos?key=" + api.key + "&q=",
          buscarEbooks: api.hostname + "/0.9/recursos/ebooks?key=" + api.key + "&q=",
          buscarSecuencias: api.hostname + "/0.9/recursos/secuencias?key=" + api.key + "&q=",
          buscarInfografias: api.hostname + "/0.9/recursos/infografias?key=" + api.key + "&q=",
          detalleJuegos: api.hostname + "/0.9/recursos/juegos/[id]?key=" + api.key,
          detalleVideos: api.hostname + "/0.9/recursos/juegos/[id]?key=" + api.key,
          detalleEbooks: api.hostname + "/0.9/recursos/juegos/[id]?key=" + api.key,
          detalleSecuencias: api.hostname + "/0.9/recursos/juegos/[id]?key=" + api.key,
          detalleInfografias: api.hostname + "/0.9/recursos/juegos/[id]?key=" + api.key,
          obtenerCatalogacion: api.hostname + "/0.9/recursos/catalogacion?key=" + api.key,
          ramaCatalogacion: api.hostname + "/0.9/recursos/catalogacion/[id]?key=" + api.key,
    };
  }

  definir_recursos();

  api.listar_juegos = function(success_callback, error_callback) {
    $http.get(api.uri.recursos.buscarJuegos + "").
      success(success_callback).
      error(error_callback);
  }

  api.listar_videos = function(success_callback, error_callback) {
    $http.get(api.uri.recursos.buscarVideos + "").
      success(success_callback).
      error(error_callback);
  }

  api.set_api_key = function(key) {
    api.key = key;

    if (key)
      console.log("Definiendo la api key comenzada en", api.key.slice(0, 8) + "...");
    else
      console.log("No se definió la api key, se deshabilitarán las funcionalidades de búsqueda.");

    definir_recursos();
  }

  return api;
});
