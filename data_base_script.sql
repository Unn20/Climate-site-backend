--CREATE IF NOT EXISTS DATABASE CLIMATE_DATA;
CREATE OR REPLACE DATABASE CLIMATE_DATA;
USE CLIMATE_DATA;

--TOOD: obczaj DANE W STRINGACH ALE ARCTIC WE DOUBLEACH??


CREATE TABLE temperature(
    year VARCHAR(10),
    month TINYINT,
    station DOUBLE,
    land DOUBLE,
    CONSTRAINT Pk_Temperature PRIMARY KEY (year, month, station, land)
);

CREATE TABLE carbon_dioxide(
    year VARCHAR(10),
    month TINYINT,
    day TINYINT,
    cycle DOUBLE,
    trend DOUBLE,
    CONSTRAINT Pk_Carbon_Dioxide PRIMARY KEY (year, month, day, cycle, trend)
);


CREATE TABLE methane(
    year VARCHAR(10),
    month VARCHAR(2),
    average DOUBLE,
    trend DOUBLE,
    averageUnc DOUBLE,
    trendUnc DOUBLE,
    CONSTRAINT Pk_Methane PRIMARY KEY (year, month, average, trend, averageUnc, trendUnc)
);


CREATE TABLE nitrous_oxide(
    year VARCHAR(10),
    month VARCHAR(2),
    average DOUBLE,
    trend DOUBLE,
    averageUnc DOUBLE,
    trendUnc DOUBLE,
    CONSTRAINT Pk_Nitrous_Oxide PRIMARY KEY (year, month, average, trend, averageUnc, trendUnc)
);


CREATE TABLE arctic(
    year VARCHAR(10),
    extent DOUBLE,
    area DOUBLE,
    CONSTRAINT Pk_Arctic PRIMARY KEY (year, extent, area)
);


CREATE TABLE counters(
    counter0 INT,
    counter1 INT,
    counter2 INT,
    counter3 INT,
    counter4 INT,
    counter5 INT
);

-- temperatureFakeData
--    { "time": "2019.21", "station": "1.45", "land": "1.18" }, 

-- co2FakeData = {
--     "co2": [
--         { "year": "2020", "month": "10", "day": "31", "cycle": "412.73", "trend": "413.39" },
     
-- methaneFakeData = {
--     "methane": [
--         { "date": "2018.11", "average": "1866.2", "trend": "1860.8", "averageUnc": "1.1", "trendUnc": "0.8" },
      

-- nitrousOxideFakeData = {
--     "nitrous": [
--         { "date": "2018.11", "average": "331.5", "trend": "331.3", "averageUnc": "0.2", "trendUnc": "0.2" },
     

-- arcticFakeData = {
--     "result": [
--         { "year": "1979", "extent": 7.05, "area": 4.58 }, { "year": "1980", "extent": 7.67, "area": 4.87 },
       
       