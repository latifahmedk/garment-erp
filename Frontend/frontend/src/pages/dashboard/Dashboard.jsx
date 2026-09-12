import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StatCard";
import { COLORS } from "../../utils/colors";

function Dashboard() {
    return (
        <DashboardLayout>
            <div className="container-fluid">

                <div className="row g-4">

                    <div className="col-xl-3 col-md-6">
                        <StatCard
                            title="Total Sales"
                            value="$58,400"
                            icon="bi-currency-dollar"
                            color="#198754"
                        />
                    </div>

                    <div className="col-xl-3 col-md-6">
                        <StatCard
                            title="Customers"
                            value="154"
                            icon="bi-people"
                            color="#0DCAF0"
                        />
                    </div>

                    <div className="col-xl-3 col-md-6">
                        <StatCard
                            title="Products"
                            value="82"
                            icon="bi-box-seam"
                            color="#FD7E14"
                        />
                    </div>

                    <div className="col-xl-3 col-md-6">
                        <StatCard
                            title="Inventory Value"
                            value="$96,250"
                            icon="bi-boxes"
                            color="#6F42C1"
                        />
                    </div>

                </div>

                <div className="row mt-4">

                    <div className="col-lg-8">

                        <div
                            style={{
                                background: COLORS.card,
                                borderRadius: 18,
                                border: `1px solid ${COLORS.border}`,
                                minHeight: 350,
                                padding: 20,
                            }}
                        >
                            <h5
                                style={{
                                    color: COLORS.text,
                                }}
                            >
                                Sales Overview
                            </h5>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: 260,
                                    color: COLORS.textSecondary,
                                }}
                            >
                                Chart will be added here
                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4">

                        <div
                            style={{
                                background: COLORS.card,
                                borderRadius: 18,
                                border: `1px solid ${COLORS.border}`,
                                minHeight: 350,
                                padding: 20,
                            }}
                        >
                            <h5
                                style={{
                                    color: COLORS.text,
                                }}
                            >
                                Low Stock Products
                            </h5>

                            <table className="table table-dark table-borderless mt-4">

                                <thead>

                                    <tr>

                                        <th>Product</th>

                                        <th>Stock</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    <tr>

                                        <td>Track Pant</td>

                                        <td>5</td>

                                    </tr>

                                    <tr>

                                        <td>Sports Shorts</td>

                                        <td>8</td>

                                    </tr>

                                    <tr>

                                        <td>Gym Lower</td>

                                        <td>3</td>

                                    </tr>

                                    <tr>

                                        <td>Dry Fit T-Shirt</td>

                                        <td>6</td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

                <div className="row mt-4">

                    <div className="col-lg-12">

                        <div
                            style={{
                                background: COLORS.card,
                                borderRadius: 18,
                                border: `1px solid ${COLORS.border}`,
                                padding: 20,
                            }}
                        >
                            <h5
                                style={{
                                    color: COLORS.text,
                                    marginBottom: 20,
                                }}
                            >
                                Recent Sales
                            </h5>

                            <table className="table table-dark table-hover align-middle">

                                <thead>

                                    <tr>

                                        <th>Order No</th>

                                        <th>Customer</th>

                                        <th>Amount</th>

                                        <th>Status</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    <tr>

                                        <td>SO-1001</td>

                                        <td>ABC Sports</td>

                                        <td>$1,200</td>

                                        <td>
                                            <span className="badge bg-success">
                                                Completed
                                            </span>
                                        </td>

                                    </tr>

                                    <tr>

                                        <td>SO-1002</td>

                                        <td>XYZ Fashion</td>

                                        <td>$980</td>

                                        <td>
                                            <span className="badge bg-warning text-dark">
                                                Pending
                                            </span>
                                        </td>

                                    </tr>

                                    <tr>

                                        <td>SO-1003</td>

                                        <td>Elite Sports</td>

                                        <td>$1,540</td>

                                        <td>
                                            <span className="badge bg-success">
                                                Completed
                                            </span>
                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>
        </DashboardLayout>
    );
}

export default Dashboard;