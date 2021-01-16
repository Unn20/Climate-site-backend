const mysql = require('mysql')
const fs = require('fs');
const path = require('path');
const Joi = require('joi');
const logger = require('../logger');
const { join } = require('path');

console.log(fs.readFileSync(path.join(__dirname, '..', 'ssl', 'rds-ca-2019-eu-central-1.pem')).toString())

/* Ponizej example z użycia bazy danych */
// var database_connection = mysql.createConnection({
var database_connection = mysql.createPool({  //Pool jest lepszy, jak sie zamknie polaczenie trzeba tworzyc nowe nie mozna kilku queries na raz itp
    host: 'backend-database.cwatox5ynlgb.eu-central-1.rds.amazonaws.com',
    user: 'backend',
    password: 'LKlni7G83g82NB37asaw', // FIXME: UKRYWANIE HASEL!
    database: 'CLIMATE_DATA',
    ssl: {
        ca: fs.readFileSync(path.join(__dirname, '..', 'ssl', 'rds-ca-2019-root.pem'))
    }
})

// TODO: MAX YEAR POBIERZ OBECNY ?
function save_data_from_apis(resultJson, api_database_mapping){
    api_validation_schema_mapping = {
        temperature: Joi.object({
            year: Joi.number()
                    .integer()
                    .greater(1800)
                    .required(),
            month: Joi.number()
                    .integer()
                    .min(1)
                    .max(12)
                    .required(),
            station: Joi.number()
                    .required(),
            land: Joi.number()
                    .required()
        }),
        carbonDioxide: Joi.object({
            year: Joi.number()
                    .integer()
                    .greater(1800)
					.required(),
            month: Joi.number()
                    .integer()
                    .min(1)
                    .max(12)
					.required(),
            day: Joi.number()
                    .integer()
                    .min(1)
                    .max(31)
                    .required(),
            cycle: Joi.number()
					.required(),
            trend: Joi.number()
                    .required()
        }),
        methane: Joi.object({
            year: Joi.number()
					.integer()
					.required(),
            month: Joi.number()
                    .integer()
                    .min(1)
                    .max(12)
					.required(),
            average: Joi.number()
					.required(),
            trend: Joi.number()
					.required(),
            averageUnc: Joi.number()
					.required(),
            trendUnc: Joi.number()
                    .required()
        }),
        nitrousOxide: Joi.object({
            year: Joi.number()
                    .integer()
                    .greater(1800)
					.required(),
            month: Joi.number()
                    .integer()
                    .min(1)
                    .max(12)
					.required(),
            average: Joi.number()
					.required(),
            trend: Joi.number()
					.required(),
            averageUnc: Joi.number()
					.required(),
            trendUnc: Joi.number()
                    .required()
        }),
        arctic: Joi.object({
            year: Joi.number()
                    .integer()
                    .greater(1800)
					.required(),
            extent: Joi.number()
					.required(),
            area: Joi.number()
                    .required()
        })
    }


    for (let key of Object.keys(resultJson)) {
        let data_list = resultJson[key]
        if (data_list.length === 0) continue  //PRINT ERROR?
        let values_validator = api_validation_schema_mapping[key]
        for (var i = data_list.length - 1; i >= 0; i--) {
            try {
                const result = values_validator.validate(data_list[i]);
                if (result.error) {
                    throw new Error(result.error.details[0].message);
                }
            }
            catch (err) {
                logger.error(`Validation error, splicing for ${key} -> ${data_list[i]}`)
                data_list.splice(i, 1);
            }
        }
 
        table_keys = Object.keys(data_list[0]);
        data_list = data_list.map(Object.values);
        
        let table_name = api_database_mapping[key]

        let sql = `INSERT IGNORE INTO ${table_name} (` + table_keys.join(", ") + ") VALUES ?";
        // Get connection per query
        database_connection.getConnection(function(err, connection) {
            if(err) { 
                logger.error(err);
            }
            connection.query(sql, [data_list], (err, ) => {
            connection.release();
            if (err) {
                logger.error(err)
            } else {
                logger.info(`Data inserted into ${table_name}`);
            }
        });}
        )}
}

async function get_table_data_from_db(query, stringify=true){

    return new Promise((resolve, reject) => {
        database_connection.getConnection(async (err, connection) => {
            if (err){
                reject(err);
            }
            connection.query(query, (err2, rows) => {
                connection.release();
            if (err2) {
                logger.error(err2);
            }
            if (stringify === true)
                resolve(JSON.stringify(rows));
            else
                resolve(rows);
        });
      })
    })
}

