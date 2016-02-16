(function(){
	'use strict';

	angular
		.module('usingGulpNg')
		.directive('graphProgress', graphProgress);

	function graphProgress(){
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
			console.log(element);
			var width = 500;
			var height = 20;

			var svg = d3.select(element)
				// .attr('style', 'width: '+(500+2)+'px')
				// .append('svg')
			console.log(svg);

			// element.append('svg')
			// 	.attr('class','progress')
			// 	.attr('width', 500)
			// 	.attr('height', 20)
			// 	.append('g');

			console.log(scope.arrData);
		}
	}

})();