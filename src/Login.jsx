import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed ❌");
        return;
      }

      // Save complete user information
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Save user role for protected routes
      localStorage.setItem(
        "role",
        data.user.role
      );

      // Redirect based on actual role
      if (data.user.role === "student") {
        navigate("/dashboard");
      } else if (data.user.role === "faculty") {
        navigate("/faculty/dashboard");
      } else {
        setMessage("Invalid user role ❌");
      }

    } catch (error) {
      console.log("LOGIN ERROR:", error);

      setMessage(
        "Backend connection failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-box">

        <div className="login-logo">
          🎓
        </div>

        <h1>Welcome Back!</h1>

        <p>
          Login to your StudentHub account
        </p>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          {/* PASSWORD */}

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {/* ROLE */}

          <div className="user-type">

            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              />

              Student
            </label>

            <label>
              <input
                type="radio"
                name="role"
                value="faculty"
                checked={role === "faculty"}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              />

              Faculty
            </label>

          </div>

          {/* MESSAGE */}

          {message && (
            <p className="login-message">
              {message}
            </p>
          )}

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login →"}
          </button>

        </form>

        {/* SIGN UP */}

        <p className="signup-text">
          Don't have an account?{" "}

          <span
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer" }}
          >
            Sign Up
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;