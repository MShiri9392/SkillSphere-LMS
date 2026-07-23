function RecentActivity() {

    const activities = [
        "🎓 New student enrolled in Java Programming",
        "📚 New course added: React Basics",
        "📝 Assignment submitted successfully",
        "⭐ Student posted a course review",
        "🏆 Certificate generated for Python Course"
    ];

    return (
        <div className="card shadow-lg border-0 mt-4">
            <div className="card-body">

                <h4 className="mb-4">
                    🕒 Recent Activities
                </h4>

                <ul className="list-group">

                    {activities.map((activity, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            {activity}

                            <span className="badge bg-primary rounded-pill">
                                New
                            </span>
                        </li>
                    ))}

                </ul>

            </div>
        </div>
    );
}

export default RecentActivity;