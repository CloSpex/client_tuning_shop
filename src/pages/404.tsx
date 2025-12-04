import React from "react";
import { useNavigate } from "react-router-dom";
const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-10 text-center">
      <h1 className="text-5xl dark:text-gray-300 font-extrabold mb-4">
        Page Not found
      </h1>
      <button
        onClick={() => navigate("/")}
        className="mt-5 px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition text-3xl"
      >
        Home
      </button>
      .
    </div>
  );
};

export default NotFound;
