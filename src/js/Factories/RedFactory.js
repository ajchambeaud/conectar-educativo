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

  function consultar_acceso_a_internet() {
    console.log("Verificando acceso a intenet ...");

    dns.resolve('http://www.google.com', function(err) {
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
