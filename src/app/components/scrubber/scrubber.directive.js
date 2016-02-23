'use strict';

angular.module('usingGulpNg')
  .directive('scrubber', function() {
    return {
      templateUrl: 'app/components/scrubber/scrubber.html',
      restrict: 'EA',
      link: function(scope, element, attrs) {

        /**
         * set date to zero
         * @param date
         */
        function setZeroDate(dateMoment) {
          dateMoment.set('hour', 0);
          dateMoment.set('minute', 0)
          dateMoment.set('second', 0);
          dateMoment.set('millisecond', 0);
        }

        /**
         * return default end date for generating label purpose
         * @returns {*}
         */
        function generateDefaultLabelEndDate() {
          var today = moment().utc(); // current date
          // today.add(1, 'days');
          // setZeroDate(today);
          return today;
        }

        /**
         * generate date for effective end date, this is where brush will end
         */
        function generateEndBrushDate(labelEndDate) {
          return moment(labelEndDate).clone().toDate(); // giving currentDate for now
        }

        var parentSelector = d3.select(element[0]).select('.scrubber-brush'),
          width = parentSelector[0][0].clientWidth,
          height = parentSelector[0][0].clientHeight - 2,
          dayWidth = 32,
          numberOfDays,
          brushAreaSelector = d3.select(element[0]).select('.scrubber-brush-area');


        /**
         * based on end date, compute date range for label
         * @param endDate
         */
        function computeDateRange(endDateM) {
          // endDateM.toDate() => Fri Feb 19 2016 16:08:40 GMT+0530 (IST)
          // console.log(endDateM.clone().subtract('days', numberOfDays).toDate());
          var sampleArr = [
            endDateM.clone().subtract('days', numberOfDays).toDate(),
            endDateM.toDate()
          ]
          console.log(sampleArr);
          return sampleArr;
          // returns basically [from, to] i.e. start_date to end_date
        }

        console.log(brushAreaSelector);
        var svg = parentSelector.append("svg")
          .attr("width", '100%')
          .attr("height", '100%');

        var displaySvg = brushAreaSelector.append('svg')
          .attr('width', '100%')
          .attr('height', '28');

        var today = generateDefaultLabelEndDate();


        numberOfDays = Math.floor(width / dayWidth);
        console.log(numberOfDays);

        var dateR = computeDateRange(today);

        // total width for all the date in range, since we are doing ceiling, this may be bigger than our width
        // this means we need to move our time scale axis by difference
        var xDayWidth = dayWidth * numberOfDays;



        var x = d3.time.scale.utc()
          .domain(dateR)
          .range([0, xDayWidth]);


        function computeBrushDateRange() {
          // console.log(dateR); [start, end] 
          var maxDate = generateEndBrushDate(dateR[1]);
          console.log([moment(maxDate).clone().subtract('days', 1).toDate(), maxDate]); // [18, 19]
          return [moment(maxDate).clone().subtract('days', 7).toDate(), maxDate];
        }


        // var dateFormat=d3.time.format('%a')
        var dateFormat = d3.time.format('%d %b')
        var dayFormat = d3.time.format('%a')
        var monthFormat = d3.time.format('%b')
        var xAxis2 = d3.svg.axis()
          .scale(x)
          .tickFormat(function(d) {
            console.log(dateFormat(d));
            if (dateFormat(d) == "01")
              return monthFormat(d)
            return dateFormat(d)
          })
          .orient("bottom")
          // .tickPadding(20)
          .ticks(5)
          .tickSize(20);

        var xAxis2g = svg.append("g")
          .attr("class", "scrubber_x_axis")
          .attr("transform", "translate(" + 0 + ",0)")
          .attr('width', xDayWidth + 'px')
          .attr('height', 40 + 'px')
          .call(xAxis2);

        var textsOfTicks = d3.select('.scrubber_x_axis')
          .selectAll('.tick text')
          .attr('y', 28);

        console.log(textsOfTicks);

        var brushDateRange = computeBrushDateRange();

        console.log('setting brush from:' + brushDateRange[0].toISOString() + ' to: ' + brushDateRange[1].toISOString());


        var brush = d3.svg.brush()
          .x(x) // sets x-scale associated with brush
          .extent(brushDateRange) // [18, 19], Expected Now => [13, 19] i.e. 7 days
          .on("brush", brushended)
          .on("brushend", brushended);


        var gBrush = displaySvg.append("g")
          .attr("class", "brushBox") // shift by day width so it can align with xAxis2
          // .attr("transform", "translate(0,4)") // shift by day width so it can align with xAxis2
          // .attr('width', xDayWidth + 'px')
          .call(brush)
          .call(brush.event);


        gBrush.selectAll("rect")
          .attr("height", height - 10);

        gBrush.selectAll(".resize.w,.resize.e")
          .append("circle")
          .attr('class', 'circle-point')
          .attr('r', 6)
          .attr('cx', -2)
          .attr('cy', 34)

        gBrush.selectAll(".resize.w,.resize.e")
          .selectAll("rect")
          .style("visibility", "visible")
          .attr('class', 'rect-point')
          .attr('width', '2')
          .attr('height', '30')


        function brushended() {

          if (!d3.event.sourceEvent) return;

          brushDateRange = brush.extent();

          d3.select(this).transition()
            .call(brush.extent(brushDateRange))
            .call(brush.event);

          // notifyBrushChanges();

        }

        /**
         * notify that our brush time changed
         */

        var newExtent = function() {
          brush.extent(brushDateRange);
          gBrush.transition()
            .call(brush.extent(brushDateRange))
            .call(brush.event);
          // notifyBrushChanges();
        }

        /**
         * shift time by number of days
         * @param days
         */
        var shiftTimes = function(newEndDate) {

          var defaultEndDate = generateDefaultLabelEndDate();
          if (newEndDate.isAfter(defaultEndDate)) {
            newEndDate = defaultEndDate;
          }

          dateR = computeDateRange(newEndDate);
          x.domain(dateR);
          brushDateRange = computeBrushDateRange();
          newExtent();
          var t = svg.transition().duration(300);
          t.select(".scrubber_x_axis").call(xAxis2);
        };

        element.find('.back-scrubber-button').click(function(e) {
          shiftTimes(moment(dateR[1]).clone().subtract('days', numberOfDays));
        });

        element.find('.forward-scrubber-button').click(function(e) {
          shiftTimes(moment(dateR[1]).clone().add('days', numberOfDays));
        });

        element.find('.dateff').click(function(e) {
          brushDateRange = [moment(dateR[1]).clone().subtract('days', $(this).data('days')).toDate(), dateR[1]]
          newExtent();
        });

        // notifyBrushChanges();

      }
    };
  });