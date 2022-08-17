const express = require('express');
const userRoute = require('./userRoute');
const accountRoute = require('./accountRoute');
const transactionRoute = require('./transactionRoute');
const paymentRoute = require('./paymentRoute');
const router = express.Router();

router.use('/api', userRoute);
router.use('/api', accountRoute);
router.use('/api', paymentRoute);
router.use('/api', transactionRoute);

router.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome to Francis\' NodeJs LendSqr Screening Test ' });
});

module.exports = router;