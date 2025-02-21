import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
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
  FaHome,
} from "react-icons/fa";

const Dashboard = () => {
  const { user } = useOutletContext();
  return (
    <div className={`dashboard-container`}>
      {/* Main Content */}
      <main className="dashboard-content">
        <h1>Welcome, {user.name}!</h1>
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
