var request = require('request');
var serverConfig = require('../../server/config/serverConfig');
var databaseConfig = require('../../server/config/databaseConfig');
var testDataConfig = require('../config/testDataConfig');
var pg = require('pg');
var fs = require('fs');
var geoCoordinate = require('../../server/model/GeoCoordinate');

describe('stationsInGeoBoxSpec', function () {
	beforeEach(function(doneBeforeEach) {
        var sql = "DROP SCHEMA transport CASCADE;"
                    + fs.readFileSync(testDataConfig.schemaScriptPath).toString()
                    + "INSERT INTO transport.station (name, latitude, longitude) VALUES ('abc', 30, 40);"
                    + "INSERT INTO transport.station (name, latitude, longitude) VALUES ('def', 60, 70);"
                    + "INSERT INTO transport.station (name, latitude, longitude) VALUES ('ghi', 30, 90);";

        pg.connect(databaseConfig.getConnectionString(), function(err, client, done){
            if(err){
                console.log('error: ', err);
            }
            client.query(sql, function(err, result){
                done();
                doneBeforeEach();
                if(err) {
                    console.log('error: ', err);
                }
            });
        });
    });

    it("should return stations inside a geobox 1", function(done) {
    	request(serverConfig.getFullUrlFor('/stations?filter=true&latitude1=20&latitude2=70&longitude1=20&longitude2=50'), function(error, response, body){
         	var stations = JSON.parse(body);
            expect(response.statusCode).toEqual(200);
            expect(stations.length).toEqual(1);
            expect(stations[0].name).toEqual('abc');
            done();
      	});
    });

	it("should return stations inside a geobox 1 represented by another pair of geocoordinates", function(done) {
    	request(serverConfig.getFullUrlFor('/stations?filter=true&latitude1=70&latitude2=20&longitude1=20&longitude2=50'), function(error, response, body){
         	var stations = JSON.parse(body);
            expect(response.statusCode).toEqual(200);
            expect(stations.length).toEqual(1);
            expect(stations[0].name).toEqual('abc');
            done();
      	});
    });

	it("should return stations inside a geobox 2", function(done) {
    	request(serverConfig.getFullUrlFor('/stations?filter=true&latitude1=20&latitude2=70&longitude1=50&longitude2=110'), function(error, response, body){
         	var stations = JSON.parse(body);
            expect(response.statusCode).toEqual(200);
            expect(stations.length).toEqual(2);
            var stationsChecked = stations.filter(
			    function (station) {
			        return (station.name === 'def') || (station.name === 'ghi');
			    }
			);
			expect(stationsChecked.length).toEqual(2);
            done();
      	});
    });

	it("should return stations inside a geobox 2 represented by another pair of geocoordinates", function(done) {
    	request(serverConfig.getFullUrlFor('/stations?filter=true&latitude1=20&latitude2=70&longitude1=110&longitude2=50'), function(error, response, body){
         	var stations = JSON.parse(body);
            expect(response.statusCode).toEqual(200);
            expect(stations.length).toEqual(2);
            var stationsChecked = stations.filter(
			    function (station) {
			        return (station.name === 'def') || (station.name === 'ghi');
			    }
			);
			expect(stationsChecked.length).toEqual(2);
			done();
      	});
    });

    it("should return a validation error for malformed requests: latitude 1 is missing.", function(done) {
    	request(serverConfig.getFullUrlFor('/stations?filter=true&latitude2=70&longitude1=20&longitude2=50'), function(error, response, body){
         	var errorMessage = JSON.parse(body);
          	expect(response.statusCode).toEqual(400);
          	expect(errorMessage.type).toEqual('validation');
          	expect(errorMessage.message).toEqual('Invalid parameter. latitude1, latitude2, longitude1, longitude2 have to be set.');
            done();
      	});
    });
});
