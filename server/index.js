var serverConfig = require('./config/serverConfig');
var stationService = require('./stationService');
var stationRepository = require('./stationRepository');
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


// --- stations -------------------------------------------------

router.get('/stations/:id', function (req, res) {	
	var onSuccessRes = function(data) {
		onSuccess(res, data);
	}

	var onErrorRes = function(data) {
		onError(res, data);
	}

	stationService.getById(req.params.id, false, onErrorRes, onSuccessRes);
});

router.get('/stations/:id/schedule', function (req, res) {	
	var onSuccessRes = function(data) {
		onSuccess(res, data);
	}

	var onErrorRes = function(data) {
		onError(res, data);
	}

	stationService.getById(req.params.id, true, onErrorRes, onSuccessRes);
});

router.delete('/stations/:id', function (req, res) {	
	var onSuccessRes = function(data) {
		onSuccess(res, data);
	}

	var onErrorRes = function(data) {
		onError(res, data);
	}

	stationService.deleteStation(req.params.id, onErrorRes, onSuccessRes);
});

router.get('/stations*', function (req, res) {	
	var onSuccessRes = function(data) {
		onSuccess(res, data);
	}

	var onErrorRes = function(data) {
		onError(res, data);
	}

console.log(req.query.filter)
	if(Object.keys(req.query).length > 0) {
		if(req.query.filter) {
				stationService.getStationsInsideGeoBox(
					req.query.latitude1,
					req.query.longitude1,
					req.query.latitude2,
					req.query.longitude2,
					onErrorRes,
					onSuccessRes);
		}
	} else {
		stationRepository.getAll(onErrorRes, onSuccessRes);
	}
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