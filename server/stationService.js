var stationModule = require('./model/station');
var stationRepository = require('./stationRepository');
var validate = require('./validation');
var serverConfig = require('./config/serverConfig');

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

    return {
        getById: getById,
        add: add
    };
};

module.exports = stationService();