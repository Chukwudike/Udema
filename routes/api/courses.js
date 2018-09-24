const express = require("express");
const router = express.Router();
const multer = require("multer");
const passport = require("passport");
const Courses = require("../../model/Courses");
const User = require("../../model/Users");

const cloudinary = require("cloudinary");
const cloudinaryConfig = require("../../config/cloudinary");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ $and: [{ role: "instructor" }, { _id: req.user.id }] }).then(
      user => {
        if (user.length === 1) {
          const course = {};
          (course.user = req.user.id),
            (course.name = req.body.name),
            (course.description = req.body.description),
            (course.category = req.body.category),
            (course.creator = req.body.handle),
            (course.courseUrl = encodeURI(
              `api/courses/${req.body.handle}/${req.body.name}`
            ));
          Courses.findOne({
            $and: [{ user: req.user.id }, { name: req.body.name }]
          }).then(found_course => {
            //console.log(found_course);
            if (found_course) {
              Courses.findOneAndUpdate(
                {
                  name: req.body.name
                },
                { $set: course },
                {
                  new: true
                }
              )
                .then(result => res.json(result))
                .catch(err => console.log(err));
            } else {
              new Courses(course)
                .save()
                .then(new_course => res.json(new_course));
            }
          });
        } else {
          res.status(400).json({ msg: "You are not an instructor bro!" });
        }
      }
    );
  }
);

const storage = multer.diskStorage({
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});

const upload = multer({
  storage: storage
}).single("video");

// @route   GET api/courses/:username/:c
// @desc    Uploads user image
// @access  Private

// @route   POST api/courses/upload/:course_id
// @desc    Uploads user image
// @access  Private

router.post(
  "/upload/:course_id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    User.findOne({
      $and: [{ _id: req.user.id }, { role: "instructor" }]
    })
      .then(() => {
        Courses.findById(req.params.course_id).then(course => {
          upload(req, res, err => {
            cloudinary.v2.uploader.upload(
              req.file.path,
              {
                resource_type: "video",
                public_id: `${course.creator}/${course.name}/${
                  req.body.module
                }/${req.body.title}`,
                eager: [
                  {
                    width: 300,
                    height: 300,
                    crop: "pad",
                    audio_codec: "none"
                  },
                  {
                    width: 160,
                    height: 100,
                    crop: "crop",
                    gravity: "south",
                    audio_codec: "none"
                  }
                ],
                eager_async: true
                //notification_url: "http://mysite/notify_endpoint"
              },
              function(error, result) {
                console.log(result, error);
                const upload = {
                  title_module: req.body.module,
                  videos: [
                    {
                      duration: result.duration,
                      title: req.body.title,
                      video_url: result.secure_url
                    }
                  ]
                };

                if (
                  course.modules.filter(
                    section => section.title_module === req.body.module
                  ).length > 0
                ) {
                  course.modules.videos.push({
                    duration: result.duration,
                    title: req.body.title,
                    video_url: result.secure_url
                  });
                } else {
                  course.modules.unshift(upload);
                }
                course.save().then(new_upload => res.json(new_upload));
              }
            );
          });
        });
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
