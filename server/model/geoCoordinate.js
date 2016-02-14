var GeoCoordinate = function(latitude, longitude) {

	var self = this;

	var latitude,
		longitude;

	this.latitude = latitude;
	this.longitude = longitude;

	var getLatitude = function() {
		return self.latitude;
	}

	var getLongitude = function() {
		return self.longitude;
	}

	return {
		getLatitude: getLatitude,
		getLongitude: getLongitude
	}
}

module.exports = GeoCoordinate;