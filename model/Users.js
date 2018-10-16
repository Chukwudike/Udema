const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  // profileid: {
  //   type: Schema.Types.ObjectId,
  //   ref: "profiles"
  // },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase:true
  },
  password: {
    type: String,
    required: true
  },
  role : {
    type : String,
    default : 'student'
  },
  date: {
    type: Date,
    default: Date.now
  },
  myCourses : [{
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
  courses: [{
    courseid : {
      type: Schema.Types.ObjectId,
      ref: "courses"
    },
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

});

module.exports = User = mongoose.model('users', UserSchema);
