var request = require('request');
var serverConfig = require('../../server/config/serverConfig');
var databaseConfig = require('../../server/config/databaseConfig');
var testDataConfig = require('../config/testDataConfig');
var pg = require('pg');
var fs = require('fs');

describe('stationWithScheduleSpec', function () {
    beforeEach(function(doneBeforeEach) {
        var sql = "DROP SCHEMA transport CASCADE;"
                    + fs.readFileSync(testDataConfig.schemaScriptPath).toString()
                    + 'INSERT INTO transport.station (name, latitude, longitude)'
                    + 'VALUES'
                    + '     (\'station1\', 1.123456, 111.123456);'

                    + 'INSERT INTO transport.line (name)'
                    + 'VALUES'
                    + '     (\'line1\'),'
                    + '     (\'line2\'),'
                    + '     (\'line3\');'

                    + 'INSERT INTO transport.station_line (station_id, line_id, departure_time)'
                    + 'SELECT 1, 1, TIME \'08:00:00\' AT TIME ZONE \'UTC\';'

                     + 'INSERT INTO transport.station_line (station_id, line_id, departure_time)'
                     + 'SELECT 1, 2, TIME \'09:00:00\' AT TIME ZONE \'UTC\';'

                     + 'INSERT INTO transport.station_line (station_id, line_id, departure_time)'
                     + 'SELECT 1, 3, TIME \'10:00:00\' AT TIME ZONE \'UTC\';'

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

    it("should return data for an existing station with schedule", function(done) {
        request(serverConfig.getFullUrlFor('/stations/1/schedule'), function(error, response, body){
            var actualStation = JSON.parse(body);
            expect(response.statusCode).toEqual(200);
            expect(actualStation.id).toEqual(1);
            expect(actualStation.name).toEqual('station1');
            expect(actualStation.latitude).toEqual('1.123456');
            expect(actualStation.longitude).toEqual('111.123456');
            expect(actualStation.hasOwnProperty('schedule')).toBe(true);

            var schedules = actualStation.schedule.filter(
                function (scheduleEntry) {
                    var isLineNamesMatch = (
                        (scheduleEntry.lineName === 'line1')
                        || (scheduleEntry.lineName === 'line2')
                        || (scheduleEntry.lineName === 'line3'));

                    var isDepartureTimesMatch = (
                        (scheduleEntry.departureTime === '08:00:00+00')
                        || (scheduleEntry.departureTime === '09:00:00+00')
                        || (scheduleEntry.departureTime  === '10:00:00+00'));

                    return isLineNamesMatch && isDepartureTimesMatch;
                }
            );
            expect(schedules.length).toEqual(3);
            done();
        });
    });
});