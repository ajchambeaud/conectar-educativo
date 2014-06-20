var app = angular.module('app');

app.factory("RedFactory", function($window) {
  var obj = {};
  obj.texto = "...";

  obj.definir_modo_online = function() {
    console.log("definiendo modo online");
    obj.online = true;
    obj.class = "btn-success";
    obj.texto = "online";
  }

  obj.definir_modo_offline = function() {
    console.log("definiendo modo offline");
    obj.online = false;
    obj.class = "btn-danger";
    obj.texto = "offline";
  }

  // Utiliza la api del browser para saber si hay internet.
  function consultar_acceso_a_internet() {
    if ($window.navigator.onLine) {
      obj.definir_modo_online();
    } else {
      obj.definir_modo_offline();
    };
  }

  consultar_acceso_a_internet();

  return obj;
});
