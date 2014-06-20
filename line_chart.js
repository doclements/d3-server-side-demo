var lineChart = module.exports = function() {

   var data = [];

   // var data = [
   //   {
   //     'time': '2013-01-01T00:00:00Z',
   //     'value': 26
   //   },
   //   {
   //     'time': '2013-01-02T00:00:00Z',
   //     'value': 43
   //   }, ...
   // ];


   // default values for configurable input parameters
   var width = 400;
   var height = 300;
   var margin = {
      top: 10,
      right: 10,
      bottom: 40,
      left: 40
   };
   var xAxisLabel = 'Time';
   var yAxisLabel = 'Count';
   var xTicks = 5;
   var lineWidth = 2;
   var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%SZ").parse;


   var chart = function(container) {

      var xScale, xAxis, xAxisCssClass, axisLabelMargin, yScale, yAxis, g, line;

      setDimensions();
      setupXAxis();
      setupYAxis();
      setupLineChartLayout();
      addBackground();
      addXAxisLabel();
      addYAxisLabel();
      addXGridLines();
      addYGridLines();
      addLineChartData();



      function setDimensions() {
         axisLabelMargin = 10;
      }

      function setupYAxis() {
         yScale = d3.scale.linear()
            .domain([0, d3.max(data, function(d) {
               return d.count;
            }) + 10])
            .range([height - axisLabelMargin - margin.top - margin.bottom, 0]);
         console.log('xt = ', xTicks);
         yAxis = d3.svg.axis()
            .ticks(xTicks)
            .tickFormat(d3.format('s'))
            .innerTickSize(-width + axisLabelMargin + margin.left + margin.right)
            .outerTickSize(0)
            .scale(yScale)
            .orient('left');

      }

      function setupXAxis() {
         xScale = d3.time.scale()
            .domain([d3.min(data, function(d) {
               console.log('parsed = ', parseDate(d.time));
               return parseDate(d.time);
            }), d3.max(data, function(d) {
               return parseDate(d.time);
            })])
            .range([0, width - axisLabelMargin - margin.right - margin.left]);

         xAxis = d3.svg.axis()
            .ticks(xTicks)
            .innerTickSize(0)
            .outerTickSize(0)
            .scale(xScale)
            .orient('bottom')
            .tickFormat(d3.time.format('%d'));
      }

      function setupLineChartLayout() {
         g = container.append('svg')
            .attr('class', 'svg-chart')
            // .attr("width", "100%")
            // .attr("height", "100%")
            .style("width", "50%")
            .style("height", "50%")
            .attr("viewBox", "0 0 600 300")
            //.attr("preserverAspectRatio", "none")
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      }

      function addBackground() {
         g.append('rect')
            .attr('class', 'background')
            .attr('x', axisLabelMargin)
            .attr('y', -axisLabelMargin)
            .attr('width', width - axisLabelMargin - margin.left - margin.right)
            .attr('height', height - margin.top - margin.bottom);

      }

      function addXAxisLabel() {
         g.append('g')
            .attr('class', 'x axis ' + xAxisCssClass)
            .attr('transform', 'translate(' + axisLabelMargin + ',' +
               (height - axisLabelMargin - margin.top - margin.bottom) + ')')
            .call(xAxis)
            .append('text')
            .attr('class', 'axis-label')
            .attr('x', (width - margin.left - margin.right - axisLabelMargin) / 2)
            .attr('y', margin.left)
            .style('text-anchor', 'middle')
            .text(xAxisLabel);
      }

      function addYAxisLabel() {
         g.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + axisLabelMargin + ', 0)')
            .call(yAxis)
            .append('text')
            .attr('class', 'axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('y', -margin.left)
            .attr('x', -(height - margin.top - margin.bottom - axisLabelMargin) / 2)
            .style('text-anchor', 'middle')
            .text(yAxisLabel);
      }

      function addLineChartData() {
         line = d3.svg.line()
            .x(function(d) {
               console.log('x = ', xScale(parseDate(d.time)));
               return xScale((parseDate(d.time))) + axisLabelMargin;
            })
            .y(function(d) {
               console.log('y = ', yScale(d.count));
               return yScale(d.count);
            });

         g.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line)
            .style("stroke-width", lineWidth);

      }

      function make_x_axis() {
         return d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .ticks(5);
      }

      function make_y_axis() {
         return d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(5);
      }

      function addXGridLines() {
         console.log(xTicks);
         g.selectAll("line.verticalGrid").data(xScale.ticks(xTicks)).enter()
            .append("line")
            .attr({
               "class": "verticalGrid grid",
               "y1": 0 - axisLabelMargin,
               "y2": height - margin.top - margin.bottom - axisLabelMargin,
               "x1": function(d) {
                  return xScale(d);
               },
               "x2": function(d) {
                  return xScale(d);
               },
               "fill": "none",
               "shape-rendering": "crispEdges",
               "stroke": "black",
               "stroke-width": "1px"
            });
      }

      function addYGridLines() {
         g.selectAll("line.horizontalGrid").data(yScale.ticks(4)).enter()
            .append("line")
            .attr({
               "class": "horizontalGrid grid",
               "x1": 0 + axisLabelMargin,
               "x2": width - margin.left - margin.right,
               "y1": function(d) {
                  return yScale(d);
               },
               "y2": function(d) {
                  return yScale(d);
               },
               "fill": "none",
               "shape-rendering": "crispEdges",
               "stroke": "black",
               "stroke-width": "1px"
            });
      }

   };
   chart.lineWidth = function(value) {
      if (!arguments.length) return lineWidth;
      lineWidth = value;
      return chart;
   };

   chart.xTicks = function(value) {
      if (!arguments.length) return xTicks;
      xTicks = value;
      return chart;
   };

   chart.data = function(value) {
      if (!arguments.length) return data;
      data = value;
      return chart;
   };

   chart.width = function(value) {
      if (!arguments.length) return width;
      width = value;
      return chart;
   };

   chart.height = function(value) {
      if (!arguments.length) return height;
      height = value;
      return chart;
   };

   chart.margin = function(value) {
      if (!arguments.length) return margin;
      margin = value;
      return chart;
   };

   chart.xAxisLabel = function(value) {
      if (!arguments.length) return xAxisLabel;
      xAxisLabel = value;
      return chart;
   };

   chart.yAxisLabel = function(value) {
      if (!arguments.length) return yAxisLabel;
      yAxisLabel = value;
      return chart;
   };

   return chart;
};