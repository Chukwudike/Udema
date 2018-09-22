const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  creator: {
    type: String
  },
  ratings: {
    type: [Number]
  },
  avrRating: {
    type: Number
  },
  courseImage: {
    type: String
  },
  courseUrl: {
    type: String
  },
  price: {
    type: String
  },
  numOfPurchase: {
    type: String
  },
  courseStatus: {
    type : Boolean,
    default: false
  },
  modules: [
    {
      title_module: {
        type: String
      },
      videos: [
        {
          duration: {
            type: String
          },
          title: {
            type: String
          },
          video_url: {
            type: String
          }
        }
      ]
    }
  ]
});

module.exports = mongoose.model("courses", CourseSchema);
