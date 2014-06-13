var app = angular.module('app');
var dns = require('dns');

app.factory("RedFactory", function($timeout) {
  var obj = {};
  obj.texto = "...";

  function definir_modo_online() {
    obj.online = true;
    obj.class = "btn-success";
    obj.texto = "online";
  }

  function definir_modo_offline() {
    obj.online = false;
    obj.class = "btn-danger";
    obj.texto = "offline";
  }

  // Realiza una consulta a la red para verificar si hay conexión o no.
  //
  // Esta función se llama de forma periódica, así se puede conocer el
  // estado de la red en todo momento.
  function consultar_acceso_a_internet() {
    console.log("Verificando acceso a intenet ...");

    dns.resolve('google.com', 'A', function(err) {
      console.log(err);
      console.log(obj);
      $timeout(function() {
        if (err)
          definir_modo_offline();
        else
          definir_modo_online();
      }, 10);
    });

    $timeout(consultar_acceso_a_internet, 5000);
  }

  consultar_acceso_a_internet();

  return obj;
});
