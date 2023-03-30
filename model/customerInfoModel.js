const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const customerInfoSchema = mongoose.Schema({
    year: {
        type: String,
        required: true
    },
    date: {
        type: String,
        require: true
    },
    taxRefId: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
});

customerInfoSchema.methods.generateJWT = function() {
    const cToken = jwt.sign({
        _id: this.id,
        year: this.year,
        type: this.type,
        taxRefId: this.taxRefId,
        image: this.image
    }, process.env.JWT_SECRET_KEY, { expiresIn: "2d" });
    return cToken;
}


module.exports.CustomerInfo = mongoose.model('Customer_Tax_Info', customerInfoSchema);