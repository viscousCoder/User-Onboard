const express = require("express");
const { handleGetAllUser } = require("../controller/tableData");

const router = express.Router();

router.get("/data", handleGetAllUser);

module.exports = router;
