// src/components/Pagination.jsx

import { COLORS } from "../utils/colors";

function Pagination({ currentPage = 1, totalCount = 0, pageSize = 10, onPageChange }) {
    const totalPages = Math.ceil(totalCount / pageSize) || 1;

    if (totalPages <= 1) return null;

    return (
        <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-secondary flex-wrap gap-2">
            <small style={{ color: COLORS.textSecondary }}>
                Showing page {currentPage} of {totalPages} ({totalCount} total)
            </small>

            <div className="btn-group">
                <button
                    className="btn btn-sm btn-outline-secondary"
                    disabled={currentPage <= 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <i className="bi bi-chevron-left me-1" /> Prev
                </button>

                <button
                    className="btn btn-sm btn-secondary active"
                    style={{ background: COLORS.primary, borderColor: COLORS.primary }}
                >
                    {currentPage}
                </button>

                <button
                    className="btn btn-sm btn-outline-secondary"
                    disabled={currentPage >= totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next <i className="bi bi-chevron-right ms-1" />
                </button>
            </div>
        </div>
    );
}

export default Pagination;
