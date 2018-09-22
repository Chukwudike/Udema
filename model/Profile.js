const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    max: 40
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "student"
  },
  headline: {
    type: String,
    max: 60
  },
  bio: {
    type: String
  },
  image: {
    fileRef: {
      type: String
    },
    id: {
      type: String
    }
  },
  courses: [{
    name: {
      type : String
    },
    creator : {
      type : String
    },
     courseUrl: {
      type : String
    },
    courseImage : {
      type : String
    }
  }],
  cart: [{
    name: {
      type : String
    },
    creator : {
      type : String
    },
     courseUrl: {
      type : String
    },
    courseImage : {
      type : String
    }
  }],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  profileUrl : {

  },
  numOfSubscribedCourses : {
    
  } 
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
