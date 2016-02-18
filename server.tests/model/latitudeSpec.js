var Latitude = require('../../server/model/latitude');

describe('latitudeSpec', function () {

    // latitude:  [-90 .. 90]
    it("should validate a latitude", function() {
        expect(new Latitude(1.123456).isValid()).toBe(true);
        expect(new Latitude(-90).isValid()).toBe(true);
        expect(new Latitude(90).isValid()).toBe(true);
        expect(new Latitude(0).isValid()).toBe(true);

        expect(new Latitude().isValid()).toBe(false);
        expect(new Latitude(null).isValid()).toBe(false);
        expect(new Latitude(-91).isValid()).toBe(false);
        expect(new Latitude(91).isValid()).toBe(false);
        expect(new Latitude('abc').isValid()).toBe(false);
    });
});
