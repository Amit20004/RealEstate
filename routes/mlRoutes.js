const express = require('express');
const router = express.Router();
const { predictHousePrice } = require('../controllers/mlController');

router.post('/predict', (res,req)=>{
    predictHousePrice
});

module.exports = router;
