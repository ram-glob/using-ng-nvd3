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
			$scope.updatePrice = updatePrice;

			function updatePrice(){

				vm.priceData = [
					{
						key: "Long",
						values: [
							[1325356200, 63.750936549160],
							[1330540200, 59.072499126460],
							[1335810600, 43.373158880492],
							[1341081000, 54.490918947556],
							[1346437800, 56.661178852079],
							[1351708200, 73.450103545496],
							[1356978600, 71.714526354907]
						]
					}, 
					{
						key: "Short",
						values: [
							[1325356200, 17.297761889305],
							[1330540200, 15.247129891020],
							[1335810600, 11.336459046839],
							[1341081000, 13.298990907415],
							[1346437800, 16.360027000056],
							[1351708200, 18.527929522030],
							[1356978600, 22.176516738685]
						]
					}, 
					{
						key: "Gross",
						values: [
							[1325356200, 46.453174659855],
							[1330540200, 43.825369235440],
							[1335810600, 32.036699833653],
							[1341081000, 41.191928040141],
							[1346437800, 40.301151852023],
							[1351708200, 54.922174023466],
							[1356978600, 29.538009616222]
						]
					}
				];

				$scope.priceApi.update();
			}

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
						// console.log(d[0]);
						return d[0];
						// return moment(d[0]).unix();
					},
					y: function(d) {
						return d[1];
					},
					xAxis: {
						tickFormat: function(d){
							// console.log(d);
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