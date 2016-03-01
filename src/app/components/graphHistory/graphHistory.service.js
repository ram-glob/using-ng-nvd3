(function() {
	'use strict';

	angular
		.module('usingGulpNg')
		.factory('graphHistoryService', graphHistoryService);

	function graphHistoryService($q, $timeout) {

		var service = {
			getRandomData: getRandomData,
			pluckData: pluckData
		}

		return service;

		function generateRandomData(range) {
			console.log(range[1]);
			var basePriceArr = _.range(0, 1000, 100);
			var retailPriceArr = _.range(0, 1000, 150);
			var discountArr = _.range(0, 100, 10);

			var finalArr = _.map(_.range(7), function(element, index, list) {
				// console.log(moment(range[1]).subtract(index, 'days')._d)
				return {
					date: moment(range[1]).subtract(index, 'days')._d,
					price_history: {
						base_price: _.sample(basePriceArr),
						retail_price: _.sample(retailPriceArr),
						discount: _.sample(discountArr)
					},
					ranking_history: _.sample(_.range(10)),
					available_history: _.sample([true, false])
				};
			});

			return finalArr;
		}

		function pluckData(data, key) {
			return {
				key: key,
				values: data.map(function(d) {
					if (key === 'ranking_history') {
						return [d.date, d.ranking_history];
					} else if (key === 'available_history') {
						return { start_date: d.date, available_history: d.available_history };
					} else {
						return [d.date, d.price_history[key]];
					}
				})
			};
		}

		function getRandomData(range, end_date) {
			var deferred = $q.defer();
			var data = generateRandomData(range, end_date);

			$timeout(function() {
				if (data) {
					deferred.resolve(data);
				} else {
					deferred.reject('Error while generating data');
				}
			}, 500);

			return deferred.promise;
		}
	}
})();