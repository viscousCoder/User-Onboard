const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./model/user"); // Adjust path to your User model
const jwt = require("jsonwebtoken");
require("dotenv").config();

if (!process.env.GOOGLECLIENTID || !process.env.GOOGLECLIENTSECRET) {
  throw new Error(
    "Google OAuth credentials are not set in environment variables."
  );
}
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLECLIENTID,
      clientSecret: process.env.GOOGLECLIENTSECRET,
      callbackURL: "https://user-onboard.onrender.com/auth/google/callback",
      // callbackURL: "http://localhost:8000/auth/google/callback",
      prompt: "select_account",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // Check if the user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Create a new user if none exists
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0]?.value,
            isVerified: true,
          });

          await user.save();
        }

        // console.log("token", token);
        return cb(null, user);
      } catch (err) {
        console.error("Error during Google OAuth:", err);
        return cb(err, null);
      }
    }
  )
);

// Serialize user for session support
passport.serializeUser((user, done) => {
  console.log(user.id, "This is here");
  done(null, user.id);
});

// Deserialize user from session
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     console.log(user, "this is desrial");
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });
passport.deserializeUser(async (id, done) => {
  console.log("this inside Deserial");
  try {
    console.log("Deserializing User ID:", id);
    const user = await User.findById(id);
    console.log("Deserialized User:", user);
    done(null, user);
  } catch (err) {
    console.error("Error during deserialization:", err);
    done(err, null);
  }
});

module.exports = passport;
