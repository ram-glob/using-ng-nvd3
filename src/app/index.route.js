(function() {
  'use strict';

  angular
    .module('usingGulpNg')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('stocks', {
        url: '/stocks',
        templateUrl: 'app/stocks/stocks.html',
        controller: 'StocksController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
