const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Img = new Schema({
    source: { type: String, required: true },
    variantId: { type: String, required: true }
});

module.exports = mongoose.model('Img', Img);