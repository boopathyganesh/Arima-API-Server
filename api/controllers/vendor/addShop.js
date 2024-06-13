const Vendor = require('../../models/vendor/addShop');
const Products = require('../../models/vendor/product');
const { filedetails } = require("../../helpers/multer");
const generateShopId = require("../../utils/generateShopId");


exports.uploadVendorProfile = async (req, res) => {
    try {
        if (req.file) {
            datalist = filedetails('shop_profile', req.file)
            return res.send({ status: true, data: datalist, message: 'File Uploaded.' });
        }
    } catch (error) {
        res.status(200).send({ status: false, message: error })
    }
};

exports.uploadShopImage = async (req, res) => {
    try {
        if (req.file) {
            datalist = filedetails('shop_image', req.file)
            return res.send({ status: true, data: datalist, message: 'File Uploaded.' });
        }
    } catch (error) {
        res.status(200).send({ status: false, message: error })
    }
};

exports.uploadShopDocuments = async (req, res) => {
    try {
        if (req.file) {
            datalist = filedetails('shop_documents', req.file)
            return res.send({ status: true, data: datalist, message: 'File Uploaded.' });
        }
    } catch (error) {
        res.status(200).send({ status: false, message: error })
    }
};

exports.addShop = async (req, res) => {
    console.log('addShopBodyData', req.body);
    const { email, gender, image, phone_number, name, owner_address, personal_info } = req.body
    try {
        const emailToValidate = req.body.email;
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        var valid = emailRegexp.test(emailToValidate);
        if (!email) {
            const Checkuser = await Vendor.findOne({ phone_number });
            if (Checkuser) { return res.status(200).json({ status: false, message: 'Phone Number Already Exists' }) }
        } else if (email != '' && valid) {
            const Checkuser = await Vendor.findOne({ phone_number });
            if (Checkuser) { return res.status(200).json({ status: false, message: 'Phone Number Already Exists' }) }
            const Checkemail = await Vendor.findOne({ email });
            if (Checkemail) { return res.status(200).json({ status: false, message: 'Email Already Exists' }) }
        } else if (email != '' && !valid) {
            const Checkuser = await Vendor.findOne({ phone_number });
            if (Checkuser) { return res.status(200).json({ status: false, message: 'Phone Number Already Exists' }) }
            return res.status(200).json({ status: false, message: 'Email not valid' })
        }

        let user_count = await Vendor.countDocuments();
        let user_id = user_count + 1

        let shop_id = await generateShopId(user_id);

        user = new Vendor({
            // user_id,
            shop_id: shop_id,
            phone_number,
            name,
            email,
            gender,
            image,
            owner_address,
            personal_info
        });
        console.log('user', user);
        await user.save();
        res.status(200).send({
            status: true,
            message: 'Vendor Registered Successfully.',
            "id": user._id,
        });
    } catch (err) {
        console.log('err', err);
        res.status(500).send({ status: false, message: 'Server Error' })
    }
};

exports.shopFilterByProductCategory = async (req, res) => {
    const productCategoryId = req.params.id;
    try {
        const productsData = await Products.find({ product_category: productCategoryId }).exec();
        const shopIds = productsData.map(product => product.shop_category);
        const shopsData = await Vendor.find({ _id: { $in: shopIds }, shop_status: "APPROVED" }).exec();
        res.status(200).send({ status: true, message: 'Shops List Loaded By Category', data: shopsData });
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error in Solving', data: err })
    }
    // try {
    //     const productsData = await Products.find({ product_category: productCategoryId }).exec();
    //     const shopIds = produ    ctsData.map(product => product.shop_category);
    //     const shopsData = await Vendor.find({ _id: { $in: shopIds }, status: "APPROVED" }).exec();
    //     res.status(200).send({ status: true, message: 'Shops List Loaded By Category', data: shopsData });
    // } catch (err) {
    //     res.status(500).send({ status: false, message: 'Error in Solving', data: err })
    // }
};

