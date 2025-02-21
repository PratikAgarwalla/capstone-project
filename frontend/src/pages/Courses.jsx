import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaEdit,
  FaStar,
  FaPlus,
  FaCheckCircle,
  FaEye,
} from "react-icons/fa";
import "../styles/Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/signin");
      try {
        const res = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        alert("Session expired, please log in again.");
        localStorage.removeItem("token");
        navigate("/signin");
      }
    };

    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchUser();
    fetchCourses();
  }, [navigate]);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/courses",
        { title, description, category, content },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCourses([...courses, res.data]);
      setShowModal(false);
      setTitle("");
      setDescription("");
      setCategory("");
      setContent("");
    } catch (err) {
      console.error("Error creating course:", err);
    }
  };

  return (
    <div className="courses-container">
      <h1 className="heading">Courses</h1>
      {user && user.role === "instructor" && (
        <button
          className="create-course-btn"
          onClick={() => setShowModal(true)}
        >
          <FaPlus /> Create Course
        </button>
      )}
      <div className="courses-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="course-card">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <p className="category">Category: {course.category}</p>
              <p className="instructor">Instructor: {course.instructorName}</p>
              <div className="course-actions">
                {user && user.role === "instructor" ? (
                  <>
                    <FaEdit className="icon edit" title="Edit Course" />
                    <FaTrash className="icon delete" title="Delete Course" />
                    <FaEye className="icon preview" title="Preview Course" />
                  </>
                ) : (
                  <>
                    <FaEye className="icon preview" title="Preview Course" />
                    <FaCheckCircle
                      className="icon enroll"
                      title="Enroll in Course"
                    />
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-courses">
            No courses available. Please check back later.
          </p>
        )}
      </div>

      {/* Modal for Creating Course */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modalx">
            <h2>Create a New Course</h2>
            <form onSubmit={handleCreateCourse}>
              <label className="modal-form-label">
                Title <span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label className="modal-form-label">
                Description <span className="required">*</span>
              </label>
              <textarea
                placeholder="Enter course description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <label className="modal-form-label">
                Category <span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter course category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />

              <label className="modal-form-label">Content URL</label>
              <input
                type="text"
                placeholder="Enter content URL (optional)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <button type="submit" className="modal-btn create">
                Create
              </button>
              <button
                type="button"
                className="modal-btn cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
