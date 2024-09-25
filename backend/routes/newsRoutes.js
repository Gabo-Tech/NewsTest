const express = require('express');
const router = express.Router();

router.use('/new', require('./newsController'));

module.exports = router;
