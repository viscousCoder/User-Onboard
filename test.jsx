passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID_LOGIN,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET_LOGIN,
      callbackURL: process.env.DOMAIN_NAME + "/user/google/callback",
    },
    function (issuer, profile, cb) {
      User.findOrCreateGoogleUser(profile.id, profile.emails[0].value)
        .then((result) => {
          return cb(null, result[0]);
        })
        .catch((err) => {
          console.dir(err);
          return cb(err, null, {
            message: err,
          });
        });
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.fetchById(id)
    .then((result) => {
      cb(null, result[0]);
    })
    .catch((err) => {
      cb(err, null);
    });
});

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err || !user) {
      console.dir(err);
      var message =
        info && info.message
          ? encodeURIComponent(
              info.message + " Please try again or try another login method."
            )
          : encodeURIComponent(
              "There was an error logging you in. Please try another login method."
            );
      return res.redirect(
        process.env.BASE_CLIENT_URL + "/login?error=" + message
      );
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        console.dir(err);
        return res.redirect(
          process.env.BASE_CLIENT_URL +
            "/login?error=" +
            encodeURIComponent(
              "Invalid User. Please try another account or register a new account."
            )
        );
      }
      const payload = {
        sub: user.id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN,
      });
      res.clearCookie("auth");
      res.cookie("auth", token);
      res.redirect(process.env.BASE_CLIENT_URL + "/loginsuccess");
    });
  })(req, res, next);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

const session = require("express-session");
app.use(
  session({
    secret: "FMfcgzGllVtHlrXDrwtpNdhLRXlNtVzl18088dda1",
    resave: false,
    saveUninitialized: true,
    proxy: true,
    rolling: true,
    cookie: {
      expires: 60 * 60 * 24,
      secure: app.get("env") === "production",
      sameSite: "lax",
    },
  })
);

res.setHeader(
  "Set-Cookie",
  cookie.serialize("XSRF-TOKEN", YOUR_OBJECT, {
    // XSRF-TOKEN is the name of your cookie
    sameSite: "lax", // lax is important, don't use 'strict' or 'none'
    httpOnly: process.env.ENVIRONMENT !== "development", // must be true in production
    path: "/",
    secure: process.env.ENVIRONMENT !== "development", // must be true in production
    maxAge: 60 * 60 * 24 * 7 * 52, // 1 year
    domain: process.env.ENVIRONMENT === "development" ? "" : `.example.com`, // the period before is important and intentional
  })
);
