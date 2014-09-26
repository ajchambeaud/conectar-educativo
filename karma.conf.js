// Karma configuration
// Generated on Thu Sep 25 2014 17:55:12 GMT-0300 (ART)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      "lib/jquery-2.1.1.js",
      "lib/underscore.js",
      "lib/angular.js",
      "lib/angular-route.js",
      "lib/angular-mocks.js",
      "lib/angular-animate.js",
      'lib/ng-infinite-scroll.min.js',

      "lib/angular-resource.js",
      "lib/ui-bootstrap-tpls.js",

      "lib/spin.js",
      "lib/angular-spinner.js",

      "js/underscore.js",
      "js/app.js",
      "js/config.js",

      "js/Controllers/NavCtrl.js",
      "js/Controllers/MainCtrl.js",
      "js/Controllers/BuscarCtrl.js",
      "js/Controllers/HomeCtrl.js",
      "js/Controllers/MisRecursosCtrl.js",
      "js/Controllers/DescargasCtrl.js",
      "js/Controllers/PerfilCtrl.js",
      "js/Controllers/CategoriasCtrl.js",

      "js/Directives/botonDescarga.js",
      "js/Directives/indicadorRed.js",
      "js/Directives/botonAbout.js",
      "js/Directives/loader.js",
      "js/Directives/menuPrincipalDirective.js",
      "js/Directives/navbar.js",

      "js/Factories/DataBus.js",
      "js/Factories/RedFactory.js",
      "js/Factories/DescargasFactory.js",
      "js/Factories/PerfilFactory.js",
      "js/Factories/RecursosFactory.js",
      "js/Factories/ApiFactory.js",

      "js/Filters/striptags.js",

      'src/tests/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      // 'Chrome',
      'NodeWebkit',
      ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
