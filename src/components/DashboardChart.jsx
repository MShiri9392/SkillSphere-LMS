import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function DashboardChart({ stats }) {

    const data = {
        labels: [
            "Courses",
            "Enrollments",
            "Assignments",
            "Reviews"
        ],
        datasets: [
            {
                label: "Total Count",
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
                ],
                borderRadius: 8
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "SkillSphere Analytics"
            }
        }
    };

    return (
        <div className="card shadow">
            <div className="card-body">
                <div style={{ height: "400px" }}>
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
}

export default DashboardChart;