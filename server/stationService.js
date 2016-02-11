var stationRepository = require('./stationRepository');
var validate = require('./validation');
var serverConfig = require('./config/serverConfig');

var stationService = function () {

    var getById = function(stationId, onError, onSuccess) {
        if(validate.asPositiveInt(stationId)) {
            stationRepository.getById(stationId, onError, onSuccess);
        } else {
            var error = {'type' : 'validation', 'message' : 'Invalid parameter. Station ID should be a positive integer.'};
            onError(error);
        }
    }

    var add = function(station, onError, onSuccess) {
        var onSuccessAdd = function(data) {
            if(onSuccess) {
                var resourceUri = {"url":serverConfig.getFullUrlFor('/stations/' + data.id)}
                onSuccess(resourceUri);
            }
        }
        stationRepository.add(station, onError, onSuccessAdd);
    }

    return {
        getById: getById,
        add: add
    };
};

module.exports = stationService();