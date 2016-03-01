(function() {
	'use strict';

	angular
		.module('usingGulpNg')
		.controller('StocksController', StocksController);

	function StocksController($http, $log, graphHistoryService) {
		var vm = this;
	}
})();
