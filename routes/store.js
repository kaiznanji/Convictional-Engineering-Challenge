const express = require('express');
const router = express.Router();

const { Inventory } = require('../src/db');

// API Route Task: Returns product inventories
router.get('/inventory', (req, res) => {
    // Fetch and check if getting inventories was successful
    Inventory.find().exec((err, inventories) => {
        if (err) {
            // handle error
            const error = new Error({
                message: "Inventories not found"
            });
            return res.status(404).json(error);
        }
        // handle success
        return res.status(200).json(inventories);
    });
})

module.exports = router;