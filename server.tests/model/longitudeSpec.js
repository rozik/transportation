var Longitude = require('../../server/model/Longitude');

describe('longitudeSpec', function () {

    // latitude:  [-180 .. 180]
    it("should validate a longitude", function() {
        expect(new Longitude(1.123456).isValid()).toBe(true);
        expect(new Longitude(-180).isValid()).toBe(true);
        expect(new Longitude(180).isValid()).toBe(true);
        expect(new Longitude(0).isValid()).toBe(true);

        expect(new Longitude().isValid()).toBe(false);
        expect(new Longitude(null).isValid()).toBe(false);
        expect(new Longitude(-181).isValid()).toBe(false);
        expect(new Longitude(181).isValid()).toBe(false);
        expect(new Longitude('abc').isValid()).toBe(false);
    });
});
