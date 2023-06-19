const mail = require("nodemailer");
var mailOptions = {};

// Initialize Mailer
var mailer = mail.createTransport({
  service: "Gmail",
  secure: false, // use SSL
  auth: {
    user: process.env.FROM,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = (data, callback) => {
  const newData = JSON.parse(data);
  mailOptions = {
    from: process.env.PASS,
    to: process.env.TO,
    subject: "Portfolio Message",
    html: `<div>
      <h4>Name:</h4><h3>${newData.name}</h3>
      <h4>Email:</h4><h3>${newData.email}</h3>
      <h4>Phone:</h4><h3>${newData.phone}</h3>
      <h4>Message:</h4><h3>${newData.message}</h3>
    </div>`,
  };
  mailer.sendMail(mailOptions, (error, info) => {
    if (error) {
      callback(error, null);
    } else {
      callback(
        null,
        "Message sent Successfully\nPost another response after an Hour"
      );
    }
  });
};

module.exports = { sendMail };
