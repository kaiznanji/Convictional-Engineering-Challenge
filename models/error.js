const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Error = new Schema({
    _id: false,
    message: { type: String, required: true }
});

module.exports = mongoose.model('Error', Error);