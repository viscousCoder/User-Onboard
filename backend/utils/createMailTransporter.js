require("dotenv").config();
const nodemailer = require("nodemailer");
const SENDEREMAIL = process.env.SENDEREMAIL;
const USERPASSWORD = process.env.USERPASSWORD;
const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: SENDEREMAIL,
      pass: USERPASSWORD,
    },
  });
  return transporter;
};

module.exports = { createMailTransporter };
