import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://studenthub-dvdp.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Signup failed ❌"
        );
        return;
      }

      setMessage(
        "Account created successfully! ✅"
      );

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.log("SIGNUP ERROR:", error);

      setMessage(
        "Backend connection failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-box">

        <div className="signup-logo">
          🎓
        </div>

        <h1>Create Account</h1>

        <p>
          Join StudentHub today
        </p>

        <form onSubmit={handleSignup}>

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

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

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            minLength="6"
          />

          <label>Register as</label>

          <div className="role-options">

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

          {message && (
            <p className="signup-message">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="signup-submit"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create Account →"}
          </button>

        </form>

        <p className="login-text">
          Already have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>

      </div>

    </div>
  );
}

export default Signup;