const express = require('express');
const router = express.Router();
const {getAllProducts, getProduct} = require('../controller/productController');


router.route('/')
           .get(getAllProducts)

router.route('/:id')           
            .get(getProduct)

module.exports = router;            