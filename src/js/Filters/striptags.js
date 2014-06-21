var app = angular.module('app');

app.filter('striptags', function($sce) {
    return function(text) {
      return $sce.trustAsHtml(String(text).replace(/<[^>]+>/gm, ''));
    }
  }
);
