const express = require("express");
const {
  handleCreateLinkToken,
  handleGetAccessToken,
  handleGetAuth,
  handleTransaction,
  handleBalance,
} = require("../controller/bank");

const router = express.Router();

router.post("/create_link_token", handleCreateLinkToken);
router.post("/get_access_token", handleGetAccessToken);
router.get("/api/auth", handleGetAuth);
router.get("/api/transactions", handleTransaction);
router.get("/api/balance", handleBalance);

module.exports = router;
