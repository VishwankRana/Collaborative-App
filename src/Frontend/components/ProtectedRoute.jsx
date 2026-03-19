import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../auth/useAuth.jsx";

export default function ProtectedRoute() {
  const { authLoading, isAuthenticated } = useAuth();

  if (authLoading) {
    return <div className="auth-shell">Checking your session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
