(function(){
	'use strict';

	angular
		.module('usingGulpNg')
		.directive('graphHistory', graphHistory);

	function graphHistory(graphHistoryService){
		var directive = {
			restrict: 'E',
			templateUrl: 'app/components/graphHistory/graphHistory.html',
			link: linkFunction,
			scope:{
				timerange: '=',
				startDate: '=',
				graphData: '=' 
			}
		};

		return directive;

		function linkFunction(scope, element, attr){
			console.log(scope.startDate);
			scope.timerange=[scope.startDate,new Date()];
			
			scope.$watch('graphData',function(data){
				if(!data)
					return

				var priceArr = [];
				var ranking_arr = [];
				var available_arr = [];

				available_arr = graphHistoryService.pluckData(data, 'available_history');

				var new_arr = available_arr.filter(function(value){
					if(value.available_history){
						return value;
					}
				});

				ranking_arr[0] = {
					key: 'Serie',
					values: graphHistoryService.pluckData(data, 'ranking_history')
				};

				priceArr[0] = {
					key: 'base',
					values: graphHistoryService.pluckData(data,'base_price')
				}

				priceArr[1] = {
					key: 'retail',
					values: graphHistoryService.pluckData(data,'retail_price')
				}

				priceArr[2] = {
					key: 'discount',
					values: graphHistoryService.pluckData(data,'discount')
				}

				scope.progressData = new_arr;
				scope.rankData = ranking_arr;
				scope.priceData = priceArr;
			})

			scope.priceOptions = {
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

			scope.rankOptions = {
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

			scope.availabilityOptions = {
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
		}
	}
})();