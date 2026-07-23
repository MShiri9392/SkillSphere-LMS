import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
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

function RevenueChart() {

    const data = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun"
        ],
        datasets: [
            {
                label: "Revenue",
                data: [5000, 9000, 12000, 18000, 22000, 26000],
                backgroundColor: "#198754"
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Monthly Revenue"
            }
        }
    };

    return (
        <div className="card shadow-lg border-0">
            <div className="card-body">

                <div style={{ height: "350px" }}>
                    <Bar
                        data={data}
                        options={options}
                    />
                </div>

            </div>
        </div>
    );
}

export default RevenueChart;