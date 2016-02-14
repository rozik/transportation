var Longitude = function(value) {

	var that = this;
	var longitude;

	this.longitude = value;

	var isValid = function() {
		// validation of positions afer the decimal point is missing
		return (that.longitude !== null)
				&& (that.longitude >= -180)
				&& (that.longitude <= 180);
	}

	return {
		isValid: isValid
	}
}

module.exports = Longitude;