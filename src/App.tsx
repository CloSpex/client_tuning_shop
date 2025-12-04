import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Users from "./pages/admin/Users";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/404";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OrdersPage from "./pages/users/OrdersPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  return <AuthProvider navigate={navigate}>{children}</AuthProvider>;
};
const App: React.FC = () => {
  return (
    <Router>
      <AuthWrapper>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/users"
              element={
                <ProtectedRoute requiredRole="Admin">
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute requiredRole="User">
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute requiredRole="Admin">
                  <AdminOrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute requiredRole="Admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </AuthWrapper>
    </Router>
  );
};

export default App;
