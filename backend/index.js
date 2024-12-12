const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const session = require("express-session");
require("./passport");

const { connectionDB } = require("./connection/connection");
const userRouter = require("./routes/userAuth");
const tableRouter = require("./routes/tableData");
const bankRouter = require("./routes/bank");

const app = express();
const PORT = 8000;

//connection with db
connectionDB("mongodb://127.0.0.1:27017/onboarding").then(() =>
  console.log("MongoDB connected successfull")
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
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Session expiration time (1 day)
      httpOnly: true, // Make cookie HTTP-only to avoid JS access
      secure: false, // Set to true in production with HTTPS
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
// app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", userRouter);
app.use("/table", tableRouter);

app.use("/", bankRouter);

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
