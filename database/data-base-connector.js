const mysql = require('mysql')



/* Ponizej example z użycia bazy danych */
// var database_connection = mysql.createConnection({
var database_connection = mysql.createPool({  //Pool jest lepszy, jak sie zamknie polaczenie trzeba tworzyc nowe nie mozna kilku queries na raz itp
    host: 'backend-database.cwatox5ynlgb.eu-central-1.rds.amazonaws.com',
    user: 'admin',
    password: '3edcvfr4', // FIXME: UKRYWANIE HASEL!
    database: 'CLIMATE_DATA',
    // ssl: {
    //     ca: fs.readFileSync(__dirname + '/ssl/rds-ca-2019-eu-central-1.pem')
    // } //FIXME:
})

function save_data_from_apis(resultJson, api_database_mapping){
    for (let key of Object.keys(resultJson)) {
        let data_list = resultJson[key]
        let values_list = data_list.map(Object.values);
        if (data_list.length == 0) continue  //PRINT ERROR? 
        let table_name = api_database_mapping[key]
        // let sql = `INSERT INTO ${table_name} ('` + Object.keys(data_list[0]).join("','") + "') VALUES ?";
        
        // let truncate_sql = `TRUNCATE ${table_name}`

        let sql = `INSERT IGNORE INTO ${table_name} (` + Object.keys(data_list[0]).join(", ") + ") VALUES ?";
        // Get connection per query
        database_connection.getConnection(function(err, connection) {
            if(err) { 
            console.log(err); 
            }        
            connection.query(sql, [values_list], (err, results) => {
            connection.release();
            if (err) {
                console.log(err)
            } else {
                console.log(`Data inserted into ${table_name}`);
            }
        });}
        )}
};

function get_table_data_from_db(query, callback){
    // table_name = 'temperature'
    // let sql = `SELECT * FROM ${table_name}`;
    database_connection.getConnection(function(err, connection) {
        if(err) { 
            console.log(err); 
        }        
        connection.query(query, (err, rows) => {
            connection.release();
        if (err) {
            console.log(err)
        } else {
            // console.log(`Fetched temp ${JSON.stringify(rows)}`);
            return callback(JSON.stringify(rows))
        }});
    })
};


module.exports = {
    save_data_from_apis: save_data_from_apis,
    get_table_data_from_db: get_table_data_from_db,
}