var Longitude = function(value) {
	this.longitude = value;
}

Longitude.prototype.isValid = function() {
	// validation of positions afer the decimal point is missing
	return (this.longitude !== null)
			&& (this.longitude >= -180)
			&& (this.longitude <= 180);
}

module.exports = Longitude;
