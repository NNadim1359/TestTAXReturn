const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const custSchema = mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
}, { timestamps: true });

custSchema.methods.generateJWT = function() {
    const token = jwt.sign({
        _id: this._id,
        phone: this.phone
    }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    return token;
}

module.exports.CustInfo = mongoose.model('CustInfo', custSchema);




