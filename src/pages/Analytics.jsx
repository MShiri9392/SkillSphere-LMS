import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/DashboardService";

import DashboardChart from "../components/DashboardChart";
import DashboardPieChart from "../components/DashboardPieChart";
import RevenueChart from "../components/RevenueChart";
import TopCourses from "../components/TopCourses";
import RecentPayments from "../components/RecentPayments";
import QuickActions from "../components/QuickActions";

function Analytics() {

    const [stats, setStats] = useState({
        courses: 0,
        enrollments: 0,
        assignments: 0,
        reviews: 0,
        discussions: 0,
        certificates: 0,
        users: 0,
        revenue: 0
    });

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {

        try {

            const response = await getDashboardStats();

            const data = response.data;

            setStats({
                users: data.totalUsers || 0,
                courses: data.totalCourses || 0,
                enrollments: data.totalEnrollments || 0,
                assignments: data.totalAssignments || 0,
                certificates: data.totalCertificates || 0,
                reviews: data.totalReviews || 0,
                discussions: data.totalDiscussions || 0,
                revenue: 0
            });

        } catch (error) {
            console.error("Dashboard Error:", error);
        }

    };

    return (

        <div className="container-fluid mt-4">

            <h2 className="fw-bold mb-4">
                📊 Analytics Dashboard
            </h2>

            <div className="row">

                <div className="col-lg-3 mb-4">
                    <div className="card bg-primary text-white shadow border-0">
                        <div className="card-body text-center">
                            <h5>📚 Courses</h5>
                            <h2>{stats.courses}</h2>
                            <small>Total Courses</small>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 mb-4">
                    <div className="card bg-success text-white shadow border-0">
                        <div className="card-body text-center">
                            <h5>🎓 Enrollments</h5>
                            <h2>{stats.enrollments}</h2>
                            <small>Total Enrollments</small>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 mb-4">
                    <div className="card bg-warning shadow border-0">
                        <div className="card-body text-center">
                            <h5>📝 Assignments</h5>
                            <h2>{stats.assignments}</h2>
                            <small>Assignments</small>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 mb-4">
                    <div className="card bg-danger text-white shadow border-0">
                        <div className="card-body text-center">
                            <h5>⭐ Reviews</h5>
                            <h2>{stats.reviews}</h2>
                            <small>Course Reviews</small>
                        </div>
                    </div>
                </div>

            </div>

            <div className="row">

                <div className="col-lg-3 mb-4">
                    <div className="card bg-info text-white shadow border-0">
                        <div className="card-body text-center">
                            <h5>👨‍🎓 Users</h5>
                            <h2>{stats.users}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 mb-4">
                    <div className="card bg-secondary text-white shadow border-0">
                        <div className="card-body text-center">
                            <h5>🏆 Certificates</h5>
                            <h2>{stats.certificates}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 mb-4">
                    <div className="card bg-dark text-white shadow border-0">
                        <div className="card-body text-center">
                            <h5>💬 Discussions</h5>
                            <h2>{stats.discussions}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 mb-4">
                    <div className="card bg-success text-white shadow border-0">
                        <div className="card-body text-center">
                            <h5>💰 Revenue</h5>
                            <h2>₹{stats.revenue}</h2>
                        </div>
                    </div>
                </div>

            </div>

            <div className="row">

                <div className="col-lg-8">
                    <DashboardChart stats={stats} />
                </div>

                <div className="col-lg-4">
                    <DashboardPieChart stats={stats} />
                </div>

            </div>

            <div className="row mt-4">

                <div className="col-lg-8">
                    <RevenueChart />
                </div>

                <div className="col-lg-4">
                    <QuickActions />
                </div>

            </div>

            <div className="row mt-4">

                <div className="col-lg-6">
                    <TopCourses />
                </div>

                <div className="col-lg-6">
                    <RecentPayments />
                </div>

            </div>

        </div>

    );
}

export default Analytics;