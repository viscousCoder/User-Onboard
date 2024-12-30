const { createMailTransporter } = require("./createMailTransporter");

const sendVerificationMail = (user) => {
  console.log("aman");
  const transporter = createMailTransporter();
  const mailOptions = {
    from: `Celestial system <aman.bisht@celestialsys.com>`,
    to: user.email,
    subject: "Verify your accoount with celestial system",
    html: `<p>Hello ${user.username}, verify your account that you created on the celestial system withus by clicking in this link.....</p>
    <a href=http://localhost:5173/verify-email?emailToken=${user.emailToken}> Verify your Email</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error", error);
    } else {
      console.log("Verification link sent");
    }
  });
};

module.exports = { sendVerificationMail };
