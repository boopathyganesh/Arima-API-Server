const ProductSubCategory = require('../../models/master/productSubCategory');
const { filedetails } = require("../../helpers/multer");
const ObjectId = require('mongodb').ObjectId;

exports.uploadProductSubCategory = async (req, res) => {
    try {
        if (req.file) {
            datalist = filedetails('products_subCategory', req.file)
            return res.send({ status: true, data: datalist, message: 'File Uploaded.' });
        }
    } catch (error) {
        console.log('errror', error);
        res.status(200).send({ status: false, message: error })
    }
};

exports.createProductSubCategory = async (req, res) => {
    var { productSubCategoryName, image, productCategory } = req.body
    try {
        const Checkdata = await ProductSubCategory.findOne({ $and: [{ productSubCategoryName }, { productCategory }] });
        if (Checkdata) {
            res.status(200).send({ status: true, message: 'Prduct Sub Category Already Exist' })
        } else {
            const productSubCategory = await ProductSubCategory.create(req.body);
            // productSubCategory = new ProductSubCategory({ productSubCategoryName, image, productCategory })
            // await productSubCategory.save()
            res.status(200).send({ status: true, message: 'Prduct Sub Category Added', data: productSubCategory })
        }
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: false, message: 'Server Error' })
    }
};

exports.allProductSubCategory = async (req, res) => {
    try {
        const productSubCategory = await ProductSubCategory.find().populate('productCategory', 'productCategoryName image');
        res.status(200).send({ status: "true", message: 'Prduct Sub Category List Loaded', data: productSubCategory })
    } catch (err) {
        res.status(200).send({ status: "false", message: 'Error in Solving', data: err })
    }
};

exports.getProductSubCategoryById = async (req, res) => {
    try {
        const productSubCategory = await ProductSubCategory.findOne({ _id: ObjectId(req.params.id) }).populate('productCategory', 'productCategoryName image').exec();
        res.status(200).send({ status: "true", message: 'Prduct Sub Category List Loaded', data: productSubCategory })
    } catch (err) {
        res.status(200).send({ status: "false", message: 'Error in Solving', data: err })
    }
};

exports.updateProductSubCategoryById = async (req, res) => {
    try {
        var { productSubCategoryName, image, productCategory } = req.body;

        subCategory_id = req.params.id;
        const Checkuser = await ProductSubCategory.findOne({ $and: [{ productSubCategoryName: productSubCategoryName }, { productCategory: productCategory }] });
        if (Checkuser != '' && Checkuser != 'null' && Checkuser != null && Checkuser._id != subCategory_id) {
            res.status(200).send({ status: "true", message: 'Prduct Sub Category Already Exist' })
        } else {
            ProductSubCategory.findByIdAndUpdate(subCategory_id, req.body, (err, user) => {
                if (err) {
                    return res.status(200).send({ status: "false", message: "Error", errors: err })
                };
                res.status(200).send({ status: "true", message: 'Prduct Sub Category Updated', data: user })
            });
        }
    } catch (e) {
        console.error(e);
        res.status(200).send({ status: "false", message: 'Server Error' })
    }
};

exports.deleteProductSubCategoryById = async (req, res) => {
    ProductSubCategory.findByIdAndRemove(req.params.id, req.body, (err, user) => {
        if (err) {
            return res.status(200).send({ status: "false", message: "Error", errors: err })
        };
        res.status(200).send({ status: "true", message: 'Prduct Sub Category Deleted' })
    });
};


exports.getSubCategoryByProductCategory = async (req, res) => {
    const productCategoryId = req.params.id;
    try {
        const productsData = await ProductSubCategory.find({ product_category: ObjectId(productCategoryId) }).exec();
        res.status(200).send({ status: true, message: 'Sub Category List by Product Category', data: productsData });
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error in Solving', data: err })
    }
}