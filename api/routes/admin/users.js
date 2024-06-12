const express = require('express');
const router = express.Router();
module.exports = router;

const AdminController = require("../../controllers/admin/users");

router.post('/register', AdminController.adminRegister);

router.post('/login', AdminController.adminLogin);

router.get('/allusers',AdminController.allUsers)