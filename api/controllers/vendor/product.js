const Products = require('../../models/vendor/product');
const Vendor = require('../../models/vendor/addShop');
const Wishlist = require('../../models/customer/wishlist');
const mongoose = require('mongoose');
const { filedetails } = require("../../helpers/multer");
const Review = require('../../models/customer/review');

exports.uploadProductImage = async (req, res) => {
    try {
        if (req.file) {
            datalist = filedetails('products_image', req.file)
            return res.send({ status: true, data: datalist, message: 'File Uploaded.' });
        }
    } catch (error) {
        res.status(200).send({ status: false, message: error })
    }
};

exports.uploadProductImages = async (req, res) => {
    try {
        if (req.files && req.files.length > 0) {
            const dataList = req.files.map((file, i) => filedetails(`products_images_${i + 1}`, file));
            return res.send({ status: true, data: dataList, message: 'File Uploaded.' });

            //   return res.status(200).send({
            //     status: true,
            //     data: dataList,
            //     message: 'Files Uploaded.',
            //   });
        } else {
            return res.status(400).send({ status: false, message: 'No files uploaded.' });
        }
    } catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).send({ status: false, message: 'Internal server error.' });
    }
};

exports.createProducts = async (req, res) => {
    try {
        const body = req.body;
        console.log('body', body);
        let bodyName = body.name;
        let camelBodyName = bodyName?.replace(/\s+/g, "").toLowerCase();
        console.log('camelBodyName', camelBodyName);
        const productNameCheck = await Products.findOne({ key_name: camelBodyName });
        if (productNameCheck) {
            res.status(200).send({ status: "false", message: 'Product Already Exist' })
        } else {
            // Prod_count = await Products.find({ vendor: ObjectId(vendor), main_id: { "$in": ["0", ""] } }).exec();
            // skuid = parseInt(Prod_count.length) + 10001;
            products = new Products({ ...body, key_name: camelBodyName })
            await products.save()
            res.status(200).send({ status: true, message: 'Product Created Successfully', data: products })

        }
    } catch (err) {
        console.log('errrr', err);
        res.status(500).send({ status: false, message: err })
    }
};

exports.allProductsByShop = async (req, res) => {
    const shopId = req.params.id;
    const { product_status, price, type, discount, search } = req.query;
    try {

        // Define the initial filter based on product_status
        let filter = { product_status: product_status, status: 1 };


        // Apply additional filters based on price and type
        if (price && type === 'less') {
            filter.selling_price = { $lt: parseInt(price) };
        } else if (price && type === 'greater') {
            filter.selling_price = { $gt: parseInt(price) };
        }


        // Apply discount range filter if discount is defined
        if (discount !== undefined) {
            const [minDiscount, maxDiscount] = discount.split('-').map(parseFloat);
    
            if (!isNaN(minDiscount) && !isNaN(maxDiscount)) {
            filter.discount_perc = { $gte: minDiscount, $lte: maxDiscount };
            }
        }

    console.log(req.query);
    console.log(filter);

        // Fetch products based on the constructed filter and search query
        let products;
        if (search && search !== '') {
            const regexQuery = new RegExp(search, 'i');
            products = await Products.find({
                $and: [
                filter,
                {
                    $or: [
                    { name: { $regex: regexQuery } },
                    { description: { $regex: regexQuery } }
                    ]
                }
                ]
            }).limit(10).populate('product_category').populate('shop_category', 'shop_name').exec();
        } else {
            products = await Products.find(filter).limit(10).populate('product_category').populate('shop_category', 'shop_name').exec();;
        }

        let shopData;
        if (shopId !== 'null') {
            shopData = await Vendor.findOne({ _id: shopId }).exec();
        } else {
            shopData = null;
        }

        res.status(200).send({
            status: true,
            message: 'Products filtered by status and shopId',
            data: products,
            shopData: shopData
        });

    } catch (err) {
        res.status(500).send({ status: false, message: 'Error in processing the request', data: err });
    }
};


// exports.allProductsByShop = async (req, res) => {
//     const shopId = req.params.id;
//     const { product_status } = req.query;
//     try {
//         const shopFilter = { shop_category: shopId };

//         let filter = { ...shopFilter };

//         if (product_status === "PENDING" || product_status === "APPROVED" || product_status === "REJECTED") {
//             filter.product_status = product_status;
//         }

//         const products = await Products.find(filter).populate('product_category').populate('shop_category', 'shop_name').exec();
//         const shopData = await Vendor.findOne({ _id: shopId }).exec();

//         res.status(200).send({
//             status: true,
//             message: 'Products filtered by status and shopId',
//             data: products,
//             shopData: shopData
//         });

