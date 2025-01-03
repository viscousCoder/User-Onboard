// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const passport = require("passport");
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// require("./passport");

// const { connectionDB } = require("./connection/connection");
// const userRouter = require("./routes/userAuth");
// const tableRouter = require("./routes/tableData");
// const bankRouter = require("./routes/bank");

// const app = express();
// // const PORT = 8000;
// const PORT = process.env.PORT || 8000;

// //connection with db
// // connectionDB("mongodb://127.0.0.1:27017/onboarding").then(() =>
// //   console.log("MongoDB connected successfull")
// // );
// connectionDB(process.env.MONGO_URL).then(() =>
//   console.log("MongoDB connected successfull")
// );

// app.use(cookieParser());
// // app.use(
// //   cors({
// //     // origin: "http://localhost:5173",
// //     origin: "https://useronboarding01.netlify.app",
// //     methods: "GET,POST,PUT,DELETE",
// //     credentials: true,
// //   })
// // );

// app.use(
//   cors({
//     // origin: "https://useronboarding01.netlify.app",
//     origin: "http://localhost:5173",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true, // Enable cookies
//   })
// );

// //middleware

// // app.use(
// //   session({
// //     secret: "celestial", // Secret key for signing the cookie
// //     resave: false, // Prevent resaving the session if it hasn't been modified
// //     saveUninitialized: true, // Save the session even if it hasn't been modified
// //     cookie: {
// //       maxAge: 24 * 60 * 60 * 1000, // 1 day
// //       httpOnly: true, // Prevent JavaScript access to the cookie
// //       secure: true, // Set to true only for HTTPS (production)
// //       sameSite: "none", // Necessary for cross-origin requests (with cookies)
// //     },
// //   })
// // );

// app.use(
//   session({
//     secret: "celestial",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 24 * 60 * 60 * 1000,
//       httpOnly: true,
//       secure: false,
//       sameSite: "none",
//     },
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// // app.use((req, res, next) => {
// //   console.log("Session Cookie: index ", req.cookies);
// //   next();
// // });

// // app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.use("/", userRouter);
// app.use("/table", tableRouter);

// app.use("/", bankRouter);

// app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

//part 2
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require("passport");
// const cookieSession = require("cookie-session");
const session = require("express-session");
require("./passport");

const { connectionDB } = require("./connection/connection");
const userRouter = require("./routes/userAuth");
const tableRouter = require("./routes/tableData");
const bankRouter = require("./routes/bank");

const app = express();
// const PORT = 8000;
const PORT = process.env.PORT || 9001;

//connection with db
connectionDB(process.env.MONGO_URL).then(() =>
  console.log("MongoDB connected successfully")
);

//middleware
// app.use(
//   session({
//     secret: "celestial", // You should change this to a more secure, random string
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 24 * 60 * 60 * 1000, // Session expiration time (1 day)
//       cookie: { secure: false },
//     },
//   })
// );
app.use(
  session({
    secret: "celestial", // Use a more secure, random string in production
    resave: false,
    saveUninitialized: true,
    proxy: true,
    rolling: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Session expiration time (1 day)
      httpOnly: true, // Make cookie HTTP-only to avoid JS access
      secure: true, // Set to true in production with HTTPS
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://useronboarding01.netlify.app",
    // origin: "https://useronboardings.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
// app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  console.log("count 0", req.user);
  console.log("Session Cookie: index ", req.headers.cookie); // Log cookies for debugging
  next();
});

app.use("/", userRouter);
app.use("/table", tableRouter);

app.use("/", bankRouter);

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

// part3

// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const passport = require("passport");
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// require("./passport");

// const { connectionDB } = require("./connection/connection");
// const userRouter = require("./routes/userAuth");
// const tableRouter = require("./routes/tableData");
// const bankRouter = require("./routes/bank");

// const app = express();
// const PORT = process.env.PORT || 9001;

// // MongoDB connection
// connectionDB(process.env.MONGO_URL).then(() =>
//   console.log("MongoDB connected successfully")
// );

// // Middleware: cookieParser first
// app.use(cookieParser());

// // Middleware: CORS
// app.use(
//   cors({
//     // origin: "https://useronboarding01.netlify.app",
//     origin: "http://localhost:5173",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );

// // Middleware: Session configuration
// app.use(
//   session({
//     secret: "celestial",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 24 * 60 * 60 * 1000,
//       httpOnly: true,
//       secure: false,
//       sameSite: "none",
//     },
//   })
// );

// // Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Check for cookies for debugging
// // app.use((req, res, next) => {
// //   console.log("Session Cookie: index ", req.cookies); // Log cookies for debugging
// //   next();
// // });

// // Body parsing middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Routes
// app.use("/", userRouter);
// app.use("/table", tableRouter);
// app.use("/", bankRouter);

// // Start the server
// app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
// // consoe
