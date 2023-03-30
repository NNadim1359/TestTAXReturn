//Log file
const fs = require('fs');
const { Console } = require('console');
// const util = require('util');
// const log_file = fs.createWriteStream(__dirname + 'debug.log', {flags : 'w'});
// const log_stdout = process.stdout;
const output = fs.createWriteStream('debug.log');
const errout = fs.createWriteStream('err.log');

const logger = new Console(output,errout);

module.exports = logger;