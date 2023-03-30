var soap = require('soap');
var url = 'http://192.168.0.72:8095/api/v1/getAccountInfo?accountNumber=1999003431797';
var args = {name: 'value'};

// then/catch
soap.createClientAsync(url).then((client) => {
  return client.MyFunctionAsync(args);
}).then((result) => {
  console.log(result);
});

// async/await
var client = await soap.createClientAsync(url);
var result = await client.MyFunctionAsync(args);
console.log(result[0]);

async function makeRequest() {
  const host = data.host;
  const port = data.port;
  const api_url = data.api_url;
  const account_number = data.account_number;

  const config = {
      method: 'GET',
      url: host + port + api_url + account_number,
      headers: {
          'Content-Type': 'application/json',
          'apiKey': '213424234234',
          'Authorization': 'Basic ZGlsa3VzaGFqaG9uOjEyMzQ1Ng=='
    }
  }
  
  let res = await axios(config);

  // const testData = res.data;
  // console.log(testData);
  const key = 'WnZr4u7w!z%C*F-JaNdRgUkXp2s5v8y/';
  const encrypted = res.data;
  const decipher = crypto.createDecipheriv('aes-256-ecb', key, '');
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  console.log(`Decrypted Text: ${decrypted}`);
}

const testApiData = makeRequest();



const readAndParse = () => {
  let counter = 0;
  const readStream2 = fs.createReadStream('test.log', 'utf8');
  let rl = readline.createInterface({input: readStream2});
  rl.on('line', line => {
      const split_01 = line.split(',')[11];
      const sms_1 = split_01.split(':')[1];
      console.log(sms_1);
  });
  rl.on('error', error => console.log(error.message));
  rl.on('close', () => {
      console.log('Data parsing completed');
  })
};

readAndParse();

// pool request
// const pool = new mssql.ConnectionPool(sqlConfig);

// pool.connect().then( () => {
//     const tableSchema = `CREATE TABLE IF NOT EXISTS AccountInfo(
//         id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//         account_no VARCHAR(50) NOT NULL,
//         description VARCHAR(200)
//     )`;

//     const tableCreation = new mssql.Request().query(tableSchema);
    
//     tableCreation.then( () => {
//         const insertQuery = `INSERT INTO AccountInfo (id, account_no, description) VALUES (1, '1999005440092', 'THIS IS ACCOUNT DESCRIPTION')`;

//         const insertion = new mssql.Request().query(insertQuery);

//         insertion.then( () => {
//             const selectQuery = `SELECT * FROM AccountInfo`;

//             const selection = new mssql.Request().query(selectQuery);

//             selection.then( (result) => {
//                 console.log('Data: ', result.recordset);
//                 mssql.close();
//             }).catch( (err) => {
//                 console.log('Error from Selection: ', err);
//                 mssql.close();
//             });

//         }).catch( (err) => {
//             console.log('Error from Insertion: ', err);
//             mssql.close();
//         });

//     }).catch( (err) => {
//         console.log('Error from TableCreation: ', err);
//         mssql.close();
//     });

// }).catch( (err) => {
//     console.log('Error from Connecting DB: ', err);
// });
