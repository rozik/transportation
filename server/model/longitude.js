var longitude = function() {

	var longitude;

	var init = function(value) {
		this.longitude = value;
		return this;
	}

	var isValid = function() {
		// validation of positions afer the decimal point is missing
		return (this.longitude !== null)
				&& (this.longitude >= -180)
				&& (this.longitude <= 180);
	}

	return {
		init: init,
		isValid: isValid
	}
}

module.exports = longitude();