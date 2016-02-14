var express = require('express');
var bodyParser = require('body-parser');
var stationsRouter = require('./api/router/stationsRouter');
var serverConfig = require('./config/serverConfig');

var app = express();
app.use(bodyParser.json());
app.use(serverConfig.getApiUrl() + '/stations', stationsRouter);

var server = app.listen(serverConfig.getPort(), serverConfig.getIp(), function () {
	var host = server.address().address
  	var port = server.address().port
  	console.log("Example app listening at http://%s:%s", host, port)
});