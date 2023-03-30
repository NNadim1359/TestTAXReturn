const mongoose = require('mongoose');

module.exports.OTP = mongoose.model('OTP', mongoose.Schema({
    phone:{
        type: String,
        required: true
    },
    otp:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        index: {expires: 180}
    }
}, { timestamps: true }));