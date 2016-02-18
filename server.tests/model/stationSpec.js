var Station = require('../../server/model/station');

describe('stationSpec', function () {

    it("should validate a station", function() {
        expect(new Station('abc', 1.123456, 111.123456).isValid()).toBe(true);
        expect(new Station('', 1.123456, 111.123456).isValid()).toBe(false);
        expect(new Station('abc', 1.123456, -181).isValid()).toBe(false);
    });
});
