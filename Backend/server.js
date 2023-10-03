const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require("./routes");
const helmet = require("helmet")

const app = express();

// Use Helmet middleware to disable X-Powered-By header
app.use(helmet());

app.use(cors());
app.use(bodyParser.json());

// Use cookie-parser and express-session for managing cookies and sessions
app.use(cookieParser());
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// Initialize the csurf middleware
const csrfProtection = csurf();

// Use bodyParser to parse POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// Use the CSRF middleware after initializing the session
app.use(csrfProtection);


const PORT = process.env.PORT || 8000;
const URI = process.env.MONGO_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to the mongo db");
  }
);

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});
