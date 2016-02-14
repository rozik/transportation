INSERT INTO transport.station (name, latitude, longitude)
VALUES
	('station1', 1.123456, 111.123456),
	('station2', 2.123456, 112.123456),
	('station3', 2.123456, 112.123456);

INSERT INTO transport.line (name)
VALUES
	('line1'),
	('line2'),
	('line3');

INSERT INTO transport.station_line (station_id, line_id, departure_time)
SELECT 1, 1, TIME '08:00:00' AT TIME ZONE 'UTC';

INSERT INTO transport.station_line (station_id, line_id, departure_time)
SELECT 2, 1, TIME '09:00:00' AT TIME ZONE 'UTC';

INSERT INTO transport.station_line (station_id, line_id, departure_time)
SELECT 3, 1, TIME '10:00:00' AT TIME ZONE 'UTC';

INSERT INTO transport.station_line (station_id, line_id, departure_time)
SELECT 1, 2, TIME '08:15:00' AT TIME ZONE 'UTC';

INSERT INTO transport.station_line (station_id, line_id, departure_time)
SELECT 2, 2, TIME '09:15:00' AT TIME ZONE 'UTC';

INSERT INTO transport.station_line (station_id, line_id, departure_time)
SELECT 3, 2, TIME '10:15:00' AT TIME ZONE 'UTC';

INSERT INTO transport.station_line (station_id, line_id, departure_time)
SELECT 1, 3, TIME '08:30:00' AT TIME ZONE 'UTC';

INSERT INTO transport.station_line (station_id, line_id, departure_time)
SELECT 2, 3, TIME '09:30:00' AT TIME ZONE 'UTC';

INSERT INTO transport.station_line (station_id, line_id, departure_time)
SELECT 3, 3, TIME '10:30:00' AT TIME ZONE 'UTC';