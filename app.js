'use strict';
//dependencies
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const mongoose= require('mongoose');
const mssql = require('mssql');
const cors = require('cors');

//route
const CustomerRouter = require('./router/customerRouter');
const { result, max } = require('lodash');

//App config
const app = express();
dotenv.config();

const corsOptions = {
    origin: "http://localhost:"
}

//view engine
//app.set('view engine', 'ejs');
app.set('views', 'views');

//use of app
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use('/', CustomerRouter);

//DB
mongoose.connect(process.env.MONGODB_URL_LOCAL).then(() => console.log("Mongo Database is ON"));
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

//mssql config
const sqlConfig = {
    user: 'Nadim',
    password: 'Nbl@123',
    server: '172.31.100.100',
    datebase: 'taxreturn',
    port: 1433,
    options: {
        encrypt: true,
        connectTimeout: 30000,
        requestTimeout: 30000,
        synchronize: true,
        trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

//--table creation
// const tableSchema = `
//     CREATE TABLE taxreturn.dbo.AccountInfo(
//         id INT NOT NULL PRIMARY KEY, 
//         account_no VARCHAR(50) NOT NULL, 
//         description VARCHAR(MAX)
//     )
// `;

//--data
const data = [
    {id: 10, account_no: '1999005440092', description: 'Test account value' },
    {id: 11, account_no: '1999005440000', description: 'Test account value' },
    {id: 12, account_no: '1999005440090', description: 'Test account value' }
];

//--select 
const selectQuery = `SELECT * FROM taxreturn.dbo.AccountInfo`;

//--pool req
const pool = new mssql.ConnectionPool(sqlConfig);

(async () => {
    try {
        await pool.connect();

        // await pool.query(tableSchema);

        // const table = new mssql.Table('taxreturn.dbo.AccountInfo');
        // table.create = false;
        // table.columns.add('id', mssql.Int, { nullable: false, primary: true });
        // table.columns.add('account_no', mssql.VarChar(50), { nullable: false });
        // table.columns.add('description', mssql.VarChar(max));
        // data.forEach(row => table.rows.add(row.id, row.account_no, row.description));
        // const request = new mssql.Request(pool);
        // await request.bulk(table);

        const result = await pool.query(selectQuery);
        console.log(result.recordset);
    } catch (err) {
        console.error(err);
    } finally {
        pool.close();
    };
})();

//Port server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Your running port: ${port}`);
});

module.exports = app;