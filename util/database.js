const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: 'admin@1103'
});

module.exports = pool.promise();