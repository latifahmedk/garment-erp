// src/components/SearchBar.jsx

import { COLORS } from "../utils/colors";

function SearchBar({ value, onChange, placeholder = "Search..." }) {
    return (
        <div className="input-group">
            <span
                className="input-group-text"
                style={{
                    background: COLORS.inputBackground,
                    border: `1px solid ${COLORS.border}`,
                    borderRight: "none",
                    color: COLORS.textSecondary,
                }}
            >
                <i className="bi bi-search" />
            </span>
            <input
                type="text"
                className="form-control"
                style={{
                    background: COLORS.inputBackground,
                    border: `1px solid ${COLORS.border}`,
                    borderLeft: "none",
                    color: COLORS.text,
                }}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;
