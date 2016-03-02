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
			var _start = new Date(scope.startDate);
			_start.setHours(0,0,0,0);
			scope.timerange=[Date.parse(_start),Date.parse(new Date())];
			
			scope.$watch('graphData',function(data){
				if(!data)
					return

				var priceArr = [];
				var rankingArr = [];
				var availableArr = [];

				var newAvailableArr = graphHistoryService.pluckData(data, 'available_history').values;

				rankingArr[0] = graphHistoryService.pluckData(data, 'ranking_history')
				priceArr[0] = graphHistoryService.pluckData(data, 'base_price')
				priceArr[1] = graphHistoryService.pluckData(data, 'retail_price')
				priceArr[2] = graphHistoryService.pluckData(data, 'discount')

				scope.availableData = newAvailableArr;
				scope.rankData = rankingArr;
				scope.priceData = priceArr;
			});

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
					},
					showXAxis: false
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