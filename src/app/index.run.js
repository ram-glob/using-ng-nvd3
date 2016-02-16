(function() {
  'use strict';

  angular
    .module('usingGulpNg')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
