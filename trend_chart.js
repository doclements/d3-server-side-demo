var trendChart = module.exports = function() {

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
   var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%SZ").parse;


   var chart = function(container) {



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
   return chart;
};
