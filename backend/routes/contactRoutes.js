const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/contact', contactController.storeMessage);
router.get('/contact', contactController.getMessages);

module.exports = router;
