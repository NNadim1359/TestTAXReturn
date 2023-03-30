//default dependencies
const path = require('path');
const fs = require('fs');
const readline = require('readline');

//package dependencies
const bcrypt = require('bcrypt');
const _ = require('lodash');
const otpGenerater = require('otp-generator');
const crypto = require('crypto');
const axios = require('axios');

//SMS
const { Vonage } = require('@vonage/server-sdk')

//models import
const Cust_Info = require('../model/customerSignInModel');
const OTP = require('../model/otpModel');
const Cust_Tax_Info = require('../model/customerInfoModel');
const data = require('../data/url.json');

const vonage = new Vonage({
  apiKey: "1c7cba01",
  apiSecret: "o8d7aVHn5mvtGVza"
})
//controllers
module.exports.signUp = async (req, res) => {
    const user = await Cust_Info.CustInfo.findOne({
        phone: req.body.phone
    });
    const Otp = otpGenerater.generate(4, {
        digits: true, lowerCaseAlphabets: false, upperCaseAlphabets:false, specialChars: false
    });
    const accountphone = req.body.phone;
    console.log(accountphone);
    console.log(Otp);

    const otp = new OTP.OTP({ phone: accountphone, otp: Otp });
    const salt = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp, salt);
    const result = await otp.save();

    //Get data from rest api
    async function apiRequest() {
        //Data fetch
        const config = {
            method: 'GET',
            url: data.host + data.port + data.api_url + accountphone,
            headers: {
                'Content-Type': 'application/json',
                'apiKey': '213424234234',
                'Authorization': 'Basic ZGlsa3VzaGFqaG9uOjEyMzQ1Ng=='
          }
        }
        let res = await axios(config);

        //Data decription
        const key = 'WnZr4u7w!z%C*F-JaNdRgUkXp2s5v8y/';
        const encrypted = res.data;
        const decipher = crypto.createDecipheriv('aes-256-ecb', key, '');
        let decrypted = decipher.update(encrypted, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        logger.log(decrypted);

        //parse phone phone
        const readAndParse = () => {
            let counter = 0;
            const readStream2 = fs.createReadStream('debug.log', 'utf8');
            let rl = readline.createInterface({input: readStream2});
            rl.on('line', line => {
                const split_01 = line.split(',')[11];
                const split_02 = split_01.split(':')[1];
                const sms_1 = split_02.split('\"')[1];
                console.log(sms_1);

                testSms = "01840239116";
                //test
                const from = "Test";
                // const to = `+88${testSms}`;
                const to = '+8801680113268';
                console.log(to)
                const code = Otp;
                console.log(code);
                
                const text = `Your Otp is ${code}`;

                console.log(text);
                
                async function sendSMS() {
                    await vonage.sms.send({to, from, text})
                    .then(resp => { console.log('Message sent successfully'); console.log(resp); })
                    .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
                }
                
                sendSMS();


            });
            rl.on('error', error => console.log(error.message));
            rl.on('close', () => {
                console.log('Data parsing completed');
            });
          };
          
          readAndParse();
    }
    apiRequest();
    return res.status(200).sendFile(path.join(__dirname, '../', 'views', 'verify.html'));
}

module.exports.verifyOtp = async (req, res) => {
    const otpHolder = await OTP.OTP.find({
        phone: req.body.phone
    });
    if (otpHolder.length ===0) return res.status(400).send("An expired OTP");
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    if(rightOtpFind.phone === req.body.phone && validUser) {
        const user = new Cust_Info.CustInfo(_.pick(req.body, ["phone"]));
        const token = user.generateJWT();
        const result = await user.save();
        const OTPDelete = await OTP.OTP.deleteMany({
            phone: rightOtpFind.phone
        });
        return res.status(200).sendFile(path.join(__dirname, '../', 'views', 'customerTaxRef.html'));
    } else {
        return res.status(400).send("Wrong OTP");
    }
    
};

module.exports.customerTaxInfo = async (req, res) => {
    const CustTaxReturn = await Cust_Tax_Info.CustomerInfo(req.body);
    console.log(req.body);
    //console.log(CustTaxReturn);
    CustTaxReturn.save((err, result) => {
        if(err) {
            return res.json({
                error: err
            });
        }
        res.json({
            account_tax_info: result
        });
    });
}

const logger = require('../log');