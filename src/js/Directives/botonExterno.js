var app = angular.module('app');

app.directive('botonExterno', function() {

  return {
    restrict: 'E',
    scope: {
      url: '='
    },
    template: "<button ng-click='click()' class='btn btn-warning'>Visualizar en la web</button>",
    controller: function($scope){
      var url = $scope.url;

      $scope.click = function() {
        var gui = require('nw.gui');
        gui.Shell.openExternal(url);
      };

    }
  };
});
