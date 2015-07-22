var app = angular.module('app');
var gui = require('nw.gui');

app.controller('ScriptController', function($scope, ApiFactory, DescargasFactory) {
  $scope.data = {};
  $scope.data.recursos = "";

  $scope.iniciarDescarga = function() {
    var recursos = $scope.data.recursos.replace(/,/g, ' ').split(' ');
    var cantidad = recursos.length;

    alert("Se iniciará la descarga de " + cantidad + " recursos");

    function on_success(data) {
      //console.log("DATA", data);
      DescargasFactory.descargar_video(data.result);
    }

    function on_error(error) {
      console.log("ERROR", error);
    }

    for (var i=0; i<cantidad; i++) {
      ApiFactory.obtener_detalle_video(recursos[i], on_success, on_error);
    }



  };

});
