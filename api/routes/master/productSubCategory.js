const express = require("express");
const router = express.Router();
const PrductSubCategory = require('../../models/master/productSubCategory');
const auth = require('../../middleware/auth');
const { upload } = require('../../helpers/multer');

const ProductSubCategoryController = require("../../controllers/master/productSubCategory");

router.post('/upload', upload.single('products_subCategory'), ProductSubCategoryController.uploadProductSubCategory);
router.post('/', auth, ProductSubCategoryController.createProductSubCategory);
router.get('/', auth, ProductSubCategoryController.allProductSubCategory);
// router.get('/all', auth, ProductSubCategoryController.allProductSubCategorylist);
router.get('/:id', auth, ProductSubCategoryController.getProductSubCategoryById);
router.get('/productCategory/:id', auth, ProductSubCategoryController.getSubCategoryByProductCategory);
router.put('/:id', auth, ProductSubCategoryController.updateProductSubCategoryById);
router.delete('/:id', auth, ProductSubCategoryController.deleteProductSubCategoryById);



router.get("/all", async (req, res) => {
    try {
        catid = req.query.category;
        if (catid != '' && catid != 'null' && catid != null && catid != 'undefined') {
            filter = { category: ObjectId(catid), status: { "$nin": ["3"] } }
        } else {
            filter = { status: { "$nin": ["3"] } }
        }
        const category = await PrductSubCategory.find(filter).populate('category').exec();
        res.status(200).send({ status: "true", message: 'Prduct Sub Category List Loaded', data: category })
    } catch (err) {
        res.status(200).send({ status: "false", message: 'Error in Solving', data: err })
    }
});


module.exports = router;