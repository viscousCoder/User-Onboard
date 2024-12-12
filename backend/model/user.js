const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    address: { type: String, default: "India" },
    googleId: { type: String },
    displayName: { type: String },
    image: { type: String },
    isVerified: { type: Boolean, default: false },
    emailToken: { type: String },
    accessToken: { type: String, default: "N/A" },
    itemId: { type: String, default: "N/A" },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
