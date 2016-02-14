CREATE SCHEMA transport;

CREATE SEQUENCE transport.station_ids;

CREATE TABLE transport.station (
	id        	INTEGER 		PRIMARY KEY DEFAULT NEXTVAL('transport.station_ids'),
	name      	VARCHAR(256)    NOT NULL,
	latitude 	NUMERIC(8, 6)  	NOT NULL,
	longitude	NUMERIC(9, 6) 	NOT NULL
);

ALTER TABLE transport.station ADD CONSTRAINT uc_station_name
	UNIQUE(name);

CREATE SEQUENCE transport.line_ids;

CREATE TABLE transport.line (
	id 		INTEGER 		PRIMARY KEY DEFAULT NEXTVAL('transport.line_ids'),
	name 	VARCHAR(256)	NOT NULL
);

CREATE TABLE transport.station_line (
	station_id 		INTEGER,
	line_id 		INTEGER,
	departure_time	TIMETZ		NOT NULL
);

ALTER TABLE transport.station_line ADD CONSTRAINT fk_station_line_station
	FOREIGN KEY (station_id) REFERENCES transport.station(id);

ALTER TABLE transport.station_line ADD CONSTRAINT fk_station_line_line
	FOREIGN KEY (line_id) REFERENCES transport.line(id);

ALTER TABLE transport.station_line ADD CONSTRAINT uc_line_id_departure_time
	UNIQUE(line_id, departure_time);

CREATE OR REPLACE FUNCTION transport.getStationById(
	INOUT	id			INTEGER,
	OUT 	name 		VARCHAR(256),
	OUT 	latitude 	NUMERIC(8, 6),
	OUT 	longitude	NUMERIC(9, 6))
	AS $$
    	SELECT  id,
    			name,
    			latitude,
    			longitude
    	FROM 	transport.station
    	WHERE 	id = $1;
	$$ 
	LANGUAGE 'sql';

CREATE OR REPLACE FUNCTION transport.getStations()
	RETURNS SETOF transport.station
	AS $$
    	SELECT  id,
    			name,
    			latitude,
    			longitude
    	FROM 	transport.station
    	WHERE 	1=1;
	$$ 
	LANGUAGE 'sql';

CREATE OR REPLACE FUNCTION transport.getStationsInsideGeoBox(
		latitude1 	NUMERIC(8, 6),
		longitude1	NUMERIC(9, 6),
		latitude2 	NUMERIC(8, 6),
		longitude2	NUMERIC(9, 6)
	)
	RETURNS SETOF transport.station
	AS $$
    	SELECT  s.id,
    			s.name,
    			s.latitude,
    			s.longitude
    	FROM 	transport.station AS s
    	WHERE 	(s.latitude BETWEEN SYMMETRIC $1 AND $3)
    	AND		(s.longitude BETWEEN SYMMETRIC $2 AND $4)
	$$ 
	LANGUAGE 'sql';

CREATE OR REPLACE FUNCTION transport.addStation(
			name 		VARCHAR(256),
			latitude 	NUMERIC(8, 6),
			longitude	NUMERIC(9, 6),
	OUT		id  		INTEGER)
	AS $$
    	INSERT INTO transport.station (name, latitude, longitude)
		VALUES ($1, $2, $3)
		RETURNING id;
	$$ 
	LANGUAGE 'sql';

CREATE TYPE transport.station_schedule as (
	line_name 	VARCHAR(256),
	departure_time	TIMETZ
);

CREATE OR REPLACE FUNCTION transport.getStationSchedule(id INTEGER)
	RETURNS SETOF transport.station_schedule
	AS $$
    	SELECT l.name,
    		   sl.departure_time
    	FROM 	   transport.station s
    	INNER JOIN transport.station_line sl
    	ON		   sl.station_id = s.id
    	INNER JOIN transport.line l
    	ON		   l.id = sl.line_id
    	WHERE 	   1=1
    	AND	       s.id = $1;
	$$ 
	LANGUAGE 'sql';
