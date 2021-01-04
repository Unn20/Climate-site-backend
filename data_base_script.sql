--CREATE IF NOT EXISTS DATABASE CLIMATE_DATA;
CREATE OR REPLACE DATABASE CLIMATE_DATA;
USE CLIMATE_DATA;

-- OFFICIAL VERSION 
-- ec2-3-135-244-176.us-east-2.compute.amazonaws.com -> backend's ip
-- CREATE OR REPLACE USER 'backend'@'ec2-3-135-244-176.us-east-2.compute.amazonaws.com' IDENTIFIED BY 'LKlni7G83g82NB37asaw' REQUIRE SSL;
-- GRANT DELETE, INSERT, SELECT ON CLIMATE_DATA.* TO 'backend'@'ec2-3-135-244-176.us-east-2.compute.amazonaws.com' IDENTIFIED BY 'LKlni7G83g82NB37asaw';

-- JAK Z WIDOCZNOŚCIĄ HASEŁ?
CREATE OR REPLACE USER 'backend'@'%' IDENTIFIED BY 'LKlni7G83g82NB37asaw' REQUIRE SSL;
GRANT DELETE, INSERT, SELECT ON CLIMATE_DATA.* TO 'backend'@'%' IDENTIFIED BY 'LKlni7G83g82NB37asaw';


CREATE TABLE temperature(
    year VARCHAR(10),
    month TINYINT,
    station DOUBLE,
    land DOUBLE,
    CONSTRAINT Pk_Temperature PRIMARY KEY (year, month)
);

CREATE TABLE carbon_dioxide(
    year VARCHAR(10),
    month TINYINT,
    day TINYINT,
    cycle DOUBLE,
    trend DOUBLE,
    CONSTRAINT Pk_Carbon_Dioxide PRIMARY KEY (year, month, day)
);


CREATE TABLE methane(
    year VARCHAR(10),
    month VARCHAR(2),
    average DOUBLE,
    trend DOUBLE,
    averageUnc DOUBLE,
    trendUnc DOUBLE,
    CONSTRAINT Pk_Methane PRIMARY KEY (year, month)
);


CREATE TABLE nitrous_oxide(
    year VARCHAR(10),
    month VARCHAR(2),
    average DOUBLE,
    trend DOUBLE,
    averageUnc DOUBLE,
    trendUnc DOUBLE,
    CONSTRAINT Pk_Nitrous_Oxide PRIMARY KEY (year, month)
);


CREATE TABLE arctic(
    year VARCHAR(10),
    extent DOUBLE,
    area DOUBLE,
    CONSTRAINT Pk_Arctic PRIMARY KEY (year)
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

CREATE OR REPLACE TABLE nasa_counters(
    id TIMESTAMP default current_timestamp,
    val DOUBLE,
    name VARCHAR(25),
    dir VARCHAR(4),
    unit VARCHAR(80),
    CONSTRAINT Pk_Nasa_Counters PRIMARY KEY (id, name)
);

CREATE or REPLACE TABLE logs (
    id INT NOT NULL AUTO_INCREMENT,
    level VARCHAR(16) NOT NULL,
    message VARCHAR(512) NOT NULL,
    timestamp DATETIME NOT NULL,
    CONSTRAINT Pk_logs PRIMARY KEY (id)
 );

