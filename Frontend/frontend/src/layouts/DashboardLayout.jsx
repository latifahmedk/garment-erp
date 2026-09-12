import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { COLORS } from "../utils/colors";

function DashboardLayout({ children }) {
    return (
        <div
            style={{
                background: COLORS.background,
                minHeight: "100vh",
            }}
        >
            <Sidebar />

            <div
                style={{
                    marginLeft: 270,
                }}
            >
                <Navbar />

                <div
                    style={{
                        padding: 30,
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;