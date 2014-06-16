var d3 = require('d3');
var scatterChart = require('./scatter_plot');


var getScatterChart = function (params) {

  var chart = scatterChart()
    .data(params.data)
    .width(params.width)
    .height(params.height)
    .xAxisLabel(params.xAxisLabel)
    .yAxisLabel(params.yAxisLabel);


  d3.select('body').append('div').attr('id', params.containerId).call(chart);

  var selector = '#' + params.containerId;
  var svg = d3.select(selector).node().outerHTML;
  d3.select(selector).remove();

  return svg;

};


module.exports = {
  getScatterChart: getScatterChart
};
