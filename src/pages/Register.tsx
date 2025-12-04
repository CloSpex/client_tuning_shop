import React, { useState } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import type { LoginDto } from "../types/auth.types";
import type { CreateUserDto } from "../types/user.types";
import { UserService } from "../services/userService";

const Register: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const location = useLocation();

  const [credentials, setCredentials] = useState<CreateUserDto>({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    const from = (location.state as any)?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const registrationResult = await UserService.createUser(credentials);

      if (!registrationResult.success) {
        setError(
          registrationResult.message || "Registration failed. Please try again."
        );
        return;
      }

      const loginDto: LoginDto = {
        username: credentials.username,
        password: credentials.password,
      };
      await login(loginDto);
    } catch (err: any) {
      let errorMessage = "An unexpected error occurred during registration.";
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8">
      <h2 className="text-2xl dark:text-gray-300 font-bold text-center mb-6">
        Register Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 bg-gray-50 dark:text-black-300"
            disabled={isSubmitting}
            required
            autoComplete="username"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 bg-gray-50 dark:text-black-300"
            disabled={isSubmitting}
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 bg-gray-50 dark:text-black-300"
            disabled={isSubmitting}
            required
            autoComplete="new-password"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm p-2 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg text-white transition
            ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm dark:text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
