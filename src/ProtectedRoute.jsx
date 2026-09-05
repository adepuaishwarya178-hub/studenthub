import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const savedUser = localStorage.getItem("user");

  // No user logged in
  if (!savedUser) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(savedUser);

    // Check role
    if (role && user.role !== role) {
      if (user.role === "student") {
        return <Navigate to="/dashboard" replace />;
      }

      if (user.role === "faculty") {
        return <Navigate to="/faculty/dashboard" replace />;
      }

      return <Navigate to="/login" replace />;
    }

    return children;

  } catch (error) {
    console.log("Invalid user data:", error);

    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;