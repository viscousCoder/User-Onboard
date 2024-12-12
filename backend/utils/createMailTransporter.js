const nodemailer = require("nodemailer");

const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "aman.bisht@celestialsys.com",
      pass: "A2m6a2n6@2001#",
    },
  });
  return transporter;
};

module.exports = { createMailTransporter };
