const User = require("../model/user");

async function handleGetAllUser(req, res) {
  try {
    const user = await User.find({});
    res.status(200).send({ message: "All data", data: user });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching users", error: error.message });
  }
}

module.exports = { handleGetAllUser };
