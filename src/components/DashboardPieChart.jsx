import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function DashboardPieChart({ stats }) {

    const data = {
        labels: [
            "Courses",
            "Enrollments",
            "Assignments",
            "Reviews"
        ],
        datasets: [
            {
                data: [
                    stats?.courses || 0,
                    stats?.enrollments || 0,
                    stats?.assignments || 0,
                    stats?.reviews || 0
                ],
                backgroundColor: [
                    "#0d6efd",
                    "#198754",
                    "#ffc107",
                    "#dc3545"
                ]
            }
        ]
    };

    return (
        <div className="card shadow">
            <div className="card-body">

                <h5 className="text-center mb-3">
                    Statistics Distribution
                </h5>

                <div style={{ height: "350px" }}>
                    <Pie data={data} />
                </div>

            </div>
        </div>
    );
}

export default DashboardPieChart;