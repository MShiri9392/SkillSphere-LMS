import { useEffect, useState } from "react";
import { getAllProgress } from "../services/ProgressService";
import { generateCertificate } from "../services/CertificateService";

function Progress() {

    const [progressList, setProgressList] = useState([]);

    useEffect(() => {
        loadProgress();
    }, []);

    const loadProgress = async () => {
        try {
            const response = await getAllProgress();

            console.log("Progress Data:", response.data);

            setProgressList(response.data);

        } catch (error) {
            console.error(error);
            alert("Unable to load Progress");
        }
    };

    const handleGenerateCertificate = async (enrollmentId) => {
        try {

            const response = await generateCertificate(enrollmentId);

            alert(
                "Certificate Generated Successfully!\n\nCertificate Number: " +
                response.data.certificateNumber
            );

        } catch (error) {

            console.error(error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Unable to generate certificate");
            }
        }
    };

    return (
        <div className="container mt-4">

            <h2 className="text-center mb-4">
                Student Progress
            </h2>

            {progressList.length === 0 ? (

                <h4 className="text-center text-danger">
                    No Progress Available
                </h4>

            ) : (

                <div className="row">

                    {progressList.map((progress) => (

                        <div className="col-md-4 mb-4" key={progress.id}>

                            <div className="card shadow">

                                <div className="card-body">

                                    <h5 className="card-title">
                                        Progress ID : {progress.id}
                                    </h5>

                                    <p>
                                        <strong>Status :</strong>{" "}
                                        {progress.status}
                                    </p>

                                    <p>
                                        <strong>Completion :</strong>{" "}
                                        {progress.percentage ?? 0}%
                                    </p>

                                    <div className="progress mb-3">

                                        <div
                                            className="progress-bar bg-success"
                                            role="progressbar"
                                            style={{
                                                width: `${progress.percentage ?? 0}%`
                                            }}
                                            aria-valuenow={progress.percentage ?? 0}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            {progress.percentage ?? 0}%
                                        </div>

                                    </div>

                                    {(progress.percentage ?? 0) === 100 && (
                                        <button
                                            className="btn btn-success w-100"
                                            onClick={() =>
                                                handleGenerateCertificate(
                                                    progress.enrollment.id
                                                )
                                            }
                                        >
                                            🎓 Generate Certificate
                                        </button>
                                    )}

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Progress;