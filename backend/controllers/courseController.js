// const Course = require('../models/Course');

// exports.createCourse = async (req, res) => {
//   const { title, description, category, content } = req.body;

//   const course = new Course({
//     title,
//     description,
//     category,
//     instructor: req.user._id,
//     content,
//   });

//   const createdCourse = await course.save();
//   res.status(201).json(createdCourse);
// };

// exports.getCourses = async (req, res) => {
//   const courses = await Course.find({}).populate('instructor', 'name email');
//   res.json(courses);
// };

// exports.getCourseById = async (req, res) => {
//   const course = await Course.findById(req.params.id).populate('instructor', 'name email');

//   if (course) {
//     res.json(course);
//   } else {
//     res.status(404).json({ message: 'Course not found' });
//   }
// };

// exports.updateCourse = async (req, res) => {
//   const { title, description, category, content } = req.body;

//   const course = await Course.findById(req.params.id);

//   if (course) {
//     course.title = title;
//     course.description = description;
//     course.category = category;
//     course.content = content;

//     const updatedCourse = await course.save();
//     res.json(updatedCourse);
//   } else {
//     res.status(404).json({ message: 'Course not found' });
//   }
// };

// exports.deleteCourse = async (req, res) => {
//   const course = await Course.findById(req.params.id);

//   if (course) {
//     await course.remove();
//     res.json({ message: 'Course removed' });
//   } else {
//     res.status(404).json({ message: 'Course not found' });
//   }
// };

const Course = require("../models/Course");
const User = require("../models/User");

exports.createCourse = async (req, res) => {
  const { title, description, category, content } = req.body;
  console.log(req.body);

  const course = new Course({
    title,
    description,
    category,
    instructor: req.user._id,
    instructorName: req.user.name,
    content: content === "" ? {} : content,
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find({}).populate("instructor", "name email");
  res.json(courses);
};

exports.enrollCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    const user = await User.findById(req.user.id);
    if (!course.studentsEnrolled.includes(user._id)) {
      course.studentsEnrolled.push(user._id);
      await course.save();
      res.json({ message: "Enrolled successfully" });
    } else {
      res.status(400).json({ message: "Already enrolled" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};
