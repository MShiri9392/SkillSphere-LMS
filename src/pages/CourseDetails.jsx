import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourse } from "../services/CourseService";
import { enrollCourse } from "../services/EnrollmentService";

function CourseDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);

    useEffect(() => {
        loadCourse();
    }, []);

    const loadCourse = async () => {
        try {
            const response = await getCourse(id);
            setCourse(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEnroll = async () => {

        try {

            const userId = localStorage.getItem("userId");

            await enrollCourse({
                userId,
                courseId: course.id
            });

            alert("Course Enrolled Successfully!");

            navigate("/enrollments");

        } catch (error) {

            console.error(error);

            alert("Enrollment Failed");

        }
    };

    if (!course) {

        return (
            <div className="container mt-5">
                <h3>Loading...</h3>
            </div>
        );

    }

    return (

        <div className="container mt-4">

            <div className="card shadow-lg border-0">

                {course.imageUrl && (

                    <img
                        src={course.imageUrl}
                        alt={course.title}
                        style={{
                            width: "100%",
                            height: "350px",
                            objectFit: "cover"
                        }}
                    />

                )}

                <div className="card-body">

                    <h2>{course.title}</h2>

                    <hr/>

                    <h5>
                        👨‍🏫 Instructor :
                        <span className="text-primary">
                            {" "}{course.instructor}
                        </span>
                    </h5>

                    <h5>
                        📂 Category :
                        <span className="text-success">
                            {" "}{course.category}
                        </span>
                    </h5>

                    <h5>
                        💰 Price :
                        <span className="text-danger">
                            ₹{course.price}
                        </span>
                    </h5>

                    <hr/>

                    <h4>Description</h4>

                    <p>{course.description}</p>

                    <hr/>

                    {course.videoUrl && (

                        <div className="mb-4">

                            <iframe
                                width="100%"
                                height="450"
                                src={course.videoUrl.replace("watch?v=", "embed/")}
                                title="Course Video"
                                allowFullScreen
                            ></iframe>

                        </div>

                    )}

                    <button
                        className="btn btn-success me-2"
                        onClick={handleEnroll}
                    >
                        🎓 Enroll Now
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/courses")}
                    >
                        Back
                    </button>

                </div>

            </div>

        </div>

    );
}

export default CourseDetails;