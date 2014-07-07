var app = angular.module('app');
var gui = require('nw.gui');

app.controller('BuscarController', function($scope, $modal, $http, ApiFactory, _) {
  $scope.data.query = {};
  $scope.data.query.limit = 10;
  $scope.data.query.offset = 0;
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
    $scope.data.query.limit = 10;
    $scope.data.query.offset = 0;
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

  $scope.busquedaPagingFunction = function(){
    if($scope.data.recursos.length > 0){
      $scope.data.query.offset += 10;

      function success(req) {
        var recursos = [];
        for(var i in req){
          console.log(req);
          var data = req[i].data;
          $scope.data[data.entity + 's'].concat(data.result.data);
          _.each(data.result.data, function (recurso) {
            recurso.entity = data.entity;
            recursos.push(recurso);
          });
        }
        recursos = _.sortBy(recursos, function(rec){ return -rec.puntaje; });
        $scope.data.recursos = _.union($scope.data.recursos, recursos);
        $scope.data.result = true;
      };

      ApiFactory.buscar($scope.data.query, success, alertar_error);
    }
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
      var template = "";

      switch (recurso.entity) {
        case "juego":
            template = 'templates/modal_detalle_juego.html';
            break;
        case "video":
            template = 'templates/modal_detalle_video.html';
            break;
        case "ebook":
            template = 'templates/modal_detalle_ebook.html';
            break;
        case "secuencia":
            template = 'templates/modal_detalle_secuencia.html';
            break;
        case "infografia":
            template = 'templates/modal_detalle_infografia.html';
            break;
        default:
            break;
      }

      var modalInstance = $modal.open({
        templateUrl: template,
        controller: ModalDetalleCtrl,
        resolve: {
          detalle: function() {return data;}
        }
      });
    }

    ApiFactory.obtener_detalle(recurso, success, alertar_error);
  }

  $scope.ver_recurso_en_educar = function(recurso) {
    gui.Shell.openExternal(recurso.visualizacion_educar);
  }
});
