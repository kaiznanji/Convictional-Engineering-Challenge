const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Variant = require('./variant').schema
const Img = require('./img').schema

const Product = new Schema({
    _id: { type: Number, required: true },
    title: { type: String },
    vendor: { type: String },
    bodyHtml: { type: String },
    variants: [ Variant ],
    images: [ Img ]
});

module.exports = mongoose.model('Product', Product);