var latitude = function() {

	var latitude;

	var init = function(value) {
		this.latitude = value;
		return this;
	}

	var isValid = function() {
		// validation of positions afer the decimal point is missing
		return (this.latitude !== null)
				&& (this.latitude >= -90)
				&& (this.latitude <= 90);
	}

	return {
		init: init,
		isValid: isValid
	}
}

module.exports = latitude();