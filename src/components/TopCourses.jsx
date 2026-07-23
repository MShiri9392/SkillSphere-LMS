function TopCourses() {

    const courses = [
        {
            title: "Java Programming",
            students: 120
        },
        {
            title: "Spring Boot",
            students: 95
        },
        {
            title: "React JS",
            students: 82
        },
        {
            title: "Python",
            students: 76
        }
    ];

    return (

        <div className="card shadow-lg border-0">

            <div className="card-header bg-success text-white">
                <h5 className="mb-0">🏆 Top Courses</h5>
            </div>

            <div className="card-body">

                <table className="table table-hover">

                    <thead>

                        <tr>
                            <th>Course</th>
                            <th>Students</th>
                        </tr>

                    </thead>

                    <tbody>

                        {courses.map((course, index) => (

                            <tr key={index}>

                                <td>{course.title}</td>

                                <td>{course.students}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default TopCourses;