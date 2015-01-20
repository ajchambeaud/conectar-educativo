var app = angular.module('app');

app.directive('reproductor', function($http, $modal, VLC){

  return {
     scope: {
            ruta: '=',
    },
    controller: function($scope) {
      $scope.data = {};
      $scope.data.error = false;

      $scope.verConVLC = function() {
        VLC.reproducir($scope.ruta);
      };
    },
    restrict: 'E',
    templateUrl: 'templates/directives/reproductor.html',

    link: function(scope, element, attributes){
      var source = document.getElementById('video_source');
      source.setAttribute('src', scope.ruta);
      window.e = element;

      var video = videojs(element[0].children[1], {}, function(){});

      video.on('error', function(reason) {
        /* Oculta el video con el mensaje de error en ingles. */
        var elemento = document.getElementById('myvideo');
        elemento.style.display = "none";

        var elemento2 = document.getElementById('motivoError');
        scope.data.error = true;

        scope.$apply();
      });
    }
  };
});
