var app = angular.module('app');

app.directive('navbar', function ($window) {
  return {
    restrict: 'A',
    link: function($scope, $elem, $attrs) {
			var $window = angular.element(window);
      var doc = document.documentElement;

      function actualizar() {
        	var scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

          console.log(scrollTop);

          if (scrollTop > 0) {
            $elem[0].classList.add("navbar-reducido");
          } else {
            $elem[0].classList.remove("navbar-reducido");
          }
      }


      $window.on('scroll', actualizar);
    }
  };
});
