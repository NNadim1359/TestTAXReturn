const dbConfig = {
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

module.exports = dbConfig;