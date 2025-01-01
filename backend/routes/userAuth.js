const express = require("express");
const passport = require("passport");
const {
  handleUserSingnup,
  handleUserSignin,
  handleSendVerificationEmail,
  handleVerifyEmail,
  handleCurrentUserData,
} = require("../controller/userAuth");
const { handleCreateToken } = require("../services/token");

const router = express.Router();

router.post("/signup", handleUserSingnup);
router.post("/signin", handleUserSignin);
router.post("/sendemail", handleSendVerificationEmail);
router.post("/verify-email", handleVerifyEmail);

//google auth

router.get("/login/failed", async (req, res) => {
  res.status(401).json({ message: " Failed", success: "failed" });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    // successRedirect: "https://useronboarding01.netlify.app/",
    // failureRedirect: "https://useronboarding01.netlify.app/login",
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/login",
  })
);
// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "https://useronboarding01.netlify.app/login",
//   }),
//   (req, res) => {
//     res.redirect("https://useronboarding01.netlify.app/");
//   }
// );

// router.get("/login/success", async (req, res) => {
//   console.log("Login api inside Session:", req.session);
//   console.log(" Success api call Session User:", req.user);
//   if (req.user) {
//     const token = await handleCreateToken(req.user);
//     res
//       .status(200)
//       .json({ message: "user Login", user: req.user, token: token });
//   } else {
//     res.status(400).json({ message: "Not Authorized" });
//   }
// });
router.get("/login/success", async (req, res) => {
  // console.log("Insidesuccess Session Details: ", req.session);
  // console.log("Insidesuccess Passport User:", req.user);
  console.log("inside success");
  if (req.user) {
    const token = await handleCreateToken(req.user);
    return res
      .status(200)
      .json({ message: "User Login", user: req.user, token });
  }
  res.status(400).json({ message: "Not Authorized" });
});

// router.get("/logout", (req, res, next) => {
//   // Prevent caching of the logout response
//   res.set("Cache-Control", "no-store");

//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }

//     req.session.destroy((sessionErr) => {
//       if (sessionErr) {
//         console.error("Session destruction error:", sessionErr);
//         return next(sessionErr);
//       }

//       res.clearCookie("connect.sid"); // Clear session cookie
//       res.status(200).json({ message: "Logout successful" }); // Respond with success
//     });
//   });
// });

// backend: routes/userAuth.js
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // Instead of redirecting here, send a 200 response to the frontend
    res.status(200).json({ message: "Logout successful" });
  });
});

router.get("/userData", handleCurrentUserData);

module.exports = router;

// router.get("/login/sucess", async (req, res) => {
//   if (req.user) {
//     res
//       .status(200)
//       .json({ message: "user Login", user: req.user, cookies: req.cookies });
//   } else {
//     res.status(400).json({ message: "Not Authorized" });
//   }
// });
// router.get("/auth/logout", (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     req.session.destroy((sessionErr) => {
//       if (sessionErr) {
//         console.error("Session destruction error:", sessionErr);
//         return next(sessionErr);
//       }
//       res.clearCookie("connect.sid"); // Clear session cookie
//       res.status(200).json({ message: "Logout successful" });
//     });
//   });
// });
