const express = require('express');
const router = express.Router();

const { Product, Error } = require('../src/db');
const { isNumeric } = require('../src/helper');

// API Route Task: Returns a list of products
router.get('/', (req, res) => {
    // Fetch and check if getting products was successful
    Product.find().exec((err, products) => {
        if (err) {
            // handle error
            const error = new Error({
                message: "Products not found"
            });
            return res.status(404).json(error);
        }
        // handle success
        return res.status(200).json(products);
    });
})


// API Route Task: Find product by ID
router.get('/:id', async (req, res) => {
    let id = req.params.id;

    // Validate id passed
    if (id == null || !isNumeric(id)) {
        const error = new Error({
            message: "Invalid ID supplied"
        });
        return res.status(404).json(error);
    }

    // Convert id to integer
    id = parseInt(id);

    // Find product
    const product = await Product.findOne({ _id: id });
    
    if (product == null) {
        const error = new Error({
            message: "Product not found"
        })
        return res.status(404).json(error);
    }
    else {
        return res.status(200).json(product);
    }
})

module.exports = router;