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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for that field when user types
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: "",
      });
    }
    if (generalError) setGeneralError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setFieldErrors({});

    const errors = {};
    if (!formData.username.trim()) errors.username = "Username is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (!formData.password) errors.password = "Password is required.";
    else if (formData.password.length < 8) errors.password = "Password must be at least 8 characters.";

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setGeneralError("Please fix the highlighted errors below.");
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        username: formData.username.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone_number.trim(),
        password: formData.password,
      });

      toast.success("Registration Successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      if (error.response?.data) {
        const respData = error.response.data;
        const mappedErrors = {};

        if (typeof respData === "object" && !Array.isArray(respData)) {
          Object.keys(respData).forEach((key) => {
            const msg = Array.isArray(respData[key])
              ? respData[key].join(" ")
              : String(respData[key]);
            mappedErrors[key] = msg;
            toast.error(`${key}: ${msg}`);
          });
          setFieldErrors(mappedErrors);
          setGeneralError("Registration failed. Please check the details.");
        } else {
          const msg = String(respData.detail || respData);
          setGeneralError(msg);
          toast.error(msg);
        }
      } else {
        const msg = "Unable to connect to the server. Please ensure Django is running.";
        setGeneralError(msg);
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (hasError) => ({
    background: COLORS.inputBackground,
    color: COLORS.text,
    border: `1px solid ${hasError ? COLORS.danger : COLORS.border}`,
    height: 46,
    borderRadius: 8,
  });

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
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="row g-0"
        style={{
          width: "100%",
          maxWidth: 1100,
          minHeight: 650,
          overflow: "hidden",
          borderRadius: 20,
          background: COLORS.card,
          boxShadow: "0 20px 60px rgba(0,0,0,.45)",
          border: `1px solid ${COLORS.border}`,
        }}
      >
        {/* LEFT BRAND PANEL */}
        <div
          className="col-lg-5 d-none d-lg-flex"
          style={{
            background: "linear-gradient(135deg,#800020,#2d0b0b)",
            color: "#fff",
            flexDirection: "column",
            justifyContent: "center",
            padding: 50,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              marginBottom: 20,
            }}
          >
            <i className="bi bi-scissors" />
          </div>

          <h2 style={{ fontWeight: 700, marginBottom: 15 }}>GARMENTS ERP</h2>
          <p style={{ color: "#ddd", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Comprehensive ERP suite for garment production, order management, and multi-tier inventory.
          </p>

          <div style={{ marginTop: 35, display: "flex", flexDirection: "column", gap: 12, fontSize: "0.9rem" }}>
            <div><i className="bi bi-check-circle-fill text-success me-2" /> Live Inventory Tracking</div>
            <div><i className="bi bi-check-circle-fill text-success me-2" /> Manufacturing & Job Orders</div>
            <div><i className="bi bi-check-circle-fill text-success me-2" /> Purchase & Sales Invoicing</div>
            <div><i className="bi bi-check-circle-fill text-success me-2" /> Financial Ledger & Balances</div>
          </div>
        </div>

        {/* RIGHT REGISTRATION FORM */}
        <div
          className="col-lg-7 d-flex align-items-center justify-content-center"
          style={{ padding: "40px 30px" }}
        >
          <form
            onSubmit={handleRegister}
            style={{ width: "100%", maxWidth: 440 }}
            noValidate
          >
            <h3 style={{ color: COLORS.text, fontWeight: 700, marginBottom: 4 }}>
              Create Account
            </h3>
            <p style={{ color: COLORS.textSecondary, fontSize: "0.88rem", marginBottom: 25 }}>
              Enter your details to register as a new user
            </p>

            {generalError && (
              <div
                className="alert alert-danger py-2 px-3 mb-3 d-flex align-items-center"
                style={{ fontSize: "0.85rem", borderRadius: 8 }}
              >
                <i className="bi bi-exclamation-triangle-fill me-2" />
                <span>{generalError}</span>
              </div>
            )}

            {/* Username */}
            <div className="mb-3">
              <label className="form-label mb-1" style={{ color: COLORS.text, fontSize: "0.85rem" }}>
                Username *
              </label>
              <input
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a unique username"
                style={inputStyle(!!fieldErrors.username)}
              />
              {fieldErrors.username && (
                <small className="text-danger d-block mt-1">{fieldErrors.username}</small>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label mb-1" style={{ color: COLORS.text, fontSize: "0.85rem" }}>
                Email *
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                style={inputStyle(!!fieldErrors.email)}
              />
              {fieldErrors.email && (
                <small className="text-danger d-block mt-1">{fieldErrors.email}</small>
              )}
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label className="form-label mb-1" style={{ color: COLORS.text, fontSize: "0.85rem" }}>
                Phone Number
              </label>
              <input
                className="form-control"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Optional mobile number"
                style={inputStyle(!!fieldErrors.phone_number)}
              />
              {fieldErrors.phone_number && (
                <small className="text-danger d-block mt-1">{fieldErrors.phone_number}</small>
              )}
            </div>

            {/* Password */}
            <div className="mb-3 position-relative">
              <label className="form-label mb-1" style={{ color: COLORS.text, fontSize: "0.85rem" }}>
                Password (min 8 characters) *
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control pe-5"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  style={inputStyle(!!fieldErrors.password)}
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted text-decoration-none pe-3"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"} />
                </button>
              </div>
              {fieldErrors.password && (
                <small className="text-danger d-block mt-1">{fieldErrors.password}</small>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4 position-relative">
              <label className="form-label mb-1" style={{ color: COLORS.text, fontSize: "0.85rem" }}>
                Confirm Password *
              </label>
              <div className="position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control pe-5"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  style={inputStyle(!!fieldErrors.confirmPassword)}
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted text-decoration-none pe-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  <i className={showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"} />
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <small className="text-danger d-block mt-1">{fieldErrors.confirmPassword}</small>
              )}
            </div>

            {/* Submit Button */}
            <button
              className="btn w-100"
              type="submit"
              disabled={loading}
              style={{
                height: 48,
                background: COLORS.primary,
                color: "#fff",
                fontWeight: 600,
                borderRadius: 10,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                  <span>Registering...</span>
                </>
              ) : (
                <span>Register</span>
              )}
            </button>

            <p className="text-center mt-4 mb-0" style={{ color: COLORS.textSecondary, fontSize: "0.88rem" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: COLORS.primary,
                  textDecoration: "none",
                  fontWeight: 600,
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