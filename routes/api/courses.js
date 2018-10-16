const express = require("express");
const router = express.Router();
const multer = require("multer");
const passport = require("passport");
const Courses = require("../../model/Courses");
const User = require("../../model/Users");

const cloudinary = require("cloudinary");
const cloudinaryConfig = require("../../config/cloudinary");

// @route   GET api/courses/
// @desc    Get all coursers
// @access  Public

router.get("/", (req, res) => {
  if (req.query.category) {
    Courses.find({ category: req.query.category })
      .then(courses => {
        courses.length > 0
          ? res.json(courses)
          : res.json({ msg: "No course on this category" });
      })
      .catch(err => res.json({ msg: "No course on this category" }));
  }
  Courses.find()
    .then(courses => res.json(courses))
    .catch(err => res.status(404).json({ msg: "No course available" }));
});

// @route   GET api/courses/:creator/:course_name
// @desc    Get course based on url
// @access  Public
router.get("/:creator/:course_name", (req, res) => {
  Courses.findOne({
    $and: [{ creator: req.params.creator }, { name: req.params.course_name }]
  })
    .then(course => res.json(course))
    .catch(err => res.status(404).json({ msg: "This course does not exist" }));
});

// @route   GET api/courses/result?search_query=req.query.search_query
// @desc   Search course
// @access  Public

router.get("/result", (req, res) => {
  let search_query = req.query.search_query;
  Courses.find({
    $or: [
      { creator: { $regex: new RegExp(search_query) } },
      { name: { $regex: new RegExp(search_query) } }
    ]
  })
    .then(courses => {
      courses.length > 0
        ? res.json(courses)
        : res.json({ msg: "match not found" });
    })
    .catch(err => res.json(err));
});

// @route   POST api/courses/
// @desc    send course data
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ $and: [{ role: "instructor" }, { _id: req.user.id }] }).then(
      user => {
        if (user) {
          const course = {};
          (course.user = req.user.id),
            (course.name = req.body.name),
            (course.description = req.body.description),
            (course.category = req.body.category),
            (course.creator = req.body.handle),
            (course.courseUrl = encodeURI(
              `/api/courses/${req.body.handle}/${req.body.name}`
            ));
          Courses.findOne({
            $and: [{ user: req.user.id }, { handle: req.body.handle }]
          }).then(found_course => {
            //console.log(found_course);
            if (found_course) {
              console.log(user)
              user.myCourses.map(mycourse => {
                if (mycourse.name === course.name ) {
                  console.log(mycourse)
                  mycourse = course
                  return console.log(mycourse);
                }
              });
              Courses.findOneAndUpdate(
                {
                  cr: req.body.n
                },
                { $set: course },
                {
                  new: true
                }
              )
                .then(result => res.json(result))
                .catch(err => console.log(err));
            } else {
              new Courses(course).save().then(new_course => {
              course.courseid = new_course._id
              return console.log(course)
              user.myCourses.unshift(course);
              user.save().then(saved_user => console.log(saved_user));
                res.json(new_course);
              });
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
        Courses.findById(req.params.course_id)
          .then(course => {
            upload(req, res, err => {
              console.log(req.file);
              cloudinary.v2.uploader.upload(
                req.file.path,
                {
                  resource_type: "auto",
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
                  if (result) {
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
                      console.log(course);
                      const newVideo = {
                        duration: result.duration,
                        title: req.body.title,
                        video_url: result.secure_url
                      };
                      course.modules[0].videos.unshift(newVideo);
                    } else {
                      course.modules.unshift(upload);
                    }
                    course.save().then(new_upload => res.json(new_upload));
                  } else {
                    res.status(400).json(error);
                  }
                }
              );
            });
          })
          .catch(err => res.json({ msg: "Course does not exist" }));
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
