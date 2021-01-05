const mysql = require('mysql')
const fs = require('fs');
const path = require('path');

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


function save_data_from_apis(resultJson, api_database_mapping){
    for (let key of Object.keys(resultJson)) {
        let data_list = resultJson[key]
        let values_list = data_list.map(Object.values);
        let skip_record = false;
        for (let val of values_list) {
            try {
                parseInt(val);
            } catch (e) {
                try {
                    parseFloat(val);
                } catch (e) {
                    console.log(e);
                    skip_record = true;
                    break;
                }
            }
        }
        if (skip_record) continue;
        if (data_list.length === 0) continue  //PRINT ERROR?
        let table_name = api_database_mapping[key]

        let sql = `INSERT IGNORE INTO ${table_name} (` + Object.keys(data_list[0]).join(", ") + ") VALUES ?";
        // Get connection per query
        database_connection.getConnection(function(err, connection) {
            if(err) { 
                console.log(err);
            }
            connection.query(sql, [values_list], (err, ) => {
            connection.release();
            if (err) {
                console.log(err)
            } else {
                console.log(`Data inserted into ${table_name}`);
            }
        });}
        )}
}

async function get_table_data_from_db(query, stringify=true){
    // table_name = 'temperature'
    // let sql = `SELECT * FROM ${table_name}`;

    return new Promise((resolve, reject) => {
        database_connection.getConnection(async (err, connection) => {
            if (err){
                reject(err);
            }
            connection.query(query, (err2, rows) => {
                connection.release();
            if (err2) {
                console.log(err2);
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
    const values_list = [];
    let skipRecord = false;

    for (let key of keys_order) {
        const value = resultJson[key];
        try {
            parseFloat(value)
        } catch (e) {
            console.log(e);
            skipRecord = true;
        }
        values_list.push(value);
    }
    if (skipRecord) return;

    let sql = `INSERT IGNORE INTO ${table_name} (` + column_order.join(", ") + ") VALUES (?)";

    // Get connection per query
    database_connection.getConnection(function(err, connection) {
        if(err) {
            console.log(err);
        }
        connection.query(sql, [values_list], (err, ) => {
            connection.release();
            if (err) {
                console.log(err);
            } else {
                console.log(`Data inserted into ${table_name}`);
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

    for (let rec of resultJson) {
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
        console.log("All records are duplicated");
        return;
    }

    let sql = `INSERT IGNORE INTO ${table_name} (` + column_order.join(", ") + ") VALUES ?";

    // Get connection per query
    database_connection.getConnection(function(err, connection) {
        if(err) {
            console.log(err);
        }
        connection.query(sql, [all_values], (err, ) => {
            connection.release();
            if (err) {
                console.log(err);
            } else {
                console.log(`Data inserted into ${table_name}`);
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

