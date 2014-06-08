var app = angular.module('app');

app.factory("RedFactory", function($timeout) {
  var obj = {};

  obj.online = true;
  obj.class = "btn-success";
  obj.texto = "online";

  $timeout(function() {
    obj.online = false;
    obj.class = "btn-danger";
    obj.texto = "offline";
    console.log("false!");
  }, 2000);

  return obj;
});
