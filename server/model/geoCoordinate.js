var GeoCoordinate = function(latitude, longitude) {
	this.latitude = latitude;
	this.longitude = longitude;
}

GeoCoordinate.prototype.getLatitude = function() {
	return this.latitude;
}


GeoCoordinate.prototype.getLongitude = function() {
	return this.longitude;
}

module.exports = GeoCoordinate;
