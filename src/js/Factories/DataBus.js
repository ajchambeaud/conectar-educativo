var app = angular.module('app');

/*
 * Representa una especia de pubsub, para intercomunicar controladores y
 * servicios entre sí. Solo que este permite desuscribirse automáticamente.
 *
 * Eventos conocidos:
 *
 *     'inicia-descarga'
 *
 */
app.factory('DataBus', function($rootScope) {
    var DataBus = {};

    DataBus.emit = function(msg, args) {
      $rootScope.$emit(msg, args);
    };

    DataBus.on = function(msg, scope, func) {
      var unbind = $rootScope.$on(msg, func);
      scope.$on('$destroy', unbind);
    };

    return DataBus;
});
