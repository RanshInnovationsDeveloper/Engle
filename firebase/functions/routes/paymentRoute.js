const express = require('express');
const router = express.Router();

const { checkout, paymentVerification } = require('../controllers/paymentControllers');

router.post('/checkout', checkout);
router.post('/verify', paymentVerification);

module.exports = router;