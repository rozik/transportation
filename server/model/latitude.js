var Latitude = function(value) {
	this.latitude = value;
};

Latitude.prototype.isValid = function() {
	// validation of positions afer the decimal point is missing
	return (this.latitude !== null)
			&& (this.latitude >= -90)
			&& (this.latitude <= 90);
}

module.exports = Latitude;
