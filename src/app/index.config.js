(function() {
  'use strict';

  angular
    .module('usingGulpNg')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // $httpProvider.defaults.useXDomain = true;
    // $httpProvider.defaults.withCredentials = true;
    // delete $httpProvider.defaults.headers.common["X-Requested-With"];
    // $httpProvider.defaults.headers.common["Accept"] = "application/json";
    // $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
