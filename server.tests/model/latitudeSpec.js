var latitude = require('../../server/model/latitude');

describe('latitudeSpec', function () {

    // latitude:  [-90 .. 90]
    it("should validate a latitude", function() {
        expect(latitude.init(1.123456).isValid()).toBe(true);
        expect(latitude.init(-90).isValid()).toBe(true);
        expect(latitude.init(90).isValid()).toBe(true);
        expect(latitude.init(0).isValid()).toBe(true);

        expect(latitude.init().isValid()).toBe(false);
        expect(latitude.init(null).isValid()).toBe(false);
        expect(latitude.init(-91).isValid()).toBe(false);
        expect(latitude.init(91).isValid()).toBe(false);
        expect(latitude.init('abc').isValid()).toBe(false);
    });
});