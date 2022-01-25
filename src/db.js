const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
mongoose.connect("mongodb://127.0.0.1:27017/productStore"); // This link would typically be place in a .env file(excluded due to access permissions of recruiter)
mongoose.Promise = global.Promise;

const Error = require('../models/error');
const Img = require('../models/img');
const Inventory = require('../models/inventory');
const Product = require('../models/product');
const Variant = require('../models/variant');
const Weight = require('../models/weight');

module.exports = {
    Error,
    Img,
    Inventory,
    Product,
    Variant,
    Weight,
    
    isIdValid(id) {    
        if (ObjectId.isValid(id)) {  
            if (String(new ObjectId(id)) === id) {        
                return true;      
            } else {     
                return false;     
            }    
        } 
        else { 
            return false;  
        }  
    }
}

// Check connection state
if (mongoose.connection.readyState == 2) {
    console.log("Database is active!")
} else if (mongoose.connection.readyState == 0) {
    console.log("Database is disconnected!")
}