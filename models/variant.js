const mongoose = require('mongoose');
const inventory = require('./inventory');
const Schema = mongoose.Schema;

const Weight = require('./weight').schema

const Variant = new Schema({
    _id: { type: String }, 
    title: { type: String },
    sku: { type: Number },
    available: { type: Boolean },
    inventory_quantity: { type: Number, default: 0 },
    weight: Weight
});

module.exports = mongoose.model('Variant', Variant);