const ProductCategory = require('../../models/master/productCategory');
const Shop = require('../../models/vendor/addShop');
const { filedetails } = require("../../helpers/multer");

exports.uploadProductCategory = async (req, res) => {
    try {
        if (req.file) {
            datalist = filedetails('products_category', req.file)
            return res.send({ status: true, data: datalist, message: 'File Uploaded.' });
        }
    } catch (error) {
        console.log('errrr', error);
        res.status(200).send({ status: false, message: error })
    }
};

exports.createProductCategory = async (req, res) => {
    const { productCategoryName } = req.body;
    let productCategoryBodyName = productCategoryName;
    let camelBodyName = productCategoryBodyName?.replace(/\s+/g, "").toLowerCase();
    const productCategoryNameCheck = await ProductCategory.findOne({ key_name: camelBodyName })
    if (productCategoryNameCheck) {
        res.status(200).send({ status: false, message: 'Product Category Already Exist' })
    } else {
        try {
            category = new ProductCategory({
                ...req.body,
                key_name: camelBodyName,
                type: 'admin'
            })
            await category.save()
            res.status(200).send({ status: true, message: 'Product Category Added', data: category })
        } catch (error) {
            res.status(500).send({ status: false, message: 'Server Error ' + error })
        }
    }
};

// exports.createProductCategoryByVendor = async (req, res) => {
//     const { productCategoryName } = req.body;
//     const vendorId = req.params.id;
//     let productCategoryBodyName = productCategoryName;
//     let camelBodyName = productCategoryBodyName?.replace(/\s+/g, "").toLowerCase();
//     const productCategoryNameCheck = await ProductCategory.findOne({
//         $and: [
//             { key_name: camelBodyName },
//             { vendor: vendorId }
//         ]
//     });
//     if (productCategoryNameCheck) {
//         res.status(200).send({ status: false, message: 'Product Category Already Exist' })
//     } else {
//         try {
//             category = new ProductCategory({
//                 ...req.body,
//                 key_name: camelBodyName,
//                 type: 'vendor',
//                 vendor: vendorId
//             })
//             await category.save()
//             res.status(200).send({ status: true, message: 'Product Category Added', data: category })
//         } catch (error) {
//             res.status(500).send({ status: false, message: 'Server Error ' + error })
//         }
//     }
// };

exports.allProductCategory = async (req, res) => {
    const { categoryStatus } = req.query;
    try {
        let filter = {};
        if (categoryStatus === "PENDING" || categoryStatus === "APPROVED" || categoryStatus === "REJECTED") {
            filter = { categoryStatus, status: 1 };
        } else {
            filter = { status: 1 };
        }
        const productCategory = await ProductCategory.find(filter).sort({ createdAt: -1 }).exec();
        if (productCategory.length === 0) {
            res.status(200).send({ status: true, message: 'No data found', data: [] });
        } else {
            res.status(200).send({ status: true, message: 'Product Category', data: productCategory });
        }
    } catch (error) {
        res.status(500).send({ status: false, message: 'Internal Server Error', error: error.message });
    }
    // try {
    //     const productCategory = await ProductCategory.find().sort({ 'name': 1 }).exec();
    //     res.status(200).send({ status: true, message: 'All Product Category List Loaded', data: productCategory })
    // } catch (err) {
    //     console.log('error', err);
    //     res.status(500).send({ status: false, message: 'Error in Solving', data: err })
    // }
};

exports.allProductCategorywithAuth = async (req, res) => {
    const userId = req.user.id;
    const { categoryStatus } = req.query;
    console.log('categoryStatus', categoryStatus);

    try {
        let filter = { vendor: userId };

        if (categoryStatus === "PENDING" || categoryStatus === "APPROVED" || categoryStatus === "REJECTED") {
            filter.categoryStatus = categoryStatus;
        }
        const productCategory = await ProductCategory.find(filter).exec();
        if (productCategory.length === 0) {
            res.status(200).send({ status: true, message: 'No data found', data: [] });
        } else {
            res.status(200).send({ status: true, message: 'Product Category', data: productCategory });
        }
    } catch (error) {
        res.status(500).send({ status: false, message: 'Internal Server Error', error: error.message });
    }

};

