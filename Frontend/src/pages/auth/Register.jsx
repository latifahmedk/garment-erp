// src/pages/auth/Register.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { COLORS } from "../../utils/colors";
import { registerUser } from "./AuthService";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.phone_number ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        username: formData.username,
        email: formData.email,
        phone_number: formData.phone_number,
        password: formData.password,
      });

      toast.success(
        "Registration Successful. Please Login."
      );

      navigate("/login");
    } catch (error) {
      if (error.response?.data) {
        const errors =
          error.response.data;

        Object.keys(errors).forEach(
          (key) => {
            toast.error(
              `${key}: ${errors[key]}`
            );
          }
        );
      } else {
        toast.error(
          "Registration Failed."
        );
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
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.4,
        }}
        className="row"
        style={{
          width: "100%",
          maxWidth: 1150,
          minHeight: 680,
          overflow: "hidden",
          borderRadius: 25,
          background: COLORS.card,
          boxShadow:
            "0 20px 60px rgba(0,0,0,.45)",
        }}
      >
        {/* LEFT */}

        <div
          className="col-lg-6 d-none d-lg-flex"
          style={{
            background:
              "linear-gradient(135deg,#800020,#2d0b0b)",
            color: "#fff",
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
            Create your ERP account and
            start managing your garments
            business efficiently.
          </p>

          <div
            style={{
              marginTop: 45,
              lineHeight: 2.1,
              fontSize: 18,
            }}
          >
            <div>
              ✓ Inventory Management
            </div>

            <div>
              ✓ Manufacturing
            </div>

            <div>
              ✓ Sales Management
            </div>

            <div>
              ✓ Purchase Management
            </div>

            <div>
              ✓ Reports & Analytics
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div
          className="col-lg-6 d-flex align-items-center justify-content-center"
          style={{
            padding: 45,
          }}
        >
          <form
            onSubmit={
              handleRegister
            }
            style={{
              width: "100%",
              maxWidth: 430,
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Create Account
            </h2>

            <p
              style={{
                color:
                  COLORS.textSecondary,
                marginBottom: 30,
              }}
            >
              Register to continue
            </p>

            <div className="mb-3">
              <label
                className="text-white mb-2"
              >
                Username
              </label>

              <input
                className="form-control"
                name="username"
                value={
                  formData.username
                }
                onChange={
                  handleChange
                }
                placeholder="Enter username"
              />
            </div>

            <div className="mb-3">
              <label
                className="text-white mb-2"
              >
                Email
              </label>

              <input
                className="form-control"
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                placeholder="Enter email"
              />
            </div>

            <div className="mb-3">
              <label
                className="text-white mb-2"
              >
                Phone Number
              </label>

              <input
                className="form-control"
                name="phone_number"
                value={
                  formData.phone_number
                }
                onChange={
                  handleChange
                }
                placeholder="Enter phone number"
              />
            </div>

            <div className="mb-3 position-relative">
              <label
                className="text-white mb-2"
              >
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
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                placeholder="Password"
              />

              <i
                className={
                  showPassword
                    ? "bi bi-eye-slash"
                    : "bi bi-eye"
                }
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                style={{
                  position:
                    "absolute",
                  right: 15,
                  top: 45,
                  cursor: "pointer",
                  color: "#999",
                }}
              />
            </div>

            <div className="mb-4 position-relative">
              <label
                className="text-white mb-2"
              >
                Confirm Password
              </label>

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                className="form-control"
                name="confirmPassword"
                value={
                  formData.confirmPassword
                }
                onChange={
                  handleChange
                }
                placeholder="Confirm password"
              />

              <i
                className={
                  showConfirmPassword
                    ? "bi bi-eye-slash"
                    : "bi bi-eye"
                }
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                style={{
                  position:
                    "absolute",
                  right: 15,
                  top: 45,
                  cursor: "pointer",
                  color: "#999",
                }}
              />
            </div>

            <button
              className="btn"
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                height: 52,
                background:
                  COLORS.primary,
                color: "#fff",
                fontWeight: "bold",
                borderRadius: 12,
              }}
            >
              {loading
                ? "Creating..."
                : "Register"}
            </button>

            <p
              className="text-center mt-4"
              style={{
                color:
                  COLORS.textSecondary,
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color:
                    COLORS.primary,
                  textDecoration:
                    "none",
                  fontWeight:
                    "bold",
                }}
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;