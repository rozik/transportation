var latitudeModule = require('./latitude');
var longitudeModule = require('./longitude');

var station = function() {

	var name,
		latitude,
		longitude;

	var init = function(name, latitude, longitude) {
		this.name = name;
		this.latitude = latitude;
		this.longitude = longitude;
		return this;
	}

	var isValid = function() {
		var isNameValid = false;
		if(this.name) {
			isNameValid = true;
		}
		var isLatitudeValid = latitudeModule.init(this.latitude).isValid();
		var isLongitudeValid = longitudeModule.init(this.longitude).isValid();

		return isNameValid
				&& isLongitudeValid
				&& isLatitudeValid;
	}

	return {
		init: init,
		isValid: isValid
	}
};

module.exports = station();