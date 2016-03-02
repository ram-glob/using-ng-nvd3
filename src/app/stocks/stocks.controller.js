(function() {
	'use strict';

	angular
		.module('usingGulpNg')
		.controller('StocksController', StocksController);

	function StocksController($scope, $http, $log, graphHistoryService) {
		$scope.timerange = [];

		$scope.startDate = Date.parse('02/01/2016');

		$scope.$watch('timerange',function(timerange){
			if(timerange.length < 1)
				return
			console.log('gettting this timerange...............', timerange);
			graphHistoryService.getRandomData(timerange)
			.then(function(result){
				$scope.graphData=result;
			}, function(err){
				console.log('Error ', err);
			});
		}, true);

	}
})();
