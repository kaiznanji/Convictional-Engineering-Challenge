const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Inventory = new Schema({
    productId: { type: String },
    variantId: { type: String },
    stock: { type: Number  }
});

module.exports = mongoose.model('Inventory', Inventory);