var app = angular.module('app');
var gui = require('nw.gui');

app.controller('BuscarController', function($scope, $http, ApiFactory, _) {
  $scope.data.query = {};
  $scope.data.juegos = [];
  $scope.data.videos = [];
  $scope.data.ebooks = [];
  $scope.data.secuencias = [];
  $scope.data.infografias = [];
  $scope.data.recursos = [];
  $scope.data.result = false;
  $scope.data.mostrar =  'todos';

  function alertar_error(data) {
    console.log("BUSQUEDA CONTROLLER -> ERROR");
    console.log(data);
  }

  $scope.buscar = function(){
    $scope.data.recursos = [];
    $scope.data.juegos = [];
    $scope.data.videos = [];
    $scope.data.ebooks = [];
    $scope.data.secuencias = [];
    $scope.data.infografias = [];

    function success(req) {
      for(var i in req){
        var data = req[i].data;
        $scope.data[data.entity + 's'] = data.result.data;
        _.each(data.result.data, function (recurso) {
          recurso.entity = data.entity;
          $scope.data.recursos.push(recurso);
        });
      }
      $scope.data.recursos = _.sortBy($scope.data.recursos, function(rec){ return -rec.puntaje; });
      $scope.data.result = true;
    };

    ApiFactory.buscar($scope.data.query, success, alertar_error);
  }

  $scope.mostrar = function(filtro) {
    $scope.data.mostrar = filtro;
    console.log($scope.data.mostrar);
    console.log($scope.data[$scope.data.mostrar]);
  }

  var ModalDetalleCtrl = function ($scope, $modalInstance, detalle) {
    $scope.data = {};
    $scope.data.detalle = detalle;

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };


  $scope.abrir_recurso = function(recurso) {
    console.log({id: recurso.id});

    function success(data) {

      var modalInstance = $modal.open({
        templateUrl: 'templates/modal_detalle.html',
        controller: ModalDetalleCtrl,
        resolve: {
          detalle: function() {return data;}
        }
      });

    }

    ApiFactory.obtener_detalle_video(recurso.id, success, alertar_error);
  }

  $scope.ver_recurso_en_educar = function(recurso) {
    gui.Shell.openExternal(recurso.visualizacion_educar);
  }
});