exports.updateShopDetails = async (req, res) => {
    console.log('req.body', req.body);
    const user_id = req.params.id;
    const Checkuser = await Vendor.findOne({ phone_number: req.params.phone_number });
    if (Checkuser != '' && Checkuser != 'null' && Checkuser != null && Checkuser._id != user_id && phone_number != '') {
        return res.status(200).json({ status: false, message: 'Contact Mobile Number Already Exists' })
    } else {
        try {
            const updatedVendor = await Vendor.findByIdAndUpdate(user_id, { $set: req.body.data }, { new: true });

            res.status(200).send({ status: true, message: 'Vendor Updated', data: updatedVendor });
        } catch (err) {
            if (err.code === 11000 && err.keyPattern && err.keyPattern.phone_number) {
                // Duplicate key error for phone_number
                return res.status(200).send({ status: false, message: 'Phone number is already in use by another vendor' });
            }

            // Other errors
            console.error(err.message);
            res.status(500).send({ status: false, message: 'Server Error', errors: err });
        }
    }
};

exports.getAllShopsByApprove = async (req, res) => {
    try {
        filter = { "shop_status": { "$in": ["APPROVED"] }, status: 1 }
        const datalist = await Vendor.find(filter).sort({ createdAt: -1 }).exec();
        res.status(200).send({ status: true, message: ' All Shops', data: datalist })
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error in Solving', data: err })
    }
};

exports.getAllShops = async (req, res) => {
    try {
        const datalist = await Vendor.find().sort({ createdAt: -1 }).exec();
        res.status(200).send({ status: true, message: ' All Shops', data: datalist })
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error in Solving', data: err })
    }
};

exports.getShopById = async (req, res) => {
    const shopId = req.params.id;
    try {
        const datalist = await Vendor.findById(shopId).sort({ createdAt: -1 }).exec();
        res.status(200).send({ status: true, message: 'Shops By Id', data: datalist })
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error in Solving', data: err })
    }
};

exports.shopApprovalRejectByAdmin = async (req, res) => {
    const shopId = req.params.id;
    const shop_status = req.query.status;
    try {
        if (shop_status === "APPROVED") {
            await Vendor.updateOne({ _id: shopId }, { shop_status: 'APPROVED' });
            res.status(200).send({ status: true, message: 'Shop Approved Successfully' })
        } else {
            await Vendor.updateOne({ _id: shopId }, { shop_status: 'REJECTED' });
            res.status(200).send({ status: true, message: 'Shop Rejected Successfully' })
        }
    } catch (err) {
        console.log('errr', err);
        res.status(500).send({ status: false, message: 'Error in Solving', data: err })
    }
};

exports.shopApprovalPendingList = async (req, res) => {
    const { shop_status } = req.query;
    try {
        let filter = {};
        if (shop_status === "PENDING" || shop_status === "APPROVED" || shop_status === "REJECTED") {
            filter = { shop_status };
        }
        const datalist = await Vendor.find(filter).exec();
        res.status(200).send({ status: true, message: 'Shops', data: datalist });
    } catch (error) {
        res.status(500).send({ status: false, message: 'Internal Server Error', error: error.message });
    }
};

exports.activeShopsList = async (req, res) => {
    const { shop_status } = req.query;
    try {
        let filter = {};
        if (shop_status === "PENDING" || shop_status === "APPROVED" || shop_status === "REJECTED") {
            filter = { shop_status, status: 1 };
        }
        const datalist = await Vendor.find(filter).exec();
        res.status(200).send({ status: true, message: 'Shops', data: datalist });
    } catch (error) {
        res.status(500).send({ status: false, message: 'Internal Server Error', error: error.message });
    }
};


exports.shopStatusActiveInactive = async (req, res) => {
    const shopId = req.params.id;
    const status = req.body.status;
    const convertNumber = parseInt(status);
    console.log('shopId', shopId);
    try {
        if (convertNumber !== 0) {
            await Vendor.updateOne({ _id: shopId }, { status: 1 });
            await Products.updateMany({ shop_category: shopId }, { status: 1 });
            res.status(200).send({ status: true, message: 'Shop Active Successfully' })
        } else {
            await Vendor.updateOne({ _id: shopId }, { status: 0 });
            await Products.updateMany({ shop_category: shopId }, { status: 0 });
            res.status(200).send({ status: true, message: 'Shop Deactivated Successfully' })
        }
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error in Solving', data: err })
    }
};