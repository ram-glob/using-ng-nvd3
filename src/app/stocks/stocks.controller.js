(function() {
	'use strict';

	angular
		.module('usingGulpNg')
		.controller('StocksController', StocksController);

	function StocksController($scope, $http, $log, graphHistoryService) {
		$scope.timerange = [];
		// $scope.startDate = new Date(2016,02,01);

		$scope.startDate = Date.parse('02/01/2016');
		var startDate = moment($scope.startDate);
		var endDate = moment();
		var difference = endDate.diff(startDate, 'days');

		$scope.$watch('timerange',function(timerange){
			graphHistoryService.getRandomData(difference)
			.then(function(result){
				$scope.graphData=result;
			}, function(err){
				console.log('Error ', err);
			});
		});

	}
})();
