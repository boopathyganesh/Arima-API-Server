const Customer = require("../../models/customer/user");
const Order = require("../../models/customer/order");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateUserId = require("../../utils/generateUserId");
const SendEmail = require('../../utils/sendEmail');

exports.create_customer = async (req, res) => {
    console.log('rex', req.body);
    const { country_code, phone_number, userName, email, device_id, otp, password, totalOrder, status, type } = req.body;
    const phone = phone_number;
    console.log('phone', phone);

    if (req.body.type === 'web') {
        otpTypeChange = parseInt(req.body.otp);
        try {
            const existingEmail = await Customer.findOne({ email: email });
            const existingPhone = await Customer.findOne({ phone_number: phone_number });

            if (existingEmail && existingPhone) {
                return res.status(401).json({ status: false, message: 'Email & Phone Number Already Exists' })
            } else if (existingEmail) {
                return res.status(401).json({ status: false, message: 'Email Already Exists' })
            } else if (existingPhone) {
                return res.status(401).json({ status: false, message: 'Phone Number Already Exists' })
            } else {
                const hashedPassword = await new Promise((resolve, reject) => {
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            console.error('Error hashing password:', err);
                            reject(err);
                        } else {
                            resolve(hash);
                        }
                    });
                });

                let customer_count = await Customer.countDocuments();
                let customers=customer_count+1
                let customerId = await generateUserId(customers) //bugfix

                const customer = new Customer({
                    country_code,
                    userName,
                    email,
                    password: hashedPassword,
                    phone_number,
                    customerId
                });

                await customer.save();
                res.status(200).send({ status: true, message: 'Customer created successfully' });
            }
        } catch (err) {
            res.status(500).send({ status: false, message: err })
        }
    } else {
        console.log("Mobile");
        otpTypeChange = parseInt(req.body.otp);
        try {
            const existingEmail = await Customer.findOne({ email: email });
            const existingPhone = await Customer.findOne({ phone_number: phone_number });

            if (existingEmail && existingPhone) {
                return res.status(200).json({ status: false, message: 'Email & Phone Number Already Exists' })
            } else if (existingEmail) {
                return res.status(200).json({ status: false, message: 'Email Already Exists' })
            } else if (existingPhone) {
                return res.status(200).json({ status: false, message: 'Phone Number Already Exists' })
            } else {
                let customer_count = await Customer.countDocuments();
                let customers=customer_count+1
                let customerId = await generateUserId(customers) //bugfix

                // const hashedPassword = await new Promise((resolve, reject) => {
                //     bcrypt.hash(password, 10, (err, hash) => {
                //         if (err) {
                //             console.error('Error hashing password:', err);
                //             reject(err);
                //         } else {
                //             resolve(hash);
                //         }
                //     });
                // });

                const customer = new Customer({
                    country_code,
                    userName,
                    email,
                    // password: hashedPassword,
                    phone_number,
                    type,
                    customerId
                });

                await customer.save();
                res.status(200).send({ status: true, message: 'Customer created successfully' });
            }
        } catch (err) {
            console.log('err', err);
            res.status(500).send({ status: false, message: err })
        }
    }
};

exports.customerWebLogin = async (req, res) => {
    const { email, password } = req.body;
    otpTypeChange = parseInt(req.body.otp);
    try {
        const emailToValidate = req.body.email;
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        var valid = emailRegexp.test(emailToValidate);
        const Checkuser = await Customer.findOne({ email });
        bcrypt.compare(password, Checkuser.password, (bErr, bResult) => {
            if (bErr) {
                res.status(200).send({ status: "false", message: 'Password Wrong' })
            } else
                if (bResult == true) {
                    const payload = { user: { id: Checkuser._id } }
                    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '360d' }, (err, token) => {
                        if (err) {
                            res.status(500).send({ status: false, message: 'Error', data: err })
                        }
                        res.status(200).send({ status: true, message: 'Login Success', data: { "id": Checkuser._id, "access_token": token } })
                    })
                } else {
                    res.status(400).send({ status: false, message: 'Email and Password Wrong' })
                }
        })
    } catch (err) {
        res.status(500).send({ status: false, message: 'Server Error' })
    }


};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log("Forgot pass email:",email)
    const user = await Customer.findOne({ email });
    console.log("User:",user)
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    };
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1hr'
    });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.WEBSITE_URL}${process.env.WEBSITE_VERIFY_EMAIL}/${token}`;
    //const resetUrl = `http://localhost:3009/reset-password/${token}`;

    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
        await SendEmail({
            to: email,
            subject: "Password Reset Request",
            text: message,
        });
        res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        res.status(200).send({ status: false, message: 'Error in Solving' })
        // return next(new ErrorResponse("Email could not be sent", 500));
    }
};

exports.resetPassword = async (req, res) => {
    const { password, token } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Customer.findOne({
            _id: decoded.userId,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        };
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

exports.all_customer = async (req, res) => {
    try {
        const results = await Customer.find().sort({ createdAt: -1 }).exec();
        res.status(200).send({ status: true, message: 'Customer List', data: results })
    } catch (err) {
        res.status(200).send({ status: false, message: 'Error in Solving', data: err })
    }
};

exports.customerDetails = async (req, res) => {
    const userID = req.user.id;
    try {
        const OrderCount = await Order.find({ user: userID }).exec();
        await Customer.findByIdAndUpdate(
            userID,
            { totalOrder: OrderCount.length },
            { new: true }
        );
        const updatedResults = await Customer.findById(userID).exec();
        const orderData = {
            ...updatedResults.toObject(),
            totalOrder: OrderCount.length
        };
        res.status(200).send({ status: true, message: 'Customer', data: orderData })
    } catch (err) {
        res.status(200).send({ status: false, message: 'Error in Solving', data: err })
    }
};

exports.updateCustomerDetails = async (req, res) => {
    const customerId = req.params.id;
    try {
        const result = await Customer.updateOne({ _id: customerId }, req.body);
        if (result.modifiedCount > 0) {
            res.status(200).send({ status: true, message: 'User updated successfully!' });
        } else {
            res.status(200).send({ status: true, message: 'User not found!' });
        }
    } catch (error) {
        res.status(500).send({ status: false, message: 'Error in updating category status', data: error });
    };
};

exports.updateCustomerStatus = async (req, res) => {
    const customerId = req.params.id;
    console.log('req', req?.body);
    try {
        const result = await Customer.updateOne({ _id: customerId }, { $set: { status: req?.body?.status } });
        if (result.modifiedCount > 0) {
            res.status(200).send({ status: true, message: 'User updated successfully!' });
        } else {
            res.status(200).send({ status: true, message: 'User not found!' });
        }
    } catch (error) {
        res.status(500).send({ status: false, message: 'Error in updating category status', data: error });
    };
};