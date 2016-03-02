(function() {
	'use strict';

	angular
		.module('usingGulpNg')
		.directive('graphProgress', graphProgress);

	function graphProgress($window) {
		var directive = {
			restrict: 'E',
			replace: true,
			scope: {
				arrData: '=data'
			},
			link: linkFunction
		}

		return directive;

		function linkFunction(scope, element, attrs) {
			var width = element.parent().width();
			var height = 20;

			var d3 = $window.d3;
			var svg;

			init();

			scope.$watch('arrData', function(newValue, oldValue) {
				if (newValue) {
					console.log(newValue);
					console.log(width / newValue.length);
					drawBars(newValue);
				}
			});

 
			function drawBars(data) {
				var bars = svg.selectAll('rect')
					.data(data)

				var barWidth = width / data.length;
				
				// enter
				bars.enter()
					.append('rect')
					.attr('class', 'bar')
					.attr('fill', '#eee')
					.attr('width', barWidth)
					.attr('x', function(d,i){
						return i * barWidth;
					})
					.attr('height', height)

				bars
					.transition()
					.duration(300)
					.ease('quad')
					.style("fill-opacity", function(d) {
						return d.available_history ? 1 : 0
					});
			}

			function init() {
				svg = d3.select(element[0])
					.attr('style', 'width: ' + (width) + 'px')
					.append('svg')
					.attr('class', 'progress')
					.attr('width', width)
					.attr('height', height)
			}
		}
	}

})();