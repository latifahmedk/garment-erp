/**
 * Extracts a user-friendly error message from an axios error or backend response.
 * Handles DRF format { detail: "..." }, { field_name: ["..."] }, { non_field_errors: [...] }, etc.
 */
export const getErrorMessage = (error, defaultMsg = "Something went wrong.") => {
    if (!error) return defaultMsg;
    if (typeof error === "string") return error;

    if (error.response?.data) {
        const data = error.response.data;

        if (typeof data === "string") return data;

        if (data.detail && typeof data.detail === "string") {
            return data.detail;
        }

        if (data.message && typeof data.message === "string") {
            return data.message;
        }

        if (data.name) {
            if (Array.isArray(data.name) && data.name.length > 0) {
                return data.name[0];
            }
            if (typeof data.name === "string") return data.name;
        }

        if (data.non_field_errors) {
            if (Array.isArray(data.non_field_errors) && data.non_field_errors.length > 0) {
                return data.non_field_errors[0];
            }
            if (typeof data.non_field_errors === "string") return data.non_field_errors;
        }

        // Grab first field error if available
        if (typeof data === "object") {
            const keys = Object.keys(data);
            if (keys.length > 0) {
                const val = data[keys[0]];
                if (Array.isArray(val) && val.length > 0) {
                    return `${keys[0]}: ${val[0]}`;
                }
                if (typeof val === "string") {
                    return `${keys[0]}: ${val}`;
                }
            }
        }
    }

    return error.message || defaultMsg;
};
