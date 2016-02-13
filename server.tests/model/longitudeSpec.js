var longitude = require('../../server/model/longitude');

describe('longitudeSpec', function () {

    // latitude:  [-180 .. 180]
    it("should validate a longitude", function() {
        expect(longitude.init(1.123456).isValid()).toBe(true);
        expect(longitude.init(-180).isValid()).toBe(true);
        expect(longitude.init(180).isValid()).toBe(true);
        expect(longitude.init(0).isValid()).toBe(true);

        expect(longitude.init().isValid()).toBe(false);
        expect(longitude.init(null).isValid()).toBe(false);
        expect(longitude.init(-181).isValid()).toBe(false);
        expect(longitude.init(181).isValid()).toBe(false);
        expect(longitude.init('abc').isValid()).toBe(false);
    });
});