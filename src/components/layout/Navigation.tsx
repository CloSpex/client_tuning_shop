import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { navigationItems } from "./NavigationItems";

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  const visibleItems = navigationItems.filter((item) => {
    if (item.requiresAuth && !isAuthenticated) {
      return false;
    }

    if (item.roles) {
      const userRole = user?.role;
      if (!userRole) {
        return false;
      }
      return item.roles.includes(userRole);
    }

    return true;
  });

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-sm px-6 py-4 flex justify-between items-center">
      <div className="space-x-3">
        {visibleItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`px-4 py-2 rounded-lg transition 
            ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              Welcome, <span className="font-semibold">{user?.username}</span>
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
