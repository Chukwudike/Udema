const express = require("express");
const router = express.Router();
const multer = require("multer");
const passport = require("passport");
const path = require("path");
const bcrypt = require("bcryptjs");
const Profile = require("../../model/Profile");
const User = require("../../model/Users");
const fs = require("fs");
const cloudinary = require("cloudinary");
const cloudinaryConfig = require("../../config/cloudinary");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

//Validation

const validateChangePassword = require("../../validations/changepassword");

// @route POST api/profile/
// @desc Edit-profile route
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    if (req.body.firstname) profileFields.firstname = req.body.firstname;
    if (req.body.lastname) profileFields.lastname = req.body.lastname;
    if (req.body.headline) profileFields.headline = req.body.headline;
    if (req.body.bio) profileFields.bio = req.body.bio;

    profileFields.social = {};
    if (req.body.youtube)
      profileFields.social.youtube = `http://www.youtube.com/${
        req.body.youtube
      }`;

    if (req.body.twitter)
      profileFields.social.twitter = `http://twitter.com/${req.body.twitter}`;

    if (req.body.facebook)
      profileFields.social.facebook = `http://www.facebook.com/${
        req.body.facebook
      }`;

    if (req.body.linkedin)
      profileFields.social.linkedin = `http://www.linkedin.com/${
        req.body.linkedin
      }`;

    if (req.body.instagram)
      profileFields.social.instagram = `http://twitter.com/${
        req.body.instagram
      }`;

    Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    ).then(profile => res.json(profile));
  }
);

//load multer for upload

const storage = multer.diskStorage({
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});

//init upload from multer

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("image");


function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("use a valid file type");
  }
}

// @route   POST api/profile/upload
// @desc    Uploads user image
// @access  Private
router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    upload(req, res, err => {
      Profile.findOne({ user: req.user.id }).then(profile => {
        console.log(profile);
        const errors = {};
        if (err) {
          errors.image = err;
          return res.status(400).json(errors);
        } else if (req.file === undefined) {
          errors.image = "Please upload a file";
          return res.status(400).json(errors);
        } else if (req.file.size > 1024 * 1024 * 5) {
          errors.image = "Size should not be more that 5MB";
          return res.status(400).json(errors);
        } else {
          if (profile.image.fileRef) {
            cloudinary.v2.uploader.destroy(
              profile.image.id,
              (error, result) => {
                console.log(error);
              }
            );
          }
          cloudinary.v2.uploader.upload(req.file.path, (error, result) => {
            profile.image.fileRef = result.secure_url;
            profile.image.id = result.public_id;
            profile
              .save()
              .then(image_profile => res.json(image_profile))
              .catch(err => res.json(err));
          });
        }
      });
    });
  }
);

// @route   POST api/profile/
// @desc    Uploads user image
// @access  Private
router.post(
  "/password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, noErrors } = validateChangePassword(req.body);
    if (!noErrors) {
      return res.status(400).json(errors);
    }

    const oldpassword = req.body.oldpassword;
    const confirmpassword = req.body.confirmpassword;

    User.findById(req.user.id).then(user => {
      bcrypt.compare(oldpassword, user.password).then(isMatch => {
        if (isMatch) {
          user.password = confirmpassword;
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user.save().then(res.json(user));
            });
          });
        } else {
          errors.passport = "Your password is incorrect";
          res.status(400).json(errors);
        }
      });
    });
  }
);


// @route   GET api/profile/user/handle
// @desc    get user by id
// @access  Public

router.get("/user/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
