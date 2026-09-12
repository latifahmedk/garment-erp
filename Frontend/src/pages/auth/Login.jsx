// src/pages/auth/Login.jsx

import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { COLORS } from "../../utils/colors";
import { loginUser } from "./AuthService";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser({
        username: formData.username,
        password: formData.password,
      });

      login({
    access: response.access,
    refresh: response.refresh,
    user: response.user,
});

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      if (error.response?.data?.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("Invalid Username or Password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.background,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="row"
        style={{
          width: "100%",
          maxWidth: 1100,
          minHeight: 600,
          borderRadius: 25,
          overflow: "hidden",
          background: COLORS.card,
          boxShadow: "0 20px 60px rgba(0,0,0,.45)",
        }}
      >
        {/* LEFT */}

        <div
          className="col-lg-6 d-none d-lg-flex"
          style={{
            background:
              "linear-gradient(135deg,#800020,#2d0b0b)",
            color: "white",
            flexDirection: "column",
            justifyContent: "center",
            padding: 60,
          }}
        >
          <h1
            style={{
              fontWeight: "bold",
              marginBottom: 25,
            }}
          >
            MA GARMENTS ERP
          </h1>

          <p
            style={{
              color: "#ddd",
              fontSize: 18,
              lineHeight: 1.7,
            }}
          >
            Garments Manufacturing ERP System
          </p>

          <div
            style={{
              marginTop: 40,
              lineHeight: 2.2,
              fontSize: 18,
            }}
          >
            <div>✓ Inventory Management</div>
            <div>✓ Manufacturing</div>
            <div>✓ Sales Management</div>
            <div>✓ Purchase Management</div>
            <div>✓ Reports & Analytics</div>
          </div>
        </div>

        {/* RIGHT */}

        <div
          className="col-lg-6"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 50,
          }}
        >
          <form
            onSubmit={handleLogin}
            style={{
              width: "100%",
              maxWidth: 400,
            }}
          >
            <h2
              style={{
                color: "white",
                marginBottom: 10,
                fontWeight: "bold",
              }}
            >
              Welcome Back
            </h2>

            <p
              style={{
                color: COLORS.textSecondary,
                marginBottom: 35,
              }}
            >
              Login to continue
            </p>

            <div className="mb-4">
              <label className="text-white mb-2">
                Username
              </label>

              <input
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
              />
            </div>

            <div className="mb-4 position-relative">
              <label className="text-white mb-2">
                Password
              </label>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
              />

              <i
                className={
                  showPassword
                    ? "bi bi-eye-slash"
                    : "bi bi-eye"
                }
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                style={{
                  position: "absolute",
                  right: 18,
                  top: 46,
                  color: "#999",
                  cursor: "pointer",
                }}
              />
            </div>

            <button
              className="btn mt-2"
              disabled={loading}
              style={{
                width: "100%",
                height: 52,
                background: COLORS.primary,
                color: "white",
                borderRadius: 12,
                fontWeight: "bold",
              }}
            >
              {loading
                ? "Signing In..."
                : "Login"}
            </button>

            <p
              className="text-center mt-4"
              style={{
                color: COLORS.textSecondary,
              }}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: COLORS.primary,
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;