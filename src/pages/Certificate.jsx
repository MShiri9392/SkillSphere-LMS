import { useEffect, useState } from "react";
import { getCertificates } from "../services/CertificateService";

function Certificate() {

    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = async () => {
        try {
            const response = await getCertificates();

            console.log("Certificates:", response.data);

            setCertificates(response.data);

        } catch (error) {
            console.error(error);
            alert("Unable to load Certificates");
        }
    };

    return (
        <div className="container mt-4">

            <h2 className="text-center mb-4">
                🏆 Certificates
            </h2>

            {certificates.length === 0 ? (

                <div className="alert alert-warning text-center">
                    No Certificates Available
                </div>

            ) : (

                <div className="table-responsive">

                    <table className="table table-bordered table-striped shadow">

                        <thead className="table-dark">

                        <tr>
                            <th>ID</th>
                            <th>Enrollment ID</th>
                            <th>User ID</th>
                            <th>Course ID</th>
                            <th>Certificate Number</th>
                            <th>Issued Date</th>
                        </tr>

                        </thead>

                        <tbody>

                        {certificates.map((certificate) => (

                            <tr key={certificate.id}>

                                <td>{certificate.id}</td>

                                <td>
                                    {certificate.enrollment?.id}
                                </td>

                                <td>
                                    {certificate.enrollment?.userId}
                                </td>

                                <td>
                                    {certificate.enrollment?.courseId}
                                </td>

                                <td>
                                    <span className="badge bg-success">
                                        {certificate.certificateNumber}
                                    </span>
                                </td>

                                <td>
                                    {certificate.issuedDate}
                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}

export default Certificate;