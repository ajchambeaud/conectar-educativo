var dependencias = ['ngRoute', 'ngAnimate', 'angularSpinner', 'ui.bootstrap', 'underscore', 'infinite-scroll'];

var app = angular.module('app', dependencias, function($provide) {

    /*
     * Representa una especia de pubsub, para intercomunicar controladores y
     * servicios entre sí. Solo que este permite desuscribirse automáticamente.
     */
    $provide.factory('DataBus', ['$rootScope', function($rootScope) {
        var DataBus = {};

        DataBus.emit = function(msg, args) {
          $rootScope.$emit(msg, args);
        };

        DataBus.on = function(msg, scope, func) {
          var unbind = $rootScope.$on(msg, func);
          scope.$on('$destroy', unbind);
        };

        return DataBus;
    }]);
});

function procesar_tecla(e, id_boton_buscar) {
    if (e.keyCode == 13)  {
        document.getElementById(id_boton_buscar).click();
        return false;
    }
}
