const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login:    {type: String, required: true, unique: true},
    password: { type: String, required: true},
    role: {type: String, required: true, default: 1},
    tariff: {type: mongoose.Schema.Types.ObjectId, ref: 'Tariff', required: false,default: "6564a81969139d087e23199d"}
});

module.exports = mongoose.model('User', userSchema);