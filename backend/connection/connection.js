const mongoose = require("mongoose");

async function connectionDB(url) {
  return mongoose.connect(url);
}

module.exports = { connectionDB };
