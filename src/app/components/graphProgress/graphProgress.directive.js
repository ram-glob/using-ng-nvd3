<<<<<<< HEAD
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
=======
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
				xScale = d3.scale.linear().range([0, width]);
				yScale = d3.scale.ordinal().rangeRoundBands([0, height], 0);

				xScale.domain([0, d3.max(data, function(d){
					return d.end_date;
				})]).nice();

				yScale.domain(data.map(function(d) {
				  return 0;
				}));
			}

			function drawBars(data){
				setChartParameters(data);

				var grp = d3.select('#barChart');

				var bars = grp.selectAll('rect.bar')
											.data(data)

				// enter
				bars.enter()
					.append('svg:rect')
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
					    return xScale(d.start_date); // this is basically xScale
					  })
						.attr('width', function(d) {
					  	return xScale(d.end_date) - xScale(d.start_date);
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
>>>>>>> 32816451f48d21fbbe28768df4016de51bf507c9
