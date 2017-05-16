const express = require('express');
const router = express.Router();

router.use('/videos', require('./videos'));
router.use('/info', require('./info'));

module.exports = router;
