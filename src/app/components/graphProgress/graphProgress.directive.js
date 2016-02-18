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
			template: '<div class="container-bar"></div>',
			link: linkFunction
		}

		return directive;

		function linkFunction(scope, element, attrs){
			var progressData = scope.arrData;
			var width = element.parent().width();
			var height = 20;

			var d3 = $window.d3;
			var svg;
			var x, y;

			// define scale
			x = d3.scale.linear().range([0, width]);
			y = d3.scale.ordinal().rangeRoundBands([0, height], 0); // for discrete domains and divide them into bands

			var xAxis = d3.svg.axis()
					.scale(x);

				svg = d3.select(element[0])
					.attr('style', 'width: '+(width)+'px')
					.append('svg')
					.attr('class','progress')
					.attr('width',width)
					.attr('height',height)
					.append('g');				

			draw();

			scope.$watch('arrData', function(newValue, oldValue){
				if(newValue){
					reinit(newValue);
				}
			});

			function setChartParameters(){

				x.domain([0, d3.max(progressData, function(d){
					console.log(d.start_date);
					return d.end_date;
				})]).nice(); // sets domain scale's input domain to array of no.

				// x.domain([0, d3.max(progressData)]).nice();

				y.domain(progressData.map(function(d) {
				  return 0;
				})); // because of ordinal domain
			}

			function draw(){
				console.log('draw called', progressData);

				setChartParameters();

				svg.selectAll("rect")
				  .data(progressData)
				  .enter().append("rect")
				  .attr("class", "bar")
			}

			function reinit(newValue){
				console.log(newValue);
				svg.selectAll("rect")
						.data(newValue)
						.transition()
						.attr("x", function(d) {
					    return x(d.start_date); // this is basically xScale
					  })
					  .attr("y", function(d) {
					    return 0;
					  })
					  .attr("width", function(d) {
					  	return x(d.end_date) - x(d.start_date);
					    // return Math.abs(x(d.end_date) - x(d.start_date));
					  })
					  .attr("height", height);
			}
		}
	}

})();