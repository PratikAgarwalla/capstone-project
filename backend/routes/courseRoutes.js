// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");
// const Course = require("../models/Course"); // Ensure this model exists

// // ✅ Get all courses
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     console.log("Fetching courses for user:", req.user.id, "Role:", req.user.role);
//     let courses;
//     if (req.user.role === "instructor") {
//       courses = await Course.find({ instructor: req.user.id });
//     } else {
//       courses = await Course.find({ studentsEnrolled: req.user.id });
//     }
//     res.json(courses);
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// });

// module.exports = router;

const express = require("express");
const {
  createCourse,
  getCourses,
  enrollCourse,
} = require("../controllers/courseController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, createCourse)
  .get(authMiddleware, getCourses);
router.route("/:id/enroll").post(authMiddleware, enrollCourse);

module.exports = router;
