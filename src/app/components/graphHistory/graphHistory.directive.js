(function(){
	'use strict';

	angular
		.module('usingGulpNg')
		.directive('graphHistory', graphHistory);

	function graphHistory(){
		var directive = {
			restrict: 'E',
			scope: {
				priceData: '=',
				rankData: '=',
				availabilityData: '=',
				progressData: '='
			},
			templateUrl: 'app/components/graphHistory/graphHistory.html',
			controller: GraphHistoryController,
			controllerAs: 'vm',
			bindToController: true
		};

		return directive;

		function GraphHistoryController(){
			var vm = this;

			vm.priceOptions = {
				chart: {
					type: 'lineChart',
					interpolate: 'step-after',
					height: 300,
					color: d3.scale.category10().range(),
					x: function(d) {
						return d[0];
					},
					y: function(d) {
						return d[1];
					},
					useInteractiveGuideline: true,
					duration: 500,
					xAxis: {
						tickFormat: function(d) {
							return d3.time.format("%m/%d/%y")(new Date(d));
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
					yAxis: {
						tickFormat: d3.format(',d')
					},
					showXAxis: false
				}
			}

			vm.availabilityOptions = {
				chart: {
					type: 'lineChart',
					height: 50,
					noData: null,
					showLegend: false,
					x: function(d) {
						return d[0];
					},
					y: function(d) {
						return d[1];
					},
					xAxis: {
						tickFormat: function(d) {
							return d3.time.format("%d %b %y")(new Date(d))
						}
					},
					showYAxis: false
				}
			}

		}
	}
})();