var app = angular.module('app');

app.directive('reproductor', function($http, $modal){

  return {
     scope: {
            ruta: '=',
          },
    restrict: 'E',
    template: '<video id="myvideo" class="vjs-big-play-centered video-js vjs-default-skin"' +
              'controls preload="auto" width="100%" height=500 '  +
              'poster="img/fondo.png">' +
              '<source id="pepe" ng-src="{{1}}" type="video/mp4" /> ' +
              '<p class="vjs-no-js">Error</p>' +
              '<video/>',

    link: function(scope, element, attributes){
      var source = document.getElementById('pepe');
      source.setAttribute('src', scope.ruta);
      window.e = element;
      videojs(element[0].children[0], {}, function(){});
    }
  };
});
