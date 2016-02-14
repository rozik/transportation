var Latitude = function(value) {

	var that = this;
	var latitude;

	this.latitude = value;

	var isValid = function() {
		// validation of positions afer the decimal point is missing
		return (that.latitude !== null)
				&& (that.latitude >= -90)
				&& (that.latitude <= 90);
	}

	return {
		isValid: isValid
	}
}

module.exports = Latitude;