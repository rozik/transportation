var databaseConfig = require('../server/config/databaseConfig');
var pgp = require('pg-promise')();
var geoCoordinate = require('./model/geoCoordinate');

var stationRepository = function () {
    var db = pgp(databaseConfig.getConnectionString());

    var getById = function(stationId, onError, onSuccess) {
        db.func('transport.getStationById', [stationId])
            .then(function (data) {
                var result = {};
                if(data.length > 0) {
                    if (data[0].id) {
                        result = data[0];
                    }
                }
                onSuccess(result);
            })
            .catch(function (error) {
                onError(error);
            });
    }

    var getAll = function(onError, onSuccess) {
        db.func('transport.getStations')
            .then(function (data) {
                onSuccess(data);
            })
            .catch(function (error) {
                onError(error);
            });
    }

    var getStationsInsideGeoBox = function(geoCoordinate1, geoCoordinate2, onError, onSuccess) {
        db.func('transport.getStationsInsideGeoBox', [
                    geoCoordinate1.getLatitude(), geoCoordinate1.getLongitude(),
                    geoCoordinate2.getLatitude(), geoCoordinate2.getLongitude()
            ])
            .then(function (data) {
                onSuccess(data);
            })
            .catch(function (error) {
                onError(error);
            });
    }

    var add = function(station, onError, onSuccess) {
        db.func('transport.addStation', [
                    station.name,
                    station.latitude,
                    station.longitude
                ])
            .then(function (data) {
                var result = {};
                if(data.length > 0) {
                    if (data[0].id) {
                        result = data[0];
                    }
                }
                onSuccess(result);
            })
            .catch(function (error) {
                onError(error);
            });
    }

    return {
        getById: getById,
        getAll: getAll,
        getStationsInsideGeoBox: getStationsInsideGeoBox,
        add: add
    };
};

module.exports = stationRepository();