// src/components/charts/PurchaseChart.jsx

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function PurchaseChart({ data }) {

    return (

        <ResponsiveContainer
            width="100%"
            height={350}
        >

            <BarChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar
                    dataKey="purchase"
                    fill="#198754"
                />

            </BarChart>

        </ResponsiveContainer>

    );

}

export default PurchaseChart;