--CREATE IF NOT EXISTS DATABASE CLIMATE_DATA;
CREATE OR REPLACE DATABASE CLIMATE_DATA;
USE CLIMATE_DATA;

--TOOD: obczaj DANE W STRINGACH ALE ARCTIC WE FLOATACH??


CREATE OR REPLACE TABLE temperature(
    year VARCHAR(10),
    month TINYINT,
    station FLOAT,
    land FLOAT,
    CONSTRAINT Pk_Temperature PRIMARY KEY (year, month, station, land)
);

CREATE OR REPLACE TABLE carbon_dioxide(
    year VARCHAR(10),
    month TINYINT,
    day TINYINT,
    cycle FLOAT,
    trend FLOAT,
    CONSTRAINT Pk_Carbon_Dioxide PRIMARY KEY (year, month, day, cycle, trend)
);


CREATE OR REPLACE TABLE methane(
    year VARCHAR(10),
    month VARCHAR(2),
    average FLOAT,
    trend FLOAT,
    averageUnc FLOAT,
    trendUnc FLOAT,
    CONSTRAINT Pk_Methane PRIMARY KEY (year, month, average, trend, averageUnc, trendUnc)
);


CREATE OR REPLACE TABLE nitrous_oxide(
    year VARCHAR(10),
    month VARCHAR(2),
    average FLOAT,
    trend FLOAT,
    averageUnc FLOAT,
    trendUnc FLOAT,
    CONSTRAINT Pk_Nitrous_Oxide PRIMARY KEY (year, month, average, trend, averageUnc, trendUnc)
);


CREATE OR REPLACE TABLE arctic(
    year VARCHAR(10),
    extent FLOAT,
    area FLOAT,
    CONSTRAINT Pk_Arctic PRIMARY KEY (year, extent, area)
);


CREATE OR REPLACE TABLE counters(
    id TIMESTAMP default current_timestamp,
    carbon_dioxide INT UNSIGNED,
    melted_ice INT UNSIGNED,
    tera_joules_used INT UNSIGNED,
    waste_dumped INT UNSIGNED,
    resources_extracted INT UNSIGNED,
    plastic_in_ocean INT UNSIGNED,
    CONSTRAINT Pk_Counters PRIMARY KEY (id)
);
