var express = require('express');
var stationService = require('../../stationService');
var stationRepository = require('../../stationRepository');

var stationsRouter = function() {

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


	var router = express.Router(); 

	router.get('/:id', function (req, res) {	
		var onSuccessRes = function(data) {
			onSuccess(res, data);
		}

		var onErrorRes = function(data) {
			onError(res, data);
		}

		stationService.getById(req.params.id, false, onErrorRes, onSuccessRes);
	});

	router.get('/:id/schedule', function (req, res) {	
		var onSuccessRes = function(data) {
			onSuccess(res, data);
		}

		var onErrorRes = function(data) {
			onError(res, data);
		}

		stationService.getById(req.params.id, true, onErrorRes, onSuccessRes);
	});

	router.delete('/:id', function (req, res) {	
		var onSuccessRes = function(data) {
			onSuccess(res, data);
		}

		var onErrorRes = function(data) {
			onError(res, data);
		}

		stationService.deleteStation(req.params.id, onErrorRes, onSuccessRes);
	});

	router.get('*', function (req, res) {	
		var onSuccessRes = function(data) {
			onSuccess(res, data);
		}

		var onErrorRes = function(data) {
			onError(res, data);
		}

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

	router.post('', function (req, res) {
		var onSuccessRes = function(data) {
			onSuccess(res, data);
		}

		var onErrorRes = function(data) {
			onError(res, data);
		}

		stationService.add(req.body, onErrorRes, onSuccessRes);
	});

	return router;
}

module.exports = stationsRouter();