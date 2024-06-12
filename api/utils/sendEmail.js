const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    // service: process.env.EMAIL_SERVICE,
    // auth: {
    //   user: process.env.arima,
    //   pass: process.env.EMAIL_PASSWORD,
    // },
    service: 'gmail',
    auth: {
      user: 'm8devapp@gmail.com',
      pass: 'bkfq yuoj toco tots'
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      // console.log("info",info);
    }
  });
};

module.exports = sendEmail;
