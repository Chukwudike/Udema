const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load User model
const User = require("../../model/Users");
const Profile = require("../../model/Profile");

//Validation
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public

router.get("/test", (req, res) => res.json({ message: "User works" }));

// @route   POST api/users/register
// @desc    registration routes
// @access  Publicd

router.post("/register", (req, res) => {
  const { errors, noErrors } = validateRegisterInput(req.body);
  if (!noErrors) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password2 : req.body.password2
      });
      const firstname = req.body.name.trim().split(" ")[0];
      const lastname = req.body.name.trim().split(" ")[1];
      const handle = `${firstname}${- lastname ? lastname : '' }`;

      const profileData = new Profile({
        firstname: firstname,
        lastname: lastname,
        user: "",
        handle: handle
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              Profile.findOne({ handle: profileData.handle }).then(handle => {
                if (handle) {
                  handle.handle = `${profileData.handle}-${Math.floor(
                    Math.random() * 20 + 1
                  )}`;
                  handle.user = user._id;
                  handle.save().then(userhandle => res.json(userhandle));
                } else {
                  profileData.user = user._id;
                  profileData.save().then(profile => res.json(user));
                }
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    login route
// @access  Public

router.post("/login", (req, res) => {
  const { errors, noErrors } = validateLoginInput(req.body);

  // Check Validation
  if (!noErrors) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Errors if user is not found
    if (!user) {
      errors.email = "Email/Password is incorrect";
      errors.password = "Email/Password incorrect";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.email = "Email/Password is incorrect";
        errors.password = "Email/Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

router.post(
  "/change_role",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id }).then(user => {
      if (user.role === "instructor") {
        res.json({ msg: "you are already an instructor" });
      } else {
        user.role = "instructor";
        user.save().then(upd_user => {
          res.json(upd_user);
        });
      }
    });
  }
);

module.exports = router;
