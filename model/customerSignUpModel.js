const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const sequelize = new Sequelize('taxreturn', 'Nadim', 'Nbl@123', {
  host: '172.31.100.100',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true, // if using SSL/TLS
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
  }
});

const CustInfo = sequelize.define('taxreturn.dbo.CustInfo', {
  number: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (custInfo) => {
        custInfo.generateJWT();
    }
  }
});

CustInfo.prototype.generateJWT = function() {
  const token = jwt.sign({
    _id: this.id,
    number: this.number
  }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
  return token;
};

module.exports = {
  CustInfo
};
