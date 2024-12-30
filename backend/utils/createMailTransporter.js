require("dotenv").config();
const nodemailer = require("nodemailer");
const USER = process.env.USER;
const USERPASSWORD = process.env.USERPASSWORD;

const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.USER,
      pass: process.env.USERPASSWORD,
    },
  });
  return transporter;
};

module.exports = { createMailTransporter };
