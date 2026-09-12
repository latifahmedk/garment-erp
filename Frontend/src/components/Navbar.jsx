// src/components/Navbar.jsx

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../utils/colors";

function Navbar() {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const username = user?.username || "Admin";
    const role = user?.role || "Administrator";
    const initial = username.charAt(0).toUpperCase();

    return (
        <div
            style={{
                height: 70,
                background: COLORS.navbar,
                borderBottom: `1px solid ${COLORS.border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 30px",
                position: "sticky",
                top: 0,
                zIndex: 100,
            }}
        >
            <div>
                <h5
                    style={{
                        color: COLORS.text,
                        margin: 0,
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                    }}
                >
                    Garments ERP
                </h5>
                <small
                    style={{
                        color: COLORS.textSecondary,
                        fontSize: "0.8rem",
                    }}
                >
                    Welcome back, {username}
                </small>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    <div
                        style={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            background: COLORS.primary,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1rem",
                        }}
                    >
                        {initial}
                    </div>

                    <div className="d-none d-sm-block">
                        <div
                            style={{
                                color: COLORS.text,
                                fontWeight: 600,
                                fontSize: "0.88rem",
                                lineHeight: 1.2,
                            }}
                        >
                            {username}
                        </div>
                        <small
                            style={{
                                color: COLORS.textSecondary,
                                fontSize: "0.75rem",
                            }}
                        >
                            {role}
                        </small>
                    </div>
                </div>

                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={handleLogout}
                    title="Sign Out"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        borderRadius: 8,
                        padding: "6px 12px",
                    }}
                >
                    <i className="bi bi-box-arrow-right" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}

export default Navbar;