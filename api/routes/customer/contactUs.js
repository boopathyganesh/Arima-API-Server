const express = require('express')
const router = express.Router()
module.exports = router;

const auth = require('../../middleware/auth');

const ContactController = require("../../controllers/customer/contact");

router.post('/', ContactController.addContactUs);

router.get('/', ContactController.getAllContactUs);

router.get('/:id', ContactController.getContactUsById);

router.delete('/:id', ContactController.delteContactUsById);