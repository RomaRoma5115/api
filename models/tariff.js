const mongoose = require('mongoose');

const tariffSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    description: { type: String, required: true},
    countSms: { type: String, required: true},
    packageInternet: { type: String, required: true},
    countMinutes: { type: String, required: true},
});

module.exports = mongoose.model('Tariff', tariffSchema);