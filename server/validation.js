var validation = function () {

    var asInt = function(value) {
        return !isNaN(value) && 
            parseInt(Number(value)) == value && 
            !isNaN(parseInt(value, 10));
    }

    var asPositiveInt = function(value) {
        return asInt(value) && (value > 0);
    }

    return {
        asInt: asInt,
        asPositiveInt: asPositiveInt
    };
};

module.exports = validation();