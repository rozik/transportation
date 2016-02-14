var express = require('express');
var databaseConfig = require('../../config/databaseConfig');
var pg = require('pg');
var fs = require('fs');

var stationsRouter = function() {

	var router = express.Router(); 

	router.post('/db/reset', function (req, res) {
		var onSuccess = function() {
			res.end('');
		}

		var onError = function(error) {
			console.log(error);
			res.end('');
		}

		var sql = "DROP SCHEMA transport CASCADE;"
                    + fs.readFileSync('../db/sql/create-schema.sql').toString()
                    + fs.readFileSync('../db/sql/populate-test-data.sql').toString();

        pg.connect(databaseConfig.getConnectionString(), function(err, client, done){
            if(err){
                onError(err);
            }
            client.query(sql, function(err, result){
                done();
                onSuccess();
                if(err) {
                    onError(err);
                }
            });
        });

	});

	return router;
}

module.exports = stationsRouter();