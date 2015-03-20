var app = angular.module('app');
var exec = require('child_process').exec;

app.factory('VLC', function($rootScope) {
    var vlc = {};
    var child;


    vlc.reproducir = function(ruta) {
      var comando = null;

      /* Seleccionado el comando correcto para lanzar VLC */
      if (process.platform === 'win32' || process.platform === 'win64')
        comando = 'c:\\conectar-educativo\\VLCPortable\\VLCPortable.exe "' + ruta + '"';

      if (process.platform === 'linux')
        comando = 'vlc "' + ruta + '"';

      if (process.platform === 'darwin')
        comando = 'open -a VLC --args "' + ruta + '"';


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
