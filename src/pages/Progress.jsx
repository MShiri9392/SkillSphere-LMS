import { useEffect, useState } from "react";
import { getAllProgress } from "../services/ProgressService";

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

                                    <div className="progress">

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