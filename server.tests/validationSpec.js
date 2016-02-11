var validate = require('../server/validation');

describe('validationSpec', function () {

    it("should validate integers", function() {
        expect(validate.asInt(0)).toBe(true);
        expect(validate.asInt(1)).toBe(true);
        expect(validate.asInt(-1)).toBe(true);
        expect(validate.asInt(99)).toBe(true);
        expect(validate.asInt('99')).toBe(true);
        expect(validate.asInt('')).toBe(false);
        expect(validate.asInt('w')).toBe(false);
    });

    it("should validate positive integers", function() {
        expect(validate.asPositiveInt(0)).toBe(false);
        expect(validate.asPositiveInt(1)).toBe(true);
        expect(validate.asPositiveInt(-1)).toBe(false);
        expect(validate.asPositiveInt(99)).toBe(true);
        expect(validate.asPositiveInt('99')).toBe(true);
        expect(validate.asPositiveInt('')).toBe(false);
        expect(validate.asPositiveInt('w')).toBe(false);
    });
});