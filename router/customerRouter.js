const path = require('path');
const express = require('express');

const CustomerOtpControl = require('../controller/customerController');

const router = express.Router();

router.get('/',(req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'views', 'signup.html'));
});

router.get('/verify',(req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'views', 'verify.html'));
});

router.get('/taxinfo',(req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'views', 'customerTaxRef.html'));
});

router.route('/').post(CustomerOtpControl.signUp);
router.route('/verify').post(CustomerOtpControl.verifyOtp);
router.route('/taxinfo').post(CustomerOtpControl.customerTaxInfo);


// router.get('/add-product',(req, res, next) => {
//     res.render('add-product', { docTitle: 'Add Product', path: '/admin/add-product' })
// });

// router.post('/add-product',(req, res, next)=>{
//     products.push({ title: req.body.title });
//     res.redirect('/');
// });

module.exports = router;