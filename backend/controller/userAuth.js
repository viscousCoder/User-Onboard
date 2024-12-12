const { hash, compare } = require("bcrypt");
const User = require("../model/user");
const { handleCreateToken, handleCheckToken } = require("../services/token");
const crypto = require("crypto");
const { sendVerificationMail } = require("../utils/sendVerificationEmail");

async function handleUserSingnup(req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = await hash(req.body.password, 10);
  const address = req.body.address;
  // console.log(username, email, password, "hii");
  User.create({
    username: username,
    email: email,
    password: password,
    isVerified: false,
    address: address,
    emailToken: crypto.randomBytes(64).toString("hex"),
  })
    .then((user) => {
      sendVerificationMail(user);
      res
        .status(201)
        .send({ message: "User created successfully", status: 201 });
    })
    .catch((e) => {
      if (e.code === 11000) {
        res.status(400).json({
          message: "Email already exists",
          errorCode: 11000,
        });
      } else {
        res.status(500).json({
          message: "Something went wrong, please try again.",
          error: e.message,
        });
      }
    });
}

async function handleUserSignin(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const isValidPassword = await compare(password, user.password);

  if (!isValidPassword) {
    return res.status(404).send({ message: "Password not matched" });
  }
  const token = await handleCreateToken(user);
  return res
    .status(200)
    .send({ message: "successfully loggedin", token: `${token}` });
}

//send verify email
async function handleSendVerificationEmail(req, res) {
  try {
    const emailToken = req.body.emailToken;
    if (!emailToken) return res.status(404).json("Email token not found....");
    const user = await User.findOne({ emailToken });
    console.log(user, "verification");
    sendVerificationMail(user);
    res.status(200).send("successfully send email");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
}

//verify email
async function handleVerifyEmail(req, res) {
  try {
    // console.log(req.body);
    const emailToken = req.body.emailToken;
    console.log(emailToken);
    if (!emailToken) return res.status(404).json("Email token not found....");
    const user = await User.findOne({ emailToken });
    if (user) {
      user.emailToken = null;
      user.isVerified = true;

      await user.save();
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user?.isVerified,
      });
    } else {
      res.status(404).json("Email verfication failed,invalid token");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
}

//curentuser Data
async function handleCurrentUserData(req, res) {
  try {
    // const userId = req.headers.userid;
    const token = req.headers.token;
    // console.log("hellooooo", req.headers);
    const { _id } = await handleCheckToken(token);
    // console.log(_id);

    if (!_id) {
      return res.status(400).json({ error: "User ID is required in headers" });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with user data
    // const token = await handleCreateToken(user);
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = {
  handleUserSingnup,
  handleUserSignin,
  handleSendVerificationEmail,
  handleVerifyEmail,
  handleCurrentUserData,
};
