import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  return (
    <div className="w-64 h-full bg-gray-900 text-white p-5">
      <h2 className="text-lg font-semibold mb-4">{role.toUpperCase()} MENU</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/dashboard" className="block p-2 bg-gray-700 rounded">
            Dashboard
          </Link>
        </li>
        {role === "instructor" ? (
          <>
            <li>
              <Link
                to="/manage-courses"
                className="block p-2 bg-gray-700 rounded"
              >
                Manage Courses
              </Link>
            </li>
            <li>
              <Link
                to="/students-list"
                className="block p-2 bg-gray-700 rounded"
              >
                Students List
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/my-courses" className="block p-2 bg-gray-700 rounded">
                My Courses
              </Link>
            </li>
            <li>
              <Link to="/assignments" className="block p-2 bg-gray-700 rounded">
                Assignments
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
