var serverConfig = function () {
    var protocol = 'http';
    var ip = '0.0.0.0';
    var port = 8088;
    var apiUrl = '/api/v1.0';

    var getFullUrlFor = function(apiEndPoint) {
        return protocol + '://' + ip + ':' + port + apiUrl + apiEndPoint;
    }

    var getApiUrl = function() {
        return apiUrl;
    }

    var getPort = function() {
    	return port;
    }

    var getIp = function() {
    	return ip;
    }

    return {
        getFullUrlFor: getFullUrlFor,
        getApiUrl: getApiUrl,
        getPort: getPort,
        getIp: getIp
    };
};

module.exports = serverConfig();