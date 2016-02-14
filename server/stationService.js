var stationModule = require('./model/station');
var stationRepository = require('./stationRepository');
var validate = require('./validation');
var serverConfig = require('./config/serverConfig');
var GeoCoordinate = require('./model/geoCoordinate');
var Latitude = require('./model/Latitude');
var Longitude = require('./model/Longitude');

var stationService = function () {

    var getById = function(stationId, isShowSchedule, onError, onSuccess) {
        if(validate.asPositiveInt(stationId)) {
            var onSuccessAll = onSuccess;
            if(isShowSchedule) {
                onSuccessAll = function(data) {
                    if(data.hasOwnProperty('id')) {
                        stationRepository.getSchedule(data, stationId, onError, onSuccess);
                    } else {
                        onSuccess(data);
                    }
                }
            }
            stationRepository.getById(stationId, onError, onSuccessAll);
        } else {
            var error = {'type' : 'validation', 'message' : 'Invalid parameter. Station ID should be a positive integer.'};
            onError(error);
        }
    }

    var add = function(station, onError, onSuccess) {
        var s = stationModule.init(station.name, station.latitude, station.longitude);
        if(s.isValid()) {
            var onSuccessAdd = function(data) {
                if(onSuccess) {
                    var resourceUri = {"uri":serverConfig.getFullUrlFor('/stations/' + data.id)}
                    onSuccess(resourceUri);
                }
            }
            stationRepository.add(station, onError, onSuccessAdd);
        } else {
            var error = {
                'type' : 'validation',
                'message' : 'Invalid parameter. name: a non empty string; latitude: [-90 .. 90]; longitude: [-180 .. 180]'
            };
            onError(error);   
        }
    }

    var getStationsInsideGeoBox = function(
            latitude1,
            longitude1,
            latitude2,
            longitude2,
            onError,
            onSuccess){
        var latitudeModel1 = new Latitude(latitude1);
        var latitudeModel2 = new Latitude(latitude2);
        var longitudeModel1 = new Longitude(longitude1);
        var longitudeModel2 = new Longitude(longitude1);
        if((latitudeModel1.isValid())
            && (latitudeModel2.isValid())
            && (longitudeModel1.isValid())
            && (longitudeModel2.isValid())) {
            var geoCoordinate1 = new GeoCoordinate(latitude1, longitude1);
            var geoCoordinate2 = new GeoCoordinate(latitude2, longitude2);
            stationRepository.getStationsInsideGeoBox(geoCoordinate1, geoCoordinate2, onError, onSuccess);
        } else {
            var error = {'type' : 'validation', 'message' : 'Invalid parameter. latitude1, latitude2, longitude1, longitude2 have to be set.'};
            onError(error);
        }
    }

    return {
        getById: getById,
        add: add,
        getStationsInsideGeoBox: getStationsInsideGeoBox
    };
};

module.exports = stationService();