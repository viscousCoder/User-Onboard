const JWT = require("jsonwebtoken");
const secret = "createdToken123";

async function handleCreateToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };

  const token = JWT.sign(payload, secret);
  return token;
}

async function handleCheckToken(token) {
  // console.log(token);
  const payload = JWT.verify(token, secret);
  // console.log(payload);
  return payload;
}

module.exports = { handleCreateToken, handleCheckToken };
