// src/components/Loader.jsx

import { COLORS } from "../utils/colors";

function Loader({ text = "Loading..." }) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
            <div
                className="spinner-border"
                role="status"
                style={{ color: COLORS.primary }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
            {text && <small className="mt-2 text-muted">{text}</small>}
        </div>
    );
}

export default Loader;
