// src/components/charts/InventoryChart.jsx

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Cell,
    Legend,
} from "recharts";

const COLORS = [
    "#0d6efd",
    "#198754",
    "#ffc107",
    "#dc3545",
    "#6610f2",
];

function InventoryChart({
    data,
}) {

    return (

        <ResponsiveContainer
            width="100%"
            height={350}
        >

            <PieChart>

                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label
                >

                    {data.map(
                        (
                            entry,
                            index
                        ) => (

                            <Cell
                                key={index}
                                fill={
                                    COLORS[
                                        index %
                                            COLORS.length
                                    ]
                                }
                            />

                        )
                    )}

                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </ResponsiveContainer>

    );

}

export default InventoryChart;