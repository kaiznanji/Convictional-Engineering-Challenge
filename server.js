'use strict';

const express = require('express');
const cors = require('cors');

const products = require('./routes/products');
const store = require('./routes/store');
const { Product, Variant, Weight, Img, Inventory } = require('./src/db')
const { axiosRequest } = require('./src/api')

const app = express();

app.use(express.json());
app.use(cors());

const URL = "https://my-json-server.typicode.com/convictional/engineering-interview-api/products"

// handle body parser errors 
app.use((err, req, res, next) => {
    if (err) {
        if (err instanceof SyntaxError &&
            err.status >= 400 && err.status < 500 &&
            err.message.indexOf('JSON')) {
                return res.status(400).send('Badly Formatted JSON Request');
        }
        else {
            return res.status(500).send('Server Error');
        }
    }
    return next();
})

// handle any generic internal server errors
app.use((err, req, res, next) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
    }
    return next();
})

app.use('/products', products);
app.use('/store', store);


// API Task: Read in data from URL and stores data in local database(CALL ONCE ONLY)
app.get('/', (req, res) => {
    // Request for data
    axiosRequest(URL, "GET")
    .then(async (response) => {
        if (response.status === 200) {
            const data = response.data;
            for (let i = 0; i < data.length; ++i) {
                const product = data[i];
                let images = [];
                let variants = [];
                // Extract all variants
                
                for (let j = 0; j < (product.variants).length; ++j) {
                    const variant = product.variants[j];

                    // Define inventory item 
                    let inventory = new Inventory({
                        productId: variant.product_id,
                        variantId: variant.id
                    });
                    
                    // Define weight item
                    let weight =  new Weight({
                        value: variant.weight,
                        unit: variant.weight_unit
                    });

                    // Extract all images for each variant
                    variant.images.forEach((image) => { 
                        let imageObj = new Img({
                            source: image.src,
                            variantId: variant.id
                        });
                        // Push image to list
                        images.push(imageObj);

                    });

                    // Define variant
                    let invQuant = (variant.inventory_quantity == null) ? 0 : variant.inventory_quantity;
                    let variantObj = new Variant({
                        _id: variant.id, 
                        title: variant.title,
                        sku: variant.sku,
                        available: (invQuant > 0) ? true : false,
                        inventory_quantity: invQuant,
                        weight: weight
                    });

                    // Push variant to list
                    variants.push(variantObj);

                    // Save inventory item
                    await inventory.save();
                }
                
                // Check if product already exists in database
                let productObj = await Product.findOne({ _id: product.id })
                    
                if (product != null) {
                    // handle error
                    return res.status(400).send("Item already exists in database(You probably already fetched!)")
                }

                // Create product
                productObj = new Product({
                    _id: product.id,
                    title: product.title,
                    vendor: product.vendor,
                    bodyHtml: product.body_html,
                    variants: variants,
                    images: images
                });
                await productObj.save();
            }
            return res.status(200).send("Successfully added items to database!")
        }
    })
    .catch(error => {
        console.log(error.message);
        return res.status(500).send("Error fetching data!")
    })
})

app.listen(5000);