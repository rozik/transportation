var serverConfig = require('./config/serverConfig');
var stationService = require('./stationService');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var router = express.Router(); 
app.use(serverConfig.getApiUrl(), router);


//router.use(function(req, res, next) {
//    console.log('Something is happening.');
//    next();
//});


var onSuccess = function(res, data) {
	res.json(data);
}

var onError = function(res, error) {
	var body = {};
	if(error && error.type && (error.type === "validation")) {
		res.writeHead(400);
		body = error;
	} else {
		res.writeHead(500);
	}

	console.log(error);
	res.end(JSON.stringify(body));
}

router.get('/stations/:id', function (req, res) {	
	var onSuccessRes = function(data) {
		onSuccess(res, data);
	}

	var onErrorRes = function(data) {
		onError(res, data);
	}

	stationService.getById(req.params.id, onErrorRes, onSuccessRes);
});

router.post('/stations', function (req, res) {
	var onSuccessRes = function(data) {
		onSuccess(res, data);
	}

	var onErrorRes = function(data) {
		onError(res, data);
	}

	stationService.add(req.body, onErrorRes, onSuccessRes);
});

var server = app.listen(serverConfig.getPort(), serverConfig.getIp(), function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
});