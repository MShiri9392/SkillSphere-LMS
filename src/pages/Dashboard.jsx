import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/DashboardService";

function Dashboard() {

    const [stats, setStats] = useState({});

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const response = await getDashboardStats();
            setStats(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const cards = [
        { title: "Users", value: stats.totalUsers },
        { title: "Courses", value: stats.totalCourses },
        { title: "Enrollments", value: stats.totalEnrollments },
        { title: "Assignments", value: stats.totalAssignments },
        { title: "Certificates", value: stats.totalCertificates },
        { title: "Reviews", value: stats.totalReviews },
        { title: "Discussions", value: stats.totalDiscussions },
    ];

    return (
        <div className="container mt-4">

            <h2 className="mb-4">Dashboard</h2>

            <div className="row">

                {cards.map((card, index) => (

                    <div className="col-md-3 mb-4" key={index}>

                        <div className="card shadow text-center">

                            <div className="card-body">

                                <h5>{card.title}</h5>

                                <h2>{card.value ?? 0}</h2>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Dashboard;