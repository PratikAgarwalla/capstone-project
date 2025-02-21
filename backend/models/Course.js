// const mongoose = require("mongoose");

// const CourseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   category: { type: String, enum: ["HTML", "CSS", "JavaScript", "React"], required: true },
// });

// module.exports = mongoose.model("Course", CourseSchema);

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Development", "Programming", "Design", "Marketing"],
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
  content: {
    type: [
      {
        ContentType: {
          type: String,
          enum: ["video", "pdf", "note"],
        },
        url: { type: String },
      },
    ],
    default: [],
  },
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
