(function(){
	'use strict';

	angular
		.module('usingGulpNg')
		.directive('graphProgress', graphProgress);

	function graphProgress($window){
		var directive = {
			restrict: 'E',
			replace: true,
			scope: {
				arrData: '=data'
			},
			link: linkFunction
		}

		return directive;

		function linkFunction(scope, element, attrs){
			var width = element.parent().width();
			var height = 20;

			var d3 = $window.d3;
			var svg;
			var xScale, yScale;

			init();			

			scope.$watch('arrData', function(newValue, oldValue){
				if(newValue){
					drawBars(newValue);
				}
			});

			function setChartParameters(data){
				xScale = d3.time.scale().range([0, width]);
				yScale = d3.scale.ordinal().rangeRoundBands([0, height], 0);

				xScale.domain(d3.extent(data.map(function(d) {
					return d.start_date;
				} )))

				yScale.domain(data.map(function(d) {
				  return 0;
				}));
			}

			function drawBars(data){
				setChartParameters(data);

				var bars = svg.selectAll('rect.bar')
											.data(data)

				// enter
				bars.enter()
					.append('rect')
					.attr('class', 'bar')
					.attr('fill', '#eee')

				// exit
				bars.exit()
					.transition()
					.duration(300)
					.ease('exp')
						.attr('width', 0)
						.remove()

				bars
					.transition()
					.duration(300)
					.ease('quad')
						.attr("x", function(d) {
					    return xScale(Date.parse(d.start_date)); // this is basically xScale
					  })
						.attr('width', function(d) {
					  	return 20;
					  })
					  .attr('height', height)
			}

			function init(){
				var xAxis = d3.svg.axis()
					.scale(xScale);

				svg = d3.select(element[0])
					.attr('style', 'width: '+(width)+'px')
					.append('svg')
					.attr('class','progress')
					.attr('width',width)
					.attr('height',height)
					.append('g')
					.attr('id', 'barChart');
			}
		}
	}

})();