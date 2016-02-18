var Latitude = require('./Latitude');
var Longitude = require('./Longitude');

var Station = function(name, latitude, longitude) {
	this.name = name;
	this.latitude = new Latitude(latitude);
	this.longitude = new Longitude(longitude);
};

Station.prototype.isValid = function() {
	var isNameValid = false;
	if(this.name) {
		isNameValid = true;
	}
	var isLatitudeValid =  this.latitude.isValid();
	var isLongitudeValid = this.longitude.isValid();

	return isNameValid
			&& isLongitudeValid
			&& isLatitudeValid;
}

module.exports = Station;
