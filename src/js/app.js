var dependencias = ['ngRoute', 'ngAnimate', 'angularSpinner', 'ui.bootstrap', 'underscore', 'infinite-scroll'];
var app = angular.module('app', dependencias);

function procesar_tecla(e, id_boton_buscar) {
    if (e.keyCode == 13)  {
        document.getElementById(id_boton_buscar).click();
        return false;
    }
}

window.mostrar_herramientas_de_desarrollo = function() {
    gui.Window.get().showDevTools();
}
