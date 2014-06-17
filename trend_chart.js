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
   var blockGutter = 1;
   var blockSize = 8;
   var rows = 7;


   var chart = function(container) {

      var xScale, yScale, colourScale, axisLabelMargin, xAxis, yAxis, blocks, g;

      setDimensions();

      function setDimensions() {
         axisLabelMargin = 10;
      }

      function processData(data) {
         rows = data.rows || rows;
         var cols = Math.ceil(data.data.length / rows);
         var _rows = [];
         console.log(cols);
         for(i=0;i<cols;i++){
            _rows[i] = [];
            for(x=0;x<rows;x++){
               _rows[i].push(data.data[i+(x*cols)]);
            }
         }
         return _rows;
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

   chart.blockSize = function(value) {
      if (!arguments.length) return blockSize;
      blockSize = value;
      return chart;
   };

   chart.blockGutter = function(value) {
      if (!arguments.length) return blockGutter;
      blockGutter = value;
      return chart;
   };
   return chart;
};