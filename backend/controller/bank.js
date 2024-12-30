const { PlaidApi } = require("plaid");
require("dotenv").config();
const plaid = require("plaid");
const User = require("../model/user");

// plaid setup
const client = new plaid.PlaidApi(
  new plaid.Configuration({
    basePath: plaid.PlaidEnvironments["sandbox"],
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": process.env.PLAID_ID,
        "PLAID-SECRET": process.env.PLAID_SECRET,
        "PLAID-Version": "2020-09-14",
      },
    },
  })
);

//token generation
async function handleCreateLinkToken(req, res) {
  try {
    const response = await client.linkTokenCreate({
      user: {
        client_user_id: "user123",
      },
      client_name: "Ado",
      products: ["transactions"],
      required_if_supported_products: ["auth"],
      country_codes: ["us"],
      language: "en",
    });
    //send response
    res.json(response.data);
  } catch (error) {
    console.log("Error", error);
    //send error message
    res.json({
      error: error.message,
    });
  }
}

//get access token
async function handleGetAccessToken(req, res) {
  const userId = req.body.userId;
  // console.log(userId, typeof userId, "Hiii");
  try {
    const publicToken = req.body.publicToken;
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { accessToken, itemId },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    // console.log(response.data, "hiii");
    res.json({
      accessToken: response.data.access_token,
      itemId: response.data.item_id,
    });
  } catch (error) {
    // console.log("error", error);
    res.json({ error: error.message });
  }
}

//get auth
async function handleGetAuth(req, res, next) {
  try {
    // console.log(req.headers);
    const accessToken = req.headers.accesstoken;
    // console.log(accessToken, "helo  ");
    if (!accessToken) {
      return res.status(400).json({ error: "Access token is required" });
    }

    const authResponse = await client.authGet({
      access_token: accessToken,
    });

    res.json(authResponse.data);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

//get transsaction
async function handleTransaction(req, res, next) {
  try {
    let cursor = null;
    let added = [];
    let modified = [];
    let removed = [];
    let hasMore = true;
    while (hasMore) {
      const reqPayload = {
        access_token: req.headers.accesstoken,
        cursor: cursor,
      };

      const responseFromClient = await client.transactionsSync(reqPayload);
      const data = responseFromClient.data;

      cursor = data.next_cursor;
      if (!cursor) {
        await sleep(2000);
        continue;
      }

      added = added.concat(data.added);
      modified = modified.concat(data.modified);
      removed = removed.concat(data.removed);
      hasMore = data.has_more;
    }

    const compareTxnsByDateAscending = (a, b) =>
      (a.date > b.date) - (a.date < b.date);

    const recentlyAdded = [...added].sort(compareTxnsByDateAscending).slice(-8);

    // res.json({ latest_transactions: recentlyAdded });
    res.json(recentlyAdded);
  } catch (error) {
    console.error("Error in fetching transactions:", error.message);
    next(error);
  }
}

async function handleBalance(req, res) {
  try {
    const accessToken = req.headers.accesstoken;

    if (!accessToken) {
      return res.status(400).json({ error: "Access token is required" });
    }

    const balanceResponse = await client.accountsBalanceGet({
      access_token: accessToken,
    });

    res.json(balanceResponse.data);
  } catch (error) {
    console.error("Error fetching balance:", error.message);

    res.status(500).json({
      error:
        error.response?.data ||
        "An unexpected error occurred while fetching balance",
    });
  }
}

module.exports = {
  handleCreateLinkToken,
  handleGetAccessToken,
  handleGetAuth,
  handleTransaction,
  handleBalance,
};
