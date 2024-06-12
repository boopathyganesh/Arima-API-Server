const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    username: { type: String, required: true, default: 1 },
    email: { type: String, required: false, default: "" },
    subject: { type: String, required: true, default: 1 },
    description: { type: String, required: true, default: 0 }
},
    {
        timestamps: true
    },
);
module.exports = mongoose.model('contactUs', ContactSchema)