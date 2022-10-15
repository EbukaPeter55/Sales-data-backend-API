const mysql = require('mysql'); //Import mysql

// Create a mysql connection pool
// MySQL
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'mysql',
    database        : 'sales_data'
})

module.exports = pool;