// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/signin");
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:5000/api/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data);
//       } catch (err) {
//         console.error("Auth error:", err.response?.data?.message || err.message);
//         alert("Session expired, please log in again.");
//         localStorage.removeItem("token");
//         navigate("/signin");
//       }
//     };

//     fetchUser();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/signin");
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       {user ? (
//         <>
//           <h2>Welcome, {user.name}</h2>
//           <p>Role: {user.role}</p>

//           {user.role === "instructor" && <p>Instructor Dashboard</p>}
//           {user.role === "student" && <p>Student Dashboard</p>}
//           {user.role === "admin" && <p>Admin Panel</p>}

//           <button onClick={handleLogout}>Logout</button>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/Dashboard.css"; // Import CSS for styling

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return navigate("/signin");

//       try {
//         const res = await axios.get("http://localhost:5000/api/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data);
//       } catch (err) {
//         alert("Session expired, please log in again.");
//         localStorage.removeItem("token");
//         navigate("/signin");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/signin");
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <h2>LMS Dashboard</h2>
//         <nav>
//           <ul>
//             <li onClick={() => navigate("/dashboard")}>🏠 Home</li>
//             <li onClick={() => navigate("/courses")}>📚 Courses</li>
//             <li onClick={() => navigate("/students")}>👨‍🎓 Students</li>
//             <li onClick={() => navigate("/profile")}>⚙️ Profile</li>
//             <li onClick={handleLogout} className="logout">🚪 Logout</li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="dashboard-content">
//         {user ? (
//           <>
//             <h1>Welcome, {user.name}!</h1>
//             <p>Role: {user.role}</p>
//           </>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/Dashboard.css";
// import { FaSun, FaMoon, FaBook, FaClipboardList, FaChartBar, FaUser, FaCog, FaComments, FaSignOutAlt, FaChalkboardTeacher } from "react-icons/fa";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return navigate("/signin");

//       try {
//         const res = await axios.get("http://localhost:5000/api/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data);
//       } catch (err) {
//         alert("Session expired, please log in again.");
//         localStorage.removeItem("token");
//         navigate("/signin");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/signin");
//   };

//   if (!user) return <h2>Loading...</h2>;

//   return (
//     <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <h2>LMS Dashboard</h2>
//         <div className="user-info">
//           <FaUser className="user-icon" />
//           <p>{user.name}</p>
//           <span>{user.role === "teacher" ? "Teacher" : "Student"}</span>
//         </div>
//         <nav>
//           <ul>
//             <li onClick={() => navigate("/dashboard")}>🏠 Home</li>
//             <li onClick={() => navigate("/courses")}><FaBook /> Courses</li>
//             <li onClick={() => navigate("/progress")}><FaChartBar /> Progress</li>
//             {user.role === "student" && (
//               <>
//                 <li onClick={() => navigate("/assignments")}><FaClipboardList /> Assignments</li>
//                 <li onClick={() => navigate("/exams")}><FaClipboardList /> Exams</li>
//               </>
//             )}
//             {user.role === "teacher" && (
//               <>
//                 <li onClick={() => navigate("/manage-courses")}><FaChalkboardTeacher /> Manage Courses</li>
//                 <li onClick={() => navigate("/grade-assignments")}><FaClipboardList /> Grade Assignments</li>
//               </>
//             )}
//             <li onClick={() => navigate("/discussions")}><FaComments /> Discussions</li>
//             <li onClick={() => navigate("/settings")}><FaCog /> Settings</li>
//             <li onClick={handleLogout} className="logout"><FaSignOutAlt /> Logout</li>
//           </ul>
//         </nav>
//         <button className="toggle-theme" onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? <FaSun /> : <FaMoon />}
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="dashboard-content">
//         <h1>Welcome, {user.name}!</h1>

//         {/* Student Dashboard Sections */}
//         {user.role === "student" && (
//           <>
//             <section className="dashboard-section">
//               <h2>📚 Course Progress</h2>
//               <p>Ongoing: Web Development</p>
//               <p>Completed: Java Basics</p>
//             </section>
//             <section className="dashboard-section">
//               <h2>📌 Assignments & Exams</h2>
//               <p>Upcoming Assignment: ReactJS Project (Due: 25th Feb)</p>
//               <p>Upcoming Exam: Data Structures (Exam Date: 1st March)</p>
//             </section>
//           </>
//         )}

//         {/* Teacher Dashboard Sections */}
//         {user.role === "teacher" && (
//           <>
//             <section className="dashboard-section">
//               <h2>📖 Manage Courses</h2>
//               <p>You have 3 courses currently active.</p>
//               <button onClick={() => navigate("/manage-courses")}>Go to Course Management</button>
//             </section>
//             <section className="dashboard-section">
//               <h2>✅ Grade Assignments</h2>
//               <p>5 assignments need grading.</p>
//               <button onClick={() => navigate("/grade-assignments")}>Go to Grading</button>
//             </section>
//           </>
//         )}

//         {/* Discussion Forum (For Both Roles) */}
//         <section className="dashboard-section">
//           <h2>💬 Discussion Forum</h2>
//           <p>Join ongoing discussions on JavaScript Best Practices.</p>
//           <button onClick={() => navigate("/discussions")}>Go to Discussions</button>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

// import React from "react";

// const Dashboard = () => {
//   return (
//     <div>
//       <h1>Welcome to Dashboard</h1>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import {
  FaSun,
  FaMoon,
  FaBook,
  FaClipboardList,
  FaChartBar,
  FaUser,
  FaCog,
  FaComments,
  FaSignOutAlt,
  FaChalkboardTeacher,
} from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/signin");

      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        alert("Session expired, please log in again.");
        localStorage.removeItem("token");
        navigate("/signin");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>LMS Dashboard</h2>
        <div className="user-info">
          <FaUser className="user-icon" />
          <p>{user.name}</p>
          <span>{user.role === "teacher" ? "Teacher" : "Student"}</span>
        </div>
        <nav>
          <ul>
            <li onClick={() => navigate("/dashboard")}>🏠 Home</li>
            <li onClick={() => navigate("/courses")}>
              <FaBook /> Courses
            </li>
            <li onClick={() => navigate("/progress")}>
              <FaChartBar /> Progress
            </li>
            {user.role === "student" && (
              <>
                <li onClick={() => navigate("/assignments")}>
                  <FaClipboardList /> Assignments
                </li>
                <li onClick={() => navigate("/exams")}>
                  <FaClipboardList /> Exams
                </li>
              </>
            )}
            {user.role === "instructor" && (
              <>
                <li onClick={() => navigate("/manage-courses")}>
                  <FaChalkboardTeacher /> Manage Courses
                </li>
                <li onClick={() => navigate("/grade-assignments")}>
                  <FaClipboardList /> Grade Assignments
                </li>
              </>
            )}
            <li onClick={() => navigate("/discussions")}>
              <FaComments /> Discussions
            </li>
            <li onClick={() => navigate("/settings")}>
              <FaCog /> Settings
            </li>
            <li onClick={handleLogout} className="logout">
              <FaSignOutAlt /> Logout
            </li>
          </ul>
        </nav>
        <button className="toggle-theme" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <h1>Welcome, {user.name}!</h1>

        {/* Student Dashboard Sections */}
        {user.role === "student" && (
          <>
            <section className="dashboard-section">
              <h2>📚 Course Progress</h2>
              <p>Ongoing: Web Development</p>
              <p>Completed: Java Basics</p>
            </section>
            <section className="dashboard-section">
              <h2>📌 Assignments & Exams</h2>
              <p>Upcoming Assignment: ReactJS Project (Due: 25th Feb)</p>
              <p>Upcoming Exam: Data Structures (Exam Date: 1st March)</p>
            </section>
          </>
        )}

        {/* Teacher Dashboard Sections */}
        {user.role === "teacher" && (
          <>
            <section className="dashboard-section">
              <h2>📖 Manage Courses</h2>
              <p>You have 3 courses currently active.</p>
              <button onClick={() => navigate("/manage-courses")}>
                Go to Course Management
              </button>
            </section>
            <section className="dashboard-section">
              <h2>✅ Grade Assignments</h2>
              <p>5 assignments need grading.</p>
              <button onClick={() => navigate("/grade-assignments")}>
                Go to Grading
              </button>
            </section>
          </>
        )}

        {/* Discussion Forum (For Both Roles) */}
        <section className="dashboard-section">
          <h2>💬 Discussion Forum</h2>
          <p>Join ongoing discussions on JavaScript Best Practices.</p>
          <button onClick={() => navigate("/discussions")}>
            Go to Discussions
          </button>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/Dashboard.css";
// import { FaSun, FaMoon, FaBook, FaClipboardList, FaChartBar, FaUser, FaCog, FaComments, FaSignOutAlt, FaChalkboardTeacher } from "react-icons/fa";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return navigate("/signin");

//       try {
//         const res = await axios.get("http://localhost:5000/api/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data);
//       } catch (err) {
//         alert("Session expired, please log in again.");
//         localStorage.removeItem("token");
//         navigate("/signin");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/signin");
//   };

//   if (!user) return <h2>Loading...</h2>;

//   return (
//     <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <h2>LMS Dashboard</h2>
//         <div className="user-info">
//           <FaUser className="user-icon" />
//           <p>{user.name}</p>
//           <span>{user.role === "teacher" ? "Teacher" : "Student"}</span>
//         </div>
//         <nav>
//           <ul>
//             <li onClick={() => navigate("/dashboard")}>🏠 Home</li>
//             <li onClick={() => navigate("/courses")}><FaBook /> Courses</li>
//             <li onClick={() => navigate("/progress")}><FaChartBar /> Progress</li>
//             {user.role === "student" && (
//               <>
//                 <li onClick={() => navigate("/assignments")}><FaClipboardList /> Assignments</li>
//                 <li onClick={() => navigate("/exams")}><FaClipboardList /> Exams</li>
//               </>
//             )}
//             {user.role === "teacher" && (
//               <>
//                 <li onClick={() => navigate("/manage-courses")}><FaChalkboardTeacher /> Manage Courses</li>
//                 <li onClick={() => navigate("/grade-assignments")}><FaClipboardList /> Grade Assignments</li>
//               </>
//             )}
//             <li onClick={() => navigate("/discussions")}><FaComments /> Discussions</li>
//             <li onClick={() => navigate("/settings")}><FaCog /> Settings</li>
//             <li onClick={handleLogout} className="logout"><FaSignOutAlt /> Logout</li>
//           </ul>
//         </nav>
//         <button className="toggle-theme" onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? <FaSun /> : <FaMoon />}
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="dashboard-content">
//         <h1>Welcome, {user.name}!</h1>

//         {/* Student Dashboard Sections */}
//         {user.role === "student" && (
//           <>
//             <section className="dashboard-section">
//               <h2>📚 Course Progress</h2>
//               <p>Ongoing: Web Development</p>
//               <p>Completed: Java Basics</p>
//             </section>
//             <section className="dashboard-section">
//               <h2>📌 Assignments & Exams</h2>
//               <p>Upcoming Assignment: ReactJS Project (Due: 25th Feb)</p>
//               <p>Upcoming Exam: Data Structures (Exam Date: 1st March)</p>
//             </section>
//           </>
//         )}

//         {/* Teacher Dashboard Sections */}
//         {user.role === "teacher" && (
//           <>
//             <section className="dashboard-section">
//               <h2>📖 Manage Courses</h2>
//               <p>You have 3 courses currently active.</p>
//               <button onClick={() => navigate("/manage-courses")}>Go to Course Management</button>
//             </section>
//             <section className="dashboard-section">
//               <h2>✅ Grade Assignments</h2>
//               <p>5 assignments need grading.</p>
//               <button onClick={() => navigate("/grade-assignments")}>Go to Grading</button>
//             </section>
//           </>
//         )}

//         {/* Discussion Forum (For Both Roles) */}
//         <section className="dashboard-section">
//           <h2>💬 Discussion Forum</h2>
//           <p>Join ongoing discussions on JavaScript Best Practices.</p>
//           <button onClick={() => navigate("/discussions")}>Go to Discussions</button>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
