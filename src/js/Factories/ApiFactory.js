var app = angular.module('app');

app.factory("ApiFactory", function($http, $q) {
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
          detalleVideos: api.hostname + "/0.9/recursos/videos/[id]?key=" + api.key,
          detalleEbooks: api.hostname + "/0.9/recursos/ebooks/[id]?key=" + api.key,
          detalleSecuencias: api.hostname + "/0.9/recursos/secuencias/[id]?key=" + api.key,
          detalleInfografias: api.hostname + "/0.9/recursos/infografias/[id]?key=" + api.key,
          obtenerCatalogacion: api.hostname + "/0.9/recursos/catalogacion?key=" + api.key,
          ramaCatalogacion: api.hostname + "/0.9/recursos/catalogacion/[id]?key=" + api.key,
    };
  }

  definir_recursos();

  api.buscar = function(data, success_callback, error_callback){
    var result = [];
    var error = [];
    function push(r) { if(r.status == 200) result.push(r); }
    function error(e) { error.push(e); }

    console.log(api.uri.recursos.buscarJuegos + JSON.stringify(data));

    var juegos = $http.get(api.uri.recursos.buscarJuegos + JSON.stringify(data)),
        videos = $http.get(api.uri.recursos.buscarVideos + JSON.stringify(data)),
        ebooks = $http.get(api.uri.recursos.buscarEbooks + JSON.stringify(data)),
        secuencias = $http.get(api.uri.recursos.buscarSecuencias + JSON.stringify(data)),
        infografias = $http.get(api.uri.recursos.buscarInfografias + JSON.stringify(data));

    $q.all([
      juegos.then(push).catch(error),
      videos.then(push).catch(error),
      ebooks.then(push).catch(error),
      secuencias.then(push).catch(error),
      infografias.then(push).catch(error)
    ]).then(function() {
      success_callback(result);
    });
  };

  api.listar_juegos = function(data, success_callback, error_callback) {
    $http.get(api.uri.recursos.buscarJuegos + JSON.stringify(data)).
      success(success_callback).
      error(error_callback);
  };

  api.listar_videos = function(data, success_callback, error_callback) {
    $http.get(api.uri.recursos.buscarVideos + JSON.stringify(data)).
      success(success_callback).
      error(error_callback);
  };

  api.listar_ebooks = function(data, success_callback, error_callback) {
    $http.get(api.uri.recursos.buscarEbooks + JSON.stringify(data)).
      success(success_callback).
      error(error_callback);
  };

  api.listar_secuencias = function(data, success_callback, error_callback) {
    $http.get(api.uri.recursos.buscarSecuencias + JSON.stringify(data)).
      success(success_callback).
      error(error_callback);
  };

  api.listar_infografias = function(data, success_callback, error_callback) {
    $http.get(api.uri.recursos.buscarInfografias + JSON.stringify(data)).
      success(success_callback).
      error(error_callback);
  };

  api.obtener_detalle = function(recurso, success_callback, error_callback) {
    
    switch (recurso.entity) {
      case "juego":
          api.obtener_detalle_juego(recurso.id, success_callback, error_callback);
          break;
      case "video":
          api.obtener_detalle_video(recurso.id, success_callback, error_callback);
          break;
      case "ebook":
          api.obtener_detalle_ebook(recurso.id, success_callback, error_callback);
          break;
      case "secuencia":
          api.obtener_detalle_secuencia(recurso.id, success_callback, error_callback);
          break;
      case "infografia":
          api.obtener_detalle_infografia(recurso.id, success_callback, error_callback);
          break;
      default:
          break;
    }
  };

  api.obtener_detalle_video = function(id, success_callback, error_callback) {
    var uri = api.uri.recursos.detalleVideos.replace('[id]', id);
    $http.get(uri).
      success(success_callback).
      error(error_callback);
  };

  api.obtener_detalle_juego = function(id, success_callback, error_callback) {
    $http.get(api.uri.recursos.detalleJuegos.replace('[id]', id)).
      success(success_callback).
      error(error_callback);
  };

  api.obtener_detalle_secuencia = function(id, success_callback, error_callback) {
    $http.get(api.uri.recursos.detalleSecuencias.replace('[id]', id)).
      success(success_callback).
      error(error_callback);
  };

  api.obtener_detalle_infografia = function(id, success_callback, error_callback) {
    $http.get(api.uri.recursos.detalleInfografias.replace('[id]', id)).
      success(success_callback).
      error(error_callback);
  };

  api.obtener_detalle_ebook = function(id, success_callback, error_callback) {
    $http.get(api.uri.recursos.detalleEbooks.replace('[id]', id)).
      success(success_callback).
      error(error_callback);
  };


  api.set_api_key = function(key) {
    api.key = key;
    if (key)
      console.log("Definiendo la api key comenzada en", api.key.slice(0, 8) + "...");
    else
      console.log("No se definió la api key, se deshabilitarán las funcionalidades de búsqueda.");

    definir_recursos();
  };

  return api;
});
