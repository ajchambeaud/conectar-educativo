var app = angular.module('app', ['ngRoute', 'ngAnimate', 'angularSpinner', 'ui.bootstrap', 'underscore', 'infinite-scroll']);

function procesar_tecla(e, id_boton_buscar) {
    if (e.keyCode == 13)  {
        document.getElementById(id_boton_buscar).click();
        return false;
    }
}
