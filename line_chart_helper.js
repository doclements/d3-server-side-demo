var d3 = require('d3');
var lineChart = require('./line_chart');


var getLineChart = function (params) {

  var chart = lineChart()
    .data(params.data)
    .width(params.width)
    .height(params.height)
    .xAxisLabel(params.xAxisLabel)
    .yAxisLabel(params.yAxisLabel)
    .xTicks(5)
    .lineWidth(4);


  d3.select('body').append('div').attr('id', params.containerId).call(chart);

  var selector = '#' + params.containerId;
  var svg = d3.select(selector).node().outerHTML;
  d3.select(selector).remove();

  return svg;

};


module.exports = {
  getLineChart: getLineChart
};
