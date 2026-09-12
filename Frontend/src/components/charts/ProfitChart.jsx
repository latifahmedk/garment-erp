// src/components/charts/ProfitChart.jsx

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function ProfitChart({ data }) {

    return (

        <ResponsiveContainer
            width="100%"
            height={350}
        >

            <AreaChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="#20c997"
                    fill="#20c997"
                />

            </AreaChart>

        </ResponsiveContainer>

    );

}

export default ProfitChart;