(function() {
	'use strict';

	angular
		.module('usingGulpNg')
		.controller('StocksController', StocksController);

	function StocksController($http, $log, graphHistoryService) {
		var vm = this;

		vm.monthData = [{
			'key': 'Series 1',
			'values': [
				[27, 0],
				[28, 1],
				[29, 2],
				[30, 3],
				[1, 4],
				[2, 5],
				[3, 6],
				[4, 7],
				[5, 8]
			]
		}];

		vm.availabilityData = [{
			'key': 'Available',
			'values': [	
				['Jan-2000',0],
				['Feb-2000',1366],
				['Mar-2000',1498],
				['Apr-2000',1452],
				['May-2000',1420],
				['Jun-2000',1454],
				['Jul-2000',1430],
				['Aug-2000',1517],
				['Sep-2000',1436],
				['Oct-2000',1429],
				['Nov-2000',1314],
				['Dec-2000',1320],
				['Jan-2001',1366],
				['Feb-2001',1239],
				['Mar-2001',1160],
				['Apr-2001',1249],
				['May-2001',1255],
				['Jun-2001',1224],
				['Jul-2001',1211],
				['Aug-2001',1133],
				['Sep-2001',1040],
				['Oct-2001',1059],
				['Nov-2001',1139],
				['Dec-2001',1148],
				['Jan-2002',1130],
				['Feb-2002',1106],
				['Mar-2002',1147],
				['Apr-2002',1076],
				['May-2002',1067],
				['Jun-2002',989],
				['Jul-2002',911],
				['Aug-2002',916],
				['Sep-2002',815],
				['Oct-2002',885],
				['Nov-2002',936],
				['Dec-2002',879],
				['Jan-2003',855],
				['Feb-2003',841],
				['Mar-2003',848],
				['Apr-2003',916],
				['May-2003',963],
				['Jun-2003',974],
				['Jul-2003',990],
				['Aug-2003',1008],
				['Sep-2003',995],
				['Oct-2003',1050],
				['Nov-2003',1058],
				['Dec-2003',1111],
				['Jan-2004',1131],
				['Feb-2004',1144],
				['Mar-2004',1126],
				['Apr-2004',1107],
				['May-2004',1120],
				['Jun-2004',1140],
				['Jul-2004',1101],
				['Aug-2004',1104],
				['Sep-2004',1114],
				['Oct-2004',1130],
				['Nov-2004',1173],
				['Dec-2004',1211],
				['Jan-2005',1181],
				['Feb-2005',1203],
				['Mar-2005',1180],
				['Apr-2005',1156],
				['May-2005',1191],
				['Jun-2005',1191],
				['Jul-2005',1234],
				['Aug-2005',1220],
				['Sep-2005',1228],
				['Oct-2005',1207],
				['Nov-2005',1249],
				['Dec-2005',1248],
				['Jan-2006',1280],
				['Feb-2006',1280],
				['Mar-2006',1294],
				['Apr-2006',1310],
				['May-2006',1270],
				['Jun-2006',1270],
				['Jul-2006',1276],
				['Aug-2006',1303],
				['Sep-2006',1335],
				['Oct-2006',1377],
				['Nov-2006',1400],
				['Dec-2006',1418],
				['Jan-2007',1438],
				['Feb-2007',1406],
				['Mar-2007',1420],
				['Apr-2007',1482],
				['May-2007',1530],
				['Jun-2007',1503],
				['Jul-2007',1455],
				['Aug-2007',1473],
				['Sep-2007',1526],
				['Oct-2007',1549],
				['Nov-2007',1481],
				['Dec-2007',1468],
				['Jan-2008',1378],
				['Feb-2008',1330],
				['Mar-2008',1322],
				['Apr-2008',1385],
				['May-2008',1400],
				['Jun-2008',1280],
				['Jul-2008',1267],
				['Aug-2008',1282],
				['Sep-2008',1166],
				['Oct-2008',968],
				['Nov-2008',896],
				['Dec-2008',903],
				['Jan-2009',825],
				['Feb-2009',735],
				['Mar-2009',797],
				['Apr-2009',872],
				['May-2009',919],
				['Jun-2009',919],
				['Jul-2009',987],
				['Aug-2009',1020],
				['Sep-2009',1057],
				['Oct-2009',1036],
				['Nov-2009',1095],
				['Dec-2009',1115],
				['Jan-2010',1073],
				['Feb-2010',1104],
				['Mar-2010',11405]
			]
		}];

		function generateProgressData(){
			graphHistoryService.getRandomData()
				.then(function(result){
					var _mock = result;

					var available_arr = [];

					available_arr = graphHistoryService.pluckData(result, 'available_history');

					var new_arr = available_arr.filter(function(value){
						if(value.available_history){
							return value;
						}
					});

					vm.progressData = new_arr;
				});
			// var _mock = generateRandomData();
			// var available_arr = [];

			// for(var i=0; i<_mock.length; i++){
			// 	if(_mock[i].available_history){
			// 		available_arr.push({ start_date: Date.parse(moment(_mock[i].date)) });
			// 	}
			// }

			// return available_arr;
		}

		function generateRandomData(){
			var current = moment();
			var last = moment(current).subtract(28,'days');

			var basePriceArr = _.range(0,1000,100);
			var retailPriceArr = _.range(0,1000,150);
			var discountArr = _.range(0,100,10);
			
			var mainArr = [];
			mainArr = _.range(10);

			var finalArr = _.map(_.range(10), function(element, index, list){
				return {
					date: moment(current).subtract(index, 'days')._d,
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
	}
})();
