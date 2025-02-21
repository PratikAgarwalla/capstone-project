import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
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
      setTitle("");
      setDescription("");
      setCategory("");
      setContent("");
    } catch (err) {
      console.error("Error creating course:", err);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/enroll`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Enrolled successfully");
    } catch (err) {
      console.error("Error enrolling in course:", err);
      alert("Error enrolling in course");
    }
  };

  return (
    <div className="courses-container">
      <h1>Courses</h1>
      {user && user.role === "instructor" && (
        <form onSubmit={handleCreateCourse} className="create-course-form">
          <h2>Create a New Course</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Content URL"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Create Course</button>
        </form>
      )}
      <div className="courses-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="course-card">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <p>Category: {course.category}</p>
              <p>Instructor: {course.instructorName}</p>
              {user && user.role === "student" && (
                <button onClick={() => handleEnroll(course._id)}>Enroll</button>
              )}
            </div>
          ))
        ) : (
          <p>No courses available. Please check back later.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
