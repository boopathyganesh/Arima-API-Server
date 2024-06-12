
const Admin = require('../../models/admin/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = "0wnUY/dCYJTkzYUxBYOcQHM3kJGd+Z/woNpnLMvMBhE="

exports.adminRegister = async (req, res) => {
    const { phone_number, name, email, password, image, gender } = req.body

    try {
        const emailToValidate = req.body.email;
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        var valid = emailRegexp.test(emailToValidate);

        if (!email) {
            const Checkuser = await Admin.findOne({ phone_number });
            if (Checkuser) { return res.status(200).json({ status: "false", message: 'Phone Number Already Exists' }) }
        } else if (email != '' && valid) {
            const Checkuser = await Admin.findOne({ phone_number });
            if (Checkuser) { return res.status(200).json({ status: "false", message: 'Phone Number Already Exists' }) }

            const Checkemail = await Admin.findOne({ email });
            if (Checkemail) { return res.status(200).json({ status: "false", message: 'Email Already Exists' }) }
        } else if (email != '' && !valid) {
            const Checkuser = await Admin.findOne({ phone_number });
            if (Checkuser) { return res.status(200).json({ status: "false", message: 'Phone Number Already Exists' }) }
            return res.status(200).json({ status: "false", message: 'Email not valid' })
        }

        let user_count = await Admin.countDocuments();
        user_id = user_count + 10000001;
        bcrypt.hash(password, 10, async function (err, password) {
            user = new Admin({
                user_id,
                phone_number,
                name,
                email
                , password
                , image, gender, //createdAt
            })
            await user.save();

            console.log('user', user);

            const payload = { user: { id: user.id } }
            //console.log("secret",process.env.JWT_SECRET)
            jwt.sign(payload, SECRET, { expiresIn: '365d' }, (err, token) => {
                if (err) throw err
                res.status(200).send({ status: "true", message: 'Admin/Manager successfully added', data: { "id": user.id, "access_token": token } })
            }
            )
        })

    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false", message: 'Server Error' })
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const Checkuser = await Admin.findOne({ email, deactive: 0 });
        console.log(Checkuser);

        if (!Checkuser) {
            return res.status(200).json({ status: false, message: 'Email Not Exists' });
        }

        // check password
        bcrypt.compare(password, Checkuser.password, async (bErr, bResult) => {
            if (bErr) {
                console.log(bErr.message);
                return res.status(200).send({ status: false, message: 'Password Wrong' });
            }
            console.log(bResult)

            if (bResult === true) {
                const payload = { user: { id: Checkuser._id } };
                console.log(payload);

                jwt.sign(payload, SECRET, { expiresIn: '360d' }, (err, token) => {
                    if (err) {
                        return res.status(500).send({ status: false, message: 'Error', data: err });
                    }

                    return res.status(200).send({ status: true, message: 'Login Success', data: { id: Checkuser._id, access_token: token } });
                });
            } else {
                return res.status(400).send({ status: false, message: 'Email and Password Wrong' });
            }
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send({ status: false, message: 'Server Error' });
    }
};


exports.allUsers = async (req, res) => {
    try {
        const users = await Admin.find();
        return res.status(200).json({ status: true, data: users });
    } catch (e) {
        console.error('Error fetching users:', e);
        return res.status(500).json({ status: false, message: 'Server Error', error: e.message });
    }
};
