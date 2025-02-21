import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import {
  FaUser,
  FaHome,
  FaBook,
  FaChartBar,
  FaClipboardList,
  FaChalkboardTeacher,
  FaComments,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar({ user, handleLogout }) {
  return (
    <aside className="sidebar">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src="/icon.png" alt="Learnit Logo" style={{ width: "40px" }} />
        <h2 style={{ marginTop: "15px" }}> LMS Dashboard</h2>
      </div>

      <div className="user-info">
        <FaUser className="user-icon" />
        <div>
          <p>{user?.name}</p>
          <span>{user?.role === "instructor" ? "Instructor" : "Student"}</span>
        </div>
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/courses">
              <FaBook /> Courses
            </Link>
          </li>
          <li>
            <Link to="/progress">
              <FaChartBar /> Progress
            </Link>
          </li>

          {user?.role === "student" && (
            <>
              <li>
                <Link to="/assignments">
                  <FaClipboardList /> Assignments
                </Link>
              </li>
              <li>
                <Link to="/exams">
                  <FaClipboardList /> Exams
                </Link>
              </li>
            </>
          )}

          {user?.role === "instructor" && (
            <>
              <li>
                <Link to="/manage-courses">
                  <FaChalkboardTeacher /> Manage Courses
                </Link>
              </li>
              <li>
                <Link to="/grade-assignments">
                  <FaClipboardList /> Grade Assignments
                </Link>
              </li>
            </>
          )}

          <li>
            <Link to="/discussions">
              <FaComments /> Discussions
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FaCog /> Settings
            </Link>
          </li>
          <li className="logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </nav>
    </aside>
  );
}
