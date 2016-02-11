var databaseConfig = function () {
    var connectionString = "postgres://test_user:test_password@127.0.0.1/test_database";

    var getConnectionString = function() {
        return connectionString;
    }

    return {
        getConnectionString: getConnectionString
    };
};

module.exports = databaseConfig();