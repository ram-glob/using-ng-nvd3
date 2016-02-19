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
        template: '<div class="container-bar"></div>',
        link: linkFunction
      }

      return directive;

      function linkFunction(scope, element, attrs) {


        var width = 1100;
        var height = 20;

        var d3 = $window.d3;
        var x = d3.scale.linear().range([0, width]);
        var y = d3.scale.ordinal().rangeRoundBands([0, height], 0);

        var xAxis = d3.svg.axis()
          .scale(x)
          .orient('top');

        var svg = d3.select(".container-bar")
          .attr('style', 'width: ' + (width + 2) + 'px')
          .append('svg')
          .attr('class', 'progress')
          .attr('width', width)
          .attr('height', height)
          .append('g');

				});

  			function reDraw(progressData){
        var rect=svg.selectAll(".bar")
          .data(progressData)
          .enter().append("rect")
          .attr("class", "bar")
					.attr('x',0)

					svg.selectAll(".bar")
	          .data(progressData)
						.remove()
						.exit()

					rect.attr("x", function(d)
            return x(d - 1);
          })
          .attr("y", function(d) {
            return 0;
          })
          .attr("width", function(d) {
            return Math.abs(x(d) - x(d - 1));
          })
          .attr("height", y.rangeBand());


					x.domain([0, d3.max(progressData)]).nice();

	        y.domain(progressData.map(function(d) {
	          return 0;

))}}
        scope.$watch('arrData', function(newValue, oldValue) {
          if (newValue) {

  						reDraw(newValue);
          }
        });


      }
    };

}
)();
