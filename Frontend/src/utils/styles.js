import { COLORS } from "./colors";

export const layoutStyle = {
    minHeight: "100vh",
    background: COLORS.background,
};

export const pageStyle = {
    padding: "30px",
};

export const cardStyle = {
    background: COLORS.card,
    borderRadius: "18px",
    border: `1px solid ${COLORS.border}`,
    boxShadow: "0 10px 25px rgba(0,0,0,.25)",
};

export const inputStyle = {
    height: "48px",
    background: COLORS.inputBackground,
    border: `1px solid ${COLORS.inputBorder}`,
    color: COLORS.text,
    borderRadius: "10px",
};

export const buttonStyle = {
    background: COLORS.primary,
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 20px",
    fontWeight: "600",
};

export const tableStyle = {
    background: COLORS.card,
    borderRadius: "15px",
    overflow: "hidden",
};