//     } catch (err) {
//         res.status(500).send({ status: false, message: 'Error in processing the request', data: err });
//     }
// };

exports.allProductsByCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { product_status } = req.query;
    try {
        const categoryFilter = { product_category: categoryId };

        let filter = { ...categoryFilter };

        if (product_status === "PENDING" || product_status === "APPROVED" || product_status === "REJECTED") {
            filter.product_status = product_status;
        }

        const products = await Products.find(filter).populate('product_category').populate('shop_category', 'shop_name').exec();

        res.status(200).send({
            status: true,
            message: 'Products filtered by status and categoryId',
            data: products,
        });

    } catch (err) {
        res.status(500).send({ status: false, message: 'Error in processing the request', data: err });
    }
};

exports.productGetById = async (req, res) => {
    const productId = req.params.id;
    try {
        const reviewItem = await Review.find({ product: productId }).populate('user', 'userName email');

        const product = await Products.findById(productId).populate('product_category').populate('shop_category', 'shop_name').exec();

        if (!product) {
            return res.status(404).send({ status: false, message: 'Product not found' });
        }
        const reviewDetails = reviewItem.map(reviewItem => reviewItem.toObject());

        const productWithReview = {
            ...product.toObject(),
            reviewDetails: reviewDetails,
        };
        // const products = await Products.findById(productId).populate('product_category');
        res.status(200).send({ status: true, message: 'Products By ID', data: productWithReview });
    } catch (err) {
        console.log('err', err);
        res.status(500).send({ status: false, message: 'Error in Solving1', data: err })
    }
};

exports.productGetByIdwithAuth = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;

        const wishlistItem = await Wishlist.findOne({ user: userId, product: productId });
        const reviewItem = await Review.find({ product: productId }).populate('user', 'userName email');

        const product = await Products.findOne({ _id: productId });
        if (!product) {
            return res.status(404).send({ status: false, message: 'Product not found' });
        }
        const reviewDetails = reviewItem.map(reviewItem => reviewItem.toObject());
        const shopData = await Vendor.findOne({ _id: product.shop_category });
        const productWithWishlist = {
            ...product.toObject(),
            isInWishlist: !!wishlistItem,
            reviewDetails: reviewDetails
        };

        res.status(200).send({ status: true, message: 'Product details retrieved', data: productWithWishlist, shopData });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: false, message: 'Server Error' });
    }
};

exports.allProducts = async (req, res) => {
    const { product_status } = req.query;
    try {
        let filter = {};
        if (product_status === "PENDING" || product_status === "APPROVED" || product_status === "REJECTED") {
            filter = { product_status };
        } else {
            filter = {};
        }
        const products = await Products.find(filter).populate('product_category').populate('shop_category', 'shop_name').exec();
        res.status(200).send({ status: true, message: 'All Products', data: products });
    } catch (error) {
        res.status(500).send({ status: false, message: 'Internal Server Error', error: error.message });
    }
};

exports.productsApprovalReject = async (req, res) => {
    const productId = req.params.id;
    const status = req.query.status;
    try {
        if (status === "APPROVED") {
            await Products.updateOne({ _id: productId }, { product_status: 'APPROVED' });
            res.status(200).send({ status: true, message: 'Product Approved Successfully' })
        } else if (status === "REJECTED") {
            await Products.updateOne({ _id: productId }, { product_status: 'REJECTED' });
            res.status(200).send({ status: true, message: 'Product Rejected Successfully' })
        } else {
            res.status(200).send({ status: true, message: 'Status incorrect.' })
        }
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error in Solving2', data: err })
    }
};

exports.updateProducts = async (req, res) => {
    const productId = req.params.id;
    try {
        await Products.updateOne({ _id: productId }, { $set: req?.body?.data });
        res.status(200).send({ status: true, message: 'Products Uploaded Successfully' })
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error in Solving3', data: err })
    }
};

exports.filterProducts = async (req, res) => {
    const { sortBy } = req.query;
    try {
        let products = await Products.find({}).exec();
        if (sortBy === 'lowToHigh') {
            products = products.sort((a, b) => a.selling_price - b.selling_price);
        } else if (sortBy === 'highToLow') {
            products = products.sort((a, b) => b.selling_price - a.selling_price);
        } else if (sortBy === 'ascending') {
            // If 'ascending' is provided, sort in ascending order based on product name
            products = products.sort((a, b) => a.name.localeCompare(b.name));
        }

        res.status(200).send({
            status: true,
            message: 'Products sorted by the specified criteria',
            data: products,
        });

    } catch (err) {
        console.log('eerr', err);
        res.status(500).send({ status: false, message: 'Error in processing the request', data: err });
    }
};