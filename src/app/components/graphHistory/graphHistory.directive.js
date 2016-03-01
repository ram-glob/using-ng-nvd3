(function(){
	'use strict';

	angular
		.module('usingGulpNg')
		.directive('graphHistory', graphHistory);

	function graphHistory(){
		var directive = {
			restrict: 'E',
			scope: {
				// progressData: '=',
				// availabilityData: '=',
				startDate: '@',
				endDate: '@'
			},
			templateUrl: 'app/components/graphHistory/graphHistory.html',
			controller: GraphHistoryController,
			controllerAs: 'vm',
			bindToController: true
		};

		return directive;

		function GraphHistoryController($scope, graphHistoryService){
			var vm = this;
			generatePrice();
			generateRanking();
			generateProgressData();

			vm.priceOptions = {
				chart: {
					type: 'lineChart',
					interpolate: 'step-after',
					height: 300,
					color: d3.scale.category10().range(),
					x: function(d) {
						return new Date(d[0]);
					},
					y: function(d) {
						return d[1];
					},
					useInteractiveGuideline: true,
					duration: 500,
					xAxis: {
						tickFormat: function(d) {
							return d3.time.format("%d %b")(new Date(d));
						}
					},
					yAxis: {
						tickFormat: d3.format(',d')
					},
					showXAxis: false
				}
			}

			vm.rankOptions = {
				chart: {
					type: 'lineChart',
					height: 200,
					useInteractiveGuideline: true,
					x: function(d) {
						return d[0];
					},
					y: function(d) {
						return d[1];
					},
					duration: 500,
					xAxis: {
						tickFormat: function(d){
							return d3.time.format("%d %b")(new Date(d))
						}
					},
					yAxis: {
						tickFormat: d3.format(',d')
					}
				}
			}

			vm.availabilityOptions = {
				chart: {
					type: 'lineChart',
					height: 50,
					showLegend: false,
					x: function(d) {
						return d[0];
					},
					y: function(d) {
						return d[1];
					},
					duration: 500,
					xAxis: {
						tickFormat: function(d) {
							return d3.time.format("%d %b")(new Date(d))
						}
					},
					showYAxis: false
				}
			}

			function generatePrice(){
				graphHistoryService.getRandomData(10)
					.then(function(result){
						var _mock = result;
						var priceArr = [];

						priceArr[0] = {
							key: 'base',
							values: graphHistoryService.pluckData(result,'base_price')
						}

						priceArr[1] = {
							key: 'retail',
							values: graphHistoryService.pluckData(result,'retail_price')
						}

						priceArr[2] = {
							key: 'discount',
							values: graphHistoryService.pluckData(result,'discount')
						}
						$scope.priceData = priceArr;
					}, function(err){
						console.log('Error ', err);
					});
			}

			function generateRanking(){
				graphHistoryService.getRandomData(10)
					.then(function(result){
						var _mock = result;
						var ranking_arr = [];

						ranking_arr[0] = {
							key: 'Serie',
							values: graphHistoryService.pluckData(result, 'ranking_history')
						};
						$scope.rankData = ranking_arr;
					});
			}

			function generateProgressData(){
				graphHistoryService.getRandomData(10)
					.then(function(result){
						var _mock = result;

						var available_arr = [];

						available_arr = graphHistoryService.pluckData(result, 'available_history');

						var new_arr = available_arr.filter(function(value){
							// console.log(value);
							if(value.available_history){
								return value;
							}
						});

						$scope.progressData = new_arr;
					});
			}

		}
	}
})();