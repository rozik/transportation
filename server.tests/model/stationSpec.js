var station = require('../../server/model/station');

describe('stationSpec', function () {

    it("should validate a station", function() {
        expect(station.init('abc', 1.123456, 111.123456).isValid()).toBe(true);
        expect(station.init('', 1.123456, 111.123456).isValid()).toBe(false);
        expect(station.init('abc', 1.123456, -181).isValid()).toBe(false);
    });
});