function save_data_from_counters(resultJson) {
    const table_name = 'counters';
    const keys_order = ['co2', 'meltedIce', 'terajoulesUsed', 'wasteDumped', 'resourcesExtracted', 'plasticInOcean'];
    const column_order = ['carbon_dioxide', 'melted_ice', 'tera_joules_used', 'waste_dumped', 'resources_extracted', 'plastic_in_ocean'];
    const key_mapping = Object.assign(...keys_order.map((k, i) => ({[k]: column_order[i]})))

    let remappedResultJson = {}
    for (var key in resultJson) {
        if (resultJson.hasOwnProperty(key)) {
            remappedResultJson[key_mapping[key]] = resultJson[key];
        }
    }

    counters_validation_schema = Joi.object({
        carbon_dioxide: Joi.number()
                        .integer()
                        .positive()
                        .required(),
        melted_ice: Joi.number()
                        .integer()
                        .positive()
                        .required(),
        tera_joules_used: Joi.number()
                        .integer()
                        .positive()
                        .required(),
        waste_dumped: Joi.number()
                        .integer()
                        .positive()
                        .required(),
        resources_extracted: Joi.number()
                        .integer()
                        .positive()
                        .required(),
        plastic_in_ocean: Joi.number()
                        .integer()
                        .positive()
                        .required()
    })

  
    let skipRecord = false;
    try {
        const result = counters_validation_schema.validate(remappedResultJson);
        if (result.error) {
            throw new Error(result.error.details[0].message);
        }
    }
    catch (err) {
        logger.error(`Counters data validation error. ${err}`);
        skipRecord = true;
    }
    if (skipRecord) return; 

    let values_list = []
    for(let key of column_order){
        values_list.push(remappedResultJson[key])
    }

    // TODO: JESLI WARTOSC NIE DZIALA TO WYWAL Z TABELKI?
    let sql = `INSERT IGNORE INTO ${table_name} (` + column_order.join(", ") + ") VALUES (?)";

    // Get connection per query
    database_connection.getConnection(function(err, connection) {
        if(err) {
            logger.error(err);
        }
        connection.query(sql, [values_list], (err, ) => {
            connection.release();
            if (err) {
                logger.error(err);
            } else {
                logger.info(`Data inserted into ${table_name}`);
            }
        });}
    )
}

async function save_data_from_nasa_counters(resultJson) {
    const table_name = 'nasa_counters';
    const keys_order = ['name', 'dir', 'val', 'unit'];
    const column_order = ['name', 'dir', 'val', 'unit'];
    const all_values = [];
    let values_list = [];
    let skipRecord = false;

    const data_validation_schema = Joi.object({
        val: Joi.number()
                .positive()
                .required(),
        name: Joi.string()
                .required(),
        dir:  Joi.string()
                .pattern(new RegExp('^(up?)|(d(own)?)$', 'i')) //ignore case
                .required(),
        unit: Joi.string()
                .required(),
    })


    for (let rec of resultJson) {
        try {
            const result = data_validation_schema.validate(rec);
            if (result.error) {
                throw new Error(result.error.details[0].message);
            }
        }
        catch (err) {
            logger.error(`Nasa counters data validation error. ${err}`)
            skipRecord = true;
        }
        if (skipRecord) return; 
        for (let key of keys_order) {
            const value = rec[key];
            values_list.push(value);
        }
        all_values.push(values_list);
        values_list = [];
    }
    let old_values = await this.get_table_data_from_db(
        'SELECT * FROM nasa_counters ORDER BY id DESC LIMIT 5', false);
    let same_counter = 0;
    for (let rec of old_values) {
        for (let val of all_values) {
            if (val[0] === rec.name) {
                if (val[1] === rec.dir && val[2] === rec.val && val[3] === rec.unit) {
                    same_counter += 1;
                }
            }
        }
    }

    if (same_counter === 5) {
        logger.info("All nasa records are duplicated. SQL insertion stopped.");
        return;
    }

    let sql = `INSERT IGNORE INTO ${table_name} (` + column_order.join(", ") + ") VALUES ?";

    // Get connection per query
    database_connection.getConnection(function(err, connection) {
        if(err) {
            logger.error(err);
        }
        connection.query(sql, [all_values], (err, ) => {
            connection.release();
            if (err) {
                logger.error(err);
            } else {
                logger.info(`Data inserted into ${table_name}`);
            }
        });}
    )
}

module.exports = {
    save_data_from_apis: save_data_from_apis,
    save_data_from_counters: save_data_from_counters,
    save_data_from_nasa_counters: save_data_from_nasa_counters,
    get_table_data_from_db: get_table_data_from_db
};

