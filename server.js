const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

//
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const courses = require("./routes/api/courses")

// Body parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config

const db = require("./config/keys").Mongourl;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//init passport middleware
app.use(passport.initialize());

//init passport middleware config

require('./config/passport')(passport);


// Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/courses", courses);

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Server running on port ${port}`));


//williamscalg@gmail.com