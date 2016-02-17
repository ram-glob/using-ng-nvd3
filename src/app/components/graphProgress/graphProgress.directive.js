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
			console.log(element.parent().width());
			var progressData;
			var width = element.parent().width();
			var height = 20;

			var d3 = $window.d3;
			var svg;
			var x, y;

			// define scale
			x = d3.scale.linear().range([0, width]);
			y = d3.scale.ordinal().rangeRoundBands([0, height], 0); // for discrete domains 

			var xAxis = d3.svg.axis() // ?
					.scale(x);
					// .orient('top');

				svg = d3.select(element[0])
					.attr('style', 'width: '+(width)+'px')
					.append('svg')
					.attr('class','progress')
					.attr('width',width)
					.attr('height',height)
					.append('g');				

			scope.$watch('arrData', function(newValue, oldValue){

				if(newValue){
					console.log('Value has been updated');
					progressData = newValue;
					// svg.selectAll('.bar').exit().transition().remove();
					svg.selectAll('.bar').remove().transition().duration(750);
					draw();
				}
			});

			function setChartParameters(){

				x.domain([0, d3.max(progressData)]).nice(); // sets domain scale's input domain to array of no.

				y.domain(progressData.map(function(d) {
				  return 0;
				}));
			}

			function draw(){
				console.log('draw called');

				setChartParameters();

				svg.selectAll(".bar")
				  .data(progressData)
				  .enter().append("rect")
				  .attr("class", "bar")
				  .attr("x", function(d) {
				    return x(d - 1);
				  })
				  .transition()
				  .delay(function(d, i){
				  	return i * 40;
				  })
				  .attr("y", function(d) {
				    return 0;
				  })
				  .attr("width", function(d) {
				    return Math.abs(x(d) - x(d - 1));
				  })
				  .attr("height", y.rangeBand())
			}
		}
	}

})();