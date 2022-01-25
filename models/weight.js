const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Weight = new Schema({
    _id: false,
    value: { type: Number },
    unit: { type: String }
});

module.exports = mongoose.model('Weight', Weight);