exports.getProductCategoryById = async (req, res) => {
    const productCategoryId = req.params.id;
    try {
        const productCategory = await ProductCategory.findOne({ _id: productCategoryId }).exec();
        res.status(200).send({ status: true, message: 'Product Category List Loaded', data: productCategory })
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error in Solving', data: err })
    }
};

exports.getProductCategoryByShopId = async (req, res) => {
    const shopId = req.params.id;
    const { categoryStatus } = req.query;
    try {
        const shopFilter = { vendor: shopId };

        let filter = { ...shopFilter };

        if (categoryStatus === "PENDING" || categoryStatus === "APPROVED" || categoryStatus === "REJECTED") {
            filter.categoryStatus = categoryStatus;
        }

        // const products = await ProductCategory.find(filter).populate('vendor').exec();
        const products = await ProductCategory.find(filter).exec();
        const shopData = await Shop.findOne({ _id: shopId }).exec();

        res.status(200).send({
            status: true,
            message: 'Category filtered by shopId',
            data: {
                products: products,
                shopData: shopData
            }
        });

    } catch (err) {
        console.log('err', err);
        res.status(500).send({ status: false, message: 'Error in processing the request', data: err });
    }
};


exports.updateProductCategoryById = async (req, res) => {
    try {
        const productCategoryId = req.params.id;
        const { productCategoryName } = req.body;
        let productCategoryBodyName = productCategoryName;
        // let camelBodyName = productCategoryBodyName?.replace(/\s+/g, "").toLowerCase();
        // const productCategoryNameCheck = await ProductCategory.findOne({ key_name: camelBodyName });

        // if (productCategoryNameCheck) {
        //     res.status(409).send({ status: false, message: 'Product Category Already Exists' });
        // } else {
        const updateData = {
            ...req.body,
            // key_name: camelBodyName,
            type: 'admin'
        };
        // Use the findByIdAndUpdate method without a callback and then execute the query with exec
        const updatedProductCategory = await ProductCategory
            .findByIdAndUpdate(productCategoryId, updateData, { new: true })
            .exec();

        if (!updatedProductCategory) {
            return res.status(404).send({ status: false, message: 'Product Category not found' });
        }

        res.status(200).send({ status: true, message: 'Product Category Updated', data: updatedProductCategory });
        // }
    } catch (err) {
        console.error("dada", err.message);
        res.status(500).send({ status: false, message: 'Server Error' });
    }

};

exports.deleteProductCategoryById = async (req, res) => {
    try {
        await ProductCategory.deleteOne({ _id: req.params.id });
        return res.status(200).send({ status: true, message: 'Product Category successfully!' });
    } catch (error) {
        res.status(200).send({ status: false, message: 'Server Error' })
    }



    ProductCategory.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            return res.status(500).send({ status: false, message: "Error", errors: err })
        };
        res.status(200).send({ status: true, message: 'Product Category Deleted', data: user })
    });
};

exports.proCategoryApprovalRejectByAdmin = async (req, res) => {
    const ProductCategoryId = req.params.id;
    const categoryStatus = req.query.categoryStatus;
    try {
        if (categoryStatus === "APPROVED") {
            await ProductCategory.updateOne({ _id: ProductCategoryId }, { categoryStatus: 'APPROVED' });
            res.status(200).send({ status: true, message: 'Category Approved Successfully' })
        } else {
            await ProductCategory.updateOne({ _id: ProductCategoryId }, { categoryStatus: 'REJECTED' });
            res.status(200).send({ status: true, message: 'Category Rejected Successfully' })
        }
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error in Solving', data: err })
    }
};