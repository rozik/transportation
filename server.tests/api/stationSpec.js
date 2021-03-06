var request = require('request');
var serverConfig = require('../../server/config/serverConfig');
var databaseConfig = require('../../server/config/databaseConfig');
var testDataConfig = require('../config/testDataConfig');
var pg = require('pg');
var fs = require('fs');

describe('stationSpec', function () {
    beforeEach(function(doneBeforeEach) {
        var sql = "DROP SCHEMA transport CASCADE;"
                    + fs.readFileSync(testDataConfig.schemaScriptPath).toString()
                    + "INSERT INTO transport.station (name, latitude, longitude) VALUES ('station1', 1.123456, 111.123456);"
                    + "INSERT INTO transport.station (name, latitude, longitude) VALUES ('station2', 2.123456, 123.123456);";

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

    it("should return data for an existing station without schedule", function(done) {
        request(serverConfig.getFullUrlFor('/stations/1'), function(error, response, body){
            var actualStation = JSON.parse(body);
            expect(response.statusCode).toEqual(200);
            expect(actualStation).toEqual({"id":1,"name":"station1","latitude":"1.123456","longitude":"111.123456"});
            expect(actualStation.hasOwnProperty('schedule')).toBe(false);
            done();
        });
    });

    it("should return empty object for a non existing station", function(done) {
        request(serverConfig.getFullUrlFor('/stations/3'), function(error, response, body){
            var actualStation = JSON.parse(body);
            expect(response.statusCode).toEqual(200);
            expect(actualStation).toEqual({});
            done();
         });
    });

    it("should return a validation error if the station id is invalid", function(done) {
        request(serverConfig.getFullUrlFor('/stations/w'), function(error, response, body){
            expect(response.statusCode).toEqual(400);
            var error = JSON.parse(body);
            expect(error.type).toBe('validation');
            expect(error.message).toBe('Invalid parameter. Station ID should be a positive integer.');
            done();
        });
    });

    it("should return a validation error if the station id is invalid", function(done) {
        request(serverConfig.getFullUrlFor('/stations/-1'), function(error, response, body){
            expect(response.statusCode).toEqual(400);
            var error = JSON.parse(body);
            expect(error.type).toBe('validation');
            expect(error.message).toBe('Invalid parameter. Station ID should be a positive integer.');
            done();
        });
    });

    it("should return all stations", function(done) {
        request(serverConfig.getFullUrlFor('/stations'), function(error, response, body){
            var actualStation = JSON.parse(body);
            expect(response.statusCode).toEqual(200);
            expect(actualStation).toEqual([
                {"id":1,"name":"station1","latitude":"1.123456","longitude":"111.123456","isDeleted":false},
                {"id":2,"name":"station2","latitude":"2.123456","longitude":"123.123456","isDeleted":false}
            ]);
            done();
        });
    });

    it("should create a new station", function(doneTest) {
        var requestBody =  {
            name: 'abc',
            latitude: 1.123456,
            longitude: 111.123456
        }

        request.post({
                url: serverConfig.getFullUrlFor('/stations'),
                json: true,
                body: requestBody
            },
            function(error, response, body){
                expect(response.statusCode).toEqual(200);
                expect(body).toEqual({"uri":serverConfig.getFullUrlFor('/stations/3')}); 

                pg.connect(databaseConfig.getConnectionString(), function(err, client, done){
                    if(err){
                        console.log('error: ', err);
                    }
                    var sql = "SELECT * FROM transport.station WHERE id = 3;";
                    client.query(sql, function(err, result){
                        expect(result.rowCount).toEqual(1);
                        expect(result.rows[0].id).toEqual(3);
                        expect(result.rows[0].is_deleted).toEqual(false);
                        done();
                        doneTest();

                        if(err) {
                            console.log('error: ', err);
                        }
                    });
                });
        });
    });

    it("should not create a station from invalid input", function(done) {
         var requestBody =  {
            name: '',
            latitude: 91,
            longitude: 111.123456
        }

        request.post({
                url: serverConfig.getFullUrlFor('/stations'),
                json: true,
                body: requestBody
            },
            function(error, response, body){
                expect(response.statusCode).toEqual(400);
                expect(body).toEqual({ type: 'validation', message: 'Invalid parameter. name: a non empty string; latitude: [-90 .. 90]; longitude: [-180 .. 180]' });
                done();
        });
    });

    it("should delete a station", function(doneTest) {
        request.del(serverConfig.getFullUrlFor('/stations/1'), function(error, response, body){
            expect(response.statusCode).toEqual(200);
    
            pg.connect(databaseConfig.getConnectionString(), function(err, client, done){
                if(err){
                    console.log('error: ', err);
                }
                var sql = "SELECT * FROM transport.station WHERE id = 1;";
                client.query(sql, function(err, result){
                    expect(result.rowCount).toEqual(1);
                    expect(result.rows[0].id).toEqual(1);
                    expect(result.rows[0].is_deleted).toEqual(true);
                    done();
                    doneTest();

                    if(err) {
                        console.log('error: ', err);
                    }
                });
            });
        });
    });

    it("should return a validation error if id of a station to be deleted is invalid", function(done) {
        request.del(serverConfig.getFullUrlFor('/stations/a'), function(error, response, body){
            expect(response.statusCode).toEqual(400);
            var error = JSON.parse(body);
            expect(error.type).toBe('validation');
            expect(error.message).toBe('Invalid parameter. Station ID should be a positive integer.');
            done();
        });
    });
});