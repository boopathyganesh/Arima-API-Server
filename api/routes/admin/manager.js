const express = require('express');
const router = express.Router();
module.exports = router;
const { upload } = require('../../helpers/multer');

const ManagerController = require("../../controllers/admin/manager");

router.post('/upload', upload.single('admin_manager'), ManagerController.uploadMangerImage);

router.post('/', ManagerController.addManager);

router.get('/', ManagerController.getAllManagers);

router.get('/:id', ManagerController.getManagerById);

router.put('/:id', ManagerController.updateManagerById);

router.delete('/:id', ManagerController.deleteManagerById);