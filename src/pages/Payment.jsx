import { useEffect, useState } from "react";
import {
    getAllPayments,
    makePayment,
    deletePayment
} from "../services/PaymentService";

function Payment() {

    const [payments, setPayments] = useState([]);

    const [userId, setUserId] = useState("");
    const [courseId, setCourseId] = useState("");

    const [form, setForm] = useState({
        amount: "",
        paymentMethod: "",
        transactionId: "",
        status: ""
    });

    useEffect(() => {
        loadPayments();
    }, []);

    const loadPayments = async () => {
        try {
            const response = await getAllPayments();
            setPayments(response.data);
        } catch (error) {
            console.error(error);
            alert("Unable to load payments");
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {

        if (
            !userId ||
            !courseId ||
            !form.amount ||
            !form.paymentMethod ||
            !form.transactionId ||
            !form.status
        ) {
            alert("Please fill all fields");
            return;
        }

        try {

            await makePayment(
                userId,
                courseId,
                {
                    amount: Number(form.amount),
                    paymentMethod: form.paymentMethod,
                    transactionId: form.transactionId,
                    status: form.status
                }
            );

            alert("Payment Successful");

            setUserId("");
            setCourseId("");

            setForm({
                amount: "",
                paymentMethod: "",
                transactionId: "",
                status: ""
            });

            loadPayments();

        } catch (error) {

            console.error(error);
            alert("Payment Failed");

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this payment?"))
            return;

        try {

            await deletePayment(id);

            alert("Payment Deleted Successfully");

            loadPayments();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="text-center mb-4">
                💳 Payments
            </h2>

            <div className="card shadow p-4 mb-4">

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Course ID"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Amount"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                />

                <select
                    className="form-control mb-3"
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                >
                    <option value="">Select Payment Method</option>
                    <option value="UPI">UPI</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Cash">Cash</option>
                </select>

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Transaction ID"
                    name="transactionId"
                    value={form.transactionId}
                    onChange={handleChange}
                />

                <select
                    className="form-control mb-3"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value="">Select Status</option>
                    <option value="SUCCESS">SUCCESS</option>
                    <option value="PENDING">PENDING</option>
                    <option value="FAILED">FAILED</option>
                </select>

                <button
                    className="btn btn-success w-100"
                    onClick={handleSubmit}
                >
                    Make Payment
                </button>

            </div>

            {payments.length === 0 ? (

                <div className="alert alert-warning text-center">
                    No Payments Available
                </div>

            ) : (

                <div className="row">

                    {payments.map((payment) => (

                        <div className="col-md-6 mb-4" key={payment.id}>

                            <div className="card shadow">

                                <div className="card-body">

                                    <h5 className="text-primary">
                                        Payment #{payment.id}
                                    </h5>

                                    <hr />

                                    <p><strong>User:</strong> {payment.user?.name}</p>

                                    <p><strong>Course:</strong> {payment.course?.title}</p>

                                    <p><strong>Amount:</strong> ₹{payment.amount}</p>

                                    <p><strong>Payment Method:</strong> {payment.paymentMethod}</p>

                                    <p><strong>Transaction ID:</strong> {payment.transactionId}</p>

                                    <p><strong>Status:</strong> {payment.status}</p>

                                    <p>
                                        <strong>Payment Date:</strong>{" "}
                                        {payment.paymentDate
                                            ? new Date(payment.paymentDate).toLocaleString()
                                            : "-"}
                                    </p>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(payment.id)}
                                    >
                                        Delete
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

export default Payment;