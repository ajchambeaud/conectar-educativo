var app = angular.module('app');
var exec = require('child_process').exec;

app.factory('VLC', function($rootScope) {
    var vlc = {};
    var child;


    vlc.reproducir = function(ruta) {

      // TODO: consultar si está en windows, linux o mac. La ruta
      //       al binario va a cambiar en cada plataforma.
      var comando = 'VLCPortable\\VLCPortable.exe "' + ruta + '"';

      child = exec(comando,
        function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);

          if (error !== null) {
            console.log('exec error: ' + error);
            alert(error + " Comando " + comando);
          }
        });
      };

    return vlc;
});
