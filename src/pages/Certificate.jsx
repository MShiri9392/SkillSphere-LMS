import { useEffect, useState } from "react";
import {
    getAllCertificates,
    generateCertificate,
    deleteCertificate
} from "../services/CertificateService";

function Certificate() {

    const [certificates, setCertificates] = useState([]);
    const [enrollmentId, setEnrollmentId] = useState("");

    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = async () => {
        try {
            const response = await getAllCertificates();
            console.log(response.data);
            setCertificates(response.data);
        } catch (error) {
            console.error(error);
            alert("Unable to load Certificates");
        }
    };

    const handleGenerate = async () => {

        if (!enrollmentId) {
            alert("Please enter Enrollment ID");
            return;
        }

        try {
            await generateCertificate(enrollmentId);

            alert("Certificate Generated Successfully");

            setEnrollmentId("");

            loadCertificates();

        } catch (error) {
            console.error(error);
            alert("Unable to Generate Certificate");
        }
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this certificate?"))
            return;

        try {

            await deleteCertificate(id);

            alert("Certificate Deleted Successfully");

            loadCertificates();

        } catch (error) {

            console.error(error);
            alert("Unable to Delete Certificate");

        }
    };

    return (

        <div className="container mt-4">

            <h2 className="text-center mb-4">
                🎓 Certificates
            </h2>

            <div className="card shadow p-4 mb-4">

                <div className="row">

                    <div className="col-md-8">

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Enrollment ID"
                            value={enrollmentId}
                            onChange={(e) => setEnrollmentId(e.target.value)}
                        />

                    </div>

                    <div className="col-md-4">

                        <button
                            className="btn btn-success w-100"
                            onClick={handleGenerate}
                        >
                            Generate Certificate
                        </button>

                    </div>

                </div>

            </div>

            {certificates.length === 0 ? (

                <div className="alert alert-warning text-center">
                    No Certificates Available
                </div>

            ) : (

                <div className="row">

                    {certificates.map((certificate) => (

                        <div className="col-md-4 mb-4" key={certificate.id}>

                            <div className="card shadow h-100">

                                <div className="card-body">

                                    <h4 className="text-primary">
                                        Certificate #{certificate.id}
                                    </h4>

                                    <hr />

                                    <p>
                                        <strong>Enrollment ID:</strong>{" "}
                                        {certificate.enrollment?.id}
                                    </p>

                                    <p>
                                        <strong>Certificate Number:</strong>
                                        <br />
                                        <small className="text-break">
                                            {certificate.certificateNumber}
                                        </small>
                                    </p>

                                    <p>
                                        <strong>Issue Date:</strong>{" "}
                                        {certificate.issueDate}
                                    </p>

                                </div>

                                <div className="card-footer bg-white border-0">

                                    <button
                                        className="btn btn-danger w-100"
                                        onClick={() => handleDelete(certificate.id)}
                                    >
                                        Delete Certificate
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );
}

export default Certificate;