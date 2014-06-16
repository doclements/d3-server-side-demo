var express = require('express');
var app = express();


app.engine('.html', require('ejs').__express);
app.set('views', __dirname);
app.set('view engine', 'html');


app.locals.fixtureData = require('./time_data.json');
app.locals.barData = require('./fixture_data.json');
app.locals.scatterData = require('./scatter_data.json');
app.locals.lineChartHelper = require('./line_chart_helper');
app.locals.barChartHelper = require('./bar_chart_helper');
app.locals.scatterChartHelper = require('./scatter_chart_helper');

app.get('/', function(req, res) {
  res.render('index');
});


app.listen(3000);
console.log('listening on port 3000');
