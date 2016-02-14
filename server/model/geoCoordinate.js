var GeoCoordinate = function(latitude, longitude) {

	var that = this;

	var latitude,
		longitude;

	this.latitude = latitude;
	this.longitude = longitude;

	var getLatitude = function() {
		return that.latitude;
	}

	var getLongitude = function() {
		return that.longitude;
	}

	return {
		getLatitude: getLatitude,
		getLongitude: getLongitude
	}
}

module.exports = GeoCoordinate;